# Pega Infinity Skills

This repository contains Pega domain knowledge as structured markdown skills — authoring methodology, rule type skills, rule type examples, and libraries of rules that can be referenced.

## Core instructions

- You have MCP tools available that you can call directly. Tool descriptions in your system prompt explain what each tool does and its parameters.
- When the user asks any rule-related or application-building related questions, the agent must call the following three mcp calls **in parallel**: `get-application` (with no arguments) **and** `list-casetypes` **and** `list-available-authoring-workflows` if not done already. For skill discovery, use `search-skills` first with a natural language query; only fall back to `list-skills` if `search-skills` returns no results or is unavailable.
- Right before creating or updating any rules always complete both of the following two steps in serial:
  1. First, get the skill `methodology-change-request-workflow`. All Pega rule create and updates must go through a ChangeRequest case.
  2. Second, consider if the request matches the description returned in `list-available-authoring-workflows` mcp tool call considering the text in "Limitation:". Re-run the tool, if needed. If the user's request matches the workflow description, use the workflow as described in `methodology-change-request-workflow` in the section `### Pre-flight: Determine the Authoring Path`.
- **Toggle enable/disable** — when the user asks to enable or disable a named toggle, treat this as a rule authoring task immediately. Do NOT search rules, list cases, or explore first — the toggle name from the user's request is sufficient context. Follow the two serial steps above: (1) get skill `methodology-change-request-workflow`, (2) call `list-available-authoring-workflows` and follow the Pre-flight path.
- **Agile work item** — act on a user story or backlog item | "work on US-162", "pick the next user story", "process the backlog", "what is the next priority work item", "what's my next work item" | Load `methodology-agile-userstory-processor` skill first, then follow its workflow (fetch → read → author)
- **Case audit / history** — retrieve action history, audit trail, or timeline of a case | "show audit for W-123", "get history of I-4009", "what actions were taken on this case" | Load `methodology-retrieve-case-work-history` first, then call `D_pyWorkHistory` via `run-data-page`. Do NOT use `get-case-details` — it does not return action history. (load → run-data-page → present)
- **Rule explain** — explain, walkthrough, understand, "what does this rule do", or `/explain` for an existing rule instance of any rule type | Load `methodology-rule-explain` first, resolve one exact target `pzInsKey`, fetch rule details read-only, and return an evidence-based natural-language functionality explanation (default concise, detailed only when requested in the current query). Do not create or update rules in explain flow.
- **Rule review / inspection** — review, inspect, check, examine, analyze, assess, evaluate, audit, or `/review` for an existing rule instance of any rule type | Load `methodology-rule-review` first, resolve the target `pzInsKey`, then run `D_pxRuleReview` via `run-data-page` and present both `pxWarningsToDisplay` and `pyRuleReviewGuidelines` before any direct rule analysis or authoring decision. If Platform and Application-specific guideline sections conflict, pause and ask the user which source takes precedence before continuing. If the user approves follow-up changes, implement only the approved suggestions — do not reimplement the entire rule.
- **Generate tests** — `/generate-tests`, generate tests, add test coverage, or create test cases for a rule/case behavior | Load `methodology-generate-tests` first, confirm scope from a target rule/case, produce the coverage matrix, and only then create or update test rules through ChangeRequest-safe authoring pre-flight.

## Skills repo overview

- Directory structure: `skills/{domain}-{topic}/SKILL.md`
- Domain prefixes: `rules-`, `methodology-`, `library-`
- Manifest scope: markdown files directly retrievable through `get-skill`, plus package-local JSON schemas under `skills/*/schema/*.json`; other non-markdown sidecars stay out of `manifest.json`

## Using skills for Pega questions

When the user asks questions about Pega concepts, use `search-skills` with a natural language query — it uses graph-based ranking to find the most relevant skills. Only fall back to `list-skills` if `search-skills` returns no results or is unavailable. Do not answer Pega questions from training data alone.

## Delegation model

Delegate work to subagents to conserve parent context.

### Examples of when to delegate to subagents

 - To sift through large amounts of rules, data, or skills to return a sub-set of that information such as exploring a case type
 - To perform research

