---
name: rules-rule-obj-validate
description: Schema and authoring guide for Pega validate rules (Rule-Obj-Validate), including the declarative validation grid (pyValidationValues), embedded when conditions, validate-rule chaining, compiled activity steps, and per-condition examples
---

**Prerequisites:**
- Load `methodology-rule-authoring` first
- Load `library-function-builder` whenever a `pyValidWhen` / `pyRequiredWhen`
  condition needs a function alias (`pyConditionValue1Purpose`). The shared
  library owns the full catalogue of 60+ function-alias examples
  (`PropertyHasValue`, `CompareTwoValues`, `compareTwoStrings`,
  `pxIsInListOfValues`, `MathGreaterThan`, etc.) along with their
  `pyFunctionData` shapes and `pyCallParams` keys. This skill no longer
  duplicates them.

## Authoring Notes

### `pyActivityName` is the class key

`pyActivityName` (with `pyClassName`) is the identity key and the value the
agent must supply. There is no separate `pyRuleName` field — `pyActivityName`
serves as both the key and the rule name.

### Two flavors: `ACTIVITY` (dominant) vs `VALIDATE`

`pyActivityType` selects the authoring model. The schema auto-fills
`ACTIVITY`, which is the dominant style in modern Pega applications.

| Flavor | When to use | Core fields |
|--------|-------------|-------------|
| `ACTIVITY` *(default, auto-filled)* | Declarative property validations with rich embedded when-conditions, required logic, error messages, and validate-rule chaining. Compiled steps (`pySteps`) are derived automatically. | `pyValidationValues[]` → `ValidationValue` → `pyValidations[]` → `PropertyValidation` |
| `VALIDATE` | Hand-authored, step-driven validation using direct `Property-Validate` / `Property-Set-Messages` / `Obj-Validate` calls — useful for procedural, sequential validation logic. | `pySteps[]` with `pyStepsActivityName` set to the validation method |

Only set `pyActivityType` explicitly when authoring in `VALIDATE` mode.

### `pyValidationValues` is the core of ACTIVITY mode

Each entry in `pyValidationValues` is an **`Embed-ValidationValue`** column
(typically a single "Default Validation" entry; additional entries represent
circumstanced variants). A column contains:

- `pyValidations[]` — one **`Embed-PropertyValidation`** row per property, with:
  - `pyPropertyName`, `pyPropertyMode`, `pyRequired`, `pyContinue`
  - `pyValidationType` — `ValidateProperty` (validate this property) or `CallValidateSingle` (delegate to another validate rule via `pyCallValidate`)
  - `pyMessageValue` — literal error string (in escaped quotes) or a Rule-Message reference
  - `pyValidWhen` — embedded `Rule-Obj-When` defining when the error fires
  - `pyRequiredWhen` — embedded `Rule-Obj-When` controlling when `pyRequired` applies
- `pyAddValidates[]` — chain of additional validate rules to run after this column (each is an `Embed-Reference-Rule` referencing another validate rule by `pyRuleName`)

**Field-type gotchas (caught the agent in past runs):**

- `pyColumnExpanded` is a **boolean** (`true` / `false`), not a quoted string.
  Sending `"true"` produces a payload validation error.
- `pyMessageValue` is the literal error text wrapped in escaped double-quotes
  (e.g. `"\"Field must not be empty.\""`), or a `Rule-Message` reference name.
