import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluatePreToolUse } from "../scripts/pega-guard.mjs";
import {
  checkNodeVersion,
  inspectPegaConfig,
  parseJavaMajorVersion,
  runDiagnosticCheck,
  validatePegaBaseUrl,
  writePegaConfig
} from "../skills/pega-setup/scripts/pega-doctor.mjs";

const PLUGIN_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ALLOWED_PLUGIN_MANIFEST_KEYS = new Set([
  "$schema",
  "name",
  "displayName",
  "version",
  "description",
  "logo",
  "author",
  "homepage",
  "repository",
  "license",
  "keywords",
  "suggestedPrompts",
  "skills",
  "disabled",
  "extensions"
]);

async function walkFiles(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkFiles(full)));
    } else {
      results.push(full);
    }
  }
  return results;
}

test("Plugin files contain no UTF-8 BOM and all JSON files parse cleanly", async () => {
  const files = await walkFiles(PLUGIN_ROOT);
  assert.ok(files.length >= 14, "Expected complete plugin file tree");

  for (const file of files) {
    const buf = await fs.readFile(file);
    const hasBom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
    assert.equal(hasBom, false, `UTF-8 BOM detected in ${path.relative(PLUGIN_ROOT, file)}`);

    if (file.endsWith(".json")) {
      assert.doesNotThrow(
        () => JSON.parse(buf.toString("utf8")),
        `Invalid JSON in ${path.relative(PLUGIN_ROOT, file)}`
      );
    }
  }
});

test("plugin.json, mcp_config.json, and hooks.json conform to Antigravity specifications", async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(PLUGIN_ROOT, "plugin.json"), "utf8"));
  for (const key of Object.keys(manifest)) {
    assert.ok(
      ALLOWED_PLUGIN_MANIFEST_KEYS.has(key),
      `Unexpected top-level key '${key}' in plugin.json`
    );
  }
  assert.equal(manifest.name, "pega-infinity-authoring");
  assert.equal(manifest.license, "Pega Infinity AI Plugins License Version 1.0");
  assert.ok(Array.isArray(manifest.suggestedPrompts));
  assert.equal(manifest.suggestedPrompts.length, 3);

  const logoPath = path.join(PLUGIN_ROOT, manifest.logo);
  const logoStat = await fs.stat(logoPath);
  assert.ok(logoStat.isFile() && logoStat.size > 0, "Expected non-empty logo asset");

  const mcpConfig = JSON.parse(await fs.readFile(path.join(PLUGIN_ROOT, "mcp_config.json"), "utf8"));
  const server = mcpConfig.mcpServers?.["pega-infinity-authoring"];
  assert.ok(server, "Expected pega-infinity-authoring entry in mcp_config.json");
  assert.equal(server.command, "npx");
  assert.ok(server.args.includes("--package=@pega/infinity-authoring-plugin@0.2.1"));
  assert.ok(server.args.includes("run-server"));
  assert.equal(
    JSON.stringify(mcpConfig).includes("${user_config"),
    false,
    "mcp_config.json must not contain unexpanded Claude user_config placeholders"
  );

  const hooksConfig = JSON.parse(await fs.readFile(path.join(PLUGIN_ROOT, "hooks.json"), "utf8"));
  const guardHook = hooksConfig["pega-governance-guard"];
  assert.ok(guardHook, "Expected pega-governance-guard in hooks.json");
  assert.equal(guardHook.PreToolUse[0].hooks[0].command, "node ./scripts/pega-guard.mjs");
});

