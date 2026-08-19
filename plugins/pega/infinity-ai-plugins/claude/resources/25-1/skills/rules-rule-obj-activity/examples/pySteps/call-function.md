---
name: Call-Function
description: Call a library function using @(RuleSet:Library).functionName(args) signatures
---

```json
{
  "pyStepsActivityName": "Call-Function",
  "pyStepsDescription": "Check if label equals Active",
  "pyParamArray": [
    {
      "PropertiesValue": "@(Pega-RULES:String).equals(.pyLabel, \"Active\")",
      "PropertiesName": "Param.IsActive",
      "pyTempPlaceHolder": "TempPlaceHolder",
      "pyStepsCallParams": { "pxObjClass": "" }
    }
  ],
  "pyStepsCallParamsList": [
    {
      "pxObjClass": "Embed-ActivitySteps",
      "pyDescription": ".pyLabel equals \"Active\"",
      "pyFunctionData": {
        "pxObjClass": "Embed-UserFunction",
        "pyBaseClass": "Rule-Obj-Activity",
        "pyCity": "StringEquals",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pyDataType": "all",
        "pyDescription": "",
        "pyEcho": "[the first string] equals [the second string]",
        "pyExpanded": "true",
        "pyLabel": "[the first string]equals[the second string]",
        "pyName": "StringEquals",
        "pyReturnType": "boolean",
        "pyReturnValue": "Param.IsActive",
        "pyRuleSet": "Pega-RULES",
        "pyShowReturnValue": "true",
        "pySignature": "@(Pega-RULES:String).equals({str1}, {str2})",
        "pySmartPromptClass": "pyStepsClassName",
        "pyUsage": "java",
        "pyParameters": [
          { "pxObjClass": "Embed-MethodParams", "pyIsFunction": "", "pyParametersParamDesc": "the first string", "pyParametersParamName": "str1", "pyParametersParamType": "Alias", "pyParametersParamValue": ".pyLabel" },
          { "pxObjClass": "Embed-MethodParams", "pyIsFunction": "", "pyParametersParamDesc": "the second string", "pyParametersParamName": "str2", "pyParametersParamType": "Freeform", "pyParametersParamValue": "\"Active\"" }
        ],
        "pyUIParameters": [
          { "pxObjClass": "Embed-MethodParams", "pyNodeCaption": "1", "pyParametersParamDesc": "the first string", "pyParametersParamName": "str1", "pyParametersParamType": "Alias", "pyParametersParamValue": "", "pyReference": "1" },
          { "pxObjClass": "Embed-MethodParams", "pyParametersParamType": "Label", "pyParametersParamValue": "equals" },
          { "pxObjClass": "Embed-MethodParams", "pyNodeCaption": "2", "pyParametersParamDesc": "the second string", "pyParametersParamName": "str2", "pyParametersParamType": "Freeform", "pyParametersParamValue": "", "pyReference": "3" }
        ]
      }
    }
  ]
}
```
