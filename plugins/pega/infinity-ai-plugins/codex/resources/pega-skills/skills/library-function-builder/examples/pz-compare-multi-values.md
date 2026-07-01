---
name: "pzCompareMultiValues"
description: "pzCompareMultiValues: pzCompareMultiValues--(String,String,ClipboardProperty,String) using [lValue] [comparator] [rValue] [datatype]"
---

```json
{
  "purpose": "pzCompareMultiValues",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzCompareMultiValues",
    "pyCity": "pzCompareMultiValues",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:ExpressionEvaluators).pzCompareMultiValues({lValue}, \"{comparator}\", {rValue}, \"{datatype}\")",
    "pyEcho": "pzCompareMultiValues--(String,String,ClipboardProperty,String) using [lValue] [comparator] [rValue] [datatype]",
    "pyLabel": "Compare Multi Values",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lValue",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".Amount"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "primary.pyComparators",
        "pyParametersParamValue": ">",
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
        "pyParametersParamDesc": "rValue",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "1000"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "datatype",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "datatype",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "Decimal"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lValue",
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
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "rValue",
        "pyIsOptional": "false",
        "pyReference": "3"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "4",
        "pyParametersParamName": "datatype",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "datatype",
        "pyIsOptional": "false",
        "pyReference": "4"
      }
    ]
  },
  "pyCallParams": {
    "lValue": ".Amount",
    "comparator": ">",
    "rValue": "1000",
    "datatype": "Decimal"
  }
}
```
