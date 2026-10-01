---
name: "contains"
description: "contains: [string to search on] contains [string to search for]"
---

```json
{
  "purpose": "contains",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "contains",
    "pyCity": "contains",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).contains({strToSearchOn}, {strToSearchFor})",
    "pyEcho": "[string to search on] contains [string to search for]",
    "pyLabel": "[string to search on]Contains[string to search for]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxListSubscript": "1",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strToSearchOn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search on",
        "pyParametersParamValue": ".Description"
      },
      {
        "pxListSubscript": "2",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strToSearchFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search for",
        "pyParametersParamValue": "\"urgent\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strToSearchOn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search on",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "strToSearchFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "string to search for",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "strToSearchOn": ".Description",
    "strToSearchFor": "\"urgent\""
  }
}
```
