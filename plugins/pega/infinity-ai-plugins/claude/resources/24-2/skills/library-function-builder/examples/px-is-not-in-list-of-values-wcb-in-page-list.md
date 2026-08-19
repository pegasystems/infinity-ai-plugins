---
name: "pxIsNotInListOfValuesWCBInPageList"
description: "pxIsNotInListOfValuesWCBInPageList: [the property list to look in] does not contain a page where [the property name to get value of] is in [comma delimited list of values to compare against]"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property. The inner property in
`lookAt` is resolved against the page class within that PageList, not the
rule's main class. A class with only scalar properties cannot host this alias.

```json
{
  "purpose": "pxIsNotInListOfValuesWCBInPageList",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsNotInListOfValuesWCBInPageList",
    "pyCity": "pxIsNotInListOfValuesWCBInPageList",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsNotInListOfValuesWCB({lookAt}, {listOfValues}, {lookIn})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Alias for pxIsNotInListOfValuesWCB--(String,String,ClipboardProperty) function",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the property name to get value of",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Priority"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "comma delimited list of values to compare against",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "Low,Deferred"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the property list to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Incidents"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the property list to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "does not contain a page where"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "the property name to get value of",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is in"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "comma delimited list of values to compare against",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "5"
      }
    ],
    "pyEcho": "[the property list to look in] does not contain a page where [the property name to get value of] is in [comma delimited list of values to compare against]",
    "pyLabel": "[the property list to look in]does not contain a page where[the property name to get value of]is in[comma delimited list of values to compare against]"
  },
  "pyCallParams": {
    "lookAt": ".Priority",
    "listOfValues": "Low,Deferred",
    "lookIn": ".Incidents"
  }
}
```
