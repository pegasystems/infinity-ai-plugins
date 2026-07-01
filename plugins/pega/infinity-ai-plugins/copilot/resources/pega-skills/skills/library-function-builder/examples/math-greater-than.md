---
name: "MathGreaterThan"
description: "MathGreaterThan: [first number] is greater than [second number]"
---

```json
{
  "purpose": "MathGreaterThan",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "MathGreaterThan",
    "pyCity": "MathGreaterThan",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Math).greaterThan({num1}, {num2})",
    "pyEcho": "[first number] is greater than [second number]",
    "pyLabel": "[first number]Is Greater Than[second number]",
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
        "pyParametersParamValue": ".Revenue"
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
        "pyParametersParamValue": "50000"
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
        "pyParametersParamValue": "is greater than"
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
    "num1": ".Revenue",
    "num2": "50000"
  }
}
```
