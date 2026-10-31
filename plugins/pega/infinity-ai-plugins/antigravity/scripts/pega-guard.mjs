#!/usr/bin/env node
/**
 * Pega Security & Governance PreToolUse Lifecycle Hook for Google Antigravity.
 *
 * Enforces two deterministic guardrails across Windows, macOS, and Linux:
 * 1. Credential & Config Isolation ("deny" / "force_ask"):
 *    Prevents reading or printing ~/.infinity-rules-mcp/config.json, cached OAuth sessions,
 *    .pega-env files, or PEGA_* environment values into the session transcript.
 * 2. Governed Branch & ChangeRequest Gate ("deny" / "force_ask"):
 *    Unwraps both eager MCP calls and lazy `call_mcp_tool` invocations to block direct
 *    base-ruleset writes (missing or invalid `branchID`) and force explicit human confirmation
 *    before adding shared branches (`D_pxAddExistingBranchToTopApplication`) or executing
 *    approval, merge, finalize, publish, or delete transitions.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const FILE_READ_TOOLS = new Set([
  "read_file",
  "view_file",
  "view_file_outline",
  "view_code_item",
  "view_content_chunk",
  "read_url_content",
  "grep_search",
  "find_by_name"
]);

const FILE_WRITE_TOOLS = new Set([
  "write_file",
  "edit_file",
  "replace_file_content",
  "multi_replace_file_content"
]);

const LAZY_MCP_WRAPPER_TOOLS = new Set(["call_mcp_tool", "mcp_call_tool"]);

// Allow reading cached public Pega runtime skills under .infinity-rules-mcp/dependencies/,
// while blocking config.json, locks, OAuth tokens, oauth-session.json, and .pega-env files.
const SENSITIVE_FILE_PATTERNS = [
  /(^|\/)\.infinity-rules-mcp\/(?!dependencies\/).+/i,
  /(^|\/)\.pega-env(\.[^/]+)?$/i,
  /(^|\/)oauth-session\.json$/i
];

const SENSITIVE_DIR_PATTERN = /(^|\/)\.infinity-rules-mcp(\/(?!dependencies(\/|$)).*)?$/i;
const ANY_INFINITY_MCP_DIR_PATTERN = /(^|\/)\.infinity-rules-mcp(\/|$)/i;

const SHELL_SENSITIVE_TARGET_REGEX =
  /(\.infinity-rules-mcp|(^|[\s"'\\/])oauth-session\.json([\s"']|$)|(^|[\s"'\\/])\.pega-env(\.[\w-]+)?([\s"']|$))/i;

const SAFE_DOCTOR_OR_LAUNCHER_REGEX =
  /^\s*(node\s+["']?[^;&|`$\n]*pega-doctor\.mjs["']?\s+(check|configure|prefetch|harden-permissions)(\s+--[\w-]+(=("[^"$`]*"|'[^']*'|[^\s;&|`$]+)|\s+("[^"$`]*"|'[^']*'|[^\s;&|`$]+))?)*|npx(\.cmd)?\s+(-y\s+)?--package=@pega\/infinity-authoring-plugin@[\w.-]+\s+infinity-authoring-plugin\s+(prefetch|configure|version|help)(\s+--[\w-]+(=("[^"$`]*"|'[^']*'|[^\s;&|`$]+)|\s+("[^"$`]*"|'[^']*'|[^\s;&|`$]+))?)*)\s*$/i;

// Avoid false positives on English words like "set" in git commit messages while catching:
// - $env:PEGA_*, %PEGA_*%, $PEGA_*, ${PEGA_*}
// - printenv PEGA_*, Get-ChildItem/Get-Item/gci/dir Env:*PEGA* (or bare printenv / gci Env:)
// - env | grep PEGA_*, cmd set PEGA_*
const SHELL_PEGA_ENV_EXFIL_REGEX =
  /(?:\$env:PEGA_[A-Z0-9_]+|%PEGA_[A-Z0-9_]+%|\$\{?PEGA_[A-Z0-9_]+\}?|\bprintenv(?:\s+PEGA_[A-Z0-9_]*)?(?:\s*[;&|\n]|$)|\b(?:Get-ChildItem|gci|dir|Get-Item|gi)\s+Env:[\\/]?(?:\*|PEGA_[A-Z0-9_*]*)?(?:\s|$|[;&|])|\b(?:env|set)\s*\|\s*(?:grep|Select-String|sls|findstr)\b[^;&|\n]*PEGA_)/i;

const PEGA_MCP_NAMESPACE_REGEX =
  /(pega[-_]?infinity[-_]?authoring|infinity[-_]?rules[-_]?mcp)/i;

const PEGA_RULE_WRITE_TOOLS = new Set(["create-rule", "update-rule", "copy-rule"]);

const VALID_BRANCH_ID_REGEX = /^[A-Za-z0-9][A-Za-z0-9_-]{2,15}$/;
const RESERVED_PEGA_PREFIX_REGEX = /^p[xyz]/i;

const PEGA_GOVERNANCE_TOOL_VERBS_REGEX =
  /(^|[_:-])(approve|merge|finalize|promote|publish|complete[-_]?review|submit[-_]?approval|lock[-_]?ruleset|unlock[-_]?ruleset|delete|remove|purge|drop)([_:-]|$)/i;

const PEGA_DOMAIN_TOOL_REGEX =
  /(change[-_]?request|ruleset|case[-_]?type|data[-_]?page|pega)/i;

const HIGH_RISK_ACTION_VALUES_REGEX =
  /^(?:py|px|pz)?(?:approve[a-z0-9_-]*|merge[a-z0-9_-]*|finalize[a-z0-9_-]*|publish[a-z0-9_-]*|promote[a-z0-9_-]*|complete[-_]?review[a-z0-9_-]*|submit[-_]?approval[a-z0-9_-]*|close[-_]?resolved[a-z0-9_-]*|delete[a-z0-9_-]*)$/i;

export function normalizePathForMatch(rawValue) {
  if (typeof rawValue !== "string" || !rawValue.trim()) return "";
  let cleaned = rawValue.trim().replace(/^["']+|["']+$/g, "");
  if (/^file:\/\//i.test(cleaned)) {
    cleaned = cleaned.replace(/^file:\/\/\/?/i, "");
    try {
      cleaned = decodeURIComponent(cleaned);
    } catch {
      // Preserve raw string if percent-encoding is malformed
    }
    if (!/^[a-zA-Z]:/.test(cleaned)) {
      cleaned = `/${cleaned}`;
    }
  }
  const slashed = cleaned.replace(/\\/g, "/");
  if (!slashed) return "";
  if (slashed.startsWith("~/")) {
    const rest = path.posix.normalize(`/${slashed.slice(2)}`).replace(/^\/+/, "");
    return rest ? `~/${rest}` : "~";
  }
  const driveMatch = /^([a-zA-Z]:)(\/.*)$/.exec(slashed);
  if (driveMatch) {
    return `${driveMatch[1]}${path.posix.normalize(driveMatch[2])}`;
  }
  return path.posix.normalize(slashed);
}

export function isSensitiveConfigPath(rawValue) {
  const normalized = normalizePathForMatch(rawValue);
  if (!normalized) return false;
  return SENSITIVE_FILE_PATTERNS.some((pattern) => pattern.test(normalized));
}

function extractPathArgs(args = {}) {
  const keys = [
    "Path",
    "path",
    "TargetFile",
    "targetFile",
    "SearchPath",
    "searchPath",
    "DirectoryPath",
    "directoryPath",
    "SearchDirectory",
    "AbsolutePath",
    "Url",
    "url"
  ];
  const values = [];
  for (const key of keys) {
    if (typeof args[key] === "string") {
      values.push(args[key]);
    }
  }
  return values;
}

function parseObjectIfJsonString(val) {
  if (val && typeof val === "object" && !Array.isArray(val)) return val;
  if (typeof val === "string" && val.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(val);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
    } catch {
      // Ignore non-JSON string
    }
  }
  return {};
}

/**
 * Normalizes both eager MCP tool calls (e.g. `mcp_pega-infinity-authoring_create-rule` or
 * `mcp:pega-infinity-authoring:create-rule`) and lazy Antigravity `call_mcp_tool` calls.
 */
