---
name: rules-rule-ai-tool
description: Schema and authoring guide for Pega AI Tool rules (Rule-AI-Tool), including backing-rule categories, parameter mapping, and GenAI definitions. Requires Pega Infinity 25+ (08-25-01+).
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|------|-------------|
| `Get Case Types Activity-backed Tool` | Activity-backed tool using `Rule-Obj-Activity` with nested `pyIntentActionPage.pyParameters` |
| `Data Transform Agent-backed Tool` | Tool delegating to a `Rule-AI-Agent` backing rule |
| `Documentation Buddy-backed Tool` | Tool backed by an internal Buddy knowledge source |
| `Create Case Type-backed Tool` | Tool backed by `Rule-Obj-CaseType` for starting a specific case type |
| `Create Rule Activity-backed Tool` | Rich activity-backed tool with confirmation, detailed instructions, and parameter mappings |
| `Search Rule Data Page-backed Tool` | Data page-backed tool with mirrored top-level and nested parameters |
| `Change Case Stage Flow Action-backed Tool` | Flow action-backed tool |
| `Rule-AI-Tool Stub` | Smallest valid Rule-AI-Tool create payload |
| `Display Case Summary Section-backed Tool` | Section-backed tool for rendering a UI section |

## Authoring notes

### Rule-AI-Tool Overview
Rule-AI-Tool defines tools that can be referenced by Rule-AI-Agent rules. Each tool represents a callable capability with:
- **Intent description** (`pyIntentDescription`): Natural language instructions for the AI agent
- **Intent action page** (`pyIntentActionPage`): The backing rule (Activity, Data Page, Buddy, etc.)
- **Category** (`pyIntentActionPage.pyCategory`): Determines the type of backing rule

Validate backing rules using the selected `pyIntentActionPage.pyClassName` and
`pyIntentActionPage.pyRuleName` when the selected category uses a backing class.
The Rule-AI-Tool itself can live in a different applies-to class than the backing
rule it invokes.

Category-specific field presence rules in this skill are intentional. Example
payloads in this package are illustrative; if an older example differs, follow
the category constraints documented in this skill.


### Tool Categories
| Category | `pyIntentActionPage.pyCategory` value | Description | `pyIntentActionPage.pyClassName` source | `pyIntentActionPage.pyRuleName` source |
|----------|--------------------|-------------|------------------------------------------|-----------------------------------------|
| `Agent-backed` | `Rule-AI-Agent` | Tool that delegates to another AI agent | Run data page `D_pzAgentResource` | Run data page `D_pzAgentsByClass` after selecting the class |
| `Activity-backed` | `Rule-Obj-Activity` | Tool backed by an activity rule. Validate the referenced activity exists; do not assume `pyActivityType: "AUTOMATION"` is required. | Run data page `D_pzAutomationResource` | Run data page `D_pzAutomationsByClass` after selecting the class |
| `Buddy-backed` | `Buddy` | Tool backed by a Buddy identifier. Default `pyIntentActionPage.pyBuddyType` to `"Internal"`; override only when the selected Buddy requires it. | Do not set | Run data page `D_pzListOfBuddies` |
| `Case Type-backed` | `Rule-Obj-CaseType` | Tool backed by a case type rule. Keep `pyIntentActionPage.pyRuleInsName` when your environment returns it for the selected case type. | Do not set | Run data page `D_pzGetCaseTypesEligibleForCaseTypeTool` |
| `Data Page-backed` | `Rule-Declare-Pages` | Tool backed by a data page | Do not set | Query with `ruleType` as  `Rule-Declare-Pages` |
| `Flow Action-backed` | `Rule-Obj-FlowAction` | Tool backed by a flow action. Do not include `pyAskConfirmation` or `pyIntentActionPage.pyClassName`. | Do not set | Query with `ruleType` as  `Rule-Obj-FlowAction` |
| `Section-backed` | `Rule-HTML-Section` | Tool backed by a UI section | Do not set | Query with `ruleType` as  `Rule-HTML-Section` |

### Key Fields
- **`pyPurpose`** (Text): Functional identifier for the tool, used as a key when agents reference it (e.g., `pxGetCaseTypes`, `pzSearchRule`). Required.
- **`pyAskConfirmation`** (String: `"true"` or `"false"`): Category-specific confirmation flag. Omit it for `Rule-Obj-FlowAction`; use `"false"` for `Rule-AI-Agent` and `Rule-Obj-CaseType`; otherwise set `"true"` or `"false"` as determined contextually for the selected category. Must use stringified boolean.
- **`pyAskConfirmationMessage`** (Text): A clear confirmation prompt message. Only include when `pyAskConfirmation` is `"true"`; do not include it when `pyAskConfirmation` is `"false"` or absent. 
- **`pyIntentDescription`** (Text): Detailed instructions for the AI — include purpose, when to use, input parameters, and output format
- **`pyIntentActionPage.pyRuleName`** (Text): Required for every tool category. Do not leave it blank.
- **`pyIntentActionPage.pyClassName`** (Text): Include only for categories that use a backing class to resolve the target rule. Set it for `Rule-AI-Agent` and `Rule-Obj-Activity` using the selected backing rule class. Exclude it for `Buddy`, `Rule-Obj-CaseType`, `Rule-Declare-Pages`, `Rule-Obj-FlowAction`, and `Rule-HTML-Section`.
- **`pyIntentActionPage.pyBrowseClass`** (Text): Optional browse or scoping class used by some environments when resolving the backing resource. Include it only when the selected backing rule or environment requires that extra context.
- **`pyIntentActionPage.pyRuleInsName`** (Text): Optional exact instance handle used most often with case type-backed tools. Preserve it when the selected case type lookup returns it or your environment requires exact rule resolution.
- **`pyRetentionPolicy`**: Controls how long tool execution results are retained (`ALWAYS_RETAIN`, `RETAIN_UNTIL_ACTIONED`, `EPHEMERAL`)
- **`pyIntentActionPage.pyBuddyTextOnlyChunks`** (String: `"true"` or `"false"`): Optional for Buddy-backed tools only; do not include it for any other category.