### Delegation prompt instructions

 - Do not include step-by-step tool instructions.
 - Follow the skill's pacing and scope exactly. If a skill says "one at a time" or "stop on first issue," your delegation prompt must respect that.
 - Delegate the smallest unit the skill prescribes, get the result, then delegate the next unit. Fast round-trips with focused subagents beat slow monolithic delegations every time.
 - Stop and present results to the user after every exploration subagent.
 - If a subagent reports **errors, warnings or issues** stop and present them to the user.
 - Never queue multiple exploration subagents back-to-back without a user checkpoint in between unless the user specifically asks to skip the checkpoint

### Delegation prompt structure

1. **MCP Tools advice** Always start the delegation prompt with: "You have MCP tools available that you can call directly. Tool descriptions in your system prompt explain what each tool does and its parameters."
2. **Skill loading** — which skill(s) to call via `get-skill` before starting work for known names, or `search-skills` if the subagent needs to discover relevant skills
3. **Goal** — what the user wants, in the user's own terms
4. **Context** — info the parent already knows (app name, class names, what already exists, prior findings)
5. **Return format** — what to send back, using the appropriate template:

**For exploration tasks:**
```
Return:
- List of rules found (name, type, instance key)
- What's built vs what's missing or incomplete
- Warnings or issues discovered
```

**For create/update tasks:**
```
Return:
- Instance key of each rule created or updated
- What specifically was set or changed
- Rule validation status (Good, warnings, errors)
```

**For research tasks:**
```
Return:
- The validated pattern (which rules to create, in what order, with what field values)
- Constraints or gotchas discovered
```

**Be concise** — return all required data but no filler. Use structured tables and bullet points over narrative paragraphs. No preamble, no conversational sign-offs, no unsolicited option menus.

### Present findings between delegations

After each exploration subagent returns, present results to the user and wait for input before delegating the next subagent. Do not queue multiple explorations without a user checkpoint.

### Delegation: Clarify ambiguous requests before research

If the user's request could be interpreted multiple ways **and no workflow match was found**, ask clarifying questions before delegating a research subagent. If a workflow match exists, do NOT ask clarifying questions — the workflow handles disambiguation.

### Working on an application

1. **Explain the application** — If the user asks about the current app state, stats, or what's in the app, load `methodology-explain-application`.
2. **Choose a case type** — After explaining, present the case types from `list-casetypes` and ask which one to focus on. Do not ask about features across all case types — that makes the scope of the conversation too broad.
3. **Explore the case type** — Once the user picks a case type, load `methodology-explore-case-type` and follow its incremental drill-down pattern.

## Automation terminology

The term "Automation" has multiple uses in Pega:

- **Case management context.** "Automation" refers to either an Activity or a Data
  Transform — both are used to automate case processing steps.
- **Integration context.** "Automation" specifically refers to an Activity rule with
  `pyActivityType=AUTOMATION`, which is a distinct rule subtype used for integration
  orchestration.

Activity rules with `pyActivityType=AUTOMATION` are **not supported** for creation or
modification through MCP tools. Only Activity rules with `pyActivityType=ACTIVITY` can
be authored.

## Rule Naming Prefixes and Availability

### Overriding rules

Regardless of the rule type, when a rule is copied into a different ruleset or a subclass, the `pyRuleAvailable` field controls whether a rule can be overridden:

| Value | Effect |
|-------|--------|
| `Yes` / `Available` | Rule CAN be overridden in a ruleset or subclass |
| `Final` | Rule CANNOT be overridden |

### Field Values naming conventions

Field Values in Pega platform do not usually use the `py`/`px`/`pz` prefixes because they are intended for customer localization overrides.

### Property naming conventions

| Prefix | Purpose |
|--------|---------|
| `py` | Values end users can edit directly on the UI |
| `px` | Values end users can see on clipboard but generally don't edit |
| `pz` | Hidden/system properties end users shouldn't see |

### Other rules (non-Property, non-Field Value)

| Prefix | Purpose | Availability | Status |
|--------|---------|--------------|--------|
| `py` | Users are expected to override | Available | |
| `px` | Reusable APIs that end users can call and view | Final | Empty (or API if highlighted for direct use) |
| `pz` | Platform rules that are not intended for the use of end users | Final | Internal |

## Limitations

### Supported rule types

The following rule types can be created and updated through the MCP tools.

**Any rule type not listed here cannot be authored or modified — inform the user
it is unavailable.**

