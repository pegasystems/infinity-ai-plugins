#!/usr/bin/env node
// MCP smoke test over stdio: initialize, tools/list, and tools/call list-skills.
// Also enforces that every stdout line is JSON-RPC and that the server exits
// cleanly when stdin closes.
//
// Usage:
//   node smoke.mjs [--expect-tools N] <package-spec | tarball>   runs `npx -y <spec>`
//   node smoke.mjs [--expect-tools N] -- <command> [args...]     runs the command as given

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 300000);

const argv = process.argv.slice(2);
let expectTools = null;
const expectIndex = argv.indexOf('--expect-tools');
if (expectIndex > -1) {
  expectTools = Number(argv[expectIndex + 1]);
  argv.splice(expectIndex, 2);
}

let command;
let args;
const dashIndex = argv.indexOf('--');
if (dashIndex > -1) {
  [command, ...args] = argv.slice(dashIndex + 1);
} else if (argv[0]) {
  // npx runs an existing file path as a local binary, so pass tarballs as file: URLs.
  const spec = fs.existsSync(argv[0]) ? pathToFileURL(path.resolve(argv[0])).href : argv[0];
  command = 'npx';
  args = ['-y', spec];
} else {
  console.error('usage: smoke.mjs [--expect-tools N] <package-spec | tarball> | -- <command> [args...]');
  process.exit(2);
}

// npx is npx.cmd on Windows, which needs a shell.
const useShell = process.platform === 'win32';
const quote = (arg) => (useShell && /\s/.test(arg) ? `"${arg}"` : arg);
console.log(`smoke: starting ${[command, ...args].join(' ')}`);
const child = spawn(quote(command), args.map(quote), {
  stdio: ['pipe', 'pipe', 'inherit'],
  shell: useShell,
});

let failed = false;
function fail(message) {
  if (failed) return;
  failed = true;
  console.error(`smoke: FAIL ${message}`);
  child.kill();
  process.exit(1);
}

const timer = setTimeout(() => fail(`timed out after ${TIMEOUT_MS} ms`), TIMEOUT_MS);
child.on('error', (err) => fail(`could not start: ${err.message}`));
child.stdin.on('error', () => {}); // EPIPE if the server died; reported by the exit handler

const pending = new Map();
const exited = new Promise((resolve) =>
  child.on('exit', (code, signal) => {
    if (pending.size > 0) fail(`server exited (code ${code}, signal ${signal}) before responding`);
    resolve(code);
  }),
);
let buffer = '';
child.stdout.setEncoding('utf8');
child.stdout.on('data', (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf('\n')) > -1) {
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      fail(`non-JSON output on stdout: ${line.slice(0, 200)}`);
      return;
    }
    if (message.id !== undefined && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  }
});

let nextId = 1;
function send(message) {
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', ...message })}\n`);
}
function request(method, params) {
  const id = nextId++;
  return new Promise((resolve) => {
    pending.set(id, (message) => {
      if (message.error) fail(`${method} returned error: ${JSON.stringify(message.error)}`);
      resolve(message.result);
    });
    send({ id, method, params });
  });
}

const init = await request('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'infinity-rules-mcp-smoke', version: '0' },
});
console.log(`smoke: initialize ok (${init.serverInfo?.name} ${init.serverInfo?.version})`);
send({ method: 'notifications/initialized' });

const { tools } = await request('tools/list', {});
const names = tools.map((tool) => tool.name);
if (!names.includes('list-skills')) fail(`tools/list has no list-skills: ${names.join(', ')}`);
if (expectTools !== null && tools.length !== expectTools) {
  fail(`expected ${expectTools} tools, got ${tools.length}: ${names.join(', ')}`);
}
console.log(`smoke: tools/list ok (${tools.length} tools)`);

const skills = await request('tools/call', { name: 'list-skills', arguments: {} });
if (skills.isError) fail(`list-skills returned isError: ${JSON.stringify(skills.content).slice(0, 500)}`);
if (!skills.content || skills.content.length === 0) fail('list-skills returned no content');
console.log('smoke: list-skills ok');

child.stdin.end();
const code = await exited;
clearTimeout(timer);
if (code !== 0) fail(`server exited with code ${code} after stdin closed`);
console.log('smoke: PASS');