export function resolveEffectiveMcpCall(toolName, args = {}) {
  const lower = toolName.toLowerCase();
  if (LAZY_MCP_WRAPPER_TOOLS.has(lower)) {
    const serverName = String(args.ServerName ?? args.serverName ?? "").trim();
    const innerTool = String(args.ToolName ?? args.toolName ?? "").trim();
    const innerArgs = parseObjectIfJsonString(args.Arguments ?? args.arguments);
    const isPega =
      PEGA_MCP_NAMESPACE_REGEX.test(serverName) ||
      (PEGA_DOMAIN_TOOL_REGEX.test(innerTool) && PEGA_GOVERNANCE_TOOL_VERBS_REGEX.test(innerTool));
    return {
      isPega,
      serverName,
      mcpToolName: innerTool.toLowerCase(),
      fullIdentifier: `${serverName}:${innerTool}`,
      mcpArgs: innerArgs
    };
  }

  const isPega =
    PEGA_MCP_NAMESPACE_REGEX.test(toolName) ||
    (PEGA_DOMAIN_TOOL_REGEX.test(toolName) && PEGA_GOVERNANCE_TOOL_VERBS_REGEX.test(toolName));

  // Extract trailing tool name after server prefix (`mcp_<server>_<tool>` or `mcp:<server>:<tool>`)
  let mcpToolName = lower;
  const colonIdx = lower.lastIndexOf(":");
  if (colonIdx !== -1) {
    mcpToolName = lower.slice(colonIdx + 1);
  } else {
    const pegaMatch = /(?:pega[-_]?infinity[-_]?authoring|infinity[-_]?rules[-_]?mcp)[_:-]+(.+)$/i.exec(
      toolName
    );
    if (pegaMatch) {
      mcpToolName = pegaMatch[1].toLowerCase();
    }
  }

  return {
    isPega,
    serverName: "",
    mcpToolName,
    fullIdentifier: toolName,
    mcpArgs: args
  };
}

