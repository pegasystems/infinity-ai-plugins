---
name: "pxIsInListOfValuesWCB"
description: "pxIsInListOfValuesWCB: [value] is in [list of values]"
---

```json
{
  "purpose": "pxIsInListOfValuesWCB",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsInListOfValuesWCB",
    "pyCity": "pxIsInListOfValuesWCB",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsInListOfValuesWCB({value}, {listOfValues})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Alias for pxIsInListOfValuesWCB--(String,String) function",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Status"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "listOfValues",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "list of values",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyEchoParametersParamValue": "pyCommaDelimitedString",
        "pyIsOptional": "false",
        "pyParametersParamValue": "Open,In Progress,Pending",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyCommaDelimitedString": "Open,In Progress,Pending"
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
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
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "list of values",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pyCommaDelimitedString",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ],
    "pyEcho": "[value] is in [list of values]",
    "pyLabel": "[value]is in[list of values]"
  },
  "pyCallParams": {
    "value": ".Status",
    "listOfValues": "Open,In Progress,Pending"
  }
}
```
