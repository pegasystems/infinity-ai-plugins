#!/usr/bin/env node
// Copies the runtime JAR, versioned Pega skills, and LICENSE into the package
// directory so that `npm pack` produces a complete artifact. These files are
// git-ignored under packages/infinity-rules-mcp/.
//
// Usage: node stage.mjs [--from <resources-dir>]
//   --from  directory containing infinity-rules-mcp.jar and the version
//           directories (default: the checked-in claude plugin resources)

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(pkgDir, '..', '..');
const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

const fromIndex = process.argv.indexOf('--from');
const source =
  fromIndex > -1
    ? path.resolve(process.argv[fromIndex + 1])
    : path.join(repoRoot, 'plugins', 'pega', 'infinity-ai-plugins', 'claude', 'resources');
const target = path.join(pkgDir, 'resources');
const versions = pkg.pega.infinityVersions;

function fail(message) {
  console.error(`stage: ${message}`);
  process.exit(1);
}

// Reads Implementation-Version from the JAR manifest without external tools.
function readJarVersion(file) {
  const buf = fs.readFileSync(file);
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) fail(`${file} is not a zip archive`);
  const entries = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < entries; i++) {
    const method = buf.readUInt16LE(p + 10);
    const compressedSize = buf.readUInt32LE(p + 20);
    const nameLength = buf.readUInt16LE(p + 28);
    const extraLength = buf.readUInt16LE(p + 30);
    const commentLength = buf.readUInt16LE(p + 32);
    const localHeader = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLength);
    if (name === 'META-INF/MANIFEST.MF') {
      const start = localHeader + 30 + buf.readUInt16LE(localHeader + 26) + buf.readUInt16LE(localHeader + 28);
      const data = buf.subarray(start, start + compressedSize);
      const text = (method === 8 ? zlib.inflateRawSync(data) : data).toString('utf8');
      const match = /^Implementation-Version:\s*(.+?)\s*$/m.exec(text);
      return match ? match[1] : null;
    }
    p += 46 + nameLength + extraLength + commentLength;
  }
  return null;
}

const jar = path.join(source, 'infinity-rules-mcp.jar');
if (!fs.existsSync(jar)) fail(`missing ${jar}`);
for (const version of versions) {
  if (!fs.existsSync(path.join(source, version, 'manifest.json'))) {
    fail(`missing ${version}/manifest.json under ${source}`);
  }
}

const jarVersion = readJarVersion(jar);
if (jarVersion !== pkg.pega.runtimeVersion) {
  fail(
    `JAR Implementation-Version is ${jarVersion}, but package.json pega.runtimeVersion is ` +
      `${pkg.pega.runtimeVersion}. Update package.json to match the JAR.`,
  );
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.copyFileSync(jar, path.join(target, 'infinity-rules-mcp.jar'));
for (const version of versions) {
  fs.cpSync(path.join(source, version), path.join(target, version), { recursive: true });
}
fs.copyFileSync(path.join(repoRoot, 'LICENSE'), path.join(pkgDir, 'LICENSE'));

console.log(
  `stage: ${pkg.name}@${pkg.version} staged runtime ${jarVersion} and ${versions.join(', ')} from ${source}`,
);