function hasDirectBaseRulesetBypass(args = {}) {
  if (!args || typeof args !== "object") return false;
  if (args.bypassChangeRequest === true || args.directBaseRuleset === true) return true;
  if (args.skipChangeRequest === true) return true;
  return false;
}

function validateBranchIdForRuleWrite(mcpToolName, mcpArgs = {}) {
  const canonicalTool = mcpToolName.replace(/_/g, "-");
  if (!PEGA_RULE_WRITE_TOOLS.has(canonicalTool)) return null;
  const rawBranch = typeof mcpArgs.branchID === "string" ? mcpArgs.branchID.trim() : "";
  if (!rawBranch) {
    return "Blocked by Pega Governance Guard: Rule write tools (create-rule, update-rule, copy-rule) require a non-empty 'branchID' so changes remain isolated from base rulesets.";
  }
  if (!VALID_BRANCH_ID_REGEX.test(rawBranch) || RESERVED_PEGA_PREFIX_REGEX.test(rawBranch)) {
    return `Blocked by Pega Governance Guard: Invalid branchID '${rawBranch}'. Branch IDs must be 3-16 characters ([A-Za-z0-9][A-Za-z0-9_-]{2,15}), start with an alphanumeric character, and must not use reserved Pega prefixes (px, py, pz).`;
  }
  return null;
}

function requiresConfirmationDataPage(mcpToolName, mcpArgs = {}) {
  const canonicalTool = mcpToolName.replace(/_/g, "-");
  if (canonicalTool !== "run-data-page") return null;
  const dpName = String(
    mcpArgs.dataPage ?? mcpArgs.dataPageName ?? mcpArgs.dataViewID ?? mcpArgs.name ?? ""
  ).trim();
  if (/^D_pxAddExistingBranchToTopApplication$/i.test(dpName)) {
    return "Pega Governance Gate: Adding an existing branch to the top application (D_pxAddExistingBranchToTopApplication) requires explicit user confirmation.";
  }
  if (/^D_p[xyz](?:Merge|Delete|Lock|Unlock|Publish)[A-Za-z0-9_]*Branch/i.test(dpName)) {
    return `Pega Governance Gate: Executing branch governance Data Page (${dpName}) requires explicit user confirmation.`;
  }
  return null;
}

function hasApprovalOrMergeArgs(args = {}) {
  if (!args || typeof args !== "object") return false;
  const candidateKeys = [
    "actionID",
    "processID",
    "action",
    "stage",
    "targetStage",
    "transition",
    "operation",
    "status",
    "reviewDecision"
  ];
  for (const key of candidateKeys) {
    const val = args[key];
    if (typeof val === "string" && HIGH_RISK_ACTION_VALUES_REGEX.test(val.trim())) {
      return true;
    }
  }
  if (args.autoApprove === true || args.mergeBranch === true) {
    return true;
  }
  return false;
}

/**
 * Evaluates an Antigravity PreToolUse hook payload and returns the hook response JSON object.
 * @param {object} payload
 * @returns {{ decision: "allow" | "deny" | "ask" | "force_ask", reason?: string }}
 */
