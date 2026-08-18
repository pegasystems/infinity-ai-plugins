---
name: "MathLessThan"
description: "MathLessThan: [the first number] is less than [the second number]"
---

```json
{
  "purpose": "MathLessThan",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "MathLessThan",
    "pyCity": "MathLessThan",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Math).lessThan({num1}, {num2})",
    "pyEcho": "[the first number] is less than [the second number]",
    "pyLabel": "[the first number]is less than[the second number]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxListSubscript": "1",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "num1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the first number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": ".DaysRemaining"
      },
      {
        "pxListSubscript": "2",
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "num2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the second number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyParametersParamValue": "5"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "num1",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the first number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is less than"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "num2",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the second number",
        "pyParametersParamSize": "15",
        "pyParametersParamIntelliBaseClass": "pyClassName",
        "pyParametersParamIntelliRule": "Rule-Obj-Property",
        "pyParametersParamIntelliValidateAs": "15",
        "pyReference": "3"
      }
    ]
  },
  "pyCallParams": {
    "num1": ".DaysRemaining",
    "num2": "5"
  }
}
```
