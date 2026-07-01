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

Validate backing rules using `pyIntentActionPage.pyClassName`. The Rule-AI-Tool
itself can live in a different applies-to class than the backing rule it invokes.


### Tool Categories
| Category | `pyIntentActionPage.pyCategory` value | `ruleType` to query | Description |
|----------|--------------------|---------------------|-------------|
| `Agent-backed` | `Rule-AI-Agent` | `Rule-AI-Agent` | Tool that delegates to another AI agent |
| `Activity-backed` | `Rule-Obj-Activity` | `Rule-Obj-Activity` | Tool backed by an activity rule. Validate the referenced activity exists; do not assume `pyActivityType: "AUTOMATION"` is required. |
| `Buddy-backed` | `Buddy` | N/A (not discoverable) | Tool backed by a Buddy identifier. `pyRuleName` must be one of: `platform_buddy`, `sales_automation_buddy`, `customer_decision_hub_buddy`, `customer_service_buddy`. These are platform-provided values not resolvable via `list-rules` or `search-rules`. |
| `Case Type-backed` | `Rule-Obj-CaseType` | `Rule-Obj-CaseType` | Tool backed by a case type rule |
| `Data Page-backed` | `Rule-Declare-Pages` | `Rule-Declare-Pages` | Tool backed by a data page |
| `Flow Action-backed` | `Rule-Obj-FlowAction` | `Rule-Obj-FlowAction` | Tool backed by a flow action |
| `Section-backed` | `Rule-HTML-Section` | `Rule-HTML-Section` | Tool backed by a UI section |

### Key Fields
- **`pyPurpose`** (Text): Functional identifier for the tool, used as a key when agents reference it (e.g., `pxGetCaseTypes`, `pzSearchRule`). Required.
- **`pyAskConfirmation`** (String: `"true"` or `"false"`): Whether the agent should ask user confirmation before executing. Must use string values, not boolean.
- **`pyAskConfirmationMessage`** (Text): Recommended when `pyAskConfirmation` is `"true"`. For Pega 26+, include a clear confirmation prompt message; for Pega 25 payloads, this field may be omitted.
- **`pyIntentDescription`** (Text): Detailed instructions for the AI — include purpose, when to use, input parameters, and output format
- **`pyRetentionPolicy`**: Controls how long tool execution results are retained (`ALWAYS_RETAIN`, `RETAIN_UNTIL_ACTIONED`, `EPHEMERAL`)

### Parameter Structures
Rule-AI-Tool supports two distinct parameter arrays with different purposes:

1. **Top-level `pyParameters`** (array of `Embed-MethodParams`): Parameters exposed by the Rule-AI-Tool rule itself to the AI agent. These define the interface that agents use when invoking the tool. Use this when the tool needs to accept inputs from the agent.

2. **Nested `pyParameters` in `pyIntentActionPage`** (array of `Embed-AutomationRule-IO`): Parameters passed to the backing rule (Activity, Data Page, etc.) when the tool executes. These map the tool's inputs to the backing rule's parameter interface. Use this to translate top-level tool parameters into backing rule parameters, or to handle automation-specific parameter formats.

**Required-flag difference:** `Embed-MethodParams` uses `pyParametersParamReq` with values `"-1"` (required) / `"0"` (optional). `Embed-AutomationRule-IO` uses `pyRequired` with values `"true"` / `"false"`. Do not mix up the two conventions.

### Example Patterns
- **Simple tools**: Minimal fields — className, label, purpose, intentDescription, intentActionPage
- **Buddy tools**: Set `pyIntentActionPage.pyCategory: "Buddy"` and `pyIntentActionPage.pyBuddyType: "Internal"` or `"External"`
- **Complex activity-backed tools**: Include detailed `pyIntentDescription` with step-by-step instructions, multiple `pyExamples`, and full parameter definitions

### Tool Creation Workflow (MANDATORY — DO NOT SKIP)

When the user asks to create a tool (Rule-AI-Tool), the agent **must follow this workflow before proceeding**:

1. **Ask the user which backing rule category they want.** Present the categories from the **Tool Categories** table above and ask the user to select one.

   Do NOT assume a category. Always ask the user to choose.

2. **Identify the backing rule class and list existing backing rules of the selected category.** Based on the user's choice, use the **Tool Categories** table above to determine the correct `ruleType` to query with `list-rules` or `search-rules` from `pyIntentActionPage.pyClassName` (the class where the backing rule lives).

   **Buddy-backed tools:** Skip rule lookup and validate the selected `pyRuleName`
   against the allowed Buddy identifiers listed above.

   Present the list of available backing rules to the user so they can select one or decide to create a new backing rule.

3. **Proceed with tool creation** using the selected category and backing rule, following the Backing Rule Validation steps below.

### Backing Rule Validation (MANDATORY — DO NOT SKIP)

Before creating a Rule-AI-Tool, the agent **must validate** the backing rule referenced in `pyIntentActionPage.pyRuleName`:

1. **Verify the rule exists — STOP if it does not.** Use `search-rules` or `list-rules` to confirm that the rule name specified in `pyIntentActionPage.pyRuleName` corresponds to an existing rule instance of the type indicated by `pyIntentActionPage.pyCategory`.

   Validate the rule against `pyIntentActionPage.pyClassName`, not the AI Tool
   rule's own `pyClassName` unless both are intentionally the same.

   **For Buddy-backed tools:** Validate `pyRuleName` against the allowed Buddy
   identifiers instead of using rule APIs.

   **If the rule does not exist, the agent MUST stop and ask the user** which of the following they prefer:
   - Provide an existing backing rule name to use instead
   - Have the agent create the backing rule first, then proceed with the AI Tool creation

   **Do NOT proceed with Rule-AI-Tool creation if the backing rule does not exist.** Creating an AI Tool with a non-existent backing rule results in a broken tool that will fail at runtime. Never assume the backing rule will be created later — always resolve this before creating the tool.

2. **Pass values to all required parameters.** If the backing rule has parameters, inspect the rule (via `get-rule`) to discover its parameter definitions. For every required parameter on the backing rule, ensure a corresponding entry exists in `pyParameters` (top-level) with:
    - `pyParametersParamName` matching the backing rule's parameter name
    - `pyParametersParamReq` set to `"-1"` (required) or `"0"` (optional) to match the backing rule's parameter requirement

   If the tool also uses nested `pyIntentActionPage.pyParameters`, mirror the
   same logical parameter names there and map them to `Param.<name>` or the
   clipboard reference expected by the backing rule.


   **Note on parameter flags:** Use `pyParametersParamReq` to indicate whether the parameter is mandatory (`"-1"`) or optional (`"0"`). This flag tells the Rule-AI-Tool whether the parameter must be provided when the tool is invoked.

   Do not omit required parameters — the tool will fail at runtime if a required parameter is not mapped.

### Pega 25+ Requirement
Rule-AI-Tool requires Pega Infinity 25+ (08-25-01 or later). The rule type may not be available in earlier versions.
