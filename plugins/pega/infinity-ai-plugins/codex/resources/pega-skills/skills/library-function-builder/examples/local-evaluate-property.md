---
name: "LocalEvaluateProperty"
description: "LocalEvaluateProperty: value is [expression]"
---

```json
{
  "purpose": "LocalEvaluateProperty",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "LocalEvaluateProperty",
    "pyCity": "LocalEvaluateProperty",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "{expression}",
    "pyEcho": "value is [expression]",
    "pyLabel": "value is[expression]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Evaluate a free-form expression locally",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "expression",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "expression",
        "pyParametersParamIntelliValidateAs": "30",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".pxObjClass = \"Rule-Obj-Activity\"",
        "pyIsOptional": "false"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "",
        "pyParametersParamType": "Label",
        "pyParametersParamDesc": "value is",
        "pyNodeCaption": "1",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "expression",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "expression",
        "pyParametersParamIntelliValidateAs": "30",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "2"
      }
    ]
  },
  "pyCallParams": {
    "expression": ".pxObjClass = \"Rule-Obj-Activity\""
  }
}
```
