---
name: "CompareDatesInDays"
description: "CompareDatesInDays: [first date] is a full day or more after [second date]"
---

```json
{
  "purpose": "CompareDatesInDays",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareDatesInDays",
    "pyCity": "CompareDatesInDays",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).compareDatesByDays({firstDate}, {secondDate}, {numDays})",
    "pyEcho": "[first date] is a full day or more after [second date]",
    "pyLabel": "CompareDatesInDays",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "firstDate",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyParametersParamValue": ".DeliveryDate",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "secondDate",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "second date",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyParametersParamValue": ".OrderDate",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "numDays",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "numDays",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "0",
        "pyParametersParamValue": "1"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "firstDate",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "secondDate",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "second date",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyAllowedValues": [
          ".pxMoveImportDateTime",
          ".pxCreateDateTime",
          ".pxOriginalCreateDateTime",
          ".pxUpdateDateTime"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "numDays",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "numDays",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamIntelliValidateAs": "0"
      }
    ]
  },
  "pyCallParams": {
    "firstDate": ".DeliveryDate",
    "secondDate": ".OrderDate",
    "numDays": "1"
  }
}
```
