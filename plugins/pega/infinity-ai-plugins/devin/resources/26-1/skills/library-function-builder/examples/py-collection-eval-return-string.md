---
name: "pyCollectionEvalReturnString"
description: "pyCollectionEvalReturnString: Return value [relation] [Second String]"
---

```json
{
  "purpose": "pyCollectionEvalReturnString",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pyCollectionEvalReturnString",
    "pyCity": "pyCollectionEvalReturnString",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "Return value [relation] [Second String]",
    "pyLabel": "Collection Eval Return String",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "First String",
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
        "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "Equals",
        "pyAllowedValues": [
          "EQUALS",
          "DOES NOT EQUAL"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second String",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "\"Approved\""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "First String",
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
        "pyParametersParamIntelliValidateAs": "primary.pyComparatorsString",
        "pyParametersParamDropdownValues": "Property",
        "pyAllowedValues": [
          "EQUALS",
          "DOES NOT EQUAL"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second String",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "lValue": "param.pxReturnValue",
    "comparator": "Equals",
    "rValue": "\"Approved\""
  }
}
```
