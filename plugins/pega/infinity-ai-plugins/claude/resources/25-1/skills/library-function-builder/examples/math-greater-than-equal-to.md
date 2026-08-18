---
name: "MathGreaterThanEqualTo"
description: "MathGreaterThanEqualTo: [first number] is greater than or equal to [second number]"
---

```json
{
  "purpose": "MathGreaterThanEqualTo",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "MathGreaterThanEqualTo",
    "pyCity": "MathGreaterThanEqualTo",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Math).greaterThanEqualTo({num1}, {num2})",
    "pyEcho": "[first number] is greater than or equal to [second number]",
    "pyLabel": "[first number]is greater than or equal to[second number]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "num1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": ".CapacityScore"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "num2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "second number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": "90"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "num1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "first number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is greater than or equal to"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "num2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "second number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "num1": ".CapacityScore",
    "num2": "90"
  }
}
```
