---
name: Savable Data Page (simplesave)
description: Savable data page that persists changes back to the source via a single simplesave save option. Set pyPageType to "savable" (which derives pyType="loadonly" and pyIsSavable="true") and populate pyDataPageSaveOptionList with one Embed-DeclarePageSaveOption.
---

```json
{
  "pyPageName": "D_CustomerProfile",
  "pyLabel": "Customer Profile",
  "pyDescription": "Savable customer profile loaded from DB",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyStructure": "page",
  "pyScope": "thread",
  "pyPageType": "savable",
  "pyParameters": [
    {
      "pyParametersParamName": "customerID",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1",
      "pyParametersParamDesc": "Customer ID"
    }
  ],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "ObjOpen",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Customer",
      "pyStructure": "page",
      "pyLookupClassName": "MyOrg-MyApp-Data-Customer",
      "pyLookupName": "Customer",
      "pyClassKeyValueList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "customerID",
          "pyValue": "Param.customerID"
        }
      ]
    }
  ],
  "pyDataPageSaveOptionList": [
    {
      "pxObjClass": "Embed-DeclarePageSaveOption",
      "pySaveOptionType": "simplesave",
      "pySaveOptionWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Customer",
      "pySaveOptionClassName": "MyOrg-MyApp-Data-Customer",
      "pyStructure": "page"
    }
  ]
}
```

Notes:

- Agents should set `pyPageType` only. `pyType` ("loadonly") and `pyIsSavable` ("true") are derived from `pyPageType: "savable"`.
- Node-scoped data pages (`pyScope: "node"`) cannot be savable.
