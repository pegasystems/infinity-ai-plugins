---
name: Stub Report Definition
description: Smallest valid create payload. When adding columns, populate BOTH pyUI.pyBody.pyUIFields AND pyContent.pyFields.pyListFields — columns in pyContent only are silently stripped on save.
---

```json
{
  "pyStreamName": "MyReportName",
  "pyLabel": "My Report",
  "pyReportTitle": "My Report",
  "pyDescription": "Short description of what this report returns.",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyUI": {
    "pzIsSummary": "false",
    "pyReportContentPageName": "pyReportContentPage",
    "pyReportingDbDropdown": "Standard",
    "pyUseAlternateDb": "false",
    "pyChart": {
      "pyEnableChart": "false",
      "pyGraphType": "Column"
    },
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyReportRank": {
        "pyRankType": "",
        "pyRankUIField": {}
      },
      "pyUIFields": [
        {
          "pyFieldName": ".pyID",
          "pyFieldLabel": "Case ID"
        },
        {
          "pyFieldName": ".pyLabel",
          "pyFieldLabel": "Label"
        }
      ],
      "pyUIFilters": {
        "pyFilterLogic": "",
        "pyFilter": []
      }
    },
    "pyUserInteractions": {
      "pyPagingParams": {
        "pyPagingEnabled": "true",
        "pyPageSize": "50",
        "pyPageMode": "Numeric",
        "pyReturnTotalResultCount": "true"
      }
    }
  },
  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "MyOrg-MyApp-Work-MyCase",
    "pyContentPageName": "pyReportContentPage",
    "pyReportContentPageName": "pyReportContentPage",
    "pyMaxRecords": "",
    "pyQueryTimeoutValue": "30",
    "pyIsOrdered": "true",
    "pyFields": {
      "pyListFields": [
        {
          "pyFieldName": ".pyID",
          "pyFieldLabel": "Case ID"
        },
        {
          "pyFieldName": ".pyLabel",
          "pyFieldLabel": "Label"
        }
      ]
    },
    "pyFilters": {
      "pyFilterLogic": "",
      "pyFilter": []
    },
    "pyReportRank": {
      "pyRankType": "",
      "pyRankField": {}
    },
    "pyPagesAndClasses": [
      {
        "pyPagesAndClassesClass": "MyOrg-MyApp-Work-MyCase"
      }
    ],
    "pyPaging": {
      "pyPagingEnabled": "true",
      "pyPageSize": "50",
      "pyPageMode": "Numeric",
      "pyReturnTotalResultCount": "true"
    },
    "pySource": {
      "pyUseAlternateDB": "false",
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard"
    }
  }
}
```
