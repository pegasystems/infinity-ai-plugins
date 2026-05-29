---
name: rules-rule-obj-when
description: Schema and authoring guide for Pega When rules (Rule-Obj-When), including condition clauses and pyLogic combinators. Per-alias function templates live in `library-function-builder`.
---

**Prerequisites:**
- Load `methodology-rule-authoring` first for general create/update workflows,
  deep merge semantics, and update examples that apply to all rule types.
- Load `library-function-builder` whenever a `pyCondition[]` entry needs a
  function alias (`pyConditionValue1Purpose`). The shared library owns the
  full catalogue of function-alias examples (`CompareTwoValues`,
  `PropertyHasValue`, `compareTwoStrings`, `pxIsInListOfValues`,
  `MathGreaterThan`, `Rule-Obj-When`, etc.) along with their
  `pyFunctionData` shapes and `pyCallParams` keys. The When-rule supported
  subset (65 aliases) is enumerated in the schema's
  `$defs/FunctionAliasName`, referenced from `pyConditionValue1Purpose`,
  `UserFunction.pyName`, and `FunctionAlias.pyPurpose`. This skill no longer
  duplicates per-alias templates.

## Authoring Notes

### Condition payload shape

Each entry in `pyCondition[]` must be sent as a **full payload**. The MCP
builder does **not** auto-expand a simplified `{pyConditionLabel,
pyConditionValue1Purpose, pyCallParams}` shape — the server rejects payloads
that omit `pyConditionValue1` with `500 — pyConditionValue1: Please specify a
when condition`.

Every condition entry must include all of:

| Field | Description                                                                                                                                                                                                                                                                                      |
|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pxObjClass` | Always `"Embed-WhenConditions"`.                                                                                                                                                                                                                                                                 |
| `pyConditionLabel` | Letter label used in `pyLogic` — `"A"`, `"B"`, `"C"`, etc.                                                                                                                                                                                                                                       |
| `pyConditionFieldName` | The primary property reference the condition operates on (e.g., `".Priority"`). Used by Pega's change-tracking and by the form designer.                                                                                                                                                         |
| `pyConditionOperation` | The operator symbol (e.g., `"="`, `">"`, `"<="`). For non-comparison aliases (e.g. `PropertyHasValue`) use `"="`.                                                                                                                                                                                |
| `pyConditionValue1` | The compiled Pega expression — built from the alias's `pySignature` template by substituting in `pyCallParams` values. Example: `"@(Pega-RULES:ExpressionEvaluators).compareTwoValues(.Priority, \"=\", \"High\")"`.                                                                             |
| `pyConditionValue1Purpose` | Function alias name (e.g., `"CompareTwoValues"`). Must be one of the 65 aliases enumerated in `$defs/FunctionAliasName`.                                                                                                                                                                         |
| `pyCallParams` | Named parameters for the alias (varies by purpose). Keys/types are defined by the alias example in `library-function-builder/examples/`.                                                                                                                                                         |
| `pyFunctionData` | Full embedded structure (see library example). Required for the rule to render correctly in the form designer. Copy verbatim from the alias example, then substitute `pyParametersParamValue` on each `pyParameters[i]` and `pyUIParameters[j]` entry to match the actual `pyCallParams` values. |
| `pyConditionValue1String` | Human-readable rendering of the condition (e.g., `".Priority = \"High\" "`). Used by the form designer.                                                                                                                                                                                          |
| `pyConditionValue1StringLabel` | HTML-escaped, bracketed rendering used in the form list view (e.g., `"[.Priority][=][&quot;High&quot;]"`).                                                                                                                                                                                       |
| `pyCondValueCategory` | `"AND"` or `"OR"` — required on conditions B, C, etc. Omit on the first condition (A).                                                                                                                                                                                                           |

### Authoring workflow

1. Pick the alias by `pyConditionValue1Purpose` from the catalogue listed in
   `library-function-builder/SKILL.md` (Function Families table) or browse
   `library-function-builder/examples/`.
2. Copy the alias's `pyFunctionData` block verbatim from the library example.
3. Substitute your actual values into `pyParameters[i].pyParametersParamValue`
   and `pyUIParameters[j].pyParametersParamValue` (skip `Label`-typed
   `pyUIParameters` entries — those are static UI text).
4. Build `pyConditionValue1` by substituting `pyCallParams` values into the
   `pySignature` template.
5. Build `pyConditionValue1String` and `pyConditionValue1StringLabel` from the
   alias's `pyEcho` template (see library examples for the per-alias rendering).
6. Set `pyConditionFieldName` to the primary property reference and
   `pyConditionOperation` to the operator symbol.
7. Wrap in a `pyCondition[]` entry with `pyConditionLabel` and (for B+)
   `pyCondValueCategory`.
8. Reference the labels in `pyLogic` (e.g., `"A AND B"`).

### `pyLogic` uses condition labels, not expressions

`pyLogic` must reference the `pyConditionLabel` values declared in the
`pyCondition` array (e.g., `"A"`, `"A AND B"`). Setting it to a property
expression (e.g., `.Score > 80`) or literal (`"true"`) fails.

#### Grouping, precedence, and combinator forms

`pyLogic` supports parentheses and mixed AND/OR — no need to fall back to
multiple rules or restrict yourself to a flat AND-chain. Both word-form
(`AND` / `OR`) and symbolic (`&&` / `||`) combinators are accepted, and
labels may be either letters (`A`, `B`, `C`, …) or numbers (`1`, `2`, `3`, …)
as long as each label appears in `pyCondition[].pyConditionLabel`.

| `pyLogic` value | Meaning |
|---|---|
| `"A"` | Single condition |
| `"A AND B"` | Both must be true |
| `"A OR B"` | Either is true |
| `"(A OR B) AND C"` | A-or-B AND C |
| `"(A OR B) AND C AND (D OR E)"` | Mixed grouping with explicit precedence |
| `"(1) \|\| 2"` | Numeric labels with symbolic OR (legal — observed on live rules) |
| `"A AND B AND C AND D AND E"` | Flat AND-chain (5 conditions) |

When `pyLogic` is explicit and uses parentheses, the per-condition
`pyCondValueCategory` field becomes advisory (the explicit grouping wins).
Set `pyCondValueCategory` to `"AND"` or `"OR"` consistent with how the
condition is joined in `pyLogic` so the form designer renders correctly,
but precedence is driven by the `pyLogic` string itself, not the categories.

### `CompareTwoValues` comparator symbols

For `CompareTwoValues`, the `pyCallParams.comparator` field accepts only the
symbolic forms (matching `pyAllowedValues` on the parameter):

| Symbol | Meaning |
|--------|---------|
| `=` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

Word-form aliases like `Equals`, `NotEquals`, `GreaterThan` will pass schema
validation and create the rule, but the rule will not evaluate correctly at
runtime. Always use the symbolic form for `CompareTwoValues`.

Other aliases that take a `comparator` / `relation` parameter define their
own allowed-values list — see the corresponding library example. For example
`compareTwoStrings` uses `EQUALS` / `DOES NOT EQUAL` (word form).

### Function templates live in `library-function-builder`

The schema intentionally does **not** embed per-alias function templates — it
defines only the rule container shape (`Rule-Obj-When` properties plus the
`Embed-WhenConditions` / `Embed-UserFunction` / `Embed-MethodParams` structural
defs). The catalogue of supported boolean function aliases — their
`pySignature`, `pyEcho`, parameter list, and UI layout — is owned by
`library-function-builder/examples/`. Copy `pyFunctionData` from there into
your `pyCondition[]` entry.

### `Embed-MethodParams` is used in two different contexts

The same `Embed-MethodParams` class (and the `pyParametersParam*` field family)
appears in **two unrelated places** in a When rule. Treat them as separate
shapes — the schema models them as two distinct `$defs` (`MethodParam` vs
`RuleParameter`) and the same property name (`pyParametersParamType`) carries
a **different enum** in each.

| Context | Schema `$def` | Where it lives | `pyParametersParamType` enum | Purpose |
|---------|---------------|----------------|------------------------------|---------|
| **A. Function-call slot** | `MethodParam` | `pyCondition[].pyFunctionData.pyParameters` / `.pyUIParameters` / `.pyCallParams` | `Freeform`, `Values`, `HTMLProperty`, `Label`, `Alias`, `Textbox`, `Read`, `None`, `""` | **UI-rendering hint** for one argument slot of a function alias. Also carries `pyParametersParamValue`, `pyParametersParamDropdownValues`, `pyReference`, `pyNodeCaption`. Copied verbatim from a `library-function-builder` example. |
| **B. Rule-level Parameters tab** | `RuleParameter` | Top-level `pyParameters` on the rule | `Text`, `Date`, `DateTime`, `Integer`, `Decimal`, `TimeofDay`, `TrueFalse`, `Double`, `Page`, `""` | **Pega data type** of an input parameter the caller passes in (referenced at runtime as `Param.<name>`). Carries only name / type / description / default / direction / required — no `pyParametersParamValue`, no dropdown config, no `pyReference`. |

Practical implications when authoring:

- Do **not** put `"Text"` / `"Integer"` / `"Page"` / `"Date"` / etc. on a
  parameter inside `pyFunctionData` — those are data-type values and only
  belong on rule-level `pyParameters` (Context B). Function-call slots use
  UI hints like `"Freeform"` / `"Values"` / `"HTMLProperty"` / `"Label"`.
- Do **not** put `"Freeform"` / `"HTMLProperty"` / `"Label"` on a rule-level
  parameter — those are render hints, not data types, and the Parameters
  tab will reject them.
- For a `Page`-typed rule parameter (Context B), also declare the page's
  class in `pyPagesAndClasses`.
- Reference rule-level parameters inside `pyConditionValue1` and
  `pyCallParams` as `Param.<Name>` (case-sensitive). They are passed in by
  the caller (`When` step in an activity, `pyExecuteWhen` invocation, etc.).
- A rule-level parameter row carries **only** `pyParametersParamName`,
  `pyParametersParamType` (Pega data type), and (optionally)
  `pyParametersParamDesc` / `pyParametersParamDefaultValue`. Do **not** add
  `pyParametersParamValue`, `pyParametersParamDropdownValues`, `pyReference`,
  or `pyNodeCaption` — those belong only on function-call slots inside
  `pyFunctionData`.
- See the `With Rule-Level Parameters` example for a complete worked example.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub When Rule` | Minimal When rule — smallest valid create payload (always-true condition) |
| `Single Condition Equals` | Single string equality condition (`CompareTwoValues`) |
| `Multi-Condition AND` | Two conditions combined with AND logic (`compareTwoStrings` + `PropertyHasValue`) |
| `With Rule-Level Parameters` | Two rule-level Parameters (Text + Integer) referenced as `Param.<Name>` inside conditions — demonstrates the `Embed-MethodParams` shape used by the rule-level Parameters tab (Context B), distinct from function-call parameter slots |

### Per-alias condition examples

The per-alias condition templates (one file per `pyConditionValue1Purpose`
function alias) are maintained in **`library-function-builder/examples/`** and
shared with `Rule-Obj-Validate`, `Rule-Declare-DecisionTree`, and any other
rule type that stores the same function-alias shape. Pick the file by alias
name (e.g. `compare-two-values.md`, `property-has-value.md`,
`compare-two-strings.md`, `math-greater-than.md`,
`px-is-in-list-of-values.md`, `rule-obj-when.md`,
`1-free-form-expression-boolean.md`) and copy the `pyFunctionData` block into
your `pyCondition[]` entry as described in *Authoring workflow* above.

The full set of supported function aliases is documented in
`library-function-builder/examples/` (one file per alias).