| Rule type | Name(s) | Notes |
|-----------|---------|-------|
| `Rule-Admin-System-Settings` | Application Setting | Omit `pySettingMetaData.pyCategoryName` on create unless reusing a category that already exists |
| `Rule-AI-Agent` | AI Agent | |
| `Rule-AI-Tool` | AI Tool | |
| `Rule-Async-JobScheduler` | Job Scheduler | |
| `Rule-Async-QueueProcessor` | Queue Processor | |
| `Rule-ClassMetaData` | Class Metadata | |
| `Rule-Connect-GenerativeAI` | Generative AI Connector | |
| `Rule-Connect-REST` | REST Connector | |
| `Rule-CorrType` | Correspondence Type | |
| `Rule-Decision-DataSet` | Dataset | Database, Snowflake |
| `Rule-Declare-DecisionTable` | Decision Table | |
| `Rule-Declare-Pages` | Data Page, Declare Page | |
| `Rule-Edit-Validate` | Edit Validate | |
| `Rule-Notification` | Notification | |
| `Rule-Obj-Activity` | Activity | Automations (`pyActivityType=AUTOMATION`) are not supported |
| `Rule-Obj-Class` | Class | Create only; blocked if class already exists |
| `Rule-Obj-Corr` | Correspondence | |
| `Rule-Obj-FieldValue` | Field Value | |
| `Rule-Obj-Flow` | Flow | |
| `Rule-Obj-FlowAction` | Flow Action | |
| `Rule-Obj-Model` | Data Transform | |
| `Rule-Obj-Property` | Property, Field | |
| `Rule-Obj-Report-Definition` | Report Definition | |
| `Rule-Obj-ServiceLevel` | Service Level, SLA | |
| `Rule-Obj-Validate` | Validate | |
| `Rule-Obj-When` | When | |
| `Rule-Service-MCP` | Service MCP | |
| `Rule-Test-Application-BusinessAction` | Business Action | |
| `Rule-Test-Application-Case` | Application Test | |
| `Rule-Test-Unit-Case` | PegaUnit, Test Case, Unit test, Test | |
| `Rule-UI-View` | View | |

## Assignment submission checklist (MANDATORY)

Before calling `perform-action` on **any** assignment screen — including workflow,
intake, authoring, and review screens — complete every step below against the
`get-assignment` response:

1. **Read every field label and `data` value in `agentView.fields` IN FULL.**
   Labels and `data` attributes frequently embed mandatory instructions — do not
   treat them as display-only text. This includes long multi-line labels on
   `multirecordlist` fields, which commonly contain "ask the user first" gates
   embedded inside the label text itself.

2. **Honour every gating instruction before submitting.** Stop and fulfil the
   gate (ask via `question` tool or call `run-data-page`) if a field label or
   `data` value contains any of the following phrases:
   - "ask the user"
   - "always ask"
   - "confirm intent"
   - "take confirmation from the user"
   - "must not proceed unless"
   - "execute/run [data page]" / "Execute/Run [data page name]"
   - "The Agent must not proceed unless the user explicitly confirms"

3. **`multirecordlist` field labels are instructions, not headings.** When a
   list field has a long label, read every sentence. If the label says to ask
   the user before configuring that list, ask before populating or leaving it
   empty — both are configuration decisions that require explicit user consent.

4. **Identify every field by type and route it to the correct parameter:**
   - Scalar / embedded page fields → `content`
   - `multirecordlist` fields (page lists) → `pageInstructions` with `APPEND`, `UPDATE`, `DELETE`, etc.

5. **Never put page-list mutations inside `content`.** Passing a page list as a
   JSON array inside `content` is always wrong and will either silently drop the
   data or cause a 400 error. Use `pageInstructions` instead.

6. **Validate the payload structure** (from `methodology-dx-api-assignment-action`):
   - `content` is a JSON object (not an array).
   - `pageInstructions` is a JSON array (not an object).
   - Every `APPEND` omits `listIndex`.
   - Every `UPDATE` / `REPLACE` / `DELETE` / `INSERT` / `MOVE` includes a 1-based `listIndex`.
   - `MOVE` includes `listMoveToIndex`.
   - `ADD` uses `groupIndex`, not `listIndex`.

7. **`recommendedSkills` on a screen is a mandatory read, not a suggestion.**
   When `get-assignment` returns `recommendedSkills`, read that skill file via
   the local filesystem (`Read` tool on `skills/{name}/SKILL.md`) or via
   `get-skill` before building the payload. Apply its guidance in full.

## Skills Development
- Commit messages: imperative mood, ~72 char summary, no conventional-commit prefixes
