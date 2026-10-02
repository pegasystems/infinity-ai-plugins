#!/usr/bin/env node
'use strict';

// Starts the bundled infinity-rules-mcp JAR as a stdio MCP server.
//
// Invariant: this launcher never writes to stdout. stdout belongs to the Java
// child and carries MCP JSON-RPC; every diagnostic goes to stderr.

const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const MIN_JAVA = 17;
const PKG_ROOT = path.resolve(__dirname, '..');
const RESOURCES = path.join(PKG_ROOT, 'resources');
const JAR = path.join(RESOURCES, 'infinity-rules-mcp.jar');
const FORWARDED_SIGNALS = ['SIGINT', 'SIGTERM', 'SIGHUP'];

function log(message) {
  process.stderr.write(`infinity-rules-mcp: ${message}\n`);
}

// PEGA_JAVA > $JAVA_HOME/bin/java > `java` on PATH.
function resolveJava(env) {
  if (env.PEGA_JAVA) return { java: env.PEGA_JAVA };
  if (env.JAVA_HOME) {
    const exe = process.platform === 'win32' ? 'java.exe' : 'java';
    const candidate = path.join(env.JAVA_HOME, 'bin', exe);
    if (fs.existsSync(candidate)) return { java: candidate };
    return {
      java: 'java',
      warning: `JAVA_HOME is set but ${candidate} does not exist; falling back to "java" on PATH`,
    };
  }
  return { java: 'java' };
}

// Parses `java -version` output: `"17.0.2"` -> 17, `"1.8.0_292"` -> 8, `"21-ea"` -> 21.
function parseJavaMajor(output) {
  const match = /version "([^"]+)"/.exec(output || '');
  if (!match) return null;
  const [first, second] = match[1].split(/[.\-+_]/).map(Number);
  const major = first === 1 ? second : first;
  return Number.isInteger(major) ? major : null;
}

function checkJava(java, env) {
  const result = spawnSync(java, ['-version'], {
    encoding: 'utf8',
    env,
    timeout: 30000,
    windowsHide: true,
  });
  const hint = `Install Java ${MIN_JAVA}+ and put it on PATH, or set JAVA_HOME or PEGA_JAVA.`;
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      return { error: `Java ${MIN_JAVA}+ is required but "${java}" was not found. ${hint}` };
    }
    return { error: `could not run "${java} -version": ${result.error.message}. ${hint}` };
  }
  const output = `${result.stderr || ''}\n${result.stdout || ''}`;
  const major = parseJavaMajor(output);
  if (major === null) {
    if (result.status !== 0) {
      const detail = output.trim().split(/\r?\n/)[0] || `exit code ${result.status}`;
      return { error: `"${java} -version" failed: ${detail}. ${hint}` };
    }
    return { warning: `could not determine the Java version of "${java}"; continuing` };
  }
  if (major < MIN_JAVA) {
    return { error: `Java ${MIN_JAVA}+ is required but "${java}" is Java ${major}. ${hint}` };
  }
  return { major };
}

// Splits JVM options on whitespace, honouring single and double quotes.
// Backslashes are literal so Windows paths survive.
function splitArgs(value) {
  const args = [];
  let current = '';
  let quote = null;
  let inToken = false;
  for (const ch of value || '') {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      inToken = true;
    } else if (/\s/.test(ch)) {
      if (inToken) args.push(current);
      current = '';
      inToken = false;
    } else {
      current += ch;
      inToken = true;
    }
  }
  if (inToken) args.push(current);
  return args;
}

function buildInvocation(env, extraArgs) {
  const javaOpts = splitArgs(env.PEGA_JAVA_OPTS ?? env.JAVA_OPTS);
  const childEnv = { ...env };
  if (!childEnv.PEGA_SKILLS_PATH) childEnv.PEGA_SKILLS_PATH = RESOURCES;
  return {
    args: [...javaOpts, '-jar', JAR, '--spring.profiles.active=stdio', ...extraArgs],
    env: childEnv,
  };
}

function main(argv, env) {
  if (!fs.existsSync(JAR)) {
    log(`runtime JAR not found at ${JAR}. The package is incomplete; reinstall it.`);
    process.exit(1);
  }

  const { java, warning } = resolveJava(env);
  if (warning) log(warning);
  const check = checkJava(java, env);
  if (check.error) {
    log(check.error);
    process.exit(1);
  }
  if (check.warning) log(check.warning);

  const pkg = require('../package.json');
  const runtime = (pkg.pega && pkg.pega.runtimeVersion) || 'unknown';
  const javaLabel = check.major ? `Java ${check.major}` : 'Java';
  log(`${pkg.name}@${pkg.version} (runtime ${runtime}) starting with ${javaLabel} at ${java}`);

  const { args, env: childEnv } = buildInvocation(env, argv);
  const child = spawn(java, args, { stdio: 'inherit', env: childEnv, windowsHide: true });

  const forward = (signal) => {
    if (child.exitCode === null && child.signalCode === null) child.kill(signal);
  };
  for (const signal of FORWARDED_SIGNALS) process.on(signal, forward);

  child.on('error', (err) => {
    log(`failed to start "${java}": ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code, signal) => {
    for (const s of FORWARDED_SIGNALS) process.removeListener(s, forward);
    if (signal) {
      // Mirror the child's signal. If it doesn't terminate us (e.g. an ignored
      // signal), exit with the conventional 128 + signal number instead.
      process.exitCode = 128 + (os.constants.signals[signal] || 0);
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code === null ? 1 : code);
  });
}

if (require.main === module) {
  main(process.argv.slice(2), process.env);
}

module.exports = {
  MIN_JAVA,
  RESOURCES,
  JAR,
  resolveJava,
  parseJavaMajor,
  checkJava,
  splitArgs,
  buildInvocation,
};
