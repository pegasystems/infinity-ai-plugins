---
name: authoring-update-append-list-element
description: Example of appending an element to the end of a steps list.
---

```json
{
  "pySteps": [
    {},
    {},
    {},
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsDescription": "Log completion",
      "pyStepsCallParams": {
        "Message": "\"UpdateStatus completed\"",
        "LoggingLevel": "InfoForced",
        "SendToTracer": "false",
        "GenerateStackTrace": "false"
      }
    }
  ]
}
```
