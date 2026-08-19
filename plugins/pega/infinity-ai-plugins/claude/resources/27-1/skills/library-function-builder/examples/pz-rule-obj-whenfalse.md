---
name: "pzRule-Obj-Whenfalse"
description: "pzRule-Obj-Whenfalse: Rule [R-O-When] evaluates to false"
---

```json
{
  "purpose": "pzRule-Obj-Whenfalse",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzRule-Obj-Whenfalse",
    "pyCity": "pzRule-Obj-Whenfalse",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).pzevaluateWhenfalse(\"{whenName}\")",
    "pyEcho": "Rule [R-O-When] evaluates to false",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "R-O-When",
        "pyEchoParametersParamValue": "pySmartPromptRuleOpener",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyParametersParamValue": "Always",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySmartPromptRuleOpener": "Always"
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Rule"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "R-O-When",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "evaluates to false"
      }
    ],
    "pyLabel": "Rule[R-O-When]evaluates to false"
  },
  "pyCallParams": {
    "whenName": "Always"
  }
}
```
