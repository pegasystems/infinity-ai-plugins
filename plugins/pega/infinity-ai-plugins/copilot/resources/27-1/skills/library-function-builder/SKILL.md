---
name: library-function-builder
description: Shared function-builder library for reusable Pega expression and condition function aliases used by When, Decision Tree, Validate, and similar rule types
---

# Function Builder Library

## Purpose

This skill is the shared home for reusable Pega function-alias examples used by
multiple rule types. Do not duplicate the same 60+ condition/expression function
examples in every `rules-rule-*` package.

Use this skill when authoring reusable function rows for:

- `Rule-Obj-When` conditions
- `Rule-Obj-Validate` embedded `pyValidWhen` / `pyRequiredWhen` conditions
- `Rule-Declare-DecisionTree` branch expressions
- Any future rule type that stores the same function-alias shape

Rule-type skills remain responsible for the surrounding rule container. This
library is responsible for the function alias, parameters, and function metadata.

## Full Data Model

Each example file defines a single function alias with three top-level keys:

| Key | Type | Description |
|---|---|---|
| `purpose` | string | The function alias key (e.g. `CompareTwoValues`, `PropertyHasValue`). In When rules this maps to `pyConditionValue1Purpose`. |
| `pyCallParams` | object | Authored parameter values keyed by parameter name. These are the user-supplied arguments. |
| `pyFunctionData` | `Embed-UserFunction` | Complete function metadata: signature, parameters, UI layout, return type. |

### pyFunctionData Fields

`pyFunctionData` has two kinds of fields:

1. **Function-identity fields** (verbatim from the library example — never edit per call site):
2. **Rule-instance fields** (injected by the rule-type adapter at embed time — never store these in the library example):

#### Function-identity fields (static, from example)

| Field | Description |
|---|---|
| `pxObjClass` | Always `"Embed-UserFunction"` |
| `pyName` | Function alias name (matches `purpose`) |
| `pyCity` | Display key (usually same as `pyName`) |
| `pySignature` | Java call signature with `{paramName}` placeholders, e.g. `@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, "{comparator}", {rValue})` |
| `pyEcho` | Human-readable sentence with `[paramDesc]` placeholders, e.g. `[first value] [relation] [second value]` |
| `pyLabel` | Compact label variant (placeholders only, no spaces between them) — verbatim source for `pyConditionValue1StringLabel` |
| `pyReturnType` | Return type: `"boolean"`, `"string"`, `"number"`, `"date"` |
| `pyRuleSet` | Source ruleset of the function (e.g. `"Pega-RULES"`, `"Pega-ProcessEngine"`, `"Pega-RulesEngine"`) |
| `pyDescription` | (Optional) Function description, surfaced as a tooltip |
| `pyParameters` | Array of `Embed-MethodParams` — the function's formal parameters. **The authored values live here.** |
| `pyUIParameters` | Array of `Embed-MethodParams` — the UI rendering layout. Interleaves `Label` rows with input rows. **Layout/metadata only; never carries authored values.** |

#### Rule-instance fields (present in library examples; populated/overridden per call site)

These fields ARE included in every library example file (verified: present on all 37 conditions of every live `Rule-Obj-When` instance examined). The library carries sensible defaults; the consuming rule-type adapter MUST override the per-call-site values listed below at embed time.

| Field | Library default | Per-call-site override |
|---|---|---|
| `pyBaseClass` | `"Rule-Obj-When"` | The hosting rule type — `"Rule-Obj-When"`, `"Rule-Obj-Validate"`, `"Rule-Declare-DecisionTree"`. Adapter sets this. |
| `pyClassName` | `"Work-"` placeholder | The hosting rule's Applies-To class (e.g. `"OrgOrg-App-Work-Foo"`). **The author/adapter MUST replace `"Work-"` with the actual class** — required for property smart-prompt scope. |
| `pySmartPromptClass` | `"pyClassName"` (literal string) | Never change. Resolves at runtime against the rule's `pyClassName`. |
| `pyUsage` | `"java"` | Never change. |

