---
name: "pxIsNotInListOfValues"
description: "pxIsNotInListOfValues: [value] is not in [list of values]"
---

```json
{
  "purpose": "pxIsNotInListOfValues",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsNotInListOfValues",
    "pyCity": "pxIsNotInListOfValues",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:String).pxIsNotInListOfValues({value}, {listOfValues})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "value",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Category"
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
        "pyParametersParamValue": "Archive,Deleted,Deprecated",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pyCommaDelimitedString": "Archive,Deleted,Deprecated"
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
    "pyEcho": "[value] is not in [list of values]",
    "pyLabel": "[value]is not in[list of values]"
  },
  "pyCallParams": {
    "value": ".Category",
    "listOfValues": "Archive,Deleted,Deprecated"
  }
}
```
