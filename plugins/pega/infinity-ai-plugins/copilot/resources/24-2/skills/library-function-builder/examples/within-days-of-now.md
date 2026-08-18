---
name: "WithinDaysOfNow"
description: "WithinDaysOfNow: [date] is within [num] days of the current time"
---

```json
{
  "purpose": "WithinDaysOfNow",
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
        "pyParametersParamDesc": "date",
        "pyParametersParamValue": ".pxCreateDateTime",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "days",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "num",
        "pyParametersParamValue": "30",
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
        "pyParametersParamType": "Alias",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
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
    "pyEcho": "[date] is within [num] days of the current time",
    "pyLabel": "[date]is within[num]days of the current time"
  },
  "pyCallParams": {
    "theDate": ".ReviewDate",
    "days": "30"
  }
}
```
