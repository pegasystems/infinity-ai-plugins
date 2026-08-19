---
name: "CompareTwoValues"
description: "CompareTwoValues: [first value] [relation] [second value]"
---

```json
{
  "purpose": "CompareTwoValues",
  "family": "comparison",
  "pyCallParams": {
    "lValue": ".Priority",
    "comparator": "=",
    "rValue": "\"High\""
  },
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareTwoValues",
    "pyCity": "CompareTwoValues",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "[first value] [relation] [second value]",
    "pyLabel": "[first value][relation][second value]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Compare two numbers using a user friendly comparator string",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "30",
        "pyParametersParamValue": ".Priority",
        "pyIsOptional": "false"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators",
        "pyParametersParamValue": "=",
        "pyIsOptional": "false",
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
        "pyParametersParamDesc": "second value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "30",
        "pyParametersParamValue": "\"High\"",
        "pyIsOptional": "false"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "30",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators",
        "pyIsOptional": "false",
        "pyReference": "2",
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
        "pyParametersParamDesc": "second value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "30",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ]
  }
}
```