test("Rules, Skills, and Subagents satisfy context-budget and frontmatter rules", async () => {
  const rulesText = await fs.readFile(path.join(PLUGIN_ROOT, "rules", "AGENTS.md"), "utf8");
  assert.equal(
    rulesText.trimStart().startsWith("---"),
    false,
    "Standalone rules/AGENTS.md must not include YAML frontmatter"
  );
  assert.ok(
    Buffer.byteLength(rulesText, "utf8") < 24_000,
    "rules/AGENTS.md must stay under Antigravity's 24 KB per-file cap"
  );

  for (const skillName of ["pega-setup", "pega-assistant"]) {
    const skillDir = path.join(PLUGIN_ROOT, "skills", skillName);
    const skillMd = await fs.readFile(path.join(skillDir, "SKILL.md"), "utf8");
    assert.match(skillMd, new RegExp(`^---\\nname:\\s*${skillName}\\ndescription:`));

    const linkMatches = [...skillMd.matchAll(/\]\((\.\/[^)]+)\)/g)];
    assert.ok(linkMatches.length >= 1, `Expected progressive-disclosure links in ${skillName}/SKILL.md`);
    for (const [, relTarget] of linkMatches) {
      const targetPath = path.resolve(skillDir, relTarget);
      const stat = await fs.stat(targetPath);
      assert.ok(stat.isFile(), `Broken relative link '${relTarget}' in ${skillName}/SKILL.md`);
    }
  }

  for (const agentName of ["pega-explorer", "pega-author"]) {
    const agentMd = await fs.readFile(path.join(PLUGIN_ROOT, "agents", `${agentName}.md`), "utf8");
    assert.match(agentMd, new RegExp(`^---\\nname:\\s*${agentName}\\ndescription:`));
    assert.match(agentMd, /\nmodel:\s*inherit\n/);
  }

  // Verify every relative file link across all Markdown files in the plugin resolves cleanly
  const allMdFiles = (await walkFiles(PLUGIN_ROOT)).filter((f) => f.endsWith(".md"));
  for (const mdFile of allMdFiles) {
    const content = await fs.readFile(mdFile, "utf8");
    for (const [, rawLink] of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:|#)/i.test(rawLink)) continue;
      const cleanRel = rawLink.split("#")[0];
      if (!cleanRel) continue;
      const resolved = path.resolve(path.dirname(mdFile), cleanRel);
      const stat = await fs.stat(resolved);
      assert.ok(stat.isFile(), `Broken relative link '${rawLink}' in ${path.relative(PLUGIN_ROOT, mdFile)}`);
    }
  }
});