- `pyValidationType` is either `ValidateProperty` (validate this row's property)
  or `CallValidateSingle` (delegate — provide `pyCallValidate` with the target
  validate-rule name).

### Embed-WhenConditions wiring (required boilerplate)

Each row inside `pyValidWhen.pyCondition[]` carries three fixed fields that
wire the function-alias result into the when-rule engine. **Treat them as
required boilerplate — do not vary the values.**

| Field | Value | Meaning |
|---|---|---|
| `pyConditionFieldName` | `"true"` | Compare the function result against the literal on the right |
| `pyConditionOperation` | `"="` | Equality test |
| `pyConditionValue1` | `"false"` | The literal compared against |

Net effect: the row passes when the function result equals `false`, and the
validate engine inverts that into "**fire the error when the function returns
true**." Author your `1FreeFormExpressionBoolean` (or other purpose) so the
condition returns `true` precisely when the value is invalid.

### Embedded when conditions reuse the function-builder library

Each `WhenCondition` (`Embed-WhenConditions`) inside `pyValidWhen` /
`pyRequiredWhen` carries a `pyConditionValue1Purpose` function alias that
identifies the underlying utility function (e.g. `PropertyHasValue`,
`MathGreaterThan`, `compareTwoStrings`, `pxIsInListOfValues`,
`isInThePastDate`, `Rule-Obj-When`). The full list of supported aliases is
defined by the enum on `pyConditionValue1Purpose` in the schema and the
authoritative per-alias templates live in **`library-function-builder/examples/`**.

To author a condition for a validate rule:

1. Pick the alias example from `library-function-builder/examples/` that
   matches your `pyConditionValue1Purpose`.
2. Copy `pyFunctionData` verbatim. **Write the user's business value into all
   three positions** for every parameter — `pyCallParams[name]`,
   `pyParameters[i].pyParametersParamValue`, and
   `pyUIParameters[j].pyParametersParamValue` — see the *Where business
   values must be written* section in `library-function-builder/SKILL.md`.
   Populating only `pyCallParams` produces a compiled rule with empty
   arguments (e.g. `compareTwoStrings("", "EQUALS", "")`).
3. Pre-render `pyConditionValue1` and `pyConditionValue1String` on the
   surrounding `Embed-WhenConditions` by substituting the values into the
   `pySignature` and `pyEcho` templates from the library example. Copy
   `pyConditionValue1StringLabel` verbatim from `pyLabel` (it stays a
   template).
4. Wrap in an `Embed-WhenConditions` clause and place it inside
   `pyValidWhen.pyCondition[]` (or `pyRequiredWhen.pyCondition[]`). See
   `examples/pyValidWhen/embed-whencondition-clause.md` for the row shape.

### `LocalEvaluateProperty` does not work in `pyValidWhen`

The `LocalEvaluateProperty` alias has `pySignature: "{expression}"` — its
`pyConditionValue1` *is* the boolean expression itself. Inside a
`Rule-Obj-Validate` `pyValidWhen` row, the validate engine wraps the result as
`<.pyPropertyName>==<pyConditionValue1>`, which corrupts the expression
(server rewrites `pyConditionValue1` to `= <expr>`, the activity precondition
compiles to `.Field==.Field=="..."`, and the UI label is blanked).

Use a different alias for inline boolean expressions inside validate rules:

- For a free-form boolean (`.Field == ""`, `.x > .y`, etc.), use
  `1FreeFormExpressionBoolean` (`expression` parameter).
- For null/empty checks, use `PropertyHasValue` or `PropertyExistsAndHasValue`.

`LocalEvaluateProperty` is intended for activity-step **`pyStepsPreCondParams`**
(e.g. on a `Property-Set-Messages` step) — *not* for `pyValidWhen` rows on a
`Embed-PropertyValidation`. The OOTB `PegaProjMgmt-Work LabelValidation` rule
demonstrates the activity-step pattern.

**Do not scrape OOTB rules** to discover this shape. The `library-function-builder/examples/`
files plus this adapter are sufficient. Scraping OOTB rules typically
copies `pyParametersParamValue: ""` from rules whose values were never
authored, reproducing the broken pattern.

### List-of-values aliases need self-quoting + auxiliary fields

Pega's alias-expansion engine rebuilds the compiled when expression from
`pyParameters` / `pyCallParams`, **not** from `pyConditionValue1`. Almost
every list-of-values alias requires the `listOfValues` parameter to be
self-quoting *and* carry several extra `Embed-MethodParams` fields so the
engine recognizes the comma-delimited list:

- **All `*WCB` variants** (`pxIsInListOfValuesWCB`, `pxIsNotInListOfValuesWCB`,
  and their `*InPageList` counterparts) — the WCB ("with code base") form
  always needs the auxiliary fields, even the "Not" version.
- **All non-WCB "In" variants** (`pxIsInListOfValues`,
  `pxIsInListOfValuesInPageList`) — same treatment.
- **Only `pxIsNotInListOfValues` (plain, non-WCB)** accepts a bare
  unquoted list like `"CA,NY,TX"`. Even here, runtime semantics for a
  literal list are unverified — when in doubt, apply the full template.

**Symptoms when the extra fields are missing:**
- `No candidates found [possible function name, ruleset/version or number of parameter problem]` — alias expansion failed.
- `mismatched input 'NY'` — Pega stripped the outer double-quotes because the value wasn't recognized as a quoted list.

**Required shape** — see `examples/pyValidWhen/list-of-values-condition-params.md`
for the full `pyCallParams` + `pyFunctionData` template (the literal value is
`"'CA','NY','TX'"` — outer dquotes are part of the string;
`pyUIParameters[listOfValues].pyParametersParamValue` is `""` because the UI
display is sourced from `pyCommaDelimitedString`, while
`pyParameters[listOfValues].pyParametersParamValue` carries the literal quoted
list). See also `library-function-builder/examples/px-is-in-list-of-values.md`
for the alias-side template.

### `entrySatisfiesCondition` aliases need a value-list/group property

The aliases `allEntriesSatisfyCondition` and `anyEntrySatisfiesCondition`
both compile to
`@(Pega-RULES:ExpressionEvaluators).entrySatisfiesCondition(ClipboardPropertyCollection, String, double, String)`.
The first argument MUST be typed as `ClipboardPropertyCollection` by the
expression resolver — i.e. a **value list** or **value group** property.

A `PageList` property (e.g. `.Countrylist`) is typed as `ClipboardProperty`,
not `ClipboardPropertyCollection`, and the resolver fails with
`No suitable instance found [seeking] entrySatisfiesCondition(ClipboardProperty,String,int,String)`.

If the target class has no value-list/group property, you cannot use these
two aliases on it. Add such a property first (e.g. a `Scores` value list
property of type Integer) before authoring the validation. Also pass the
`value` parameter as a numeric literal that resolves to `double` — `1.0`
is safer than `1`.

### Decorative purpose aliases collapse to underlying signature

A subset of `pyConditionValue1Purpose` aliases are **decorative** — they share
the underlying `compareTwoStrings` or `compareTwoNumbers` signature and only
differ in their UI default property/label. After the rule is saved, the server
rewrites `pyConditionValue1Purpose` to the underlying alias and discards the
decorative name:

| Decorative alias (input)                                           | Stored as          |
|--------------------------------------------------------------------|--------------------|
| `Status`, `StatusResolved`, `Language`, `RootCause`                | `compareTwoStrings`|
| `Urgency`, `Satisfaction`                                          | `CompareTwoNumbers`|

The rule still compiles and works correctly — only the purpose label is
normalized. By contrast, aliases that map to a **distinct** function
(`pxAssignedToMyStaff`, `pzCheckBatchStopRequest`, `pzIsToggleEnabled`,
`pxValueIsInPageList`, etc.) are preserved verbatim.

Implication: do not rely on the decorative purpose surviving a round-trip.
For programmatic discovery of "which property is being validated as a status",
inspect `pyFunctionData.pyParameters[lValue].pyParametersParamValue` rather
than the purpose.


### `Values` dropdown params: IntelliValidate + DropdownValues required

For any condition function whose parameter has `pyParametersParamType: "Values"`
(comparator dropdowns, ALL/ANY multiplicity, symbolic dates, custom option
lists), the entry MUST set BOTH `pyParametersParamIntelliValidateAs` AND
`pyParametersParamDropdownValues` — and they must be mirrored on
`pyUIParameters[*]` as well as `pyParameters[*]`. `pyAllowedValues` alone
makes the form designer render an empty dropdown.

See `library-function-builder/SKILL.md` rule 12 for the comparator/symbolic-date
lookup table.

### Identity and version fields

`pyRuleSet` and `pyRuleSetVersion` are auto-derived by the authoring tooling.
`pyJavaGenerateAPIVersion` (`03-02`), `pyJavaFUAVersion` (`03-02`), and
`pyJavaGenerateVersion` (`03-01-01`) are fixed constants for current Infinity
versions and are auto-filled.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `validate-stub` | Minimal validate rule — smallest valid create payload |

### Row/shape examples

| Skill | Description |
|-------|-------------|
| `property-validate` | VALIDATE-mode step shape — `Property-Validate` for required-field checks |
| `property-validations-with-conditions` | ACTIVITY-mode validation column shape — multi-property `pyValidations` with embedded `pyValidWhen` conditions built from `1FreeFormExpressionBoolean` |
| `embed-whencondition-clause` | Embedded when-condition fragment — generic row shape for `pyValidWhen.pyCondition[]` |
| `list-of-values-condition-params` | `pyCallParams` + `pyFunctionData` shape for list-of-values aliases |

### Embedded when conditions

The per-alias condition templates (one file per `pyConditionValue1Purpose`
function alias) are maintained in **`library-function-builder/examples/`** and
are shared with `Rule-Obj-When`, `Rule-Declare-DecisionTree`, and any other
rule type that stores the same function-alias shape. Pick the file by alias
name (e.g. `property-has-value.md`, `compare-two-strings.md`,
`math-greater-than.md`, `px-is-in-list-of-values.md`,
`rule-obj-when.md`, `1-free-form-expression-boolean.md`) and apply the
validate-rule adapter described in *Embedded when conditions reuse the
function-builder library* above.

The full set of supported function aliases is enforced by the
`pyConditionValue1Purpose` enum in the schema.

