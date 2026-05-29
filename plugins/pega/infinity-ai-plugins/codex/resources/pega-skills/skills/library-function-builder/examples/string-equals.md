---
name: "StringEquals"
description: "StringEquals: [the first string] equals [the second string]"
---

```json
{
  "purpose": "StringEquals",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "StringEquals",
    "pyCity": "StringEquals",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).equals({str1}, {str2})",
    "pyEcho": "[the first string] equals [the second string]",
    "pyLabel": "[the first string]equals[the second string]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxListSubscript": "1",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the first string",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": ".Region"
      },
      {
        "pxListSubscript": "2",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "str2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the second string",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": "\"North America\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "str1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the first string",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "equals"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "str2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the second string",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "str1": ".Region",
    "str2": "\"North America\""
  }
}
```