These fields are NOT in library examples (server- or runtime-populated, never persisted by an author): `pyExpanded`, `pyNewMessage`, `pyReference` (top-level on `pyFunctionData`, distinct from `pyUIParameters[].pyReference`), `pxWarningsToDisplay`.

### Parameter Types (pyParametersParamType)

| Type | Meaning | Key fields |
|---|---|---|
| `Freeform` | Free-text or property reference input (the workhorse). When used as a property picker, attach `pyParametersParamIntelliBaseClass: "pyClassName"`, `pyParametersParamIntelliRule: "Rule-Obj-Property"`, `pyParametersParamSize: "15"`. | `pyParametersParamIntelliValidateAs` (input width hint, typically `"15"` or `"30"`), `pyParametersParamDropdownValues: "Property"` for smart-prompt of properties. |
| `Values` | Constrained dropdown selection. | `pyParametersParamIntelliValidateAs` for the option source (`primary.pyComparators`, `.pySymbolComparators`, pipe-list `"Past\|true,Future\|false"`, etc.) AND `pyParametersParamDropdownValues: "Property"` or `"OptionsList"`. |
| `Alias` | Property picker scoped to a typed property (Date/DateTime), backed by a predefined property list. | `pyParametersParamIntelliValidateAs: "Date"` or `"DateTime"` AND `pyAllowedValues` array of property references (e.g. `[".pxCreateDateTime", ".pxUpdateDateTime", ...]`). |
| `HTMLProperty` | Smart-prompt picker for a named rule (When name, expression). | `pyParametersParamIntelliValidateAs: ".pySmartPromptRuleOpener"` (or `.pyRAFPropCollectionSP`, etc.) plus nested `pxPages.HtmlPropPage`. |
| `Read` | Read-only/hidden value (e.g. multiplicity flags `"ALL"`/`"ANY"`, `Primary.pzInsKey`). | Set `pyParametersParamValue` to the fixed value (quote-wrapped if literal). Does not appear as an input in `pyUIParameters`. |
| `Label` | **`pyUIParameters` only.** Static text between input slots. | `pyParametersParamValue` holds the label text (e.g. `"is greater than"`, `"contains"`, `"is in the past"`). |

**On `pyParametersParamIntelliValidateAs`:** for property-picker `Freeform` params, `"15"` / `"30"` are **input widths in characters**, not datatype codes. The actual datatype constraint is enforced by Pega's expression builder using the function signature. For `Values` params it instead points to the option-source (clipboard property or pipe-delimited inline list).

### pyUIParameters Layout

`pyUIParameters` defines the visual rendering order of the function's row in the rule form. It interleaves:

- **Input rows** — mirror entries from `pyParameters` (same `pyParametersParamName`, `pyParametersParamType`, `pyParametersParamDesc`, `pyParametersParamIntelliValidateAs`, `pyParametersParamDropdownValues`). They carry a `pyNodeCaption` (sequential `"1"`, `"2"`, `"3"`…) and a `pyReference` slot number.
- **Label rows** (`pyParametersParamType: "Label"`) — static text rendered between inputs. The text goes in `pyParametersParamValue` (e.g. `"is greater than"`, `"contains"`, `"is in the past"`).

**`pyReference` is the slot index in the full rendered row, INCLUDING Label rows.** Two layout patterns occur in live data:

- **No Label rows** (e.g. `CompareTwoValues`, where the middle `comparator` is a `Values` input that itself reads as the relation): three input rows with `pyReference: "1"`, `"2"`, `"3"`.
- **With Label rows** (e.g. `MathGreaterThan`, `StringEqualsIgnoreCase`, `contains`, `pxIsAttachmentOfCategoryInCase`): inputs and labels alternate. Inputs take slots `1, 3, 5, …` (refs `"1"`, `"3"`, `"5"`); labels sit between them with no `pyReference`.

**Critical: `pyUIParameters` input rows have `pyParametersParamValue: ""` (empty) in live data.** The authored value lives only in `pyParameters[i].pyParametersParamValue`. Populating `pyParametersParamValue` on `pyUIParameters` mangles the rule-form rendering (lost labels, regenerated expressions with extra quotes).

