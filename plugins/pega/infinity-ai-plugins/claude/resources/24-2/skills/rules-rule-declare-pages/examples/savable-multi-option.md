---
name: Savable Data Page with Multi-Option Save Plan
description: Savable data page with a conditional save plan chaining dbDelete, simplepatch, and simplesave routed by When rules. Demonstrates the multi-save-option pattern used when different caller actions need different persistence paths.
---

```json
{
  "pyPageName": "D_Employee",
  "pyLabel": "Employee",
  "pyDescription": "Savable employee record; routes to dbDelete / simplepatch / simplesave by caller intent",
  "pyClassName": "MyOrg-MyApp-Data-Employee",
  "pyStructure": "page",
  "pyScope": "thread",
  "pyPageType": "savable",
  "pyParameters": [
    {
      "pyParametersParamName": "ID",
      "pyParametersParamType": "String",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1",
      "pyParametersParamDesc": "Employee identifier"
    },
    {
      "pyParametersParamName": "pyGUID",
      "pyParametersParamType": "String",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "0",
      "pyParametersParamDesc": "Alternate storage key",
      "pyIsAlternateKeyStorage": "true",
      "pyAltKeyStorageField": ".pyGUID"
    }
  ],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "ObjOpen",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Employee",
      "pyStructure": "page",
      "pyLookupClassName": "MyOrg-MyApp-Data-Employee",
      "pyLookupName": "Employee",
      "pyClassKeyValueList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "ID",
          "pyValue": "Param.ID"
        }
      ]
    }
  ],
  "pyDataPageSaveOptionList": [
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "dbDelete",
      "pySaveOptionWhen": "pyIsDelete",
      "pyClassName": "MyOrg-MyApp-Data-Employee",
      "pyStructure": "page"
    },
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "simplepatch",
      "pySaveOptionWhen": "pyIsPatch",
      "pyClassName": "MyOrg-MyApp-Data-Employee",
      "pyStructure": "page"
    },
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "simplesave",
      "pySaveOptionWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Employee",
      "pyStructure": "page"
    }
  ]
}
```