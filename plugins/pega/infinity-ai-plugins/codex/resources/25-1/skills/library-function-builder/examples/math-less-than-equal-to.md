---
name: "MathLessThanEqualTo"
description: "MathLessThanEqualTo: [the first number] is less than or equal to [the second number]"
---

```json
{
  "purpose": "MathLessThanEqualTo",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "MathLessThanEqualTo",
    "pyCity": "MathLessThanEqualTo",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Math).lessThanEqualTo({num1}, {num2})",
    "pyEcho": "[the first number] is less than or equal to [the second number]",
    "pyLabel": "[the first number]is less than or equal to[the second number]",
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
        "pyParametersParamValue": ".ErrorCount"
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
        "pyParametersParamValue": "0"
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
        "pyParametersParamValue": "is less than or equal to"
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
    "num1": ".ErrorCount",
    "num2": "0"
  }
}
```
