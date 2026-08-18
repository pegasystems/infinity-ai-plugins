---
name: "pxIsNotInListOfValuesWCB"
description: "pxIsNotInListOfValuesWCB: [value to search for] is not in [list of values]"
---

```json
{
  "purpose": "pxIsNotInListOfValuesWCB",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsNotInListOfValuesWCB",
    "pyCity": "pxIsNotInListOfValuesWCB",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsNotInListOfValuesWCB({value}, {listOfValues})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Alias for pxIsNotInListOfValuesWCB--(String,String) function.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value to search for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Region"
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
        "pyParametersParamValue": "Test,Sandbox",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyCommaDelimitedString": "Test,Sandbox"
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
        "pyParametersParamDesc": "value to search for",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "1"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is not in"
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
    "pyEcho": "[value to search for] is not in [list of values]",
    "pyLabel": "[value to search for]is not in[list of values]"
  },
  "pyCallParams": {
    "value": ".Region",
    "listOfValues": "Test,Sandbox"
  }
}
```
