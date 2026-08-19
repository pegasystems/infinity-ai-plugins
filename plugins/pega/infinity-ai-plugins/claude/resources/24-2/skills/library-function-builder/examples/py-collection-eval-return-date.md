---
name: "pyCollectionEvalReturnDate"
description: "pyCollectionEvalReturnDate: Return value [relation] [Second DateTime]"
---

```json
{
  "purpose": "pyCollectionEvalReturnDate",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pyCollectionEvalReturnDate",
    "pyCity": "pyCollectionEvalReturnDate",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoDateTimes({lDate}, \"{comparator}\", {rDate})",
    "pyEcho": "Return value [relation] [Second DateTime]",
    "pyLabel": "Collection Eval Return Date",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "First DateTime",
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
        "pyParametersParamDesc": "Second DateTime",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "Param.rDate",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".TargetDate"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lDate",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "First DateTime",
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
        "pyParametersParamDesc": "Second DateTime",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamIntelliValidateAs": "Param.rDate",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "lDate": "param.pxReturnValue",
    "comparator": "is after",
    "rDate": ".TargetDate"
  }
}
```
