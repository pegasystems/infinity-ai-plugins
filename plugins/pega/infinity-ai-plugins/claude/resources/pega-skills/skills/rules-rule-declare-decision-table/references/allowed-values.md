---
name: decision-table-allowed-values
description: "Reference for pyAllowedValues in decision tables -- vocabulary entries, SET side-effects, property assignments, and round-trip consistency"
---
# Allowed Values and Property Assignments

## What `pyAllowedValues` Is

`pyAllowedValues` registers result values and optionally configures property
assignments per result — allowing specific values for additional target properties
when each result is selected. When a row returns a given value, configured
properties are set accordingly.

**Key distinction:** `pyAllowedValues` is NOT the same as `pyResults`.

| Field | Purpose |
|-------|---------|
| `pyResults` | Per-row return values actually used in the table — simple string array |
| `pyAllowedValues` | Curated superset — the full vocabulary of return values, including unused entries kept for reuse |

A table might use only `"CreateScorecard"` and `"CreateField"` in `pyResults`, but
`pyAllowedValues` could also include `"UpdateScorecard"` and `"UpdateField"` as
available vocabulary for future rows.

## SET Side-Effects

Each `pyAllowedValues` entry can carry a `pyPropertySet` array of SET actions
(`Embed-ModelParams`). These fire for **every row** returning that value — the
side-effects live on the vocabulary entry, not the individual row.

```json
{
  "pyAllowedValue": "Opened",
  "pzIsAllowedResultsPropSetExist": "true",
  "pyPropertySet": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pxResponseWaitingTime",
      "pyPropertiesValue": "60"
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyOutcome",
      "pyPropertiesValue": "Sent"
    }
  ]
}
```

To give different rows different side-effects, assign them different return values
(each with its own SET bundle).

Set `pzIsAllowedResultsPropSetExist` to `"true"` when SET actions are attached,
`"false"` for vocabulary-only stubs with no side-effects.

## `pyAllowedResultsProperty`

Optional. When set, ties the vocabulary to a specific property's own allowed-values
list. When empty or omitted, the vocabulary is free-form. Most business tables
leave this empty.

## `pyPropertiesValue` Expressions

`pyPropertiesValue` is compiled as a Pega expression at assembly time. This
applies to all SET surfaces: `pyAllowedValues`, `pyDefaultResultPropSet`, and
`pyInitialPropSet`.

- String literal: `"\"Initial Description Value\""` — embedded quotes required
- Integer literal: `"60"` — bare number is valid
- Boolean literal: `"false"` — bare keyword is valid
- Property reference: `".pyLabel"` — dot-qualified path
- Quoted class name: `"\"Rule-Decision-Scorecard\""`

**Bare text without embedded quotes silently fails** — Pega interprets it as
identifier references, not a string literal, producing wrong values at runtime.

When using expressions, `pyExpressionBuilder` should mirror the same value (used
by the UI expression editor cache). Omit `pyExpressionGadget` — it is a UI-only
scaffold.

## Round-Trip Consistency

When updating a DT that has `pyAllowedValues`, keep both views consistent:
1. `pyAllowedValues` — the vocabulary entries
2. `pyResults` — the per-row return values (subset of vocabulary)

If you add a new return value to `pyResults`, add a corresponding `pyAllowedValues`
entry.

## When to Use

Most simple decision tables do not need `pyAllowedValues` — just use `pyResults`.
Use `pyAllowedValues` when:
- You need SET side-effects on return values (set additional properties when a row matches)
- You want to maintain a curated vocabulary broader than the currently-used values
- The DT is delegated and you want to control the return-value dropdown in App Studio
