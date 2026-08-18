---
name: "pyCollectionEvalReturnBoolean"
description: "pyCollectionEvalReturnBoolean: Return value is [True / False]"
---

```json
{
  "purpose": "pyCollectionEvalReturnBoolean",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pyCollectionEvalReturnBoolean",
    "pyCity": "pyCollectionEvalReturnBoolean",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).CompareToBoolean({lValue}, \"{rValue}\")",
    "pyEcho": "Return value is [True / False]",
    "pyLabel": "Collection Eval Return Boolean",
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
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamValue": "param.pxReturnValue"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "True / False",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "True|true,False|false",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamValue": "true",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "lValue",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamIntelliValidateAs": "param.pxReturnValue",
        "pyParametersParamDropdownValues": "OptionsList"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "True / False",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": "True|true,False|false",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ]
  },
  "pyCallParams": {
    "lValue": "param.pxReturnValue",
    "rValue": "true"
  }
}
```
