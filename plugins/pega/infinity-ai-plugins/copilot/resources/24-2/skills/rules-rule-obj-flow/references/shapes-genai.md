---
name: shapes-genai
description: "Load when wiring a GenerativeAI shape in a flow to an AI connector. Covers the two-rule bundle (connector + prompt), shape fields, and placeholder vs configured states."
---

## Two-Rule Bundle

A GenAI step is backed by two rules that must be created together with matching names:

| Rule Type | Naming pattern | Purpose |
|-----------|----------------|---------|
| `Rule-Connect-GenerativeAI` | `{DescriptiveName}` (PascalCase) | Connector config: temperature, prompt pointer, response mapping |
| `Rule-Obj-FieldValue` | `pyGenerativeAIPrompt` / `{DescriptiveName}` | User prompt text — only when overriding the default |

**Naming constraint:** The connector's `pyPromptName` must equal the FieldValue's `pyFieldValue`.

**Dependency order:** FieldValue (if custom) → Connector → Flow shape. The connector and FieldValue can be created in parallel (no foreign-key constraint), but the flow shape must be wired last.

```
Rule-Obj-FieldValue (pyGenerativeAIPrompt / {Name})   [prompt text]
  → Rule-Connect-GenerativeAI ({Name})                [connector config]
      → Flow GenAI shape (pzRuleParamsHolder.pyServiceName = {Name})
```

**Default prompts:** Most connectors use platform defaults (`pyPromptName: "pyGenerativeAIPromptTemplate"`, `pySystemPromptName: "pzDefaultSystemPrompt"`). Only create a custom FieldValue when you need step-specific prompt text or property substitutions.

## Wiring Workflow

### Does the connector already exist?

| Result | Action | `pyReferExisting` |
|--------|--------|-------------------|
| Connector found with `pyRuleFormStatus: Good` | Wire shape only | `"Existing"` |
| Connector not found | Create connector (+ FieldValue if custom), then wire shape | `"Existing"` |

### Adding a GenAI shape to a new flow position

If no GenAI shape exists yet, add a new entry to `pyModelProcess.pyShapes` using the shape JSON from `examples/shapes/generative-ai.md`, and add corresponding connector entries in `pyModelProcess.pyConnectors` to link it in the sequence.

## GenerativeAI Shapes

`pxObjClass: Data-MO-Activity-Utility-GenerativeAI` — invoke a `Rule-Connect-GenerativeAI`.

| Field | Description |
|-------|-------------|
| `pyImplementation` | Always `pxConnectToGenerativeAI` — this is the generic connector activity, not the connector rule name. The connector name lives in `pyServiceName`, `pyCallParams.pyServiceName`, and `pyGenAIPage.pyServiceName`. |
| `pyServiceName` | Name of the `Rule-Connect-GenerativeAI` connector rule. Present only when configured — **omitted** on placeholder shapes. |
| `pyActivityType` | `"ACTIVITY"` (server-verified value on modern flows) |
| `pyGenAIPage` | **Required sub-page** — class `Rule-Connect-GenerativeAI`. Carries `pyServiceName` (connector name or `""` if placeholder), `pyLabel`, `pyReferExisting`. |
| `pyRuleParamsStreamName` | `"pzGenAISmartShapeUI"` on **configured** shapes; **omitted entirely** on placeholder shapes. |
| `pzRuleParamsHolder` | `{ "pxObjClass": "Rule-Connect-GenerativeAI", "pyServiceName": "<connector-or-empty>" }`. Holder always has `pxObjClass: Rule-Connect-GenerativeAI` regardless of configured vs placeholder. |
| `pyCallParams` | `{ "pyServiceName": "<connector>" }` when configured; empty `{}` when placeholder. |
| `pzIsAPI` | `"true"` — platform smart-shape marker (auto-set). |

## Placeholder vs Configured

- **Placeholder:** A GenAI shape that hasn't been connected to a connector rule yet (stub state)
- **Configured:** A GenAI shape wired to an existing connector rule