### Parameter Structures
Rule-AI-Tool supports two distinct parameter arrays with different purposes:

1. **Top-level `pyParameters`** (array of `Embed-MethodParams`): Parameters exposed by the Rule-AI-Tool rule itself to the AI agent. These define the interface that agents use when invoking the tool. Use this when the tool needs to accept inputs from the agent.

2. **Nested `pyParameters` in `pyIntentActionPage`** (array of `Embed-AutomationRule-IO`): Parameters passed to the backing rule when the tool executes. In this skill package, use nested parameters only for `Rule-Obj-Activity` and `Rule-Declare-Pages` tools. These map the tool's inputs to the backing rule's parameter interface. Use this to translate top-level tool parameters into backing rule parameters, or to handle automation-specific parameter formats.

**Required-flag difference:** `Embed-MethodParams` uses `pyParametersParamReq` with values `"-1"` (required) / `"0"` (optional). `Embed-AutomationRule-IO` uses `pyRequired` with values `"true"` / `"false"`. Do not mix up the two conventions.

### Example Patterns
- **Simple tools**: Minimal fields — className, label, purpose, intentDescription, intentActionPage
- **Buddy tools**: Set `pyIntentActionPage.pyCategory: "Buddy"` and `pyIntentActionPage.pyBuddyType: "Internal"` or `"External"`
- **Complex activity-backed tools**: Include detailed `pyIntentDescription` with step-by-step instructions, multiple `pyExamples`, and full parameter definitions

### Tool Creation Workflow (MANDATORY — DO NOT SKIP)

When the user asks to create a tool (Rule-AI-Tool), the agent **must follow this workflow before proceeding**:

1. **Ask the user which backing rule category they want.** Present the categories from the **Tool Categories** table above and ask the user to select one.

   Do NOT assume a category. Always ask the user to choose.

2. **Identify the backing rule class and list existing backing rules of the selected category.** Based on the user's choice, use the **Tool Categories** table above to determine the exact value of `pyIntentActionPage.pyRuleName` and whether `pyIntentActionPage.pyClassName` is used and it's exact value. If the table names a data page, run that data page and ask the user to choose from the returned values. If the table says to search for an instance class, use rule search for that class and determine or ask the user to choose from the matching rules.
   Present the list of available backing rules to the user so they can select one or decide to create a new backing rule.

3. **Proceed with tool creation** using the selected category and backing rule, following the Backing Rule Validation steps below.

### Backing Rule Validation (MANDATORY — DO NOT SKIP)

Before creating a Rule-AI-Tool, the agent **must validate** the backing rule referenced in `pyIntentActionPage.pyRuleName`:

1. **Verify the rule exists — STOP if it does not.** Use the discovery source in the **Tool Categories** table to confirm that the rule name specified in `pyIntentActionPage.pyRuleName` corresponds to an existing backing rule or platform-provided resource for the selected `pyIntentActionPage.pyCategory`.

   Validate the rule against `pyIntentActionPage.pyClassName`, not the AI Tool
   rule's own `pyClassName` unless both are intentionally the same.

   Validate the `pyIntentActionPage.pyRuleName` and `pyIntentActionPage.pyClassName` against their repective sources according to the **Tool Categories** table above. 

   **If the rule does not exist, pause and ask the user** which of the following they prefer:
   - Provide an existing backing rule name to use instead
   - Have the agent create the backing rule first, then proceed with the AI Tool creation

   **Stop Rule-AI-Tool creation if the backing rules does not exist.** Creating an AI Tool with a non-existent backing rule results in a broken tool that will fail at runtime. Never assume the backing rule will be created later — always resolve this before creating the tool.

2. **Pass values to all required parameters.** If the backing category supports parameters:
   - Call `pzLoadRuleParameters` using:
   - `pyIntentActionPage.pyClassName` + `pyIntentActionPage.pyRuleName` (if class exists), OR
   - rule name + category class (if no class).
   - From response, identify required/optional params.
   - For each required param, add entry in `pyParameters`:
      - `pyParametersParamName` = param name
      - `pyParametersParamReq` = "-1" (required) / "0" (optional)
   - If using nested `pyIntentActionPage.pyParameters`:
      - Mirror same parameter names
      - Map values to `Param.<name>` or expected clipboard references
   - **Note on parameter flags:** 
      - `pyParametersParamReq` defines requirement:
         - "-1" = mandatory
         - "0" = optional
      - Rule-AI-Tool enforces this at execution.
   - Do not skip required parameters — missing mappings cause runtime failure.
### Pega 25+ Requirement
Rule-AI-Tool requires Pega Infinity 25+ (08-25-01 or later). The rule type may not be available in earlier versions.
