---
name: "pxPageListLengthCompare"
description: "pxPageListLengthCompare: length of [a pagelist property] is [comparison operator] [value]"
---

**Important — requires a PageList property on the target class.**
`pageListProp` must reference a real PageList property. A class with only
scalar properties cannot host this alias.

```json
{
  "purpose": "pxPageListLengthCompare",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxPageListLengthCompare",
    "pyCity": "pxPageListLengthCompare",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RULES:Page).pxPageListLengthCompare({pageListProp}, \"{comparator}\", {compareValue})",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RULES",
    "pyUsage": "java",
    "pyDescription": "Compares the length of a page list to the value given",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "pageListProp",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "a pagelist property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".Attachments"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparison operator",
        "pyParametersParamValue": "<",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "Less Than|<,Greater Than|>,Equal To|=",
        "pyAllowedValues": [
          "<",
          ">",
          "="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "compareValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "0"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "length of"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "pageListProp",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "a pagelist property",
        "pyParametersParamDropdownValues": "Property",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "is"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparison operator",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamIntelliValidateAs": "Less Than|<,Greater Than|>,Equal To|=",
        "pyReference": "4",
        "pyAllowedValues": [
          "<",
          ">",
          "="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "compareValue",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "value",
        "pyParametersParamDropdownValues": "Property",
        "pyReference": "5"
      }
    ],
    "pyEcho": "length of [a pagelist property] is [comparison operator] [value]",
    "pyLabel": "length of[a pagelist property]is[comparison operator][value]"
  },
  "pyCallParams": {
    "pageListProp": ".Attachments",
    "comparator": ">",
    "compareValue": "0"
  }
}
```
