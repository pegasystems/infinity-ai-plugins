---
name: Log-Message
description: Log the start of processing
---

```json
{
  "pyStepsActivityName": "Log-Message",
  "pyStepsDescription": "Log the start of processing",
  "pyStepsCallParams": {
    "Message": "\"Starting processing for case: \" + .pyID",
    "LoggingLevel": "InfoForced",
    "SendToTracer": "false",
    "GenerateStackTrace": "false"
  }
}
```
