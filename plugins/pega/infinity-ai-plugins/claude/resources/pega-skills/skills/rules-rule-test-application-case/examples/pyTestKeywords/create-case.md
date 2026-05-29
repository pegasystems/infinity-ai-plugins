---
name: testcase-keyword-create-case
description: Load when mapping a CreateCase keyword. Shows case creation with CaseID output alias and input parameter wiring.
---

```json
{
  "pyPurpose": "CreateTravelRequestCase",
  "pyClassName": "MyOrg-MyApp-Work-TravelRequest",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User creates a new TravelRequest case with standard trip details",
  "pyLabel": "Create TravelRequest",
  "pyOutputParameters": [
    {
      "pyMapOutputFrom": "Response",
      "pyParameterName": "TravelRequestCaseID",
      "pyParameterUniqueName": "TravelRequestCaseID"
    }
  ],
  "pyInputParameters": [
    {
      "pyParameterValue": "False",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "ValidationFails"
    },
    {
      "pyParameterValue": "Jane Doe",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Traveler Name"
    },
    {
      "pyParameterValue": "1200",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Estimated Budget"
    }
  ]
}
```
