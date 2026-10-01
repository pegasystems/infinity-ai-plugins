---
name: "PropertyHasValue"
description: "PropertyHasValue: [property reference] has a value"
---

```json
{
  "purpose": "PropertyHasValue",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "PropertyHasValue",
    "pyCity": "PropertyHasValue",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).PropertyHasValue({strReference})",
    "pyEcho": "[property reference] has a value",
    "pyLabel": "[property reference]has a value",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strReference",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "property reference",
        "pyParametersParamIntelliValidateAs": "25",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".CustomerName"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strReference",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "property reference",
        "pyParametersParamIntelliValidateAs": "25",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "has a value"
      }
    ]
  },
  "pyCallParams": {
    "strReference": ".CustomerName"
  }
}
```
