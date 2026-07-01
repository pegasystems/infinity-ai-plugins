---
name: "pzContainsIgnoreCase"
description: "pzContainsIgnoreCase: [string to search on] contains (ignore case) [string to search for]"
---

```json
{
  "purpose": "pzContainsIgnoreCase",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzContainsIgnoreCase",
    "pyCity": "pzContainsIgnoreCase",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pzContainsIgnoreCase({strToSearchOn}, {strToSearchFor})",
    "pyEcho": "[string to search on] contains (ignore case) [string to search for]",
    "pyLabel": "[string to search on]contains &#40;ignore case&#41;[string to search for]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Function alias for Contains ignore case function.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strToSearchOn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search on",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Subject"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strToSearchFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "\"escalation\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strToSearchOn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search on",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains (ignore case)"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strToSearchFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "strToSearchOn": ".Subject",
    "strToSearchFor": "\"escalation\""
  }
}
```
