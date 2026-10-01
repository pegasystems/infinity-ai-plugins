---
name: "StringNotEqualsIgnoreCase"
description: "StringNotEqualsIgnoreCase: [first string] does not equal (ignore case) [second string]"
---

```json
{
  "purpose": "StringNotEqualsIgnoreCase",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "StringNotEqualsIgnoreCase",
    "pyCity": "StringNotEqualsIgnoreCase",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).notEqualsIgnoreCase({str1}, {str2})",
    "pyEcho": "[first string] does not equal (ignore case) [second string]",
    "pyLabel": "[first string]does not equal &#40;ignore case&#41;[second string]",
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
        "pyParametersParamValue": ".Category"
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
        "pyParametersParamValue": "\"Internal\""
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
        "pyParametersParamValue": "does not equal (ignore case)"
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
    "str1": ".Category",
    "str2": "\"Internal\""
  }
}
```
