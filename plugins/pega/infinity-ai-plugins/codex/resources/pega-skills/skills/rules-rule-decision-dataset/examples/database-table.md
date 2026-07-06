---
name: Database Table Dataset
description: Complete Database Table dataset (Rule-Decision-DataSet) with composite keys and partition key. Uses pyType "Data-Admin-DataSet-DB" with configuration pointing to a specific database table.
---

```json
{
  "pxObjClass": "Rule-Decision-DataSet",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyRuleName": "Customers",
  "pyLabel": "Customers",
  "pyPurpose": "Customers",
  "pyCategory": "Data-Admin-DataSet-DB",
  "pyType": "Data-Admin-DataSet-DB",
  "pyTypeLabel": "Database Table",
  "pyRuleAvailable": "Yes",
  "pyCanTransfer": "true",
  "pyConfiguration": {
    "pxObjClass": "Data-Admin-DataSet-DB",
    "pyImplementation": "Pega-DecisionEngine:DBDataSet",
    "pyTableName": "pr_data_customer",
    "pySSLProtocolVersion": "TLSv1.2",
    "pyKeys": [
      {
        "pxObjClass": "Embed-DataSet-KeyValue",
        "pyKey": ".CustomerID"
      },
      {
        "pxObjClass": "Embed-DataSet-KeyValue",
        "pyKey": ".RegionCode"
      }
    ],
    "pyPartitionKey": ".RegionCode"
  },
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses"
    }
  ]
}
```
