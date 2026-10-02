'use strict';

// Launcher unit tests. Run with: node --test packages/infinity-rules-mcp/test/launcher.test.js
// The process-level tests use a fake `java` script, so they run on POSIX only;
// Windows is covered by the CI smoke test against a real JVM.

const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const launcher = require('../bin/infinity-rules-mcp.js');

const PKG_DIR = path.resolve(__dirname, '..');
const POSIX_ONLY = { skip: process.platform === 'win32' && 'fake java script needs POSIX shebangs' };

function tempDir() {
  // realpath: Node resolves symlinks in __dirname (macOS /var -> /private/var).
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'infinity-rules-mcp-test-')));
}

test('parseJavaMajor handles modern, legacy, and early-access version strings', () => {
  assert.equal(launcher.parseJavaMajor('openjdk version "17.0.2" 2022-01-18'), 17);
  assert.equal(launcher.parseJavaMajor('openjdk version "21.0.10" 2026-01-20 LTS'), 21);
  assert.equal(launcher.parseJavaMajor('java version "1.8.0_292"'), 8);
  assert.equal(launcher.parseJavaMajor('openjdk version "22-ea" 2024-03-19'), 22);
  assert.equal(launcher.parseJavaMajor('Picked up JAVA_TOOL_OPTIONS: -Xmx1g\nopenjdk version "17"'), 17);
  assert.equal(launcher.parseJavaMajor('no version here'), null);
  assert.equal(launcher.parseJavaMajor(undefined), null);
});

test('splitArgs honours quotes and keeps Windows backslashes', () => {
  assert.deepEqual(launcher.splitArgs('  -Xmx1g   -Dfoo="a b" \'-Dbar=c d\' '), ['-Xmx1g', '-Dfoo=a b', '-Dbar=c d']);
  assert.deepEqual(launcher.splitArgs('-Djavax.net.ssl.trustStore=C:\\certs\\store.jks'), [
    '-Djavax.net.ssl.trustStore=C:\\certs\\store.jks',
  ]);
  assert.deepEqual(launcher.splitArgs('-Dempty=""'), ['-Dempty=']);
  assert.deepEqual(launcher.splitArgs(''), []);
  assert.deepEqual(launcher.splitArgs(undefined), []);
});

