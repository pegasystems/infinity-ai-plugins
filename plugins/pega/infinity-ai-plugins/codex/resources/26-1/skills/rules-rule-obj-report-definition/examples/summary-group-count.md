---
name: Summary Report with GroupBy and Aggregates
description: "Summary/aggregate report. DUAL-POPULATION: pyUI.pyBody.pyUIFields must mirror columns — group-by fields use pyGroupOrder + pySortOrder/pySortType; aggregates use pyFunction, pyFieldName, and pySelected=true. Without pyUIFields, columns show 'No items'. pyListFields must be empty for summary reports."
---

```json
{
  "pyStreamName": "CaseCountByStatus",
  "pyReportTitle": "Case Count by Status",
  "pyLabel": "Case Count by Status",
  "pyDescription": "Counts cases grouped by status.",
  "pyClassName": "Work-",

  "pyReportMetaData": {
    "pxIsSummary": "true"
  },

  "pyUI": {
    "pzIsSummary": "true",
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
          "pyFieldName": ".pyStatusWork",
          "pyFieldLabel": "Status",
          "pyDataType": "Text",
          "pyGroupOrder": "1",
          "pySortOrder": "1",
          "pySortType": "ASC",
          "pyHide": "false",
          "pySelected": "false"
        },
        {
          "pyFieldName": ".pyID",
          "pyFieldLabel": "Case Count",
          "pyDataType": "Text",
          "pyFunction": "COUNT",
          "pyHide": "false",
          "pySelected": "true"
        }
      ],
      "pyUIFilters": {
        "pyFilterLogic": "",
        "pyFilter": []
      }
    }
  },
  "pyContent": {
    "pxIsSummary": "true",
    "pyClassName": "Work-",
    "pyContentPageName": "pyReportContentPage",
    "pyReportContentPageName": "pyReportContentPage",
    "pyMaxRecords": "",
    "pyQueryTimeoutValue": "30",
    "pyFields": {
      "pyListFields": [],
      "pyGroupBy": [
        {
          "pyDisplayLayout": "false",
          "pyGroupByField": {
            "pyFieldName": ".pyStatusWork",
            "pyFieldLabel": "Status",
            "pySortOrder": "1",
            "pySortType": "ASC"
          }
        }
      ],
      "pyAggregate": [
        {
          "pyAggregateFunction": "COUNT",
          "pyAggregateField": {
            "pyFieldName": ".pyID",
            "pyFieldLabel": "Case Count"
          }
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
        "pyPagesAndClassesClass": "Work-"
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
