---
name: "invokeValidate"
description: "invokeValidate: Validation of [Property Name] using [Edit Validate Name] fails"
---

```json
{
  "purpose": "invokeValidate",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "invokeValidate",
    "pyCity": "invokeValidate",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Property).invokeValidate({propertyName}, {validateName})",
    "pyEcho": "Validation of [Property Name] using [Edit Validate Name] fails",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "propertyName",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Property Name",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".Email"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "validateName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "Edit Validate Name",
        "pyEchoParametersParamValue": "pySampleEditValidateProperty",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySampleEditValidateProperty",
        "pyIsOptional": "false",
        "pyParametersParamValue": "pzNonZeroPositiveDoubleValue",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-When",
            "pxSubscript": "HtmlPropPage",
            "pySampleEditValidateProperty": "pzNonZeroPositiveDoubleValue"
          }
        }
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Validation of"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "propertyName",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "Property Name",
        "pyParametersParamDropdownValues": "Property",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "validateName",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "Edit Validate Name",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": ".pySampleEditValidateProperty",
        "pyIsOptional": "false",
        "pyReference": "4"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "fails"
      }
    ],
    "pyLabel": "Validation of[Property Name]using[Edit Validate Name]fails"
  },
  "pyCallParams": {
    "propertyName": ".Email",
    "validateName": "pzNonZeroPositiveDoubleValue"
  }
}
```
