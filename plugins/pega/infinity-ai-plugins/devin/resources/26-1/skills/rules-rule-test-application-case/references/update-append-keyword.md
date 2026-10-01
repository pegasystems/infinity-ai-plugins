---
name: testcase-update-append
description: Load when adding a new keyword to an existing test case. Shows positional list merge pattern for appending assertions or assignment steps.
---

## Scenario

An existing test case has 7 keywords ending with an AssertCaseStage for "Rejected".
After a flow change, we also need to assert the case status is "Resolved-Rejected".
We append a new AssertCaseStatus keyword at the end.

## Workflow

```
1. get-rule(key="{tcKey}", detail="full")         → count existing keywords (7)
2. update-rule(key, updates, changeRequestID)   → append new keyword at index 7
3. get-rule(key, detail="full")                     → verify 8 keywords now exist
```

## update-rule payload

```json
{
  "pyTestKeywords": [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyClassName": "Work-",
      "pyKeywordDescription": "Verify HomeLoan is Resolved-Rejected",
      "pyKeywordType": "THEN",
      "pyLabel": "Assert Case Status",
      "pyPurpose": "AssertCaseStatus",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyMapTestInputFrom": "Keyword Output",
          "pyParameterName": "CaseID",
          "pyParameterValue": "HomeLoanCaseID"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyMapTestInputFrom": "Constant",
          "pyParameterName": "Status",
          "pyParameterValue": "Resolved-Rejected"
        }
      ],
      "pyOutputParameters": []
    }
  ]
}
```

### How it works

- `{}` at indices 0-6 preserve all 7 existing keywords unchanged.
- Index 7 is the **new keyword** appended to the list.
- The new keyword is a complete keyword object — all required fields must be present
  (`pxObjClass`, `pyClassName`, `pyPurpose`, `pyKeywordType`, `pyInputParameters`).

### Inserting in the middle (not recommended)

Positional merge does not support insertion between existing elements. To insert a
keyword at position 3 (pushing existing 3-6 to 4-7), you must provide the complete
`pyTestKeywords` array with all elements in the new order. This is effectively a
full replacement of the list.

For this reason, prefer appending when possible. If insertion is required, use
`get-rule(detail="full")` to get the full keyword list, reconstruct the array in
code with the new element inserted, and provide the complete list in the update.
