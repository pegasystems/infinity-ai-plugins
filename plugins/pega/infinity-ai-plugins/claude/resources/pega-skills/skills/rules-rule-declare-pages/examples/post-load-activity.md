---
name: Data Page with Post-Load Activity
description: Data page that runs a custom activity after the source loads — used for enrichment, cross-page joins, or derived field computation. Configured via pyPostActivity, pyPostActivityParams, and pyPassCurrentParamPageForPostActivity.
---

```json
{
  "pyPageName": "D_CustomerEnriched",
  "pyLabel": "Customer Enriched",
  "pyDescription": "Customer loaded via connector, then enriched by post-activity",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyStructure": "page",
  "pyScope": "thread",
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
      "pyDeclarePagesDataSource": "Connector",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Customer",
      "pyStructure": "page",
      "pyConnectorName": "GetCustomer",
      "pyConnectorClassName": "MyOrg-MyApp-Data-Customer",
      "pyConnectorList": "Rule-Connect-REST",
      "pyRESTMethod": "GET",
      "pyReqDataTransform": "GetCustomerRequest",
      "pyResDataTransform": "GetCustomerResponse",
      "pyPassCurrentParamPageForReqDT": "true",
      "pyPassCurrentParamPageForRespDT": "true",
      "pyPassCurrentParamPageForActivity": "true"
    }
  ],
  "pyPostActivity": "EnrichCustomerProfile",
  "pyPassCurrentParamPageForPostActivity": "true",
  "pyPostActivityParams": [
    {
      "pxObjClass": "Embed-NameValuePair",
      "pyName": "customerID",
      "pyValue": "",
      "pyIsActivityParameter": "true",
      "pyParameterRequired": "-1",
      "pyParameterType": "STRING"
    },
    {
      "pxObjClass": "Embed-NameValuePair",
      "pyName": "includeCreditScore",
      "pyValue": "true",
      "pyIsActivityParameter": "true",
      "pyParameterRequired": "0",
      "pyParameterType": "STRING"
    }
  ]
}
```

Notes:

- `pyPostActivity` runs **after** the source load completes. Use it for data enrichment, cross-page joins, or computed fields that depend on the loaded data.
- `pyPassCurrentParamPageForPostActivity: "true"` forwards the data page's parameter page to the activity.
- `pyPostActivityParams` uses the standard `Embed-NameValuePair` shape: `pyName`, `pyValue` (empty = pass-through from parameter page, `"literal"` = hardcoded, `"param.X"` = explicit param reference).
