---
name: testcase-keyword-assignment
description: Load when mapping an assignment keyword with form inputs. Shows CaseID from Keyword Output and Business Action input parameters as Constants.
---

```json
{
  "pyPurpose": "SubmitTripDetails",
  "pyClassName": "MyOrg-MyApp-Work-TravelRequest",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User submits Trip Details assignment",
  "pyLabel": "Submit Trip Details",
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
      "pyParameterValue": "Jane Doe",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Traveler Name"
    },
    {
      "pyParameterValue": "1200",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "Travel Budget"
    }
  ]
}
```