export function evaluatePreToolUse(payload) {
  const toolCall = payload?.toolCall;
  if (!toolCall || typeof toolCall.name !== "string") {
    return { decision: "allow" };
  }

  const toolName = toolCall.name.trim();
  const lowerToolName = toolName.toLowerCase();
  const args = toolCall.args && typeof toolCall.args === "object" ? toolCall.args : {};

  // 1. Block reading/searching Pega config & credential files
  if (FILE_READ_TOOLS.has(lowerToolName)) {
    const candidatePaths = extractPathArgs(args);
    for (const candidate of candidatePaths) {
      if (isSensitiveConfigPath(candidate)) {
        return {
          decision: "deny",
          reason:
            "Blocked by Pega Security Guard: Reading ~/.infinity-rules-mcp/config.json, oauth-session.json, or .pega-env into the conversation transcript is prohibited. Run 'pega-doctor.mjs check' for a redacted presence-only check."
        };
      }
      if (
        (lowerToolName === "grep_search" || lowerToolName === "find_by_name") &&
        SENSITIVE_DIR_PATTERN.test(normalizePathForMatch(candidate))
      ) {
        return {
          decision: "deny",
          reason:
            "Blocked by Pega Security Guard: Searching inside ~/.infinity-rules-mcp/ risks exposing OAuth tokens or configuration values in the transcript. Use 'pega-doctor.mjs check' instead."
        };
      }
    }
  }

  // 2. Gate direct file writes to ~/.infinity-rules-mcp/ (including cached dependencies), oauth-session.json, or .pega-env
  if (FILE_WRITE_TOOLS.has(lowerToolName)) {
    const candidatePaths = extractPathArgs(args);
    for (const candidate of candidatePaths) {
      if (
        isSensitiveConfigPath(candidate) ||
        ANY_INFINITY_MCP_DIR_PATTERN.test(normalizePathForMatch(candidate))
      ) {
        return {
          decision: "force_ask",
          reason:
            "Pega Security Guard: Modifying Pega configuration or verified runtime cache (.infinity-rules-mcp/, oauth-session.json, or .pega-env) requires explicit user confirmation."
        };
      }
    }
  }

  // 3. Inspect shell commands for config/env secret exfiltration (deny checks run BEFORE allowlist)
  if (lowerToolName === "run_command" || lowerToolName === "bash" || lowerToolName === "shell") {
    const commandLine = String(args.CommandLine ?? args.command ?? args.Command ?? "").trim();
    if (commandLine) {
      if (SHELL_SENSITIVE_TARGET_REGEX.test(commandLine)) {
        return {
          decision: "deny",
          reason:
            "Blocked by Pega Security Guard: Shell commands may not read or manipulate ~/.infinity-rules-mcp/config.json, oauth-session.json, or .pega-env directly. Run 'pega-doctor.mjs check' for safe presence-only verification."
        };
      }

      if (SHELL_PEGA_ENV_EXFIL_REGEX.test(commandLine)) {
        return {
          decision: "deny",
          reason:
            "Blocked by Pega Security Guard: Printing environment dumps or PEGA_* environment variable values into the transcript is prohibited. Use 'pega-doctor.mjs check' for presence-only diagnostics."
        };
      }

      if (SAFE_DOCTOR_OR_LAUNCHER_REGEX.test(commandLine)) {
        if (/\s(configure)\b/i.test(commandLine)) {
          return {
            decision: "force_ask",
            reason:
              "Pega Security Guard: Updating ~/.infinity-rules-mcp/config.json requires explicit user confirmation."
          };
        }
        return { decision: "allow" };
      }
    }
  }

  // 4. Governed Branch & ChangeRequest Gate for Pega MCP Tools (eager & lazy `call_mcp_tool`)
  const mcp = resolveEffectiveMcpCall(toolName, args);
  if (mcp.isPega) {
    if (hasDirectBaseRulesetBypass(mcp.mcpArgs)) {
      return {
        decision: "deny",
        reason:
          "Blocked by Pega Governance Guard: Direct writes bypassing branch / ChangeRequest isolation are prohibited."
      };
    }

    const branchError = validateBranchIdForRuleWrite(mcp.mcpToolName, mcp.mcpArgs);
    if (branchError) {
      return {
        decision: "deny",
        reason: branchError
      };
    }

    const dpGateReason = requiresConfirmationDataPage(mcp.mcpToolName, mcp.mcpArgs);
    if (dpGateReason) {
      return {
        decision: "force_ask",
        reason: dpGateReason
      };
    }

    if (
      PEGA_GOVERNANCE_TOOL_VERBS_REGEX.test(mcp.fullIdentifier) ||
      hasApprovalOrMergeArgs(mcp.mcpArgs)
    ) {
      return {
        decision: "force_ask",
        reason:
          "Pega Governance Gate: Approving, merging, publishing, locking, or deleting Pega branches, ChangeRequests, or rules requires explicit human review and confirmation."
      };
    }
  }

  return { decision: "allow" };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  try {
    const raw = await readStdin();
    const payload = raw.trim() ? JSON.parse(raw) : {};
    const result = evaluatePreToolUse(payload);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch {
    process.stdout.write(
      `${JSON.stringify({
        decision: "ask",
        reason: "Pega Security Guard could not parse tool payload; manual confirmation required."
      })}\n`
    );
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main();
}
