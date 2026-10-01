---
name: "pzCompareTwoDateTimesWrapper"
description: "pzCompareTwoDateTimesWrapper: pzCompareTwoDateTimesWrapper using [lDate] [comparator] [rDate]"
---

```json
{
  "purpose": "pzCompareTwoDateTimesWrapper",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzCompareTwoDateTimesWrapper",
    "pyCity": "pzCompareTwoDateTimesWrapper",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).pzCompareTwoDateTimesWrapper({lDate}, \"{comparator}\", {rDate})",
    "pyEcho": "pzCompareTwoDateTimesWrapper using [lDate] [comparator] [rDate]",
    "pyLabel": "pzCompareTwoDateTimesWrapper",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lDate",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".ActualStartDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "is after",
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
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".PlannedStartDate"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lDate",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
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
        "pyParametersParamName": "rDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "rDate",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "lDate": ".ActualStartDate",
    "comparator": "is after",
    "rDate": ".PlannedStartDate"
  }
}
```
