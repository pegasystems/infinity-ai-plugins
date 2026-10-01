---
name: "CompareDateTimes"
description: "CompareDateTimes: [first date] is after [second date]"
---

```json
{
  "purpose": "CompareDateTimes",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareDateTimes",
    "pyCity": "CompareDateTimes",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).CompareDates({strDate1}, {strDate2})",
    "pyEcho": "[first date] is after [second date]",
    "pyLabel": "[first date]is after[second date]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDate1",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyParametersParamIntelliValidateAs": "DateTime",
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
        "pyParametersParamName": "strDate2",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "second date",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyParametersParamValue": ".pxCreateDateTime",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDate1",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyReference": "1",
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
        "pyParametersParamValue": "is after"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strDate2",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "second date",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyReference": "3",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      }
    ]
  },
  "pyCallParams": {
    "strDate1": ".EndDate",
    "strDate2": ".StartDate"
  }
}
```
