---
name: testcase-business-action-optional-process
description: Load when mapping an optional process trigger business action. Shows TriggerOptionalProcess wiring — CaseID from business action Output only, no ValidationFails.
---

```json
{
  "pyPurpose": "TriggerEscalateToManagementProcess",
  "pyClassName": "MyOrg-MyApp-Work-IncidentResponse",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User triggers Escalate to Management optional process",
  "pyLabel": "Trigger Escalate to Management",
  "pyInputParameters": [
    {
      "pyParameterValue": "IncidentResponseCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "CaseID"
    }
  ]
}
```
