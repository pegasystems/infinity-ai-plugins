---
name: rules-rule-connect-generativeai
description: Schema and authoring guide for Pega GenerativeAI connector rules (Rule-Connect-GenerativeAI), including model configuration, prompt FieldValue references, response mappings, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

`genai-stub` is the minimal valid create payload — only required schema fields.
The remaining examples are grouped by `pyExpectedResponseEntity`.

### Custom — `pyExpectedResponseEntity = "Custom"`

| Skill | Description |
|-------|-------------|
| `genai-custom-unstructured` | Q&A connector returning unstructured text to `.pyResponseData` (temperature 0.2) |
| `genai-custom-structured` | Custom use-case returning structured JSON to `.pyJsonData` (temperature 0.6) |

### Single — `pyExpectedResponseEntity = "Single"`

| Skill | Description |
|-------|-------------|
| `genai-single-flat` | Multiple top-level scalar response fields, privacy enabled (temperature 0.4) |
| `genai-single-page-inside-fields` | Embedded `Page` whose children use `.pyPage.pyChild` dot notation |
| `genai-single-nested-pages-deep` | Multi-level embedded pages: `.pyOuter.pyInner.pyLeaf` |
| `genai-single-nested-pagelist-deep` | Top-level scalar plus a 3-level-deep nested pagelist (`.pyStages().pySteps().pyDynamicCaseFields()`) |

### List — `pyExpectedResponseEntity = "List"`

| Skill | Description |
|-------|-------------|
| `genai-list-flat` | Flat list extraction; outer list named by `pyListName`, items hold scalars (temperature 0.8) |
| `genai-list-pagelist-inside-pagelist` | List items each contain a child pagelist (`.pyChild().pyLeaf`) (temperature 1.0) |

## Authoring Notes

### Prompt FieldValue reference
A GenerativeAI connector references a `Rule-Obj-FieldValue` rule for the user prompt
(property family `pyGenerativeAIPrompt`) via `pyPromptName`, and a system prompt
FieldValue (property family `pyGenerativeAISystemPrompt`) via `pySystemPromptName`.

**Defaults are the norm.** The platform ships two default FieldValues —
`pyGenerativeAIPromptTemplate` (user) and `pzDefaultSystemPrompt` (system) — and the
vast majority of connectors reference them as-is. Prefer the defaults unless you have
a concrete reason to override.

**Custom prompt FieldValues are an advanced override.** When the default prompts are
insufficient (e.g., you need a domain-specific system persona or a reusable parameterized
user prompt), author a `Rule-Obj-FieldValue` with `pyFieldName = pyGenerativeAIPrompt`
or `pyGenerativeAISystemPrompt` and reference its `pyFieldValue` from the connector.
Authoring `Rule-Obj-FieldValue` itself is out of scope for this skill.

### Identity & defaults
- **Prefer the default prompts.** Set `pyPromptName` to `"pyGenerativeAIPromptTemplate"`
  and `pySystemPromptName` to `"pzDefaultSystemPrompt"`, and keep `pyCustomizeSystemPrompt`
  as `"false"`. All examples in this skill use the defaults.
- **Custom system prompt.** To override the system prompt, set `pyCustomizeSystemPrompt`
  to `"true"` and point `pySystemPromptName` at a custom FieldValue's `pyFieldValue`
  (authored under `pyFieldName = pyGenerativeAISystemPrompt`).
- **Custom user prompt.** To override the user prompt, point `pyPromptName` at a custom
  FieldValue's `pyFieldValue` (authored under `pyFieldName = pyGenerativeAIPrompt`).
  No separate toggle is required.

### Version-dependent fields (`pyGenAIDef` and `pyGenAIConfig`)
In Pega 24.2+, the Validate activity reads from `pyGenAIDef` (prompt references,
use case) and `pyGenAIConfig` (model configuration) during save. These properties
were introduced in 24.2 — include them when creating on 24.2+, but omit them
on pre-24.2 where they do not exist and will cause validation errors.

**Try with them first.** If the create fails with a validation error indicating
`pyGenAIDef` or `pyGenAIConfig` are not recognized, retry without these fields:

