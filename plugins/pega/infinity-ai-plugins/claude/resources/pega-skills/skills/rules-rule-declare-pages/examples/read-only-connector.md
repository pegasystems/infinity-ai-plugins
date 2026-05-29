---
name: Read-Only Connector-Backed Data Page
description: Complete read-only (non-savable) data page sourced from a REST connector. Uses pyPageType "normal" which derives pyType="normal", pyIsSavable="false", pyUseNewGenPageForEditableDataPage="false". Do NOT use pyPageType "loadonly" — it causes the page to appear editable in the UI.
---

```json
{
  "pxObjClass": "Rule-Declare-Pages",
  "pyRuleName": "D_Product",
  "pyLabel": "Product",
  "pyDescription": "Single product fetched from external API by ID",
  "pyClassName": "MyOrg-MyApp-Data-Product",
  "pyStructure": "page",
  "pyScope": "thread",
  "pyPageType": "normal",
  "pyRefreshStrategy": "never",
  "pyRefreshOncePerInteraction": "false",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "ProductID",
      "pyParametersParamType": "STRING",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "Connector",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Product",
      "pyStructure": "page",
      "pyConnectorName": "GetProduct",
      "pyConnectorClassName": "MyOrg-MyApp-Data-Product",
      "pyConnectorList": "Rule-Connect-REST",
      "pyRESTMethod": "GET",
      "pyResDataTransform": "GetProductResponse",
      "pyPassCurrentParamPageForRespDT": "true"
    }
  ]
}
```
