---
name: "Rule-Obj-When"
description: "Rule-Obj-When: Rule [When record] evaluates to true"
---

```json
{
  "purpose": "Rule-Obj-When",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "Rule-Obj-When",
    "pyCity": "Rule-Obj-When",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).evaluateWhen(\"{blockName}\")",
    "pyEcho": "Rule [When record] evaluates to true",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "blockName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "When record",
        "pyEchoParametersParamValue": "pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyParametersParamValue": "IsHighRisk",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySmartPromptRuleOpener": "IsHighRisk"
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
        "pyParametersParamName": "blockName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "When record",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "evaluates to true"
      }
    ],
    "pyLabel": "Rule[When record]evaluates to true"
  },
  "pyCallParams": {
    "blockName": "IsHighRisk"
  }
}
```
