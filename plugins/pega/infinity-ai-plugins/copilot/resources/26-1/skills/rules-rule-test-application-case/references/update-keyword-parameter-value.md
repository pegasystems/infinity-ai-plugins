---
name: testcase-update-parameter
description: Load when changing a test data value in an existing keyword. Shows nested positional merge with {} no-op placeholders for targeting a single parameter.
---

## Scenario

TC_HomeLoan_RejectedEligibility has 9 keywords. Keyword[4] (Assets income and
liabilities) has "Monthly gross income" at pyInputParameters[3] with value "1000".
The test scenario needs this changed to "1500" without touching any other keyword
or parameter.

## Workflow

```
1. get-rule(key="{tcKey}", detail="full")         → identify keyword index and param index
2. update-rule(key, updates, changeRequestID)   → apply nested positional merge
3. get-rule(key, detail="full")                     → verify only target value changed
```

## update-rule payload

```json
{
  "pyTestKeywords": [
    {},
    {},
    {},
    {},
    {
      "pyInputParameters": [
        {},
        {},
        {},
        { "pyParameterValue": "1500" },
        {}
      ]
    },
    {},
    {},
    {},
    {}
  ]
}
```

### How it works

- **Outer array** (`pyTestKeywords`): 9 elements matching the 9 keywords.
  `{}` at indices 0-3, 5-8 are no-op — those keywords are untouched.
- **Inner array** (`pyInputParameters` at index 4): 5 elements matching the 5 params.
  `{}` at indices 0, 1, 2, 4 are no-op. Index 3 merges `{ "pyParameterValue": "1500" }`
  into the existing param, changing only the value.

### Schema validation gotcha

If the existing data has **incomplete fields** (e.g., missing `pyMapTestInputFrom` on
some parameters), the schema validator may reject the update even though the `{}`
placeholder should be a no-op. This happens because the merge preserves the existing
incomplete data, and the validator runs on the merged result.

**Fix:** Include the required field in the placeholder to satisfy the validator:

```json
{
  "pyTestKeywords": [
    {},
    {},
    {},
    {},
    {
      "pyInputParameters": [
        {},
        {},
        { "pyMapTestInputFrom": "Constant" },
        { "pyParameterValue": "1500", "pyMapTestInputFrom": "Constant" },
        { "pyMapTestInputFrom": "Constant" }
      ]
    },
    {},
    {},
    {},
    {}
  ]
}
```

This adds `pyMapTestInputFrom` to the incomplete entries while still only changing
the target value at index 3.

### CRITICAL — List truncation

The outer `pyTestKeywords` array MUST have exactly the same number of elements as the
existing list (or more, to append). If you provide fewer elements, trailing keywords
are **deleted**. Always count the existing keywords via `get-rule` and include `{}`
for every one you want to preserve.

## Data-only updates

This is the most common update pattern — Business Actions are unchanged, only test data values in
Test Case keywords need to change. The Business Action's `pyPlaywrightScript`, `pyForm`,
and `pyTestSteps` remain as-is. Only the Test Case keyword's `pyParameterValue` is modified.

When to use this pattern:
- Business Action already has `if (param) { fill... }` guards for the field
- The field is already in the Business Action's `pyInputParameters`
- You just need different test data for a different scenario
