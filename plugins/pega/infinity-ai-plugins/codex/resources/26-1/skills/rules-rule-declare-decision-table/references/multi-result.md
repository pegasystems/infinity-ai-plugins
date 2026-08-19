---
name: decision-table-multi-result
description: Use when authoring or inspecting decision tables that return one primary result plus additional property-column outputs per row.
---

# Multi-Result Decision Tables

Standard DTs return a single value per row via `pyResults`. Multi-result DTs also
set additional output properties via `pyPropertyColumns` -- each property column
holds one value per row, parallel with `pyResults` and `pyCondition`:

```
Standard:     Condition1 AND Condition2 → Result
Multi-result: Condition1 AND Condition2 → Result + PropA=val + PropB=val
```

## pyPropertyColumns

Array of `Embed-DecisionTable-PropertyColumn` objects. Each column specifies a
target property and a `pyPropertyValues` array (same length as `pyResults`):

```json
"pyPropertyColumns": [
  {
    "pyProperty": ".OutputFormat",
    "pyPropertyLabel": "Output Format",
    "pyPropertyValues": ["\"PDF\"", "\"CSV\"", "\"XML\""],
    "pyDefaultPropertySetOperator": "=",
    "pyPropSetDefaultValue": ""
  }
]
```

| Field | Description |
|-------|-------------|
| `pyProperty` | Property path -- `.PropertyName`, `Param.Name`, or page list macros |
| `pyPropertyLabel` | Human-readable column label |
| `pyPropertyValues` | Output values per row -- simple string array, length must match `pyResults` |
| `pyDefaultPropertySetOperator` | Always `"="` |
| `pyPropSetDefaultValue` | Fallback value when no row matches |
| `pyHasAccess` | Column access control -- `"true"` to enable |
| `pyColumnRestrictions` | Per-column edit restrictions (server-scaffolded when `pyHasAccess` is `"true"`) |

## pyDefaultResultPropSet

Parallel array with `pyPropertyColumns` -- provides fallback values when no row matches.
Each entry is an `Embed-ModelParams` object mapping a property name to a default value:

```json
"pyDefaultResultPropSet": [
  {
    "pxObjClass": "Embed-ModelParams",
    "pyPropertiesName": ".OutputFormat",
    "pyPropertiesValue": "PDF"
  }
]
```

`pyPropertiesName` should match the corresponding `pyPropertyColumns` entry's `pyProperty`.

## Embedded Quotes Convention

Property column values that represent class names, rule names, or literal string
constants use embedded (escaped) quotes:

```json
"pyPropertyValues": ["\"Link-Attachment\"", "\"Data-Social-Follow\""]
```

This is the server's serialization format. Values without embedded quotes are
treated as property references or expressions.

## Creation

Multi-result DTs can be created in a single step via `create-rule` -- include
`pyPropertyColumns`, `pyDefaultResultPropSet`, `pyPagesAndClasses`, and
`pyEvaluateAllRows` alongside `pyColumns` and `pyResults` in the creation
payload. All referenced properties must exist on the class.

## Two Patterns

**Lookup Table** -- `pyEvaluateAllRows: "no"` (first match). Condition column maps
to multiple output properties. `pyResults` may be populated or all-empty.
No `pyPagesAndClasses` needed unless targeting a page list.
See `examples/multi-result-lookup.md`.

**List Builder** -- `pyEvaluateAllRows: "yes"` (all rows). First property column
uses `<APPEND>` to create pages, subsequent columns use `<LAST>` to populate them.
Requires `pyPagesAndClasses`. `pyResults` typically all-empty.
See `examples/multi-result-list-builder.md`.
