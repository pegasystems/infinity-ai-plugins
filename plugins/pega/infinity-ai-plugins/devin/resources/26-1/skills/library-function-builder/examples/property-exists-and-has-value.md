---
name: "PropertyExistsAndHasValue"
description: "PropertyExistsAndHasValue: Property [strReference] exists and has a value"
---

```json
{
  "purpose": "PropertyExistsAndHasValue",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "PropertyExistsAndHasValue",
    "pyCity": "PropertyExistsAndHasValue",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).PropertyHasValue({tools}, {strReference})",
    "pyEcho": "Property [strReference] exists and has a value",
    "pyLabel": "Property Has Value",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "tools",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "tools",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "tools",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "tools"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strReference",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "strReference",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": ".pyRAFAddQuotesSP",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".AccountNumber",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyRAFAddQuotesSP": ".AccountNumber"
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "tools",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "tools",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamIntelliValidateAs": "tools",
        "pyParametersParamDropdownValues": "Property"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strReference",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "strReference",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": ".pyRAFAddQuotesSP",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "tools": "tools",
    "strReference": ".AccountNumber"
  }
}
```
