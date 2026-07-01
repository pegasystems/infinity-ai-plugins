---
name: "CreatedRecently"
description: "CreatedRecently: created within the last [num] days"
---

```json
{
  "purpose": "CreatedRecently",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "WithinDaysOfNow",
    "pyCity": "WithinDaysOfNow",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).isWithinDaysOfNow({theDate}, {days})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "theDate",
        "pyParametersParamType": "Alias",
        "pyParametersParamValue": ".pxCreateDateTime"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "days",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "num",
        "pyParametersParamValue": "7",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamSize": "15"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "theDate",
        "pyParametersParamType": "Alias"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is within"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "days",
        "pyParametersParamType": "Freeform",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamSize": "15"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "days of the current time"
      }
    ],
    "pyEcho": "created within the last [num] days",
    "pyLabel": "created within the last[num]days"
  },
  "pyCallParams": {
    "theDate": ".pxCreateDateTime",
    "days": "7"
  }
}
```
