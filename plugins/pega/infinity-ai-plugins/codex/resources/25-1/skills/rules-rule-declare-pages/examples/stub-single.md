---
name: Stub Data Page (Single)
description: Minimal connector-backed single/page Data Page — smallest valid create payload for a single-record lookup by key (pyPageType "normal", one IN parameter, single Connector source).
---

```json
{
  "pyPageName": "D_Customer",
  "pyLabel": "Customer",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyStructure": "page",
  "pyPageType": "normal",
  "pyScope": "thread",
  "pyParameters": [
    {
      "pyParametersParamName": "CustomerID",
      "pyParametersParamType": "String",
      "pyParametersParamInOut": "IN",
      "pyParametersParamReq": "-1"
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
      "pyRESTMethod": "GET"
    }
  ]
}
```