test("pega-guard.mjs blocks credential leaks, dot-segment/subshell bypasses, and destructive MCP actions", () => {
  // 1. Block reading config.json, dot-segment bypasses, oauth-session.json, and .pega-env
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "read_file", args: { Path: "/home/dev/.infinity-rules-mcp/config.json" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "read_file", args: { Path: "~/.infinity-rules-mcp/./config.json" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "read_file", args: { Path: "~/.infinity-rules-mcp/sub/../state.json" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "read_file",
        args: { Path: "C:\\Users\\dev\\.infinity-rules-mcp\\config.json" }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "read_file", args: { Path: "/workspace/oauth-session.json" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "view_file", args: { TargetFile: "/Users/dev/.pega-env" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "grep_search", args: { SearchPath: "C:\\Users\\dev\\.infinity-rules-mcp" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "read_file",
        args: { Path: "file:///C:/Users/dev/.infinity-rules-mcp/config.json" }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "read_file",
        args: { Path: "file:///Users/dev/%2einfinity-rules-mcp/config.json" }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "read_file",
        args: { Path: "~/.infinity-rules-mcp/dependencies/../config.json" }
      }
    }).decision,
    "deny"
  );
  // Allow reading cached public Pega runtime skills under .infinity-rules-mcp/dependencies/
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "read_file",
        args: { Path: "~/.infinity-rules-mcp/dependencies/sha256abc/skills/26-1/AGENTS.md" }
      }
    }).decision,
    "allow"
  );

  // 2. Gate direct file writes to config.json and verified runtime cache
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "write_file",
        args: { Path: "/Users/dev/.infinity-rules-mcp/config.json", Content: "{}" }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "edit_file",
        args: {
          Path: "/Users/dev/.infinity-rules-mcp/dependencies/sha256abc/skills/26-1/AGENTS.md"
        }
      }
    }).decision,
    "force_ask"
  );

  // 3. Block shell exfiltration (including subshell smuggling & dot-segment traversal) without false positives
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: { CommandLine: "Get-Content $env:USERPROFILE\\.infinity-rules-mcp\\config.json" }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: { CommandLine: "cat ~/.infinity-rules-mcp/dependencies/../config.json" }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: {
          CommandLine:
            'node "skills/pega-setup/scripts/pega-doctor.mjs" check --home-dir "$(cat ~/.infinity-rules-mcp/config.json)"'
        }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "run_command", args: { CommandLine: "cat ~/.pega-env" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "run_command", args: { CommandLine: "echo $env:PEGA_BASE_URL" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "run_command", args: { CommandLine: "printenv" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: { name: "run_command", args: { CommandLine: "gci Env:" } }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: { CommandLine: 'git commit -m "docs: set PEGA_INFINITY_VERSION example"' }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: { CommandLine: 'node "skills/pega-setup/scripts/pega-doctor.mjs" check --json' }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "run_command",
        args: {
          CommandLine:
            'node "skills/pega-setup/scripts/pega-doctor.mjs" configure --url https://acme.pega.net --version 26-1'
        }
      }
    }).decision,
    "force_ask"
  );

  // 4. Pega MCP governance gates (both eager MCP tools and lazy Antigravity `call_mcp_tool`)
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "mcp_pega-infinity-authoring_list-skills",
        args: {}
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "create-rule",
          Arguments: {
            ruleType: "Rule-Obj-Property",
            branchID: "Feat_Tier1",
            changeDescription: "Add CustomerTier property",
            content: '{"pxObjClass":"Rule-Obj-Property"}'
          }
        }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "create-rule",
          Arguments: {
            ruleType: "Rule-Obj-Property",
            changeDescription: "Missing branchID"
          }
        }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "update-rule",
          Arguments: {
            key: "RULE-OBJ-PROPERTY WORK- TIER",
            branchID: "pxReserved",
            changeDescription: "Invalid reserved prefix"
          }
        }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "copy-rule",
          Arguments: JSON.stringify({
            sourceKey: "RULE-OBJ-PROPERTY WORK- TIER",
            branchID: "ab"
          })
        }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "run-data-page",
          Arguments: { dataPage: "D_pxAddExistingBranchToTopApplication" }
        }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "run-data-page",
          Arguments: { dataPage: "D_pxBranchForAI" }
        }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "run-data-page",
          Arguments: { dataPage: "D_pxMergeBranch" }
        }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "perform-action",
          Arguments: { actionID: "ApproveChangeRequest" }
        }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "perform-action",
          Arguments: { actionID: "Approve" }
        }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "perform-action",
          Arguments: { actionID: "SubmitDetails" }
        }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "github",
          ToolName: "create-issue",
          Arguments: { title: "Unrelated MCP server" }
        }
      }
    }).decision,
    "allow"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "mcp_pega-infinity-authoring_update-rule",
        args: { bypassChangeRequest: true }
      }
    }).decision,
    "deny"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "mcp_pega-infinity-authoring_approve-change-request",
        args: { changeRequestId: "CR-101" }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "mcp_pega-infinity-authoring_delete-rule",
        args: { ruleId: "PZ-1" }
      }
    }).decision,
    "force_ask"
  );
  assert.equal(
    evaluatePreToolUse({
      toolCall: {
        name: "mcp_pega-infinity-authoring_transition-change-request",
        args: { changeRequestId: "CR-101", action: "merge" }
      }
    }).decision,
    "force_ask"
  );
});

