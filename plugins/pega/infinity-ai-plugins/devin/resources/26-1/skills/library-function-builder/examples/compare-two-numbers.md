---
name: "CompareTwoNumbers"
description: "CompareTwoNumbers: [first number] [relation] [second number]"
---

```json
{
  "purpose": "CompareTwoNumbers",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareTwoNumbers",
    "pyCity": "CompareTwoNumbers",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoNumbers({lValue}, \"{comparator}\", {rValue})",
    "pyEcho": "[first number] [relation] [second number]",
    "pyLabel": "[first number][relation][second number]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Compare two numbers using a user friendly comparator string",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first number",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": ".Score"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyParametersParamValue": "=",
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
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "second number",
        "pyParametersParamIntelliValidateAs": "20",
        "pyParametersParamValue": "75"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first number",
        "pyParametersParamIntelliValidateAs": "20",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyReference": "2",
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
        "pyParametersParamDesc": "second number",
        "pyParametersParamIntelliValidateAs": "20",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "lValue": ".Score",
    "comparator": ">",
    "rValue": "75"
  }
}
```
