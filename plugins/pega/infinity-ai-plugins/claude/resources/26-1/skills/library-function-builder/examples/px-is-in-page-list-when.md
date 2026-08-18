---
name: "pxIsInPageListWhen"
description: "pxIsInPageListWhen: [pagelist to look in] contains a page where [when record] evaluates to true"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property. The referenced When rule is
evaluated against each page in the PageList. A class with only scalar
properties cannot host this alias.

```json
{
  "purpose": "pxIsInPageListWhen",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsInPageListWhen",
    "pyCity": "pxIsInPageListWhen",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).IsInPageListWhen({whenName}, {lookIn})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Function alias to evaluate multiple conditions on every page of a given page list, using a when rule.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "when record",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyEchoParametersParamValue": "pySmartPromptRuleOpener",
        "pyIsOptional": "false",
        "pyParametersParamValue": "IsOverdue",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySmartPromptRuleOpener": "IsOverdue"
          }
        }
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "pagelist to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".LineItems"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "pagelist to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains a page where"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "whenName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "when record",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySmartPromptRuleOpener",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "evaluates to true"
      }
    ],
    "pyEcho": "[pagelist to look in] contains a page where [when record] evaluates to true",
    "pyLabel": "[pagelist to look in]contains a page where[when record]evaluates to true"
  },
  "pyCallParams": {
    "whenName": "IsOverdue",
    "lookIn": ".LineItems"
  }
}
```
