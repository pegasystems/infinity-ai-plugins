---
name: pega-assistant
description: >-
  Use this skill whenever the user asks to inspect, design, create, modify, debug, or test Pega
  Infinity applications, case types, Constellation UI views, properties, data pages, decision logic,
  rulesets, or ChangeRequest workflows through the Pega Infinity Authoring MCP server.
---

# Pega Infinity Authoring Assistant

Follow this disciplined 5-phase Lead System Architect (LSA) workflow whenever interacting with a Pega Infinity (`24-2`, `25-1`, or `26-1`) application.

---

## Phase 1: Runtime Orientation & Context

1. **Discover Pega runtime skills first**:
   - Call `search-skills` (for natural-language capability discovery) or `list-skills` on the `pega-infinity-authoring` MCP server.
   - Load the specific versioned skill manual(s) matching the user's request via `get-skill` **before** proposing rule designs or calling authoring tools (always load `methodology-rule-authoring`, the target `rules-<objclass>` skill, and a top-level `rules-<objclass>/examples/*` template prior to rule writes).
   - If `list-skills` or application calls fail due to missing setup, switch immediately to the `pega-setup` skill.
2. **Confirm active application context**:
   - Call `list-available-applications` or `get-application` to identify the active application, built-on application stack, Enterprise Class Structure (ECS), and open target rulesets.
3. **Stay in primary context by default**:
   - Perform discovery and authoring directly in the primary agent context. Only delegate to `pega-explorer` or `pega-author` if the user explicitly asks to use subagents.

---

## Phase 2: Architectural Planning (LSA Best Practices)

Before mutating any rule, design the change around Pega's Situational Layer Cake and Constellation architecture (see [infinity-architecture-guide.md](./references/infinity-architecture-guide.md) when designing new case types, data models, or UI views):

- **Reuse before creating**: Search existing properties, data transforms, views, and `D_` Data Pages (`list-rules` / `search`) in the Framework/Enterprise layers before creating duplicates in an implementation class.
- **Constellation DX compliance**: Author model-driven View rules, field groups, and case stage/step assignments rather than legacy section/harness patterns unless explicitly working in a Traditional UI application.
- **Naming guardrails**: Never create custom rules or branches prefixed with `px`, `py`, or `pz`. Use clear camelCase or PascalCase domain identifiers aligned with the target class layer.

---

## Phase 3: Governed Branch & `ChangeRequest` Initialization

All write operations **must** execute inside an isolated Pega branch and/or `ChangeRequest` workflow (see [changerequest-workflow.md](./references/changerequest-workflow.md) for lifecycle details):

1. Confirm which branch or active `ChangeRequest` to use. Create a new branch via `D_pxCreateBranchAndAddToTopApplication` when requested, or ask for explicit user confirmation before attaching an existing branch via `D_pxAddExistingBranchToTopApplication`.
2. Read durable branch context with `D_pxBranchContext` and maintain milestone summaries via `D_pxUpdateBranchContext` when available.
3. Confirm all planned rule writes (`create-rule`, `update-rule`, `copy-rule`) pass a valid `branchID` (3–16 alphanumeric/`_`/`-` characters) — **never** write directly to base or locked rulesets.

---

## Phase 4: Iterative Authoring & Verification

1. **Create or update rules in dependency order**:
   1. Classes & Data Types (`Work-`, `Data-`, `Int-`)
   2. Properties / Fields (`Rule-Obj-Property`)
   3. Data Pages, Connectors & Data Transforms (`D_*`, `Rule-Obj-Model`)
   4. Decision & Validation Rules (`When`, `Decision Table`, `Validate`)
   5. Constellation Views & Flow Actions (`Rule-UI-View`)
   6. Case Type Lifecycle Stages, Processes & Steps (`pyDefault` Case Type)
2. **Optional subagent delegation (only when explicitly requested)**:
   - Execute rule changes directly in the primary context unless the user explicitly asks to run `pega-author`.
3. **Verify writes, surface warnings, & run Pega tests**:
   - Read back each created or updated rule with `get-rule` (`detail="full"`), explicitly report every `warnings` and `validationWarnings` entry to the user, and execute branch-scoped PegaUnit tests (`run-pegaunits` with `branchID`) or Data Page checks via MCP tools. Fix any guardrail or reference errors before moving to review.

---

## Phase 5: Mandatory Human Review Gate

1. **Stop before finalizing**: Never auto-approve, merge, publish, or close a branch or `ChangeRequest` (the plugin's `PreToolUse` governance hook also enforces confirmation on review/merge/delete actions).
2. **Present a concise Review Brief**:
   - `branchID` / `ChangeRequest` ID & target application
   - Table of rules created or updated (Rule Name, Type, Class, Ruleset/Branch)
   - Returned `warnings` / `validationWarnings` and PegaUnit / Data Page verification results
   - Explicit prompt asking whether the user approves advancing review or merging in Pega.
