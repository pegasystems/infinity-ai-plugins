---
name: rules-rule-obj-fieldvalue
description: Schema and authoring guide for Pega field value rules (Rule-Obj-FieldValue), including localizable text, message parameters, common field name patterns, notification messages, and GenAI prompts
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|------|-------------|
| `Stub Field Value` | Minimal field value -- smallest valid create payload |
| `Message Label` | Message label on @baseclass for API/UI error messages |
| `Parameterized Message` | Parameterized text with {1}, {2} placeholders and pyFieldValueParams |
| `Property Reference Expression` | Inline property reference expression in pyLocalizedValue (no pyFieldValueParams) |
| `Notification Message` | Notification message for flow notification shapes |
| `GenAI User Prompt` | GenAI Connect Rule user prompt field value (pyGenerativeAIPrompt) |
| `GenAI System Prompt` | System prompt field value for a GenAI connector (pyGenerativeAISystemPrompt) |
| `Caption Label` | Caption label for rule form help text with parameterized placeholder |

## Authoring Notes

### Identity key

A FieldValue is uniquely identified by `pyClassName` + `pyFieldName` + `pyFieldValue`.

**`pyFieldValue` is the key identifier, not the display text.** It is the symbolic name
that Pega uses to look up the field value rule (e.g., `"Name"`). The user-visible display
text is stored in `pyLocalizedValue`. When overriding an inherited field value on a
subclass, keep `pyFieldValue` the same as the parent and change `pyLocalizedValue` to the
new display text.

### Quick decision tree

```
What text do you need to store?
|
+-- Error/validation/status message?        --> pyMessageLabel
+-- Notification in a flow?                 --> pyNotificationMessage (4-rule bundle)
+-- GenAI Connect Rule user prompt?          --> pyGenerativeAIPrompt
+-- GenAI system prompt for LLM behavior?   --> pyGenerativeAISystemPrompt
+-- Label/caption on a rule form?           --> pyCaption
+-- Button text?                            --> pyButtonLabel
+-- Tooltip/helper on a form field?         --> pyActionPrompt
+-- Error category classification?          --> pyErrorClassification
+-- General informational text?             --> pyMessage
```

### Common pyFieldName patterns

| `pyFieldName` | Purpose | Typical `pyClassName` | Key guidance |
|---------------|---------|----------------------|--------------|
| `pyMessageLabel` | API/UI error and status messages (~40% of OOTB) | `@baseclass`, `Pega-API`, app classes | Most common. PascalCase names: `InvalidInputData`, `DuplicateRecord` |
| `pyCaption` | Labels, captions, help text for rule forms (~13%) | `@baseclass`, rule type classes | Supports `{N}` placeholders and `{.propertyRef}` expressions |
| `pyNotificationMessage` | Notification content for flow shapes | Work classes | Part of a **4-rule bundle** — see `rules-rule-notification`. `pyFieldValue` must match the `Rule-Notification` pyRuleName (e.g., `NotifyApprover_0`) |
| `pyGenerativeAIPrompt` | GenAI connector user prompt | `@baseclass`, work classes | Referenced by `pyGenAIDef.pyUserPrompt` on the connector rule. Supports inline `{.propertyRef}` |
| `pyGenerativeAISystemPrompt` | GenAI connector system prompt | `@baseclass`, work classes | Referenced by `pyGenAIDef.pySystemPrompt`. OOTB default is `pzDefaultSystemPrompt`. Set `pyCustomizeSystemPrompt: "true"` on the connector when using a custom system prompt |
| `pyMessage` | General-purpose message text | `@baseclass` | Informational banners, confirmations, instructional text |
| `pyErrorClassification` | Error category values for Message rule form | `@baseclass` | Low frequency — extending error classification taxonomy |
| `pyButtonLabel` | Button text labels | `@baseclass` | Flow action buttons, confirmation dialogs |
| `pyActionPrompt` | Helper/tooltip text for rule form fields | Embed classes, `@baseclass` | Field-level guidance in App Studio / Dev Studio |
| `pxDecisioningClass` | Strategy result class mapping | `Rule-Application` | Auto-generated — **never create manually** |
| `pzErrorMessage` | Internal platform error messages | `@baseclass` | Platform-internal — **never create manually** |

### Class scoping

- Use `@baseclass` for values available across all classes (most common — ~50% of instances)
- Use a specific work class (e.g., `MyOrg-MyApp-Work-MyCase`) for case-specific values like notification messages and case-specific GenAI prompts
- Use a rule type class (e.g., `Rule-Obj-CaseType`) for values that customize rule form behavior
- Use `Pega-API` or API subclasses for API-specific error/status messages

### Parameterized messages

`pyLocalizedValue` supports two substitution mechanisms:

**1. Numbered placeholders (`{1}`, `{2}`, ...) — resolved via pyFieldValueParams**

Populate `pyFieldValueParams` with one `Embed-Message-Parameter` entry per placeholder.
Order matters — the first entry maps to `{1}`, the second to `{2}`, etc.

Each parameter has:
- `pyValue` — parameter key/identifier (e.g., `"1"` for `{1}` or a descriptive key like `"channelType"`)
- `pyDefault` — default value expression resolved at runtime (e.g., `Application.pyLabel`, `.pyLabel`)

