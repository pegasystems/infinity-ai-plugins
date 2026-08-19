---
name: "pyCollectionHasReturnValue"
description: "pyCollectionHasReturnValue: Return value has value"
---

```json
{
  "purpose": "pyCollectionHasReturnValue",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pyCollectionHasReturnValue",
    "pyCity": "pyCollectionHasReturnValue",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "Return value has value",
    "pyLabel": "Collection Has Return Value",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "lValue",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "param.pxReturnValue",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "param.pxReturnValue"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "comparator",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "DOES NOT EQUAL",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "DOES NOT EQUAL",
        "pyAllowedValues": [
          "DOES NOT EQUAL"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "rValue",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "\"\"",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "\"\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Return value has value"
      }
    ]
  },
  "pyCallParams": {
    "lValue": "param.pxReturnValue",
    "comparator": "DOES NOT EQUAL",
    "rValue": "\"\""
  }
}
```
