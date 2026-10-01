---
name: "isInThePastDateTime"
description: "isInThePastDateTime: [a datetime] is in the past"
---

```json
{
  "purpose": "isInThePastDateTime",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "isInThePastDateTime",
    "pyCity": "isInThePastDateTime",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Default).isInThePast({strDateTime})",
    "pyEcho": "[a datetime] is in the past",
    "pyLabel": "[a datetime]is in the past",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDateTime",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "a datetime",
        "pyParametersParamIntelliValidateAs": "DateTime",
        "pyParametersParamValue": ".pxCreateDateTime"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDateTime",
        "pyParametersParamType": "Alias",
        "pyParametersParamDesc": "a datetime",
        "pyParametersParamIntelliValidateAs": "DateTime",
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
    "strDateTime": ".ScheduledEndTime"
  }
}
```
