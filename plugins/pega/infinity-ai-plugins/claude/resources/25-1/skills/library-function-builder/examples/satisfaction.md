---
name: "Satisfaction"
description: "Satisfaction"
---

```json
{
  "purpose": "Satisfaction",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareTwoNumbers",
    "pyCity": "CompareTwoNumbers",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoNumbers({lValue}, \"{comparator}\", {rValue})",
    "pyReturnType": "boolean",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamValue": ".pyStatusCustomerSat"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamValue": "=",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyAllowedValues": [
          "=",
          "!=",
          ">",
          "<",
          ">=",
          "<="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamValue": ""
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyAllowedValues": [
          "=",
          "!=",
          ">",
          "<",
          ">=",
          "<="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "rValue",
        "pyParametersParamType": "Freeform"
      }
    ],
    "pyRuleSet": "Pega-RULES",
    "pyEcho": "[first number] [relation] [second number]",
    "pyLabel": "[first number][relation][second number]"
  },
  "pyCallParams": {
    "lValue": ".pyStatusCustomerSat",
    "comparator": "=",
    "rValue": ""
  }
}
```