test('resolveJava prefers PEGA_JAVA, then a valid JAVA_HOME, then PATH', () => {
  const home = tempDir();
  const exe = path.join(home, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
  fs.mkdirSync(path.dirname(exe));
  fs.writeFileSync(exe, '');

  assert.deepEqual(launcher.resolveJava({ PEGA_JAVA: '/opt/jdk/bin/java', JAVA_HOME: home }), {
    java: '/opt/jdk/bin/java',
  });
  assert.deepEqual(launcher.resolveJava({ JAVA_HOME: home }), { java: exe });
  assert.deepEqual(launcher.resolveJava({}), { java: 'java' });

  const invalid = launcher.resolveJava({ JAVA_HOME: path.join(home, 'missing') });
  assert.equal(invalid.java, 'java');
  assert.match(invalid.warning, /JAVA_HOME is set but .* does not exist/);
});

test('buildInvocation sets PEGA_SKILLS_PATH only when unset and orders arguments', () => {
  const env = { PEGA_JAVA_OPTS: '-Xmx1g -Dx="y z"', JAVA_OPTS: '-Xmx9g', PEGA_SKILLS_PATH: '' };
  const { args, env: childEnv } = launcher.buildInvocation(env, ['--extra']);
  assert.deepEqual(args, ['-Xmx1g', '-Dx=y z', '-jar', launcher.JAR, '--spring.profiles.active=stdio', '--extra']);
  assert.equal(childEnv.PEGA_SKILLS_PATH, launcher.RESOURCES);
  assert.equal(env.PEGA_SKILLS_PATH, '', 'caller env must not be mutated');

  const custom = launcher.buildInvocation({ JAVA_OPTS: '-Xmx2g', PEGA_SKILLS_PATH: '/my/skills' }, []);
  assert.deepEqual(custom.args.slice(0, 2), ['-Xmx2g', '-jar']);
  assert.equal(custom.env.PEGA_SKILLS_PATH, '/my/skills');
});

test('checkJava reports a missing executable clearly', () => {
  const missing = path.join(tempDir(), 'no-such-java');
  const result = launcher.checkJava(missing, process.env);
  assert.match(result.error, /^Java 17\+ is required but ".*no-such-java" was not found\./);
});

// --- Process-level tests against a staged copy of the launcher and a fake java ---

const FAKE_JAVA = `#!/usr/bin/env node
const fs = require('fs');
const args = process.argv.slice(2);
if (args[0] === '-version') {
  process.stderr.write('openjdk version "' + (process.env.FAKE_JAVA_VERSION || '17.0.9') + '" 2023-10-17\\n');
  process.exit(0);
}
fs.writeFileSync(process.env.FAKE_JAVA_OUT, JSON.stringify({ args, skills: process.env.PEGA_SKILLS_PATH }));
switch (process.env.FAKE_JAVA_MODE) {
  case 'echo':
    process.stdin.pipe(process.stdout);
    break;
  case 'wait':
    process.on('SIGTERM', () => {
      fs.writeFileSync(process.env.FAKE_JAVA_OUT + '.signal', 'SIGTERM');
      process.exit(42);
    });
    setInterval(() => {}, 1000);
    process.stderr.write('ready\\n');
    break;
  case 'kill':
    process.kill(process.pid, 'SIGKILL');
    break;
  default:
    process.exit(Number(process.env.FAKE_JAVA_EXIT || 0));
}
`;

function stagePackage({ withJar = true } = {}) {
  const dir = tempDir();
  fs.mkdirSync(path.join(dir, 'bin'));
  fs.copyFileSync(path.join(PKG_DIR, 'bin', 'infinity-rules-mcp.js'), path.join(dir, 'bin', 'infinity-rules-mcp.js'));
  fs.copyFileSync(path.join(PKG_DIR, 'package.json'), path.join(dir, 'package.json'));
  if (withJar) {
    fs.mkdirSync(path.join(dir, 'resources'));
    fs.writeFileSync(path.join(dir, 'resources', 'infinity-rules-mcp.jar'), '');
  }
  const java = path.join(dir, 'fake-java');
  fs.writeFileSync(java, FAKE_JAVA, { mode: 0o755 });
  const out = path.join(dir, 'java-run.json');
  const env = { ...process.env, PEGA_JAVA: java, FAKE_JAVA_OUT: out };
  env.PATH = `${path.dirname(process.execPath)}${path.delimiter}${env.PATH || ''}`;
  for (const name of ['PEGA_SKILLS_PATH', 'PEGA_JAVA_OPTS', 'JAVA_OPTS', 'JAVA_HOME']) delete env[name];
  return { dir, bin: path.join(dir, 'bin', 'infinity-rules-mcp.js'), out, env };
}

function run(pkg, args, env, input) {
  return spawnSync(process.execPath, [pkg.bin, ...args], { env: { ...pkg.env, ...env }, input, encoding: 'utf8' });
}

test('launches java with the bundled JAR, propagates the exit code, and keeps stdout clean', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const result = run(pkg, ['--extra'], { FAKE_JAVA_EXIT: '7', PEGA_JAVA_OPTS: '-Xmx1g' });

  assert.equal(result.status, 7);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /@pega\/infinity-rules-mcp@\d+\.\d+\.\d+ \(runtime .+\) starting with Java 17/);
  const recorded = JSON.parse(fs.readFileSync(pkg.out, 'utf8'));
  const jar = path.join(pkg.dir, 'resources', 'infinity-rules-mcp.jar');
  assert.deepEqual(recorded.args, ['-Xmx1g', '-jar', jar, '--spring.profiles.active=stdio', '--extra']);
  assert.equal(recorded.skills, path.join(pkg.dir, 'resources'));
});

test('passes stdin and stdout through to java byte for byte', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const message = '{"jsonrpc":"2.0","id":1,"method":"initialize"}\n';
  const result = run(pkg, [], { FAKE_JAVA_MODE: 'echo' }, message);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, message);
});

test('respects a caller-provided PEGA_SKILLS_PATH', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const result = run(pkg, [], { PEGA_SKILLS_PATH: '/custom/skills' });
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(fs.readFileSync(pkg.out, 'utf8')).skills, '/custom/skills');
});

test('forwards SIGTERM to java and mirrors its exit code', POSIX_ONLY, async () => {
  const pkg = stagePackage();
  const child = spawn(process.execPath, [pkg.bin], {
    env: { ...pkg.env, FAKE_JAVA_MODE: 'wait' },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  let stderr = '';
  await new Promise((resolve, reject) => {
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      if (stderr.includes('ready')) resolve();
    });
    child.on('exit', () => reject(new Error(`exited early: ${stderr}`)));
  });
  child.kill('SIGTERM');
  const [code] = await new Promise((resolve) => child.on('exit', (...args) => resolve(args)));
  assert.equal(code, 42);
  assert.equal(fs.readFileSync(`${pkg.out}.signal`, 'utf8'), 'SIGTERM');
});

test('mirrors a signal that terminated java', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const result = run(pkg, [], { FAKE_JAVA_MODE: 'kill' });
  assert.equal(result.signal, 'SIGKILL');
});

test('rejects Java older than 17 without starting the server', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const result = run(pkg, [], { FAKE_JAVA_VERSION: '11.0.2' });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /Java 17\+ is required but ".*fake-java" is Java 11\./);
  assert.equal(fs.existsSync(pkg.out), false);
});

test('exits 1 with a clear message when java is missing', POSIX_ONLY, () => {
  const pkg = stagePackage();
  const result = run(pkg, [], { PEGA_JAVA: path.join(pkg.dir, 'missing-java') });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /Java 17\+ is required but ".*missing-java" was not found\./);
});

test('exits 1 when the runtime JAR is missing from the package', POSIX_ONLY, () => {
  const pkg = stagePackage({ withJar: false });
  const result = run(pkg, [], {});
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /runtime JAR not found/);
});
