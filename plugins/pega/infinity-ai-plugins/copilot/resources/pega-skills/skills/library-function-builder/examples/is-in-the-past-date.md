---
name: "isInThePastDate"
description: "isInThePastDate: [a date] is in the past"
---

```json
{
  "purpose": "isInThePastDate",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "isInThePastDate",
    "pyCity": "isInThePastDate",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).isDateInThePast({strDateTime})",
    "pyEcho": "[a date] is in the past",
    "pyLabel": "[a date]is in the past",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDateTime",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "a date",
        "pyParametersParamIntelliValidateAs": "Date",
        "pyParametersParamValue": "."
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDateTime",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "a date",
        "pyParametersParamIntelliValidateAs": "Date",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is in the past"
      }
    ]
  },
  "pyCallParams": {
    "strDateTime": ".ExpirationDate"
  }
}
```