**2. Inline property references (`{.propertyRef}`) — resolved from clipboard**

Direct Pega property references in curly braces, resolved at runtime without
`pyFieldValueParams`. Examples: `{.pyLabel}`, `{.pyRunResults(2).pyElapsedTime.pyGenAIServiceTotalTime}`

### Referencing Page and PageList properties

Inline property references in `pyLocalizedValue` can traverse Page and PageList
properties using dot notation and indexed accessors. This allows field values to
display deeply nested data from the clipboard at runtime.

**Syntax patterns:**

| Pattern | Meaning | Example |
|---------|---------|---------|
| `{.ScalarProp}` | Scalar on the current context page | `{.pzFillFormWithAIPrompt}` |
| `{.PageProp.ScalarProp}` | Scalar on a Page property | `{.pyElapsedTime.pyGenAIServiceTotalTime}` |
| `{.PageListProp(N).ScalarProp}` | Scalar at index N of a PageList | `{.pyRunResults(1).pyElapsedTime.pyGenAIServiceTotalTime}` |
| `{.PageListProp(N).PageProp.ScalarProp}` | Page inside a PageList element | `{.pyRunResults(1).pyElapsedTime.pyLLMCall(1).pyLLMTime}` |
| `{.PageListProp(N).PageListProp(M).ScalarProp}` | Nested PageList inside PageList | `{.pyRunResults(1).pyElapsedTime.pyLLMCall(1).pyGatewayServiceOverhead}` |
| `{PageName.ScalarProp}` | Scalar on a named/top-level page (no leading dot) | `{Application.pyLabel}` |
| `{PageName.PageProp.ScalarProp}` | Nested property on a named page | `{OperatorID.pyUserName}` |

**Leading dot vs. no leading dot:**

- **With leading dot** (`{.prop}`) — resolves relative to the current context page
  (the primary page of the class where the field value is defined). This is the most
  common form.
- **Without leading dot** (`{PageName.prop}`) — resolves against a named top-level
  clipboard page (e.g., `Application`, `OperatorID`, `pxRequestor`). Use this when
  referencing data outside the current context page.

**Property class resolution:**

When traversing through a Page or PageList property, each subsequent property in the
dot-path must be defined on (or inherited by) the `pxObjClass` of that page. For example,
in `{.pyRunResults(1).pyElapsedTime.pyGenAIServiceTotalTime}`:
- `pyRunResults` is a PageList on the context class — each element has a specific `pxObjClass`
- `pyElapsedTime` must be a property defined on the `pxObjClass` of `pyRunResults` elements
- `pyGenAIServiceTotalTime` must be defined on the `pxObjClass` of `pyElapsedTime`

This means you cannot reference arbitrary property names through page traversals — each
segment must be a valid property on the class of the page it navigates into.

**Key rules:**

- PageList indexes are **1-based** (first element is `(1)`, not `(0)`)
- Multiple references can appear in the same `pyLocalizedValue` string — each is
  resolved independently
- No `pyFieldValueParams` entries are needed for inline property references — the
  platform resolves them directly from the clipboard

**Real-world examples from PegaRULES:**

```
# Single PageList traversal (class: Rule-Connect-GenerativeAI)
pyLocalizedValue: "{.pyRunResults(1).pyElapsedTime.pyGenAIServiceTotalTime} sec"

# Multiple nested PageList references in one value
pyLocalizedValue: "•\tTime taken by the Model : {.pyRunResults(1).pyElapsedTime.pyLLMCall(1).pyLLMTime} sec\n•\tTime taken by GenAI Service : {.pyRunResults(1).pyElapsedTime.pyGenAIServiceOverhead} sec\n•\tTime taken by Gateway Service : {.pyRunResults(1).pyElapsedTime.pyLLMCall(1).pyGatewayServiceOverhead} sec"

# Simple Page property reference (class: Work-)
pyLocalizedValue: "{.pzFillFormWithAIPrompt}"

# Named top-level page reference (no leading dot)
pyLocalizedValue: "Application: {Application.pyLabel}"
```

**When the platform tracks references:** If you use inline `{.propertyRef}` syntax,
Pega automatically populates `pxPropertyReferences` on the rule instance. Each
referenced path gets an `Embed-Reference-Property` entry with the full dot-path in
`pxPropertyName`. You do not need to set `pxPropertyReferences` manually — it is
system-managed.

### GenAI connector prompts

Every `Rule-Connect-GenerativeAI` connector references exactly two FieldValue rules
via `pyGenAIDef`:

| Role | `pyFieldName` | Referenced by |
|------|---------------|---------------|
| User prompt | `pyGenerativeAIPrompt` | `pyGenAIDef.pyUserPrompt` |
| System prompt | `pyGenerativeAISystemPrompt` | `pyGenAIDef.pySystemPrompt` |

The connector stores only the `pyFieldValue` name as a symbolic reference. Pega
resolves the FieldValue text at runtime by walking the class hierarchy.

**Naming constraint:** The connector's `pyPromptName` must equal the FieldValue's `pyFieldValue`.

**Prompt writing guidelines:**
- Open with a persona statement: `"You are a [role]. Based on [context]..."`
- Reference specific case properties via `{.PropertyName}` to ground the LLM in actual data
- Specify the desired output format explicitly
- Keep prompts focused — one task per connector rule
