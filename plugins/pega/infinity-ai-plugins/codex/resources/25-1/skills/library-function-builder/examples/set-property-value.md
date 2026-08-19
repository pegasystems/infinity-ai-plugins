---
name: "setPropertyValue"
description: "setPropertyValue: Set [Property] equal to [Value]"
---

```json
{
  "purpose": "setPropertyValue",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "setPropertyValue",
    "pyCity": "setPropertyValue",
    "pySignature": "@(Pega-RULES:Property).setPropertyValue({cp_Property}, {strValue})",
    "pyEcho": "Set [Property] equal to [Value]",
    "pyLabel": "setPropertyValue",
    "pyReturnType": "void",
    "pyRuleSet": "Pega-WB",
    "pyUsage": "java",
    "pyActivityClass": "Rule-Alias-Function",
    "pyActivityName": "pzGetAliasFunctions_ValidateAdditions",
    "pyBaseClass": "@baseclass",
    "pyClassName": "@baseclass",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "cp_Property",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "Property",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySampleSPOpenProperty",
        "pyIsOptional": false
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strValue",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "Value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": false
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Set"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "cp_Property",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "Property",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySampleSPOpenProperty",
        "pyIsOptional": false,
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "equal to"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strValue",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "Value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": false,
        "pyReference": "4"
      }
    ]
  },
  "pyCallParams": {
    "cp_Property": ".pyStatusWork",
    "strValue": "\"Resolved\""
  }
}
```