## Rule-Type Adapters

| Rule type | Purpose field | Reusable fields from this library | Rule-local fields |
|---|---|---|---|
| `Rule-Obj-When` | `pyCondition[].pyConditionValue1Purpose` | `pyCallParams`; builder/schema derives `pyFunctionData` from the purpose | `pyConditionLabel`, `pyCondValueCategory`, `pyLogic`, rule identity |
| `Rule-Obj-Validate` | `pyValidWhen.pyCondition[].pyConditionValue1Purpose` or `pyRequiredWhen.pyCondition[].pyConditionValue1Purpose` | `pyCallParams`, `pyFunctionData`, rendered condition labels | Validation property, required/error behavior, messages, validate-rule chaining |
| `Rule-Declare-DecisionTree` | `pyLogic[].pyExpressionPurpose` | `pyCallParams`, `pyFunctionData`, function signature and parameter metadata | `pyExpression`, `pyExpressionString`, `pyExpressionStringLabel`, `pyAction`, `pyResult`, `pyDelegatedRestrictions` |

## Authoring Workflow

1. Load the target rule-type skill to understand the surrounding payload.
2. Load `library-function-builder` when the rule needs a reusable function alias.
3. Pick the closest file in `examples/` by purpose name or function family.
4. Copy `pyFunctionData` shape from the example exactly (signature, parameter
   metadata, UI layout). Do **not** invent new shapes.
5. Write the user's business value for **each** parameter into all of the
   following positions (see *Where business values must be written* below).
6. Pre-render the condition's display strings (`pyConditionValue1`,
   `pyConditionValue1String`) by substituting the values into the
   `pySignature` / `pyEcho` templates from `pyFunctionData` — Pega does not
   auto-render these.
7. Apply the target rule-type adapter from the table above to embed into the
   rule container.

### Where business values must be written

For every parameter `P` with business value `V`, populate **two** positions in the embedded condition payload:

| Location | Purpose | Notes |
|---|---|---|
| `pyCallParams[P]` | Keyword-keyed authored value (round-trip / introspection). | Always populate. |
| `pyFunctionData.pyParameters[i].pyParametersParamValue` | **Compiler input.** The Pega builder reads this when generating the compiled `pyConditionValue1` Java expression. | Must be set for **every** non-`Label` parameter (including `Values`, `Alias`, `Read`, `HTMLProperty`). Empty here produces a compiled expression with empty arguments. |

**Do NOT write `V` into `pyFunctionData.pyUIParameters[j].pyParametersParamValue`.** Live data has this empty string in every UI row; the row's `pyReference` (slot) plus the mirrored entry in `pyParameters` is how the form locates the value. Writing into `pyUIParameters` causes the rule form to drop static labels and regenerate the call expression with stray quotes/empties.

In addition, on the surrounding `Embed-WhenConditions` (or the equivalent for other rule types):

| Field | How to build it |
|---|---|
| `pyConditionValue1` | Take `pyFunctionData.pySignature` and substitute each `{paramName}` placeholder with the corresponding value `V`. This is the compiled call. |
| `pyConditionValue1String` | Take `pyFunctionData.pyEcho` and substitute each `[paramDesc]` placeholder with the corresponding value `V`. This is the human-readable form. |
| `pyConditionValue1StringLabel` | Copy `pyFunctionData.pyLabel` verbatim (placeholders are kept; this is a template, not a rendered string). |

**Why this matters:** `pyCallParams` alone is **not** sufficient. The Pega
condition builder does not propagate `pyCallParams` into the compiled
`pyConditionValue1` expression or into the UI display. Skipping the
`pyParametersParamValue` writes silently produces a rule that compiles
without arguments and always evaluates with empty strings.


## Function Families

### Comparison

