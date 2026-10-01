---
name: "pxIsAttachmentOfCategoryInCase"
description: "pxIsAttachmentOfCategoryInCase: A [attachment category] is [attached/not attached] to the current case"
---

```json
{
  "purpose": "pxIsAttachmentOfCategoryInCase",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxIsAttachmentOfCategoryInCase",
    "pyCity": "pxIsAttachmentOfCategoryInCase",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-ProcessEngine:WorkUtilities).pxIsAttachmentOfCategoryInCase({CategoryName}, \"{Comparator}\", {pzInsKey})",
    "pyEcho": "A [attachment category] is [attached/not attached] to the current case",
    "pyLabel": "pxIsAttachmentOfCategoryInCase",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-ProcessEngine",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "CategoryName",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "attachment category",
        "pyIsOptional": "false",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": "Correspondence"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "Comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "attached/not attached",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "attached|Attached,not attached|NotAttached",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyParametersParamValue": "Attached",
        "pyAllowedValues": [
          "Attached",
          "NotAttached"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "pzInsKey",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "InsKey of Case",
        "pyIsOptional": "false",
        "pyParametersParamIntelliValidateAs": "Primary.pzInsKey",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamValue": ".pzInsKey"
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "CategoryName",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "attachment category",
        "pyIsOptional": "false",
        "pyReference": "1",
        "pyParametersParamDropdownValues": "Property"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyParametersParamName": "Comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "attached/not attached",
        "pyIsOptional": "false",
        "pyReference": "2",
        "pyParametersParamIntelliValidateAs": "attached|Attached,not attached|NotAttached",
        "pyParametersParamDropdownValues": "OptionsList",
        "pyAllowedValues": [
          "Attached",
          "NotAttached"
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyParametersParamName": "pzInsKey",
        "pyParametersParamType": "Read",
        "pyParametersParamDesc": "InsKey of Case",
        "pyIsOptional": "false",
        "pyReference": "3",
        "pyParametersParamIntelliValidateAs": "Primary.pzInsKey",
        "pyParametersParamDropdownValues": "Property"
      }
    ]
  },
  "pyCallParams": {
    "CategoryName": "Correspondence",
    "Comparator": "Attached",
    "pzInsKey": ".pzInsKey"
  }
}
```
