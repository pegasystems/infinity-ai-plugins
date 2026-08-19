---
name: "pxHasPagesCountInPageListWhen"
description: "pxHasPagesCountInPageListWhen: [page list to look in] contains pages with count [comparator] [count to check the match] where [whenName] evaluates to true"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property. The referenced When rule is
evaluated against each page in the PageList. A class with only scalar
properties cannot host this alias.

```json
{
  "purpose": "pxHasPagesCountInPageListWhen",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxHasPagesCountInPageListWhen",
    "pyCity": "pxHasPagesCountInPageListWhen",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RulesEngine:Utilities).pxHasPagesCountInPageListWhen({whenName}, {lookIn}, {countToCheck}, \"{comparator}\")",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RulesEngine",
    "pyUsage": "java",
    "pyDescription": "Function alias to evaluate a condition where a given PageList property contains pages with count satisfying a given countToMatch.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "whenName",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyEchoParametersParamValue": "pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyParametersParamValue": "IsCompleted",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySmartPromptRuleOpener": "IsCompleted"
          }
        }
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "page list to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Tasks"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "countToCheck",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "count to check the match",
        "pyParametersParamDefaultValue": "1",
        "pyParametersParamValue": "1",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyParametersParamValue": "=",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySymbolComparators",
        "pyIsOptional": "false",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "page list to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains pages with count"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "4",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySymbolComparators",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "countToCheck",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "count to check the match",
        "pyParametersParamDefaultValue": "1",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "4"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "where"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "whenName",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "6"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "evaluates to true"
      }
    ],
    "pyEcho": "[page list to look in] contains pages with count [comparator] [count to check the match] where [whenName] evaluates to true",
    "pyLabel": "[page list to look in]contains pages with count[comparator][count to check the match]where[whenName]evaluates to true"
  },
  "pyCallParams": {
    "whenName": "IsCompleted",
    "lookIn": ".Tasks",
    "countToCheck": "3",
    "comparator": ">="
  }
}
```
