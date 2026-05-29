---
name: "CompareTwoDateTimes"
description: "CompareTwoDateTimes: [First DateTime] [relation] [Second DateTime]"
---

```json
{
  "purpose": "CompareTwoDateTimes",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "CompareTwoDateTimes",
    "pyCity": "CompareTwoDateTimes",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoDateTimes({lDate}, \"{comparator}\", {rDate})",
    "pyEcho": "[First DateTime] [relation] [Second DateTime]",
    "pyLabel": "[First DateTime][relation][Second DateTime]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Compares two DateTime Strings using a relation comparator specified as a parameter.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "First DateTime",
        "pyParametersParamIntelliValidateAs": "Param.lDate",
        "pyParametersParamValue": ".SubmittedDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
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
        "pyParametersParamName": "rDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second DateTime",
        "pyParametersParamIntelliValidateAs": "Param.rDate",
        "pyParametersParamValue": ".ApprovalDeadline"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "First DateTime",
        "pyParametersParamIntelliValidateAs": "Param.lDate",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "relation",
        "pyParametersParamIntelliValidateAs": "Primary.pyDateComparators",
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
        "pyParametersParamName": "rDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Second DateTime",
        "pyParametersParamIntelliValidateAs": "Param.rDate",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "lDate": ".SubmittedDate",
    "comparator": "is after",
    "rDate": ".ApprovalDeadline"
  }
}
```
