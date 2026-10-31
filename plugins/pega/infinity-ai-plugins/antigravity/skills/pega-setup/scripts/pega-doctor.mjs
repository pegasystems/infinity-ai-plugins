#!/usr/bin/env node
/**
 * Cross-platform setup, preflight diagnostics, artifact prefetch, and configuration helper
 * for the Pega Infinity Authoring Google Antigravity Plugin.
 *
 * Designed for Node.js >= 22.14.0 on Windows, macOS, and Linux with zero external dependencies.
 * Strictly enforces presence-only output: never prints URLs, client IDs, or credentials to stdout.
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PINNED_LAUNCHER_PACKAGE = "@pega/infinity-authoring-plugin@0.2.1";
export const STANDARD_OAUTH_CLIENT_ID = "34233104330833666523";
export const SUPPORTED_PEGA_VERSIONS = ["24-2", "25-1", "26-1"];
export const DEFAULT_PEGA_VERSION = "26-1";
export const MIN_NODE_VERSION = [22, 14, 0];
export const MIN_JAVA_MAJOR = 17;

export function checkNodeVersion(versionString = process.versions.node) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(versionString).trim());
  if (!match) {
    return { ok: false, detected: versionString, minimum: "22.14.0" };
  }
  const [maj, min, patch] = match.slice(1).map(Number);
  const [reqMaj, reqMin, reqPatch] = MIN_NODE_VERSION;
  const ok =
    maj > reqMaj ||
    (maj === reqMaj && (min > reqMin || (min === reqMin && patch >= reqPatch)));
  return { ok, detected: `${maj}.${min}.${patch}`, minimum: "22.14.0" };
}

export function validatePegaBaseUrl(rawUrl) {
  if (typeof rawUrl !== "string" || !rawUrl.trim()) {
    return { status: "missing", valid: false, reason: "pega_base_url is missing or empty." };
  }
  const trimmed = rawUrl.trim();
  if (
    /^<.*>$/.test(trimmed) ||
    /paste-your-pega-url|your-pega-(host|environment|url)|example\.pega\.(net|example\.com)/i.test(
      trimmed
    )
  ) {
    return {
      status: "placeholder",
      valid: false,
      reason: "pega_base_url is still set to a template placeholder."
    };
  }
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      status: "invalid",
      valid: false,
      reason: "pega_base_url is not a valid HTTP or HTTPS URL."
    };
  }
  if (/^(example\.(com|net|org)|.*\.example\.(com|net|org))$/i.test(parsed.hostname)) {
    return {
      status: "placeholder",
      valid: false,
      reason: "pega_base_url uses a reserved documentation example hostname."
    };
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return {
      status: "invalid",
      valid: false,
      reason: "pega_base_url must use https:// (or http:// for local dev)."
    };
  }
  if (parsed.username || parsed.password || parsed.search || parsed.hash) {
    return {
      status: "invalid",
      valid: false,
      reason: "pega_base_url must not contain credentials, query parameters, or URL fragments."
    };
  }
  const cleanedPath = parsed.pathname.replace(/\/+$/, "");
  if (cleanedPath !== "") {
    return {
      status: "invalid",
      valid: false,
      reason: `pega_base_url must be the host root URL only without path segments (found path '${cleanedPath}' — remove '/prweb' or trailing paths).`
    };
  }
  return { status: "valid", valid: true, normalizedOrigin: parsed.origin };
}

export function parseJavaMajorVersion(output) {
  const match = /version "(\d+)(?:\.(\d+))?/.exec(String(output));
  if (!match) return undefined;
  const first = Number(match[1]);
  return first === 1 && match[2] !== undefined ? Number(match[2]) : first;
}

function runCommandCapture(command, args, { timeoutMs = 6000, shell = false } = {}) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    let child;
    try {
      child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"], shell });
    } catch (error) {
      resolve({ ok: false, code: -1, stdout: "", stderr: error.message });
      return;
    }
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        child.kill();
        resolve({ ok: false, code: -1, stdout, stderr: "Timed out" });
      }
    }, timeoutMs);

    child.stdout.on("data", (d) => {
      if (stdout.length < 16384) stdout += d.toString("utf8");
    });
    child.stderr.on("data", (d) => {
      if (stderr.length < 16384) stderr += d.toString("utf8");
    });
    child.once("error", (err) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ ok: false, code: -1, stdout, stderr: err.message });
      }
    });
    child.once("close", (code) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ ok: code === 0, code: code ?? -1, stdout, stderr });
      }
    });
  });
}

async function probeJavaExecutable(binPath) {
  const res = await runCommandCapture(binPath, ["-version"]);
  const combined = `${res.stdout}\n${res.stderr}`;
  const major = parseJavaMajorVersion(combined);
  if (major === undefined) {
    return { found: false, major: undefined, executable: binPath };
  }
  return { found: true, major, ok: major >= MIN_JAVA_MAJOR, executable: binPath };
}

async function discoverCandidateJdks() {
  const exeName = process.platform === "win32" ? "java.exe" : "java";
  const roots = [];
  if (process.platform === "win32") {
    const pf = process.env.ProgramFiles || "C:\\Program Files";
    const localAppData = process.env.LOCALAPPDATA || "";
    roots.push(
      path.join(pf, "Eclipse Adoptium"),
      path.join(pf, "Java"),
      path.join(pf, "Microsoft"),
      path.join(pf, "Amazon Corretto"),
      path.join(pf, "BellSoft"),
      path.join(pf, "Zulu")
    );
    if (localAppData) {
      roots.push(path.join(localAppData, "Programs", "Eclipse Adoptium"));
    }
  } else if (process.platform === "darwin") {
    roots.push(
      "/Library/Java/JavaVirtualMachines",
      "/opt/homebrew/opt",
      "/usr/local/opt"
    );
  } else {
    roots.push(
      "/usr/lib/jvm",
      path.join(os.homedir(), ".sdkman", "candidates", "java")
    );
  }

  const candidates = [];
  for (const root of roots) {
    if (!fsSync.existsSync(root)) continue;
    try {
      const entries = await fs.readdir(root, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const possiblePaths = [
          path.join(root, entry.name, "bin", exeName),
          path.join(root, entry.name, "Contents", "Home", "bin", exeName),
          path.join(root, entry.name, "libexec", "openjdk.jdk", "Contents", "Home", "bin", exeName)
        ];
        for (const p of possiblePaths) {
          if (fsSync.existsSync(p)) {
            const probed = await probeJavaExecutable(p);
            if (probed.found && probed.ok) {
              candidates.push({ executable: p, major: probed.major });
            }
          }
        }
      }
    } catch {
      // Ignore unreadable system folders
    }
  }
  return candidates;
}

export async function checkJavaEnvironment(env = process.env) {
  const exeName = process.platform === "win32" ? "java.exe" : "java";
  const rawOverride = typeof env.INFINITY_JAVA_BIN === "string" ? env.INFINITY_JAVA_BIN.trim().replace(/^"+|"+$/g, "") : "";
  const primaryCommand = rawOverride || "java";
  const primary = await probeJavaExecutable(primaryCommand);

  if (primary.found && primary.ok) {
    return {
      ok: true,
      source: rawOverride ? "INFINITY_JAVA_BIN" : "PATH",
      major: primary.major,
      minimum: MIN_JAVA_MAJOR,
      candidates: []
    };
  }

  const candidates = [];
  if (env.JAVA_HOME) {
    const javaHomeBin = path.join(env.JAVA_HOME, "bin", exeName);
    if (fsSync.existsSync(javaHomeBin)) {
      const probed = await probeJavaExecutable(javaHomeBin);
      if (probed.found && probed.ok) {
        candidates.push({ executable: javaHomeBin, major: probed.major, source: "JAVA_HOME" });
      }
    }
  }
  const scanned = await discoverCandidateJdks();
  for (const item of scanned) {
    if (!candidates.some((c) => c.executable === item.executable)) {
      candidates.push({ ...item, source: "system-scan" });
    }
  }

  const installHint =
    process.platform === "win32"
      ? "winget install --id EclipseAdoptium.Temurin.21.JDK -e"
      : process.platform === "darwin"
        ? "brew install --cask temurin@21"
        : "Install OpenJDK 21 via your package manager (e.g., sudo apt install openjdk-21-jre-headless)";

  return {
    ok: false,
    source: primary.found ? (env.INFINITY_JAVA_BIN ? "INFINITY_JAVA_BIN" : "PATH") : "none",
    major: primary.major ?? null,
    minimum: MIN_JAVA_MAJOR,
    candidates,
    remediation:
      candidates.length > 0
        ? `Found compatible JDK ${candidates[0].major} at '${candidates[0].executable}'. Add its bin folder to PATH or set INFINITY_JAVA_BIN to that executable.`
        : `Install Java 17+ (for example: ${installHint}) and restart your terminal.`
  };
}

async function checkConfigPermissions(configPath) {
  if (process.platform !== "win32") {
    const stat = await fs.stat(configPath);
    const mode = stat.mode & 0o777;
    return {
      restricted: mode === 0o600,
      detail: mode === 0o600 ? "0600 (restricted)" : `0${mode.toString(8)} (run chmod 600)`
    };
  }
  const res = await runCommandCapture("icacls", [configPath]);
  if (!res.ok) {
    return { restricted: false, detail: "unable to verify Windows ACLs" };
  }
  const broadAccess = /(Everyone|BUILTIN\\Users|Authenticated Users|\*S-1-1-0|\*S-1-5-32-545|\*S-1-5-11):/i.test(
    res.stdout
  );
  return {
    restricted: !broadAccess,
    detail: broadAccess
      ? "broad user ACLs detected (run 'pega-doctor.mjs harden-permissions')"
      : "user-scoped Windows ACL"
  };
}

export async function hardenConfigPermissions(configPath) {
  if (!fsSync.existsSync(configPath)) return false;
  if (process.platform !== "win32") {
    await fs.chmod(configPath, 0o600);
    return true;
  }
  const username = os.userInfo().username;
  if (!username) return false;
  // Use locale-independent Windows well-known SIDs for SYSTEM (*S-1-5-18) and Administrators (*S-1-5-32-544)
  const res = await runCommandCapture("icacls", [
    configPath,
    "/inheritance:r",
    "/grant:r",
    `${username}:F`,
    "*S-1-5-18:F",
    "*S-1-5-32-544:F"
  ]);
  return res.ok;
}

function expandHomeDir(rawPath, homeDir = os.homedir()) {
  const trimmed = String(rawPath).trim();
  if (trimmed === "~") return homeDir;
  if (trimmed.startsWith("~/") || trimmed.startsWith(`~${path.sep}`)) {
    return path.join(homeDir, trimmed.slice(2));
  }
  return trimmed;
}

export async function inspectPegaConfig(homeDir = os.homedir(), env = process.env) {
  const runtimeHome = env.INFINITY_AUTHORING_HOME
    ? path.resolve(expandHomeDir(env.INFINITY_AUTHORING_HOME, homeDir))
    : path.join(homeDir, ".infinity-rules-mcp");
  const configPath = path.join(homeDir, ".infinity-rules-mcp", "config.json");

  const report = {
    configPresent: false,
    validJson: false,
    pega_base_url: "missing",
    pega_base_url_issue: null,
    pega_oauth_client_id: "missing",
    pega_infinity_version: "missing",
    pega_skills_path_override: "unset",
    permissions: "not-applicable",
    cacheReady: false,
    cachedSkillVersions: [],
    envVariables: {
      PEGA_BASE_URL: env.PEGA_BASE_URL ? "set" : "unset",
      PEGA_OAUTH_CLIENT_ID: env.PEGA_OAUTH_CLIENT_ID ? "set" : "unset",
      PEGA_INFINITY_VERSION: env.PEGA_INFINITY_VERSION ? "set" : "unset",
      INFINITY_JAVA_BIN: env.INFINITY_JAVA_BIN ? "set" : "unset",
      INFINITY_AUTHORING_HOME: env.INFINITY_AUTHORING_HOME ? "set" : "unset",
      PEGA_SKILLS_PATH_CONFLICT: Boolean(env.PEGA_SKILLS_PATH)
    }
  };

  // Check cached artifacts under runtimeHome/dependencies/*
  let resolvedCachedSkillsDir = null;
  const depsRoot = path.join(runtimeHome, "dependencies");
  if (fsSync.existsSync(depsRoot)) {
    try {
      const keys = await fs.readdir(depsRoot, { withFileTypes: true });
      for (const k of keys) {
        if (!k.isDirectory()) continue;
        const jarFile = path.join(depsRoot, k.name, "infinity-rules-mcp.jar");
        const skillsDir = path.join(depsRoot, k.name, "skills");
        if (fsSync.existsSync(jarFile) && fsSync.existsSync(skillsDir)) {
          report.cacheReady = true;
          resolvedCachedSkillsDir = skillsDir;
          const skillEntries = await fs.readdir(skillsDir, { withFileTypes: true });
          report.cachedSkillVersions = skillEntries
            .filter((e) => e.isDirectory() && SUPPORTED_PEGA_VERSIONS.includes(e.name))
            .map((e) => e.name)
            .sort();
          break;
        }
      }
    } catch {
      // Ignore cache read errors
    }
  }

  if (env.PEGA_SKILLS_PATH && resolvedCachedSkillsDir) {
    report.envVariables.PEGA_SKILLS_PATH_CONFLICT =
      path.resolve(env.PEGA_SKILLS_PATH) !== path.resolve(resolvedCachedSkillsDir);
  }

  if (!fsSync.existsSync(configPath)) {
    return report;
  }

  report.configPresent = true;
  const perm = await checkConfigPermissions(configPath);
  report.permissions = perm.detail;

  let parsed;
  try {
    const raw = await fs.readFile(configPath, "utf8");
    parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      report.pega_base_url_issue = "config.json root must be a JSON object.";
      return report;
    }
    report.validJson = true;
  } catch {
    report.pega_base_url_issue = "config.json contains invalid JSON syntax.";
    return report;
  }

  const urlCheck = validatePegaBaseUrl(parsed.pega_base_url);
  report.pega_base_url = urlCheck.status;
  if (!urlCheck.valid) {
    report.pega_base_url_issue = urlCheck.reason;
  }

  if (typeof parsed.pega_oauth_client_id === "string" && parsed.pega_oauth_client_id.trim()) {
    report.pega_oauth_client_id =
      parsed.pega_oauth_client_id.trim() === STANDARD_OAUTH_CLIENT_ID
        ? "set (standard)"
        : "set (custom)";
  }

  if (typeof parsed.pega_infinity_version === "string" && parsed.pega_infinity_version.trim()) {
    const ver = parsed.pega_infinity_version.trim();
    report.pega_infinity_version = SUPPORTED_PEGA_VERSIONS.includes(ver)
      ? `valid (${ver})`
      : `invalid (must be one of ${SUPPORTED_PEGA_VERSIONS.join(", ")})`;
  }

  if (typeof parsed.pega_skills_path === "string" && parsed.pega_skills_path.trim()) {
    report.pega_skills_path_override = fsSync.existsSync(parsed.pega_skills_path.trim())
      ? "set (directory exists)"
      : "set (directory missing)";
  }

  return report;
}

export async function runDiagnosticCheck({ homeDir = os.homedir(), env = process.env } = {}) {
  const nodeCheck = checkNodeVersion();
  const javaCheck = await checkJavaEnvironment(env);
  const configCheck = await inspectPegaConfig(homeDir, env);

  const effectiveUrlReady =
    configCheck.pega_base_url === "valid" ||
    (configCheck.pega_base_url === "missing" && validatePegaBaseUrl(env.PEGA_BASE_URL || "").valid);

  const readyForLocalSkills =
    nodeCheck.ok && javaCheck.ok && !configCheck.envVariables.PEGA_SKILLS_PATH_CONFLICT;
  const readyForRemotePega = readyForLocalSkills && effectiveUrlReady;

  return {
    platform: process.platform,
    arch: process.arch,
    readyForLocalSkills,
    readyForRemotePega,
    node: nodeCheck,
    java: javaCheck,
    config: configCheck
  };
}

export async function writePegaConfig({
  homeDir = os.homedir(),
  baseUrl,
  infinityVersion = DEFAULT_PEGA_VERSION,
  oauthClientId = STANDARD_OAUTH_CLIENT_ID
}) {
  const urlValidation = validatePegaBaseUrl(baseUrl);
  if (!urlValidation.valid) {
    throw new Error(urlValidation.reason);
  }
  if (!SUPPORTED_PEGA_VERSIONS.includes(infinityVersion)) {
    throw new Error(
      `Unsupported Pega Infinity version '${infinityVersion}'. Expected one of: ${SUPPORTED_PEGA_VERSIONS.join(", ")}.`
    );
  }
  if (typeof oauthClientId !== "string" || !oauthClientId.trim()) {
    throw new Error("pega_oauth_client_id must be a non-empty string.");
  }

  const dir = path.join(homeDir, ".infinity-rules-mcp");
  const configPath = path.join(dir, "config.json");
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });

  let existing = {};
  if (fsSync.existsSync(configPath)) {
    const raw = await fs.readFile(configPath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      existing = parsed;
    }
  }

  const next = {
    ...existing,
    pega_base_url: urlValidation.normalizedOrigin,
    pega_oauth_client_id: oauthClientId.trim(),
    pega_infinity_version: infinityVersion
  };

  const tmpFile = `${configPath}.${process.pid}.${Date.now()}.tmp`;
  try {
    await fs.writeFile(tmpFile, `${JSON.stringify(next, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600
    });
    await fs.rename(tmpFile, configPath);
  } catch (err) {
    await fs.rm(tmpFile, { force: true });
    throw err;
  }

  await hardenConfigPermissions(configPath);
  return { updated: true, infinityVersion };
}

function resolveNpxInvocation(launcherArgs) {
  const nodeDir = path.dirname(process.execPath);
  const candidateNpxCliPaths = [
    path.join(nodeDir, "node_modules", "npm", "bin", "npx-cli.js"),
    path.resolve(nodeDir, "..", "lib", "node_modules", "npm", "bin", "npx-cli.js")
  ];
  for (const npxCli of candidateNpxCliPaths) {
    if (fsSync.existsSync(npxCli)) {
      return {
        command: process.execPath,
        args: [npxCli, "-y", `--package=${PINNED_LAUNCHER_PACKAGE}`, "infinity-authoring-plugin", ...launcherArgs],
        shell: false
      };
    }
  }
  if (process.platform === "win32") {
    const comspec = process.env.ComSpec || "cmd.exe";
    return {
      command: comspec,
      args: [
        "/d",
        "/s",
        "/c",
        "npx.cmd",
        "-y",
        `--package=${PINNED_LAUNCHER_PACKAGE}`,
        "infinity-authoring-plugin",
        ...launcherArgs
      ],
      shell: false
    };
  }
  return {
    command: "npx",
    args: ["-y", `--package=${PINNED_LAUNCHER_PACKAGE}`, "infinity-authoring-plugin", ...launcherArgs],
    shell: false
  };
}

export async function runPrefetch(homeOverride) {
  const extra = homeOverride ? ["--home", homeOverride] : [];
  const inv = resolveNpxInvocation(["prefetch", ...extra]);
  return new Promise((resolve, reject) => {
    const child = spawn(inv.command, inv.args, {
      stdio: "inherit",
      shell: inv.shell
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Prefetch exited with status code ${code}`));
    });
  });
}

function parseCliFlags(argv) {
  const command = argv[0] && !argv[0].startsWith("-") ? argv[0] : "check";
  const startIdx = argv[0] && !argv[0].startsWith("-") ? 1 : 0;
  const flags = {};
  for (let i = startIdx; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") {
      flags.json = true;
    } else if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq !== -1) {
        flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        const next = argv[i + 1];
        if (!next || next.startsWith("--")) {
          flags[arg.slice(2)] = true;
        } else {
          flags[arg.slice(2)] = next;
          i += 1;
        }
      }
    }
  }
  return { command, flags };
}

function formatHumanReport(report) {
  const lines = [
    "=== Pega Infinity Authoring — Antigravity Environment Check ===",
    `Platform           : ${report.platform} (${report.arch})`,
    `Node.js (>=22.14)  : ${report.node.ok ? "PASS" : "FAIL"} (${report.node.detected})`,
    `Java (>=17)        : ${
      report.java.ok
        ? `PASS (Java ${report.java.major} via ${report.java.source})`
        : `FAIL (${report.java.remediation})`
    }`,
    `Config File        : ${report.config.configPresent ? "present" : "missing"}`,
    `  pega_base_url    : [${report.config.pega_base_url}]${
      report.config.pega_base_url_issue ? ` -> ${report.config.pega_base_url_issue}` : ""
    }`,
    `  oauth_client_id  : [${report.config.pega_oauth_client_id}]`,
    `  infinity_version : [${report.config.pega_infinity_version}]`,
    `  permissions      : ${report.config.permissions}`,
    `Runtime Cache      : ${
      report.config.cacheReady
        ? `READY (skills: ${report.config.cachedSkillVersions.join(", ")})`
        : "NOT CACHED YET (will download ~40 MB on first start or via 'prefetch')"
    }`,
    `Env Skill Conflict : ${
      report.config.envVariables.PEGA_SKILLS_PATH_CONFLICT
        ? "FAIL (Unset PEGA_SKILLS_PATH in your shell; use pega_skills_path in config.json instead)"
        : "NONE"
    }`,
    "---------------------------------------------------------------",
    `Local MCP Runtime Ready : ${report.readyForLocalSkills ? "YES" : "NO"}`,
    `Remote Pega Ready       : ${report.readyForRemotePega ? "YES" : "NO"}`
  ];
  return `${lines.join("\n")}\n`;
}

const HELP_TEXT = `Pega Setup & Diagnostics Utility (Antigravity Plugin)

Usage:
  node skills/pega-setup/scripts/pega-doctor.mjs <command> [options]

Commands:
  check [--json] [--home-dir <dir>]
      Run presence-only environment, JDK, cache, and config checks (never prints secrets).

  prefetch [--home <cache-dir>]
      Pre-download and SHA-256-verify the Pega MCP server JAR and skills ZIP (~40 MB).

  configure --url <https://your-pega-host> [--version <24-2|25-1|26-1>] [--client-id <id>] [--home-dir <dir>]
      Validate and atomically update ~/.infinity-rules-mcp/config.json with restricted permissions.

  harden-permissions [--home-dir <dir>]
      Restrict ~/.infinity-rules-mcp/config.json file permissions (0600 on Unix / user ACL on Windows).

  help
      Show this usage guide.
`;

async function main() {
  const { command, flags } = parseCliFlags(process.argv.slice(2));
  const homeDir = typeof flags["home-dir"] === "string" ? path.resolve(flags["home-dir"]) : os.homedir();

  if (command === "help" || flags.help) {
    process.stdout.write(HELP_TEXT);
    return;
  }

  if (command === "check") {
    const report = await runDiagnosticCheck({ homeDir });
    if (flags.json) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
      process.stdout.write(formatHumanReport(report));
    }
    return;
  }

  if (command === "prefetch") {
    await runPrefetch(typeof flags.home === "string" ? flags.home : undefined);
    return;
  }

  if (command === "configure") {
    const baseUrl = flags.url || flags["pega-base-url"];
    const infinityVersion = flags.version || flags["infinity-version"] || DEFAULT_PEGA_VERSION;
    const oauthClientId = flags["client-id"] || STANDARD_OAUTH_CLIENT_ID;
    const res = await writePegaConfig({
      homeDir,
      baseUrl,
      infinityVersion,
      oauthClientId
    });
    process.stdout.write(
      `Updated ~/.infinity-rules-mcp/config.json (pega_infinity_version=${res.infinityVersion}) with restricted user permissions.\n`
    );
    return;
  }

  if (command === "harden-permissions") {
    const configPath = path.join(homeDir, ".infinity-rules-mcp", "config.json");
    const ok = await hardenConfigPermissions(configPath);
    process.stdout.write(
      ok
        ? "Restricted permissions on ~/.infinity-rules-mcp/config.json.\n"
        : "Could not update permissions (confirm ~/.infinity-rules-mcp/config.json exists).\n"
    );
    return;
  }

  throw new Error(`Unknown command '${command}'. Run with 'help' for usage.`);
}

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main().catch((err) => {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exitCode = 1;
  });
}
