---
name: "pxCallWhenUsingPage"
description: "pxCallWhenUsingPage: Call when [blockName] using page [stepPage] evaluates to [evaluatesTo]"
---

```json
{
  "purpose": "pxCallWhenUsingPage",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxCallWhenUsingPage",
    "pyCity": "pxCallWhenUsingPage",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).pxCallWhenUsingPage({blockName}, {stepPage}, \"{evaluatesTo}\")",
    "pyEcho": "Call when [blockName] using page [stepPage] evaluates to [evaluatesTo]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "blockName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "blockName",
        "pyEchoParametersParamValue": "pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyParametersParamValue": "IsHighPriority",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySmartPromptRuleOpener": "IsHighPriority"
          }
        }
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "stepPage",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "stepPage",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "pyWorkPage"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "evaluatesTo",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "evaluatesTo",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "true|true,false|false",
        "pyIsOptional": "false",
        "pyParametersParamValue": "true",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Call when"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamName": "blockName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "blockName",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "using page"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "stepPage",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "stepPage",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "4"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "evaluates to"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "evaluatesTo",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "evaluatesTo",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "true|true,false|false",
        "pyIsOptional": "false",
        "pyReference": "6",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ],
    "pyLabel": "Call when[blockName]using page[stepPage]evaluates to[evaluatesTo]"
  },
  "pyCallParams": {
    "blockName": "IsHighPriority",
    "stepPage": "pyWorkPage",
    "evaluatesTo": "true"
  }
}
```
