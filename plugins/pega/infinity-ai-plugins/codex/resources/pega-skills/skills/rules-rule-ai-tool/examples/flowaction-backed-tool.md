---
name: Change Case Stage Flow Action-backed Tool
description: Flow action-backed tool for changing the stage of a case.
---

```json
{
  "pyClassName": "Work-",
  "pyLabel": "Change Case Stage",
  "pyPurpose": "pyChangeCaseStage",
  "pyRuleName": "pyChangeCaseStage",
  "pyIntentDescription": "This tool is used for changing a case stage as per user command. If the user has the privilege to change the case stage, they will be able to change the stage.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "Change stage to <stage-name>"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "Work-",
    "pyCategory": "Rule-Obj-FlowAction",
    "pyClassName": "Work-",
    "pyRuleName": "pyChangeStage"
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "populate the json output based on user inputs",
      "pyParametersParamName": "jsonOutput",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "holds eTag value",
      "pyParametersParamName": "eTag",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    }
  ]
}
```
