---
name: "pxDateTimeisPastOrFuture"
description: "pxDateTimeisPastOrFuture: [a datetime] is in the [past/future]"
---

```json
{
  "purpose": "pxDateTimeisPastOrFuture",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxDateTimeisPastOrFuture",
    "pyCity": "pxDateTimeisPastOrFuture",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:DateTime).pxDateTimeisPastOrFuture({compareDateTime}, {checkIsPast})",
    "pyEcho": "[a datetime] is in the [past/future]",
    "pyLabel": "[a datetime]is in the[past/future]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Checks if compareDateTime is in the past or future",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "compareDateTime",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "a datetime",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".DueDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "checkIsPast",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "past/future",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "Past|true,Future|false",
        "pyIsOptional": "false",
        "pyParametersParamValue": "true",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "compareDateTime",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "a datetime",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is in the"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "checkIsPast",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "past/future",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "Past|true,Future|false",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyAllowedValues": [
          "true",
          "false"
        ]
      }
    ]
  },
  "pyCallParams": {
    "compareDateTime": ".DueDate",
    "checkIsPast": "true"
  }
}
```