| Skill | Description |
|-------|-------------|
| `CompareTwoValues` | [first value] [relation] [second value] |
| `CompareTwoNumbers` | [first number] [relation] [second number] |
| `CompareTwoDateTimes` | [First DateTime] [relation] [Second DateTime] |
| `pxCompareDateTimes` | compare DateTimes using [lDate] [relation] [rDate] |

### String

| Skill | Description |
|-------|-------------|
| `compareTwoStrings` | [first String] [relation] [Second String] |
| `StringEquals` | [the first string] equals [the second string] |
| `StringEqualsIgnoreCase` | [first string] equals (ignore case) [second string] |
| `StringNotEqualsIgnoreCase` | [first string] does not equal (ignore case) [second string] |
| `contains` | [string to search on] contains [string to search for] |
| `pzContainsIgnoreCase` | [string to search on] contains (ignore case) [string to search for] |

### Null/value

| Skill | Description |
|-------|-------------|
| `PropertyHasValue` | [property reference] has a value |
| `PropertyExistsAndHasValue` | Property [strReference] exists and has a value |
| `LocalEvaluateProperty` | value is [expression] |

### Property

| Skill | Description |
|-------|-------------|
| `setPropertyValue` | Set [Property] equal to [Value] |

### Date/time

| Skill | Description |
|-------|-------------|
| `CurrentDateTime` | the current DateTime (GMT) |
| `pxCompareDateTimeToSymbolicDate` | Compare [date] using [comparator] to [symbolic date] |
| `pxDateTimeisPastOrFuture` | [a datetime] is in the [past/future] |
| `WithinDaysOfNow` | [date] is within [num] days of the current time |
| `CreatedRecently` | created within the last [num] days |
| `ResolvedRecently` | resolved within the last [num] days |

### Math

| Skill | Description |
|-------|-------------|
| `MathGreaterThan` | [first number] is greater than [second number] |
| `MathGreaterThanEqualTo` | [first number] is greater than or equal to [second number] |
| `MathLessThan` | [the first number] is less than [the second number] |
| `MathLessThanEqualTo` | [the first number] is less than or equal to [the second number] |

### Page-list membership

| Skill | Description |
|-------|-------------|
| `pxValueIsInPageList` | [Pagelist Name] contains a page where [Property Name] equals [Value] |
| `pxValueIsNotInPageList` | [pagelist to look in] does not contain a page where [property name to look at] equals [value to look for] |
| `pxIsInPageListWhen` | [pagelist to look in] contains a page where [when record] evaluates to true |
| `pxPageListLengthCompare` | length of [a pagelist property] is [comparison operator] [value] |
| `pxHasPagesCountInPageListWhen` | [page list to look in] contains pages with count [comparator] [count to check the match] where [whenName] evaluates to true |

### List-of-values

| Skill | Description |
|-------|-------------|
| `pxIsInListOfValues` | [value] is in [list of values] |
| `pxIsNotInListOfValues` | [value] is not in [list of values] |
| `pxIsInListOfValuesWCB` | [value] is in [list of values] |
| `pxIsNotInListOfValuesWCB` | [value to search for] is not in [list of values] |
| `pxIsInListOfValuesInPageList` | [the property list to look in] contains a page where [the property name to get value of] is in [comma delimited list of values to compare against] |
| `pxIsNotInListOfValuesInPageList` | [the property list to look in] does not contain a page where [the property name to get value of] is in [comma delimited list of values to compare against] |
| `pxIsInListOfValuesWCBInPageList` | [lookIn] contains a page where [lookAt] is in [listOfValues] |
| `pxIsNotInListOfValuesWCBInPageList` | [the property list to look in] does not contain a page where [the property name to get value of] is in [comma delimited list of values to compare against] |

### When delegation

| Skill | Description |
|-------|-------------|
| `Rule-Obj-When` | Rule [When record] evaluates to true |
| `pzRule-Obj-Whenfalse` | Rule [R-O-When] evaluates to false |
| `pxCallWhenUsingPage` | Call when [blockName] using page [stepPage] evaluates to [evaluatesTo] |

### Collection eval