test("pega-guard.mjs CLI and hooks.json shell runner contract work from plugin root", async () => {
  const hooksConfig = JSON.parse(await fs.readFile(path.join(PLUGIN_ROOT, "hooks.json"), "utf8"));
  const hookCommand = hooksConfig["pega-governance-guard"].PreToolUse[0].hooks[0].command;

  const shellBin = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "sh";
  const shellArgs =
    process.platform === "win32" ? ["/d", "/s", "/c", hookCommand] : ["-c", hookCommand];

  const shellHookProc = spawnSync(shellBin, shellArgs, {
    cwd: PLUGIN_ROOT,
    input: JSON.stringify({
      toolCall: {
        name: "call_mcp_tool",
        args: {
          ServerName: "pega-infinity-authoring_pega-infinity-authoring",
          ToolName: "create-rule",
          Arguments: { ruleType: "Rule-Obj-Property" }
        }
      }
    }),
    encoding: "utf8"
  });
  assert.equal(shellHookProc.status, 0);
  assert.equal(JSON.parse(shellHookProc.stdout).decision, "deny");

  const guardScript = path.join(PLUGIN_ROOT, "scripts", "pega-guard.mjs");
  const malformedProc = spawnSync(process.execPath, [guardScript], {
    input: "{not-valid-json",
    encoding: "utf8"
  });
  assert.equal(malformedProc.status, 0);
  assert.equal(JSON.parse(malformedProc.stdout).decision, "ask");
});

