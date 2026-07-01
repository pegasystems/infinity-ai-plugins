---
name: testcase-keyword-assert-stage
description: Load when mapping a stage assertion keyword. Shows AssertCaseStage with CaseID wiring and StageName constant.
---

```json
{
  "pyStageName": "Underwriter Review",
  "pyPurpose": "AssertCaseStage",
  "pyClassName": "Work-",
  "pyKeywordType": "THEN",
  "pyKeywordDescription": "Verify case moved to Underwriter Review stage",
  "pyLabel": "Assert Case Stage",
  "pyInputParameters": [
    {
      "pyParameterValue": "HomeLoanCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterValue": "Underwriter Review",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "StageName"
    }
  ]
}
```
