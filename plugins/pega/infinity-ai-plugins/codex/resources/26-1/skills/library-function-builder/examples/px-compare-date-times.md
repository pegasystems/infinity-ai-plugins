---
name: "pxCompareDateTimes"
description: "pxCompareDateTimes: compare DateTimes using [lDate] [relation] [rDate]"
---

```json
{
  "purpose": "pxCompareDateTimes",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxCompareDateTimes",
    "pyCity": "pxCompareDateTimes",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).pxCompareDateTimes({lDate}, \"{comparator}\", {rDate})",
    "pyEcho": "compare DateTimes using [lDate] [relation] [rDate]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lDate",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".ExpirationDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
        "pyIsOptional": "false",
        "pyParametersParamValue": "=",
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
        "pyParametersParamName": "rDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "rDate",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".RenewalDate"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "compare DateTimes using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lDate",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
        "pyIsOptional": "false",
        "pyReference": "3",
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
        "pyParametersParamName": "rDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "rDate",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "4"
      }
    ],
    "pyLabel": "compare DateTimes using[lDate][relation][rDate]"
  },
  "pyCallParams": {
    "lDate": ".ExpirationDate",
    "comparator": "is before",
    "rDate": ".RenewalDate"
  }
}
```
