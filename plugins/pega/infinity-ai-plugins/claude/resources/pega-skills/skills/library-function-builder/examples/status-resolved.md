---
name: "StatusResolved"
description: "StatusResolved: the work object is Resolved"
---

```json
{
  "purpose": "StatusResolved",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "StatusResolved",
    "pyCity": "StatusResolved",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).startsWith({str1}, {str2})",
    "pyEcho": "the work object is Resolved",
    "pyLabel": "the work object is Resolved",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str1",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "str1",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": ".pyStatusWork",
        "pyParametersParamSize": "15",
        "pyParametersParamValue": ".pyStatusWork"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str2",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "str2",
        "pyParametersParamIntelliValidateAs": "\"Resolved-\"",
        "pyParametersParamValue": "\"Resolved-\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "the work object is Resolved"
      }
    ]
  },
  "pyCallParams": {
    "str1": ".pyStatusWork",
    "str2": "\"Resolved-\""
  }
}
```
