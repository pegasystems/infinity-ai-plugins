#!/usr/bin/env node
// Release guard for the npm package and the Devin plugin.
//
// - The package version, the version pinned in devin/.mcp.json, both Devin
//   plugin manifests, and every pinned mention in the docs must be identical,
//   and the pin must be an exact version.
// - The package must have no dependencies and no lifecycle scripts.
// - The Devin plugin must stay within Devin's upload limits (20 MiB, 2,500
//   files) and must not bundle the runtime.
//
// Usage: node check-release.mjs [--tag <git-tag>]   (tag must equal v<version>)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_PLUGIN_BYTES = 20 * 1024 * 1024;
const MAX_PLUGIN_FILES = 2500;

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(pkgDir, '..', '..');
const pluginDir = path.join(repoRoot, 'plugins', 'pega', 'infinity-ai-plugins', 'devin');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const errors = [];
const pkg = readJson(path.join(pkgDir, 'package.json'));
const version = pkg.version;

// Versions must line up.
const servers = readJson(path.join(pluginDir, '.mcp.json')).mcpServers || {};
const server = servers['pega-infinity-authoring'];
const spec = server && (server.args || []).find((arg) => arg.startsWith(`${pkg.name}@`));
if (!server || server.command !== 'npx' || !(server.args || []).includes('-y')) {
  errors.push('devin/.mcp.json: pega-infinity-authoring must run "npx -y <package>@<version>"');
}
if (!spec) {
  errors.push(`devin/.mcp.json: no "${pkg.name}@<version>" argument found`);
} else if (spec !== `${pkg.name}@${version}`) {
  errors.push(`devin/.mcp.json pins ${spec}, expected ${pkg.name}@${version}`);
}
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  errors.push(`package.json version ${version} must be an exact x.y.z version`);
}

const manifests = {
  'devin/.devin-plugin/plugin.json': path.join(pluginDir, '.devin-plugin', 'plugin.json'),
  '.devin-plugin/plugin.json': path.join(repoRoot, '.devin-plugin', 'plugin.json'),
};
for (const [label, file] of Object.entries(manifests)) {
  const manifestVersion = readJson(file).version;
  if (manifestVersion !== version) errors.push(`${label} version is ${manifestVersion}, expected ${version}`);
}

const tagIndex = process.argv.indexOf('--tag');
if (tagIndex > -1 && process.argv[tagIndex + 1] !== `v${version}`) {
  errors.push(`tag ${process.argv[tagIndex + 1]} does not match package version v${version}`);
}

// Every pinned mention in docs and skills must match too.
const pinPattern = new RegExp(`${pkg.name.replace(/[/@]/g, '\\$&')}@(\\d+\\.\\d+\\.\\d+)`, 'g');
const docFiles = [
  path.join(repoRoot, 'README.md'),
  path.join(repoRoot, 'plugins', 'pega', 'infinity-ai-plugins', 'README.md'),
  path.join(pkgDir, 'README.md'),
];
const collectDocs = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectDocs(full);
    else if (/\.(md|json)$/.test(entry.name)) docFiles.push(full);
  }
};
collectDocs(pluginDir);
for (const file of docFiles) {
  for (const [, pinned] of fs.readFileSync(file, 'utf8').matchAll(pinPattern)) {
    if (pinned !== version) errors.push(`${path.relative(repoRoot, file)} mentions ${pkg.name}@${pinned}, expected ${version}`);
  }
}

// Supply-chain surface: no dependencies, no scripts.
for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies', 'bundleDependencies', 'scripts']) {
  if (pkg[field] && Object.keys(pkg[field]).length > 0) errors.push(`package.json must not declare "${field}"`);
}

// Devin plugin size limits and no bundled runtime.
let bytes = 0;
let files = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      files += 1;
      bytes += fs.statSync(full).size;
      if (entry.name.endsWith('.jar')) errors.push(`Devin plugin must not bundle ${path.relative(repoRoot, full)}`);
    }
  }
};
walk(pluginDir);
if (bytes > MAX_PLUGIN_BYTES) errors.push(`Devin plugin is ${bytes} bytes, limit is ${MAX_PLUGIN_BYTES}`);
if (files > MAX_PLUGIN_FILES) errors.push(`Devin plugin has ${files} files, limit is ${MAX_PLUGIN_FILES}`);

if (errors.length > 0) {
  for (const error of errors) console.error(`check-release: ${error}`);
  process.exit(1);
}
console.log(
  `check-release: ${pkg.name}@${version} is aligned; Devin plugin is ${(bytes / 1024).toFixed(1)} KiB in ${files} files`,
);
