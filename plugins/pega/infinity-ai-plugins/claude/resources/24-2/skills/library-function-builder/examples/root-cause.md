---
name: "RootCause"
description: "RootCause: .pyRootCause [relation] [value]"
---

```json
{
  "purpose": "RootCause",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "compareTwoStrings",
    "pyCity": "compareTwoStrings",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoStrings({lValue}, \"{comparator}\", {rValue})",
    "pyReturnType": "boolean",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamValue": ".pyRootCause"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamValue": "EQUALS",
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
    "pyEcho": "[first String] [relation] [Second String]",
    "pyLabel": "[first String][relation][Second String]"
  },
  "pyCallParams": {
    "lValue": ".pyRootCause",
    "comparator": "EQUALS",
    "rValue": ""
  }
}
```