The connector rule (and its backing FieldValue prompt) must exist before wiring a configured shape.

| Field | Placeholder | Configured |
|-------|-------------|------------|
| `pyServiceName` (shape-level) | not present | connector name |
| `pyCallParams.pyServiceName` | not present | connector name |
| `pyRuleParamsStreamName` | not present | `"pzGenAISmartShapeUI"` |
| `pyGenAIPage.pyServiceName` | `""` | connector name |
| `pyGenAIPage.pyReferExisting` | `""` | `"Existing"` |
| `pzRuleParamsHolder.pyServiceName` | `""` | connector name |
| `pyWarningMessages` | server adds "cannot be blank" warning | none |

When recreating a placeholder shape, preserve these values — do not fabricate a connector name.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| GenAI shape shows warning in flow | `pzRuleParamsHolder.pyServiceName` is blank | Update the flow shape to set `pyServiceName` to the connector rule name |
| LLM call produces empty output | `pyResponseFields` missing or target property doesn't exist | Add or fix the `pyResponseFields` entry on the connector (e.g., `{ "pyFieldName": ".pyResponseData" }`) |
| Prompt doesn't include property values | `{.PropertyName}` not substituted | Ensure the FieldValue `pyLocalizedValue` uses `{.PropertyName}` syntax (curly braces, dot-prefix) |
| `pyRuleFormStatus: Bad` on connector | Required field missing (e.g., `pyExpectedResponseEntity`, `pyPromptName`, `pyGenAIProvConfig.pyTemperature`) | Add the missing field; see `rules-rule-connect-generativeai` |
| `Payload validation failed for Rule-Connect-GenerativeAI` | Legacy v1 fields included (`pyModelId`, numeric `pyTemperature`, `pySystemPrompt`, `pyUserPrompt`, `pyOutputProperty`) | Remove v1 fields; use v2 schema (`pyGenAIProvConfig.pyTemperature` as string, `pyPromptName`, `pySystemPromptName`, `pyResponseFields[]`) |
| Flow `pyRuleFormStatus: Bad` after wiring | Connector rule doesn't exist yet | Create the connector (and prompt FieldValue if custom) before updating the flow |
| Connector fires but output is truncated | Temperature too high or prompt too long | Lower `pyGenAIProvConfig.pyTemperature`; split into multiple focused prompts |

## Wiring Workflow (Step-by-Step)

### Step 1: Locate the Flow and Target GenAI Shape

| Tool | Parameters |
|------|------------|
| `search-rules` | `searchText="{FlowName}"` |
| `get-rule` | `key="{FlowKey}"`, `detail="full"` |

**What to look for:**
- `pyModelProcess.pyShapes` — find entries with `pyFromMODefName: "GenerativeAI"`
- Check `pzRuleParamsHolder.pyServiceName`:
  - Present and non-blank → connector already wired
  - Absent or blank → stub shape; proceed with wiring

Record the exact shape JSON to preserve existing fields during updates.

### Step 2: Check Whether Connector Exists

| Tool | Parameters |
|------|------------|
| `search-rules` | `searchText="{ConnectorName}"` |

Filter results to `Rule-Connect-GenerativeAI` on the target class.

### Step 3: Create the Connector Rule

**Tool:** `create-rule` with `ruleType="Rule-Connect-GenerativeAI"`

```json
{
  "pyLabel": "Analyze Engagement Setup",
  "pyServiceName": "AnalyzeEngagementSetup",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Analyzes scope and schedule to surface risks.",
  "pyExpectedResponseEntity": "Custom",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "AnalyzeEngagementSetup",
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": { "pyTemperature": "0.2" },
  "pyResponseFields": [{ "pyFieldName": ".pyResponseData" }]
}
```