| Skill | Description |
|-------|-------------|
| `pyCollectionEvalReturnBoolean` | Return value is [True / False] |
| `pyCollectionEvalReturnNumber` | Return value [relation] [number] |
| `pyCollectionEvalReturnDate` | Return value [relation] [Second DateTime] |
| `pyCollectionEvalReturnString` | Return value [relation] [Second String] |
| `pyCollectionHasReturnValue` | Return value has value |

### Validation/toggle

| Skill | Description |
|-------|-------------|
| `invokeValidate` | Validation of [Property Name] using [Edit Validate Name] fails |
| `pzIsToggleEnabled` | Is Toggle Enabled using [ToggleType] [ToggleIdentifier] |
| `pxIsAttachmentOfCategoryInCase` | A [attachment category] is [attached/not attached] to the current case |
| `pxAssignedToMyStaff` | Check if assignment is to current operator's staff |

### Free-form

| Skill | Description |
|-------|-------------|
| `1FreeFormExpressionBoolean` | [expression evaluates to true] |

### Date comparison (days)

| Skill | Description |
|-------|-------------|
| `CompareDatesInDays` | [first date] is a full day or more after [second date] |
| `CompareDates` | [first date] is on the next day or later than [second date] using [daysOnly] |
| `CompareDateTimes` | [first date] is after [second date] |

## Key Authoring Rules

1. **Never modify `pyFunctionData` structure** — it is system-defined. Copy it
   verbatim from examples (signature, parameter list, UI layout).
2. **Write each business value into TWO places** — `pyCallParams[name]` AND
   `pyFunctionData.pyParameters[i].pyParametersParamValue`. **Do NOT** write
   the value into `pyFunctionData.pyUIParameters[j].pyParametersParamValue`
   (it must stay `""`). Populating `pyCallParams` alone produces a compiled
   expression with empty arguments; populating `pyUIParameters` mangles the
   rule-form labels.
3. **Pre-render `pyConditionValue1` and `pyConditionValue1String`** by
   substituting values into `pySignature` and `pyEcho` from `pyFunctionData`.
   Pega does not auto-render these. (Note: the server may post-process and
   replace your `pyConditionValue1String` template with a fully rendered
   form — both are accepted as input.)
4. **String literals must be double-quoted** in every place — e.g. the value
   for `rValue` must be written as `"\"Premium\""` (a JSON string whose
   content is `"Premium"`), so that the substitution into `pySignature`
   yields `compareTwoStrings(.AccountType, "EQUALS", "Premium")`.
5. **Property references use dot notation** — e.g. `.Priority`, `.Customer.Name`.
6. **`pyPropertyName` (and any property reference inside `pyParametersParamValue`)
   must reference a property that actually exists on the target class.** The
   server validates property names at create time and returns 500 with
   `"does not exist or is not a valid entry for ..."` for unknown properties.
   Always verify property names with `list-rules ruleType=Rule-Obj-Property
   className=<TargetClass>` before authoring.
7. **The compiled function call is type-checked at create time.** The Pega
   builder resolves the signature against the actual property types when
   generating Java. Numeric-family functions (`MathGreaterThan`, `MathLessThan`,
   `CompareTwoNumbers`, etc.) require numeric arguments — passing a `String`
   property fails with `"No suitable instance found Math.greaterThan(String, int)"`.
   Either choose a numeric property, or use literal numeric values on both
   sides. String-family functions (`compareTwoStrings`, `StringEquals`, etc.)
   work with String properties or quoted string literals.
8. **`pyIsOptional` is a JSON string, not a boolean.** The v2 builder schema
   declares `pyIsOptional` as `type: string` with enum `["true", "false",
   ""]` and the on-the-wire format Pega stores is a quoted string. Always
   emit `"true"` / `"false"` (with quotes), not bare `true` / `false`.
   Verified against live `Rule-Obj-When` instances (e.g.
   `pyParameters[i].pyIsOptional: "false"`) and matches every example file
   in this directory.
9. **`pyAllowedValues` constrains valid inputs** — when present, the value
   written must be from this list. Required on `Alias` parameters (the
   predefined property list backing the smart-prompt) and on `Values`
   parameters when the dropdown options are enumerated inline rather than
   sourced from a clipboard property.
