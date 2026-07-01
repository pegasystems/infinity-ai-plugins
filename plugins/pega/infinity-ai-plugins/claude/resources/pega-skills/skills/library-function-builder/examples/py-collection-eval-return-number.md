---
name: "pyCollectionEvalReturnNumber"
description: "pyCollectionEvalReturnNumber: Return value [relation] [number]"
---

```json
{
  "purpose": "pyCollectionEvalReturnNumber",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pyCollectionEvalReturnNumber",
    "pyCity": "pyCollectionEvalReturnNumber",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "Return value [relation] [number]",
    "pyLabel": "Collection Eval Return Number",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "lValue",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "param.pxReturnValue",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "param.pxReturnValue"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ">",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "number",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "100"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "None",
        "pyParametersParamDesc": "lValue",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamIntelliValidateAs": "param.pxReturnValue",
        "pyParametersParamDropdownValues": "Property"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyParametersParamDropdownValues": "Property",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "number",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "lValue": "param.pxReturnValue",
    "comparator": ">",
    "rValue": "100"
  }
}
```
