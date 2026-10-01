---
name: "pxIsInListOfValuesWCBInPageList"
description: "pxIsInListOfValuesWCBInPageList: [lookIn] contains a page where [lookAt] is in [listOfValues]"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property. The inner property in
`lookAt` is resolved against the page class within that PageList, not the
rule's main class. A class with only scalar properties cannot host this alias.

```json
{
  "purpose": "pxIsInListOfValuesWCBInPageList",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsInListOfValuesWCBInPageList",
    "pyCity": "pxIsInListOfValuesWCBInPageList",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsInListOfValuesWCB({lookAt}, {listOfValues}, {lookIn})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Alias for pxIsInListOfValuesWCB--(String,String,ClipboardProperty) function",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lookAt",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Role"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "listOfValues",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "Admin,Manager"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lookIn",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".TeamMembers"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lookIn",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains a page where"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "lookAt",
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
        "pyParametersParamDesc": "listOfValues",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "5"
      }
    ],
    "pyEcho": "[lookIn] contains a page where [lookAt] is in [listOfValues]",
    "pyLabel": "[lookIn]contains a page where[lookAt]is in[listOfValues]"
  },
  "pyCallParams": {
    "lookAt": ".Role",
    "listOfValues": "Admin,Manager",
    "lookIn": ".TeamMembers"
  }
}
```
