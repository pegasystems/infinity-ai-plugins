---
name: "StringEqualsIgnoreCase"
description: "StringEqualsIgnoreCase: [first string] equals (ignore case) [second string]"
---

```json
{
  "purpose": "StringEqualsIgnoreCase",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "StringEqualsIgnoreCase",
    "pyCity": "StringEqualsIgnoreCase",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).equalsIgnoreCase({str1}, {str2})",
    "pyEcho": "[first string] equals (ignore case) [second string]",
    "pyLabel": "[first string]equals &#40;ignore case&#41;[second string]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first string",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Department"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "second string",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyIsOptional": "false",
        "pyParametersParamValue": "\"Engineering\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "str1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first string",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "equals (ignore case)"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "str2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "second string",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "str1": ".Department",
    "str2": "\"Engineering\""
  }
}
```