10. **`pyParametersParamIntelliValidateAs` is context-dependent, not a single code table.** Decoding by parameter type:
    - **`Freeform` (property picker):** `"15"`, `"30"` are input widths in characters. The datatype constraint comes from the function signature, not this field. Pair with `pyParametersParamIntelliBaseClass: "pyClassName"`, `pyParametersParamIntelliRule: "Rule-Obj-Property"`, `pyParametersParamSize: "15"` (or `"30"`).
    - **`Alias`:** Pega type name — `"Date"`, `"DateTime"`. Constrains the smart-prompt to typed properties.
    - **`Values`:** Pointer to the option source — `primary.pyComparators`, `Primary.pyDateComparators`, `primary.pyComparatorsString`, `.pySymbolComparators`, `.pySymbolicDates`, OR pipe-delimited inline list `"Past|true,Future|false"`, OR a literal-quoted constant like `"\"ALL\""`/`"\"ANY\""` for `Read` multiplicity holders. Must be paired with `pyParametersParamDropdownValues` (`"Property"` for clipboard sources, `"OptionsList"` for inline pipe-lists).
    - **`HTMLProperty`:** Smart-prompt source — `.pySmartPromptRuleOpener` (rule-name picker), `.pyExpressionBuilder` (expression editor), `.pyRAFPropCollectionSP` (page-list picker).
    - **`Read`:** Quoted literal value (`"\"ALL\""`, `"\"ANY\""`) or page property reference (`Primary.pzInsKey`). Renders as hidden/read-only.

11. **`pyBaseClass`, `pyClassName`, `pySmartPromptClass` are present in library examples; `pyClassName` MUST be overridden per call site.** Verified live: all conditions carry all three. The library template ships with:
    - `pyBaseClass: "Rule-Obj-When"` — adapter overrides to match the hosting rule type (e.g. `"Rule-Obj-Validate"` for Validate rules).
    - `pyClassName: "Work-"` — **placeholder; the author or rule-type adapter MUST replace this with the rule's Applies-To class** (e.g. `"OrgOrg-App-Work-Foo"`). Smart-prompt property pickers in the rule form are scoped by this value.
    - `pySmartPromptClass: "pyClassName"` — constant literal string, never change.
12. **List-of-values aliases need self-quoting + auxiliary fields.**
    Almost every list-of-values alias requires the `listOfValues` parameter
    value to be wrapped in literal double-quotes (`"\"'A','B','C'\""`) AND
    to carry these extra fields on the `pyParameters` entry:
    `pyCommaDelimitedString`, `pyHtmlPropertyDropDownValues: "Property"`,
    `pyParametersParamDropdownValues: "Property"`,
    `pyParametersParamIntelliValidateAs: ".pyCommaDelimitedString"`,
    `pySelectedValues` (dquoted items only, e.g. `"\"A\",\"B\",\"C\""`),
    and a nested `pxPages.HtmlPropPage` sibling (`{pxObjClass: "Rule-Obj-Validate",
    pxSubscript: "HtmlPropPage", pyCommaDelimitedString: "\"'A','B','C'\""}`).
    Pega's alias-expansion engine rebuilds the compiled expression from
    `pyParameters` / `pyCallParams`, **not** from `pyConditionValue1`. Without
    these fields the engine fails with `No candidates found …` or strips the
    outer dquotes (`mismatched input 'NY'`).

    **Which variants need it:** All `*WCB` aliases (including the "Not" WCB
    forms — `pxIsNotInListOfValuesWCB` triggered failures with `@`-bearing
    values), all non-WCB "In" aliases (`pxIsInListOfValues`,
    `pxIsInListOfValuesInPageList`), and all `*InPageList` counterparts.
    Only plain `pxIsNotInListOfValues` (non-WCB, non-PageList) accepts a
     bare `"CA,NY,TX"`; when in doubt, apply the full template. See
     `examples/px-is-in-list-of-values.md`.
