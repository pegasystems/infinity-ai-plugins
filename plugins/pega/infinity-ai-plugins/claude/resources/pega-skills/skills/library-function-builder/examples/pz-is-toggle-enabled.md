---
name: "pzIsToggleEnabled"
description: "pzIsToggleEnabled: Is Toggle Enabled using [ToggleType] [ToggleIdentifier]"
---

```json
{
  "purpose": "pzIsToggleEnabled",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzIsToggleEnabled",
    "pyCity": "pzIsToggleEnabled",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-WB:pzReleaseToggleUtilities).pzIsToggleEnabled({ToggleType}, {ToggleIdentifier})",
    "pyEcho": "Is Toggle Enabled using [ToggleType] [ToggleIdentifier]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-WB",
    "pyUsage": "java",
    "pyDescription": "Alias to call RUF to fetch toggle status",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "ToggleType",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "ToggleType",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "40",
        "pyIsOptional": "false",
        "pyParametersParamValue": "Feature"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "ToggleIdentifier",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "ToggleIdentifier",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "40",
        "pyIsOptional": "false",
        "pyParametersParamValue": "NewDashboard"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Is Toggle Enabled using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "ToggleType",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "ToggleType",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "40",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "ToggleIdentifier",
        "pyParametersParamType": "Textbox",
        "pyParametersParamDesc": "ToggleIdentifier",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "40",
        "pyIsOptional": "false",
        "pyReference": "3"
      }
    ],
    "pyLabel": "Is Toggle Enabled using[ToggleType][ToggleIdentifier]"
  },
  "pyCallParams": {
    "ToggleType": "Feature",
    "ToggleIdentifier": "NewDashboard"
  }
}
```