```json
{
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt"
  },
  "pyGenAIConfig": {
    "pxObjClass": "Embed-GenAI-Config",
    "pyEnableLocalization": "false",
    "pyEnablePII": "false",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": []
    }
  }
}
```

Set `pyGenAIDef.pyUseCase` to match the top-level `pyUseCase`. Set
`pyGenAIDef.pyUserPrompt` and `pyGenAIDef.pySystemPrompt` to match `pyPromptName`
and `pySystemPromptName` respectively. Set `pyModelId` to `"pega-default-fast"`
(default) or `"pega-default-smart"` for more capable tasks.
- **`pyResponseFieldsInfo` is auto-generated.** The Validate activity regenerates this
  field from `pyResponseFields` on every save. Do not set it manually.
- **`pyImprovePrivacy`.** Observed as `"false"` on most real rules; set `"true"` only
  when PII redaction is required. Include in create payloads for completeness.

### Temperature (`pyGenAIProvConfig.pyTemperature`)

Controls response randomness. Stored as a string in 0.2 increments from `"0.2"` to
`"2.0"`. Lower = more deterministic, higher = more creative. Choose based on the
task:

| Range            | When to use                                                   |
|------------------|---------------------------------------------------------------|
| `"0.2"`          | Deterministic extraction, classification, Q&A over known facts |
| `"0.4"` – `"0.6"`| Structured output (JSON), entity extraction with mild variation |
| `"0.8"` – `"1.0"`| List generation, summaries, balanced creative tasks            |
| `"1.2"` – `"2.0"`| Brainstorming, paraphrasing, open-ended generation             |

When in doubt prefer `"0.2"` for parseable/structured responses and `"0.8"` for
list or narrative output — these match the dominant settings on observed rules.

### Response shape rules (`pyResponseFields`)

The `pyFieldName` syntax encodes the clipboard structure of the AI response:

| Notation                          | Shape                                      |
|-----------------------------------|--------------------------------------------|
| `.pyLeaf`                         | Top-level scalar                           |
| `.pyPage.pyLeaf`                  | Page inside fields (one level)             |
| `.pyOuter.pyInner.pyLeaf`         | Page inside page inside fields             |
| `.pyList().pyLeaf`                | Pagelist inside fields                     |
| `.pyOuter().pyInner().pyLeaf`     | Pagelist inside pagelist                   |
| `.pyPage.pyList().pyLeaf`         | Pagelist inside a page (mixed)             |
| `.pyList().pyChildPage.pyLeaf`    | Page inside a pagelist item (mixed)        |

`()` means "iterate this Page List"; a plain `.` means "descend into this single Page".
Every leaf must repeat the **full** prefix — there is no row that "declares" an
intermediate page or list; the server infers structure from shared prefixes. All
intermediate properties must already exist on the appropriate class with the correct
mode (`Page` vs `Page List`), and each leaf scalar must exist on the innermost class.

### Single vs List at the root
- `pyExpectedResponseEntity = "Single"` → response is one object. Do NOT set `pyListName`.
  Nested lists are allowed *inside* the object via `()` notation.
- `pyExpectedResponseEntity = "List"` → outer list container is named by `pyListName`
  (e.g., `".pyStages"`) and is **implicit** in `pyResponseFields`. Do not re-prefix item
  rows with the outer list name.

### Prompt design at depth
For deeply nested response shapes, instruct the model with an explicit JSON skeleton
showing each level so the response parses cleanly into the clipboard structure.

### Prompt Design Guidelines

When authoring custom prompt FieldValues (`pyLocalizedValue`):

| Guideline | Example |
|-----------|---------|
| Open with a persona statement | `"You are a risk analyst. Based on the engagement scope..."` |
| Reference case properties to ground the LLM | `{.AssessmentName}`, `{.ClientInformationReference.ClientName}`, `{.pyLabel}` |
| Specify desired output format explicitly | `"Format: Risk: [description] | Recommendation: [action]"` |
| Keep prompts focused — one task per connector | Split multi-task prompts into separate connectors |

**Property substitution syntax:** Use `{.PropertyName}` (curly braces, dot-prefix) to embed clipboard values at runtime. Nested references follow dot notation: `{.PageRef.ChildProperty}`.
