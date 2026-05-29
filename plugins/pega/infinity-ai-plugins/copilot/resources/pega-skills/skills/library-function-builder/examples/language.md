---
name: "Language"
description: "Language: .pyLanguage [relation] [value]"
---

```json
{
  "purpose": "Language",
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
        "pyParametersParamValue": ".pyLanguage"
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
        "pyParametersParamValue": "English"
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
    "lValue": ".pyLanguage",
    "comparator": "EQUALS",
    "rValue": "English"
  }
}
```
