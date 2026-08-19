---
name: "CompareDates"
description: "CompareDates: [first date] is on the next day or later than [second date] using [daysOnly]"
---

```json
{
  "purpose": "CompareDates",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareDates",
    "pyCity": "CompareDates",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).CompareDates({strDate1}, {strDate2}, {daysOnly})",
    "pyEcho": "[first date] is on the next day or later than [second date] using [daysOnly]",
    "pyLabel": "[first date]is on the next day or later than[second date]using[false]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Compare two DateTime strings. Compare by date only if daysOnly is true; return true if date1 is after date2.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDate1",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyIsOptional": "false",
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
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyIsOptional": "false",
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
        "pyParametersParamName": "daysOnly",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "daysOnly",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "10",
        "pyIsOptional": "false",
        "pyParametersParamDefaultValue": "false",
        "pyParametersParamValue": "false"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDate1",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "first date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyIsOptional": "false",
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
        "pyParametersParamValue": "is on the next day or later than"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strDate2",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "second date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyIsOptional": "false",
        "pyReference": "3",
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
        "pyParametersParamValue": "using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "daysOnly",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "daysOnly",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "10",
        "pyIsOptional": "false",
        "pyParametersParamDefaultValue": "false",
        "pyReference": "5"
      }
    ]
  },
  "pyCallParams": {
    "strDate1": ".FollowUpDate",
    "strDate2": ".LastContactDate",
    "daysOnly": "false"
  }
}
```
