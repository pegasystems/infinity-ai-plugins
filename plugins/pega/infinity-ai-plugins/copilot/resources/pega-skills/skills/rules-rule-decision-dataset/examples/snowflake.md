---
name: Snowflake Dataset
description: Complete Snowflake dataset (Rule-Decision-DataSet) with column mappings, select keys, resume keys, and partition key. Uses pyType "Data-Admin-DataSet-Snowflake" with a Snowflake data instance connection.
---

```json
{
  "pxObjClass": "Rule-Decision-DataSet",
  "pyClassName": "MyOrg-MyApp-Data-Customer",
  "pyRuleName": "CustomerSnowflake",
  "pyLabel": "CustomerSnowflake",
  "pyPurpose": "CustomerSnowflake",
  "pyCategory": "Data-Admin-DataSet-Snowflake",
  "pyType": "Data-Admin-DataSet-Snowflake",
  "pyTypeLabel": "Snowflake",
  "pyRuleAvailable": "Yes",
  "pyCanTransfer": "true",
  "pyConfiguration": {
    "pxObjClass": "Data-Admin-DataSet-Snowflake",
    "pyClassName": "MyOrg-MyApp-Data-Customer",
    "pyImplementation": "Pega-DecisionEngine:SnowflakeDataSet",
    "pySnowflake": "MySnowflakeInstance",
    "pyTableName": "CUSTOMERS",
    "pyTableNameType": "Single",
    "pySSLProtocolVersion": "TLSv1.2",
    "pySelectAll": "true",
    "pyMappings": [
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Mappings",
        "pyColumnName": "CUSTOMERID",
        "pyPropertyName": ".CustomerID"
      },
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Mappings",
        "pyColumnName": "FIRSTNAME",
        "pyPropertyName": ".FirstName"
      },
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Mappings",
        "pyColumnName": "LASTNAME",
        "pyPropertyName": ".LastName"
      },
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Mappings",
        "pyColumnName": "REGION",
        "pyPropertyName": ".Region"
      }
    ],
    "pySelectKeys": [
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Select",
        "pyColumnName": "CUSTOMERID",
        "pyPropertyName": ".CustomerID"
      }
    ],
    "pyResumeKeys": [
      {
        "pxObjClass": "Embed-DataSet-Snowflake-Resume",
        "pyColumnName": "CUSTOMERID",
        "pyPropertyName": ".CustomerID"
      }
    ],
    "pyPartitionKey": {
      "pxObjClass": "Embed-DataSet-Snowflake-Partition",
      "pyColumnName": "REGION",
      "pyPropertyName": ".Region"
    }
  },
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses"
    }
  ]
}
```
