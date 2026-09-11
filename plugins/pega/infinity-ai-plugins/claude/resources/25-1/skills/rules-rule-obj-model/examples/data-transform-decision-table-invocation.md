---
name: Data Transform Invoking Decision Table
description: Agent-ready Clipboard Data Transform pattern for invoking a Decision Table with either the direct DecisionTable.ObtainValue function or the pxEvaluateDecisionTable Utilities wrapper.
---

```json
{
  "pyModelName": "DataTransformInvokingDecisionTable",
  "pyLabel": "Data Transform Invoking Decision Table",
  "pyClassName": "Pega-Landing-AppView",
  "pyParameters": [
    {
      "pyParametersParamName": "Class",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0"
    },
    {
      "pyParametersParamName": "AppViewDelegateClass",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0"
    },
    {
      "pyParametersParamName": "DirectResult",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "OUT",
      "pyParametersParamReq": "0"
    },
    {
      "pyParametersParamName": "UtilitiesResult",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "OUT",
      "pyParametersParamReq": "0"
    }
  ],
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": "Param.DirectResult",
      "pyPropertiesValue": "@DecisionTable.ObtainValue(tools,myStepPage,\"pzGetChannelIcon\")"
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": "Param.UtilitiesResult",
      "pyPropertiesValue": "@pxEvaluateDecisionTable(@Utilities.pxGetStepPageReference(),\"pzGetChannelIcon\")"
    }
  ]
}
```