13. **`Values` dropdown params need BOTH `pyParametersParamIntelliValidateAs`
    AND `pyParametersParamDropdownValues`** — and they must appear on BOTH the
    `pyParameters[*]` entry AND its mirror in `pyUIParameters[*]`. Setting
    `pyAllowedValues` alone is NOT sufficient; the form designer renders an
    empty dropdown without the IntelliValidate + DropdownValues pair, even
    though `pyConditionValue1` looks correct.

    Common combos for `pyParametersParamType: "Values"`:

    | Use case | `pyParametersParamIntelliValidateAs` | `pyParametersParamDropdownValues` |
    |---|---|---|
    | 6-symbol numeric/string comparator (`<`, `<=`, `=`, `!=`, `>=`, `>`) | `"primary.pyComparators"` | `"Property"` |
    | Date comparator | `"Primary.pyDateComparators"` | `"Property"` |
    | String comparator | `"primary.pyComparatorsString"` | `"Property"` |
    | Symbol comparator | `".pySymbolComparators"` | `"Property"` |
    | Symbolic date (today, yesterday, …) | `".pySymbolicDates"` | `"Property"` |
    | ALL / ANY multiplicity | `"\"ALL\""` (literal-quoted) | `"Property"` |
    | Custom inline options | e.g. `"Less Than|<,Greater Than|>,Equal To|="` | `"OptionsList"` |

    Without these, comparators in saved rules render as blank dropdowns in
    the rule form even though the underlying expression compiles fine.
14. **`HTMLProperty` params (rule-name pickers) need value on `pyParameters`,
    NOT on `pyUIParameters`.** For aliases like `Rule-Obj-When` (`evaluateWhen`),
    `pzRule-Obj-Whenfalse` (`pzevaluateWhenfalse`), and `invokeValidate` whose
    parameter has `pyParametersParamType: "HTMLProperty"`:
    - **`pyParameters[*].pyParametersParamValue`** = the rule name **unquoted**
      (e.g. `"IsHighRisk"`, NOT `"\"IsHighRisk\""`). Pega substitutes this
      into the signature template, which already wraps it in `\"…\"`.
    - **`pyUIParameters[*].pyParametersParamValue`** = `""` (empty string).
      The form designer reads from here for display state; leaving it
      populated causes Pega to regenerate the call as
      `evaluateWhen("""")`.
    - Both entries also need `pyParametersParamDropdownValues: "Property"`
      and `pyParametersParamIntelliValidateAs: ".pySmartPromptRuleOpener"`
      (or the appropriate IntelliPrompt token for the rule type).
    - Verified by inspecting OOTB
      `RULE-OBJ-VALIDATE PEGAPROJMGMT-WORK-PRODUCT-VERSION COMMONVALIDATION` —
      same pattern.

## Pega Expression Syntax Pitfalls (free-form `expression` params)

When a function alias takes a free-form expression (notably
`1FreeFormExpressionBoolean`, `FreeFormExpressionBoolean`,
`pyCollectionEvalReturn*`, `LocalEvaluateProperty`), the value is parsed by the
Pega expression engine, not by the Java compiler.

**Java method-call (dot) syntax on properties is rejected.** Use Pega library
functions instead:

| Wrong (Java sugar) | Right (Pega function) |
|---|---|
| `.X.matches(regex)` | `@(Pega-RulesEngine:String).pxContainsViaRegex(.X, regex, true)` |
| `.X.length() > N` | `@(Pega-RULES:String).length(.X) > N` |
| `.X.toLowerCase()` | `@(Pega-RULES:String).toLowerCase(.X)` |
| `.List.size()` | use `@pxPageListLengthCompare(...)` or a dedicated alias |

For the full catalogue of validated Pega expression functions
(string, regex, length, empty-check, date, math, list), see
**`library/string-manipulation`**, **`library/numeric-and-math`**,
**`library/date-and-time`**, and **`library/collection-operations`**.

See `examples/1-free-form-expression-boolean.md` for the full pitfalls section
and copy-ready expression patterns.

