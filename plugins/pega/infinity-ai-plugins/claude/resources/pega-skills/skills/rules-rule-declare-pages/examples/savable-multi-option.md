---
name: Savable Data Page with Multi-Option Save Plan
description: Savable data page with a conditional save plan chaining dbDelete, simplepatch, and simplesave routed by When rules. Demonstrates the multi-save-option pattern used when different caller actions need different persistence paths.
---

```json
{
  "pyPageName": "D_DataAdminSystemSetting",
  "pyLabel": "System Setting",
  "pyDescription": "Savable system setting; routes to dbDelete / simplepatch / simplesave by caller intent",
  "pyClassName": "Data-Admin-System-Settings",
  "pyStructure": "page",
  "pyScope": "thread",
  "pyPageType": "savable",
  "pyParameters": [
    {
      "pyParametersParamName": "settingID",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1",
      "pyParametersParamDesc": "Setting identifier"
    },
    {
      "pyParametersParamName": "pyGUID",
      "pyParametersParamType": "STRING",
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
      "pyClassName": "Data-Admin-System-Settings",
      "pyStructure": "page",
      "pyLookupClassName": "Data-Admin-System-Settings",
      "pyLookupName": "System Setting",
      "pyClassKeyValueList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "settingID",
          "pyValue": "Param.settingID"
        }
      ]
    }
  ],
  "pyDataPageSaveOptionList": [
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "dbDelete",
      "pySaveOptionWhen": "pyIsDelete",
      "pyClassName": "Data-Admin-System-Settings",
      "pyStructure": "page"
    },
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "simplepatch",
      "pySaveOptionWhen": "pyIsPatch",
      "pyClassName": "Data-Admin-System-Settings",
      "pyStructure": "page"
    },
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "simplesave",
      "pySaveOptionWhen": "Always",
      "pyClassName": "Data-Admin-System-Settings",
      "pyStructure": "page"
    }
  ]
}
```

Notes:

- Pega evaluates save options in array order; the first whose `pySaveOptionWhen` evaluates true executes.
- **Alternate key storage** — the `pyGUID` parameter is marked `pyIsAlternateKeyStorage: "true"` with `pyAltKeyStorageField: ".pyGUID"`, telling the save engine which field identifies the record for patch/delete. Roughly 60% of savable data pages use this pattern.
- Activity-type save options (not shown) add `pyActivityName`, `pyRATimeout`, and `pyActivityParamList` with the usual `Embed-NameValuePair` shape; they support `pyParameterInOut: "OUT"`, `pyParameterType: "PAGE"`, and `pyParameterIntelliBaseClass` for page-typed parameters.
- Save-time data transform parameters use `pyDTParamList` (same shape as on source entries).
