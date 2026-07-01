---
name: testcase-keyword-assert-status
description: Load when mapping a status assertion keyword. Shows AssertCaseStatus with pyStatusValue and Status constant for terminal verification.
---

```json
{
  "pyPurpose": "AssertCaseStatus",
  "pyClassName": "Work-",
  "pyKeywordType": "THEN",
  "pyKeywordDescription": "Verify case status is Resolved-Completed",
  "pyLabel": "Assert Case Status",
  "pyStatusValue": "Resolved-Completed",
  "pyInputParameters": [
    {
      "pyParameterValue": "HomeLoanCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterValue": "Resolved-Completed",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Status"
    }
  ]
}
```
