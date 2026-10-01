---
name: decision-table-or-conditions
description: Use when a decision table row must match multiple alternative values in the same column using OR logic.
---

# OR Conditions

By default each `pyCondition` entry matches a single value per row. To match
multiple values in one row (OR logic), add `pyOrConditions` to the column.
Without this, the agent must create N separate rows for N alternative values,
producing structurally different (though functionally similar) tables.

Each `pyOrConditions` entry is an `Embed-DecisionTable-OrCondition` object
targeting a specific row by `pyRowNum` (1-based):

```json
{
  "pyProperty": ".Status",
  "pyColumnDataType": "text",
  "pyCondition": ["Active", "Closed"],
  "pyOrConditions": [
    {
      "pyRowNum": "1",
      "pyOrCondition": ["Active", "Pending", "Open"]
    }
  ]
}
```

In this example, row 1 matches `.Status` equal to `"Active"` OR `"Pending"` OR
`"Open"`. Row 2 matches only `"Closed"`. The `pyCondition` value for the OR row
(`"Active"`) acts as the primary/display value; the full set of alternatives is
in `pyOrCondition`.

**Key rules:**
- `pyRowNum` is a string (`"1"`, not `1`)
- `pyOrCondition` is a simple string array
- Only rows that need OR logic get an entry -- rows with single-value matching
  don't need a `pyOrConditions` entry
- Included in the `create-rule` payload alongside `pyColumns` and `pyResults`
