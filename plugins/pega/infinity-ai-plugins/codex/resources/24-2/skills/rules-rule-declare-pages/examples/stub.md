---
name: Stub Data Page (List)
description: Minimal connector-backed list Data Page — smallest valid create payload for the most common integration pattern (pyPageType "normal", single Connector source, no parameters).
---

```json
{
  "pyPageName": "D_CustomerList",
  "pyLabel": "Customer List",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyStructure": "list",
  "pyPageType": "normal",
  "pyScope": "thread",
  "pyParameters": [],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "Connector",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Customer",
      "pyStructure": "list",
      "pyConnectorName": "GetCustomers",
      "pyConnectorClassName": "MyOrg-MyApp-Data-Customer",
      "pyConnectorList": "Rule-Connect-REST",
      "pyRESTMethod": "GET"
    }
  ]
}
```
