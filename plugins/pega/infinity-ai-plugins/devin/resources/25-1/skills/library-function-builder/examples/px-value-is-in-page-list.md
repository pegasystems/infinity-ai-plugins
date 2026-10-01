---
name: "pxValueIsInPageList"
description: "pxValueIsInPageList: [Pagelist Name] contains a page where [Property Name] equals [Value]"
---

**Important — requires a PageList property on the target class.**
`lookIn` must reference a real PageList property (e.g. `.Subscriptions`). The
inner property in `lookAt` (e.g. `.Type`) is resolved against the class of the
pages in that PageList, not the rule's main class. A class with only scalar
properties cannot host this alias.

```json
{
  "purpose": "pxValueIsInPageList",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxValueIsInPageList",
    "pyCity": "pxValueIsInPageList",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Utilities).IsInPageList({lookFor}, {lookAt}, {lookIn})",
    "pyEcho": "[Pagelist Name] contains a page where [Property Name] equals [Value]",
    "pyLabel": "[Pagelist Name]contains a page where[Property name]equals[Value]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Check if a page in a page list contains a property with a given value",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookFor",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".pyCategory"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Property Name",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "pyCategoryName"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Pagelist Name",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "pyCategoryList.pxResults"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "lookIn",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Pagelist Name",
        "pyParametersParamDropdownValues": "Property",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "contains a page where"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "lookAt",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Property Name",
        "pyParametersParamDropdownValues": "Property",
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
        "pyParametersParamDesc": "Value",
        "pyParametersParamDropdownValues": "Property",
        "pyReference": "5"
      }
    ]
  },
  "pyCallParams": {
    "lookFor": "\"Active\"",
    "lookAt": ".Status",
    "lookIn": ".Accounts"
  }
}
```
