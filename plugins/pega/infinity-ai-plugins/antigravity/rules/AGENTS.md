# Pega Infinity Authoring — Workspace & Plugin Governance Rules

These operating rules apply whenever the **Pega Infinity Authoring** plugin (`pega-infinity-authoring`) is active. Follow them strictly across all Pega Infinity 24.2, 25.1, and 26.1 interactions.

## 1. Runtime-First Discovery Protocol

1. **Never rely on pretraining memory for Pega schemas**: Pega Infinity rule structures, Constellation DX view JSON payloads, and MCP tool contracts vary across `24-2`, `25-1`, and `26-1`.
2. **Load runtime skills first**: Before answering detailed Pega architecture questions or planning any rule mutation, call `search-skills` or `list-skills` on the `pega-infinity-authoring` MCP server and load the applicable versioned manual with `get-skill` (including `methodology-rule-authoring`, the target `rules-<objclass>` skill, and at least one top-level `examples/*` template before creating rules).
3. **Anchor application context early**: Call `list-available-applications` or `get-application` at the start of a task to verify the authenticated operator's active application, built-on stack, and unlocked target layers.

## 2. Governed Branch & ChangeRequest Authoring Lifecycle

1. **No direct base-ruleset writes**: Never attempt to create, modify, or delete rules directly in locked or base production rulesets.
2. **Branch- and ChangeRequest-scoped mutations only**: Every rule write operation (`create-rule`, `update-rule`, `copy-rule`) must target an explicit, valid `branchID` (3–16 alphanumeric/`_`/`-` characters, never `px`/`py`/`pz`-prefixed) within an active branch or `ChangeRequest` workflow. Always request explicit user confirmation before attaching an existing branch via `D_pxAddExistingBranchToTopApplication`.
3. **Verify, surface warnings, and test before review**: Confirm each rule write with `get-rule` (`detail="full"`), explicitly report every `warnings` and `validationWarnings` entry returned by write tools, and run applicable PegaUnit (`run-pegaunits`) or Data Page checks before proposing stage advancement or branch review.
4. **Mandatory human approval gate**: Always stop and present a concise summary of created/modified rules, branch/`ChangeRequest` context, class layers, warnings, and test outcomes before any review-stage completion, branch merge, ruleset lock, or rule deletion. Never auto-approve or auto-merge.

## 3. Zero-Trust Credential & Configuration Hygiene

1. **Never read or echo configuration files**: Do not read, `cat`, `Get-Content`, or `grep` `~/.infinity-rules-mcp/config.json`, `oauth-session.json`, or `~/.pega-env` into the conversation transcript. Use `pega-doctor.mjs check` for redacted presence-only diagnostics.
2. **Strict root URL format**: `pega_base_url` / `PEGA_BASE_URL` must be the Pega environment root origin only (e.g., `https://myorg.pega.net`) — never append `/prweb` or any path, query, or credentials.
3. **Configuration precedence & skill paths**: Non-empty values in `~/.infinity-rules-mcp/config.json` override `PEGA_*` environment variables. Never set `PEGA_SKILLS_PATH` in the shell environment when using the managed `@pega/infinity-authoring-plugin` launcher, as doing so conflicts with the SHA-256-verified dependency cache.

## 4. Primary-Context Execution & Opt-In Subagents

1. **Default to primary agent context**: Execute Pega discovery (`list-skills`, `get-skill`, `get-application`), planning, and `ChangeRequest` authoring directly within the primary conversation context to conserve tokens.
2. **Opt-in subagents only**: Do **not** invoke `pega-explorer`, `pega-author`, or any subagent automatically. Only spin up a subagent when the user explicitly instructs you to delegate to one.
