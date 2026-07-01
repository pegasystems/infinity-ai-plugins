---
name: "pxValueIsNotInPageList"
description: "pxValueIsNotInPageList: [pagelist to look in] does not contain a page where [property name to look at] equals [value to look for]"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property. The inner property in
`lookAt` is resolved against the page class within that PageList, not the
rule's main class. A class with only scalar properties cannot host this alias.

```json
{
  "purpose": "pxValueIsNotInPageList",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxValueIsNotInPageList",
    "pyCity": "pxValueIsNotInPageList",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).pxIsNotInPageList({lookFor}, {lookAt}, {lookIn})",
    "pyEcho": "[pagelist to look in] does not contain a page where [property name to look at] equals [value to look for]",
    "pyLabel": "[pagelist to look in]does not contain a page where[property name to look at]equals[value to look for]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Check if a page in a page list does not contain a property with a given value",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value to look for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".pyGotoStage"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "property name to look at",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "pyStageName"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "pagelist to look in",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": "pyStageList.pxResults"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "pagelist to look in",
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
        "pyNodeCaption": "2",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "property name to look at",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "equals"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "lookFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value to look for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "5"
      }
    ]
  },
  "pyCallParams": {
    "lookFor": "\"Blocked\"",
    "lookAt": ".Status",
    "lookIn": ".Tasks"
  }
}
```
