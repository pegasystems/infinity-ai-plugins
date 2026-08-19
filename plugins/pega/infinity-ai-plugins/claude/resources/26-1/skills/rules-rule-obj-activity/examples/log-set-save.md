---
name: Set Approval Status
description: Sets the approval status on the current work object.
---

```json
{
  "pyActivityName": "SetApprovalStatus",
  "pyLabel": "Set Approval Status",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Sets the approval status on the current work object.",
  "pySteps": [
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsDescription": "Log start of activity",
      "pyStepsCallParams": {
        "Message": "\"Starting SetApprovalStatus\"",
        "LoggingLevel": "InfoForced",
        "SendToTracer": "false",
        "GenerateStackTrace": "false"
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Set ApprovalStatus and timestamp",
      "pyParamArray": [
        {
          "PropertiesName": ".ApprovalStatus",
          "PropertiesValue": "\"Approved\""
        },
        {
          "PropertiesName": ".ApprovalTimestamp",
          "PropertiesValue": "@CurrentDateTime()"
        }
      ]
    },
    {
      "pyStepsActivityName": "Obj-Save",
      "pyStepsDescription": "Persist the updated work object",
      "pyStepsCallParams": {
        "WithErrors": "",
        "OnlyIfNew": "",
        "WriteNow": ""
      }
    }
  ]
}
```
