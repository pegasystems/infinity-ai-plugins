---
name: Stub Activity
description: Minimal activity template with a single placeholder step.
---

```json
{
  "pyActivityName": "MyRuleNameHere",
  "pyLabel": "This is the short description",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pySteps": [
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsDescription": "Placeholder step",
      "pyStepsCallParams": {
        "Message": "\"MyRuleNameHere executed\"",
        "LoggingLevel": "InfoForced",
        "SendToTracer": "false",
        "GenerateStackTrace": "false"
      }
    }
  ]
}
```
