---
name: testcase-keyword-action
description: Load when mapping a case-wide action keyword. Shows PerformAction wiring with CaseID from prior keyword output.
---

```json
{
  "pyPurpose": "ChangestageAction",
  "pyClassName": "MyOrg-MyApp-Work-TravelRequest",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User changes the stage of the travel request",
  "pyLabel": "Change stage",
  "pyInputParameters": [
    {
      "pyParameterValue": "TravelRequestCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterValue": "False",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "ValidationFails"
    },
    {
      "pyParameterValue": "Booking",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Stage name"
    }
  ]
}
```