test("pega-doctor.mjs validates URLs/versions, restricts ACLs, and never leaks secrets", async () => {
  assert.equal(checkNodeVersion("v24.21.0").ok, true);
  assert.equal(checkNodeVersion("v22.14.0").ok, true);
  assert.equal(checkNodeVersion("v20.11.0").ok, false);

  assert.equal(parseJavaMajorVersion('openjdk version "21.0.4" 2024-07-16 LTS'), 21);
  assert.equal(parseJavaMajorVersion('java version "1.8.0_391"'), 8);

  assert.equal(validatePegaBaseUrl("https://myorg-dev.pega.net").valid, true);
  assert.equal(
    validatePegaBaseUrl("https://myorg-dev.pega.net/").normalizedOrigin,
    "https://myorg-dev.pega.net"
  );
  assert.equal(validatePegaBaseUrl("https://myorg-dev.pega.net/prweb").valid, false);
  assert.equal(validatePegaBaseUrl("https://myorg-dev.pega.net/prweb/app/default").valid, false);
  assert.equal(validatePegaBaseUrl("<paste-your-pega-url-here>").status, "placeholder");
  assert.equal(validatePegaBaseUrl("https://your-pega-host.example.com").status, "placeholder");
  assert.equal(validatePegaBaseUrl("https://example.pega.net").status, "placeholder");

  const tempHome = await fs.mkdtemp(path.join(os.tmpdir(), "pega-agy-test-"));
  const secretHost = "https://top-secret-instance.internal-pega.corp";
  const secretClientId = "custom-secret-oauth-id-987654321";

  try {
    await writePegaConfig({
      homeDir: tempHome,
      baseUrl: `${secretHost}/`,
      infinityVersion: "26-1",
      oauthClientId: secretClientId
    });

    const report = await inspectPegaConfig(tempHome, {
      PEGA_SKILLS_PATH: "/conflicting/manual/skills"
    });
    assert.equal(report.configPresent, true);
    assert.equal(report.validJson, true);
    assert.equal(report.pega_base_url, "valid");
    assert.equal(report.pega_oauth_client_id, "set (custom)");
    assert.equal(report.pega_infinity_version, "valid (26-1)");
    assert.equal(report.envVariables.PEGA_SKILLS_PATH_CONFLICT, true);
    assert.match(report.permissions, /0600|user-scoped Windows ACL/);

    const serialized = JSON.stringify(report);
    assert.equal(
      serialized.includes(secretHost),
      false,
      "inspectPegaConfig must never expose pega_base_url in diagnostic output"
    );
    assert.equal(
      serialized.includes(secretClientId),
      false,
      "inspectPegaConfig must never expose pega_oauth_client_id in diagnostic output"
    );

    const doctorScript = path.join(PLUGIN_ROOT, "skills", "pega-setup", "scripts", "pega-doctor.mjs");
    const cliRun = spawnSync(
      process.execPath,
      [doctorScript, "check", "--home-dir", tempHome],
      { encoding: "utf8" }
    );
    assert.equal(cliRun.status, 0);
    assert.equal(cliRun.stdout.includes(secretHost), false);
    assert.equal(cliRun.stdout.includes(secretClientId), false);

    // Verify PEGA_BASE_URL env fallback works even when config.json exists without pega_base_url
    const partialHome = await fs.mkdtemp(path.join(os.tmpdir(), "pega-agy-partial-"));
    try {
      await fs.mkdir(path.join(partialHome, ".infinity-rules-mcp"), { recursive: true });
      await fs.writeFile(
        path.join(partialHome, ".infinity-rules-mcp", "config.json"),
        JSON.stringify({ pega_infinity_version: "26-1" }),
        "utf8"
      );
      const envFallbackDiag = await runDiagnosticCheck({
        homeDir: partialHome,
        env: { ...process.env, PEGA_BASE_URL: "https://acme-dev.pega.net", PEGA_SKILLS_PATH: "" }
      });
      assert.equal(envFallbackDiag.config.configPresent, true);
      assert.equal(envFallbackDiag.config.pega_base_url, "missing");
      if (envFallbackDiag.readyForLocalSkills) {
        assert.equal(envFallbackDiag.readyForRemotePega, true);
      }
      // Verify ~/ tilde expansion on INFINITY_AUTHORING_HOME and exact PEGA_SKILLS_PATH matching
      const customSkillsDir = path.join(
        partialHome,
        "custom-cache",
        "dependencies",
        "sha256key",
        "skills"
      );
      await fs.mkdir(path.join(customSkillsDir, "26-1"), { recursive: true });
      await fs.writeFile(
        path.join(
          partialHome,
          "custom-cache",
          "dependencies",
          "sha256key",
          "infinity-rules-mcp.jar"
        ),
        "stub",
        "utf8"
      );
      const tildeCheck = await inspectPegaConfig(partialHome, {
        INFINITY_AUTHORING_HOME: "~/custom-cache",
        PEGA_SKILLS_PATH: customSkillsDir
      });
      assert.equal(tildeCheck.cacheReady, true);
      assert.deepEqual(tildeCheck.cachedSkillVersions, ["26-1"]);
      assert.equal(tildeCheck.envVariables.PEGA_SKILLS_PATH_CONFLICT, false);
    } finally {
      await fs.rm(partialHome, { recursive: true, force: true });
    }
  } finally {
    await fs.rm(tempHome, { recursive: true, force: true });
  }
});

test("agy plugin validate --strict passes with zero errors and zero warnings (when agy CLI is installed)", (t) => {
  const agyBin = process.platform === "win32" ? "agy.exe" : "agy";
  const probe = spawnSync(agyBin, ["plugin", "validate", PLUGIN_ROOT, "--strict", "--json"], {
    encoding: "utf8",
    shell: false
  });

  if (probe.error && probe.error.code === "ENOENT") {
    t.skip("agy CLI not installed in this CI runner");
    return;
  }

  assert.equal(
    probe.status,
    0,
    `agy plugin validate --strict failed:\nstdout: ${probe.stdout}\nstderr: ${probe.stderr}`
  );
  const validation = JSON.parse(probe.stdout);
  assert.deepEqual(validation.findings, []);
  assert.deepEqual(validation.components, {
    agents: 2,
    hooks: 1,
    mcpServers: 1,
    rules: 1,
    sidecars: 0,
    skills: 2
  });
});
