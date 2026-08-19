---
name: rules-rule-declare-decision-table
description: Schema and authoring guide for Pega Decision Table rules (Rule-Declare-DecisionTable), including column structure, delegated restrictions, multi-result property columns, page list macros, and examples
---

## Overview

A Decision Table (`Rule-Declare-DecisionTable`) evaluates tabular logic: conditions
are **columns**, rows are implicit (encoded as parallel arrays), and evaluation is
top-to-bottom first-match-wins. If no row matches, `pyDefaultResult` is returned.

```
Row 1: Col1.Condition[1] AND Col2.Condition[1] → Results[1]
Row 2: Col1.Condition[2] AND Col2.Condition[2] → Results[2]
Default: → pyDefaultResult
```


## String List Serialization (CRITICAL)

`pyCondition` and `pyResults` are **String Lists**. They accept only **simple
string arrays**. Two other formats fail:

| Format | Result |
|--------|--------|
| Indexed notation (`"pyCondition(1)": "80"`) | HTTP 500 — JSON-to-clipboard conversion error |
| Array of objects (`[{"pxObjClass": "Embed-DecisionTable-Condition", ...}]`) | HTTP 500 — "pyResults was of mode String List while expecting Page List" |
| **Simple string arrays** (`[">=80", ">=0"]`) | **Works** |

`pyCondition` values concatenate operator and value into a single string:

```json
"pyCondition": [">=80", ">=0"]
"pyCondition": ["<0.20", ">=0.20"]
"pyCondition": ["Active", "Inactive"]
```

`pyResults` values are plain strings:

```json
"pyResults": ["Pass", "Fail"]
```

**Read/write symmetry:** Both GET and `create-rule` / `update-rule` use the same simple array format.

## Row Definition Fields

`pyColumns` and `pyResults` are required when defining rows in a decision table.
Omitting both creates a bare-shell rule with no columns or rows, which is valid for
an initial create payload and can be populated later through Dev Studio.

| Field | Description |
|-------|-------------|
| `pyColumns` | Array of `Embed-DecisionTable-Column` — required when defining rows |
| `pyResults` | Result values — simple string array — required when defining rows |

## Column Structure

Each column is an `Embed-DecisionTable-Column` inside the `pyColumns` array:

| Field | Required | Description |
|-------|----------|-------------|
| `pyProperty` | Yes | `.PropertyName` (case property) or `Param.Name` (parameter) |
| `pyPropertyLabel` | No | Human-readable column label |
| `pyColumnDataType` | No | `"integer"`, `"decimal"`, `"text"`, `"date"`, `"truefalse"` — Pega auto-corrects if mismatched with property type |
| `pyCondition` | Yes | Simple string array — operator+value concatenated per row |
| `pyDefaultOperator` | No | Default operator for Dev Studio display (`"="`, `"!="`, `">="`, `"<="`, `">"`, `"<"`) |
| `pyUseRange` | No | `"false"` (range conditions flag) |
| `pyUseRangeMax` | No | `"false"` (range max flag) |
| `pyOrConditions` | No | OR conditions array — see `decision-table-or-conditions` |

**Condition value format:** Operator concatenated with value as a single string.
All values are strings regardless of data type:

```json
"pyCondition": [">=80", "<80"]
"pyCondition": ["Active", "Inactive"]
"pyCondition": [">=20230601", "<20230601"]
```

**Date format:** `YYYYMMDD` as quoted strings prefixed with operator (e.g., `">=20230601"`).

### Column Access Control

Set `pyHasAccess: "true"` on a column to enable per-column access restrictions.
When enabled, the server automatically scaffolds `pyColumnRestrictions` and
`pyOrConditions` structures. These scaffolds do not need to be included in the
payload — they are server-generated.

### OR Conditions

See `decision-table-or-conditions` for multi-value matching within a single row.

## Multi-Result Decision Tables

See `decision-table-multi-result` for `pyPropertyColumns`, `pyDefaultResultPropSet`,
embedded quotes convention, and the two patterns (Lookup Table vs List Builder).

## Page List Macros in Property Paths

See `decision-table-page-list-macros` for `<APPEND>`/`<LAST>` macros and
`pyPagesAndClasses` declarations when targeting page lists.

## Allowed Values and SET Side-Effects

See `decision-table-allowed-values` for the `pyAllowedValues` vocabulary pattern,
SET side-effects that fire per return value, and when to use this feature vs
plain `pyResults`.

## Initial Property Set (`pyInitialPropSet`)

Optional "Preset Properties" block — an array of `Embed-ModelParams` entries
that set properties **unconditionally before any row evaluation**. Each entry has
`pyPropertiesName` (target property) and `pyPropertiesValue` (a Pega expression).

Omit for most tables — adding entries flags the rule as "Advanced" in Dev Studio.

## Gotchas

- **`update-rule` supports partial updates.** Send just `pyResults` to change
  result values without resending `pyColumns`/`pyCondition`.
- **Row count alignment.** Every `pyCondition` array must have the same length as
  `pyResults`. Misalignment causes undefined behavior.
- **Row order = evaluation priority.** Most-specific rows first.
- **Row shadowing.** A higher-priority row shadows a lower row when its conditions
  are a superset of (or equal to) the lower row's conditions — the lower row becomes
  unreachable. Example: Row 1 with `>=50` shadows Row 2 with `>=80` because any
  input matching `>=80` also matches `>=50`, so Row 1 wins. When a test returns an
  unexpected result, check whether a higher row's conditions subsume the intended
  row. Fix by reordering (most-specific first) or narrowing the higher row's conditions.
- **pyColumnPreferences is cosmetic.** Dev Studio column widths — safe to omit.

## Examples

### Rule-level (`examples/`)

Each non-stub example shows a **single-step `create-rule` payload** with
columns and rows included. Auto-filled fields are omitted from all examples.

| Skill | Description |
|------|-------------|
| `Stub Decision Table` | Bare shell — identity + defaults, no columns, no rows |
| `Multi-Column Mixed Types` | 3 columns (integer + decimal + text), 3 rows, mixed data types |
| `Date Columns` | 3 columns (text + date + date), 3 rows, dual date range pattern |
| `Text-Only Approval` | 3 columns (all text), 3 rows, approval/gate workflow pattern |
| `Parameter Lookup` | 1 column (Param.Name reference), 4 rows, parameter-based lookup |
| `Multi-Result Lookup Table` | Multi-result lookup table — condition maps to multiple output properties, first-match |
| `Multi-Result List Builder` | Multi-result list builder — `<APPEND>`/`<LAST>` macros, `pyEvaluateAllRows: "yes"` |
| `Allowed Values with Property Assignments` | pyAllowedValues — registers result values and allows specific values for additional target properties when each result is selected |
| `Preset Properties (pyInitialPropSet)` | pyInitialPropSet preset properties — sets properties unconditionally before any row evaluation |
