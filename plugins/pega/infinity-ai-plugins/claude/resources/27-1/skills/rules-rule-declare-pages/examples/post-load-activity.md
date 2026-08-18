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
      "pyParametersParamType": "String",
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
