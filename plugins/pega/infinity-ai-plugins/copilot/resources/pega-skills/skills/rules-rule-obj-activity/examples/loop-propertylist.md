---
name: Loop PropertyList
description: PROPERTYLIST loop iterating over a single-value list.
---

```json
{
  "pyActivityName": "LogTags",
  "pyLabel": "Log Tags",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Iterates over a value list of tags and logs each one.",
  "pySteps": [
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsDescription": "Log each tag",
      "pyStepsRepeatDef": {
        "pyStepsRepeatDefHasRepeat": "PROPERTYLIST",
        "pyForEachProperty": ".pyTags",
        "pyStepsRepeatDefStart": "",
        "pyStepsRepeatDefIteration": "",
        "pyStepsRepeatDefLimit": "",
        "pyStepsRepeatDefStop": "",
        "pyForEachValidClasses": [
          { "pyForEachClass": "" }
        ]
      },
      "pyStepsCallParams": {
        "Message": "\"Processing tag: \" + <CURRENT>",
        "LoggingLevel": "InfoForced",
        "SendToTracer": "false",
        "GenerateStackTrace": "false"
      }
    }
  ]
}
```