| Field | Purpose |
|-------|---------|
| `pyServiceName` | Connector name — referenced from flow shape and prompt FieldValue |
| `pyPromptName` | User-prompt FieldValue `pyFieldValue` — must match Step 4 or use `"pyGenerativeAIPromptTemplate"` |
| `pyExpectedResponseEntity` | `"Custom"` (free-form), `"Single"` (one object), or `"List"` (top-level list via `pyListName`) |
| `pyGenAIProvConfig.pyTemperature` | String in 0.2 increments (`"0.2"` to `"2.0"`) |
| `pyResponseFields[]` | Clipboard targets (`.pyResponseData` for unstructured; dot-notation for structured) |

**Do NOT include:** `pyGenAIDef`, `pyGenAIConfig`, `pyResponseFieldsInfo` — auto-materialized by platform.

### Step 4: Create the Prompt FieldValue (if custom)

Skip if using default `pyPromptName: "pyGenerativeAIPromptTemplate"`.

**Tool:** `create-rule` with `ruleType="Rule-Obj-FieldValue"`

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyFieldName": "pyGenerativeAIPrompt",
  "pyFieldValue": "AnalyzeEngagementSetup",
  "pyLabel": "AnalyzeEngagementSetup",
  "pyLocalizedValue": "Review the engagement scope for {.AssessmentName}. Identify top 3 risks. Format: Risk: [desc] | Recommendation: [action].",
  "pyDescription": "User prompt for AnalyzeEngagementSetup connector"
}
```

| Field | Rule |
|-------|------|
| `pyFieldName` | Always `"pyGenerativeAIPrompt"` for user prompts |
| `pyFieldValue` | **Must equal `pyPromptName`** on the connector |
| `pyLabel` | **Required** — API rejects without it |
| `pyLocalizedValue` | Prompt text sent to LLM; use `{.PropertyName}` for substitution |

**Property substitution syntax:** `{.PropertyName}`, `{.PageRef.ChildProperty}`, `{.pyLabel}`

### Step 5: Wire the GenAI Shape in the Flow

**Tool:** `update-rule` with `key="{FlowKey}"`

Update the shape entry in `pyModelProcess.pyShapes`:

```json
{
  "pyModelProcess": {
    "pyShapes": {
      "GenerativeAI1": {
        "pxObjClass": "Data-MO-Activity-Utility-GenerativeAI",
        "pyFromMODefName": "GenerativeAI",
        "pyImplementation": "pxConnectToGenerativeAI",
        "pyMOId": "GenerativeAI1",
        "pyMOName": "Analyze Engagement Setup",
        "pzIsAPI": "true",
        "pyGenAIPage": {
          "pxObjClass": "Rule-Connect-GenerativeAI",
          "pyReferExisting": "Existing",
          "pyServiceName": "AnalyzeEngagementSetup"
        },
        "pzRuleParamsHolder": {
          "pxObjClass": "Rule-Connect-GenerativeAI",
          "pyServiceName": "AnalyzeEngagementSetup"
        }
      }
    }
  }
}
```

| Field | Value |
|-------|-------|
| `pxObjClass` | `"Data-MO-Activity-Utility-GenerativeAI"` (not plain Utility) |
| `pyImplementation` | `"pxConnectToGenerativeAI"` — always |
| `pyGenAIPage.pyReferExisting` | `"Existing"` when referencing a connector |
| `pyGenAIPage.pyServiceName` | Must match `pzRuleParamsHolder.pyServiceName` |
| `pzRuleParamsHolder.pyServiceName` | **The connector rule name** |

### Step 6: Final Verification

| Check | Expected value |
|-------|----------------|
| `pzRuleParamsHolder.pyServiceName` | Connector name |
| `pyGenAIPage.pyServiceName` | Same connector name |
| `pyGenAIPage.pyReferExisting` | `"Existing"` |
| `pyImplementation` | `"pxConnectToGenerativeAI"` |
| Flow `pyRuleFormStatus` | `"Good"` — no warnings about blank `pyServiceName` |
| Connector `pyRuleFormStatus` | `"Good"` |
