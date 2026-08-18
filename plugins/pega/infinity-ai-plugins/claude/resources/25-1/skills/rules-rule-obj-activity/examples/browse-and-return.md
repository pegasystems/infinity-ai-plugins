---
name: Get Recent Reports
description: Retrieves cases created in the last 30 days.
---

```json
{
  "pyActivityName": "GetRecentReports",
  "pyLabel": "Get Recent Reports",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Retrieves cases created in the last 30 days.",
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "RecentReports",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Work-MyCase"
    }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Page-New",
      "pyStepsObjectName": "RecentReports",
      "pyStepsDescription": "Create results page",
      "pyStepsCallParams": {
        "NewClass": "MyOrg-MyApp-Work-MyCase",
        "Model": "",
        "PageList": ""
      }
    },
    {
      "pyStepsActivityName": "Obj-Browse",
      "pyStepsDescription": "Browse cases from last 30 days",
      "pyStepsCallParams": {
        "ObjClass": "MyOrg-MyApp-Work-MyCase",
        "PageName": "RecentReports",
        "RowKey": ".pyID",
        "WhereClause": ".pxCreateDateTime >= @addToDate(.pxCurrentDateTime, \"DAY\", -30)",
        "SelectList": ".pyLabel, .pyID, .pxCreateDateTime, .pyStatusWork",
        "OrderByList": ".pxCreateDateTime DESC",
        "MaxRecords": "50",
        "ReadOnly": "true",
        "UseLightWeightList": "",
        "Logic": ""
      }
    },
    {
      "pyStepsActivityName": "Show-Page",
      "pyStepsObjectName": "RecentReports",
      "pyStepsDescription": "Return the results page"
    },
    {
      "pyStepsActivityName": "Page-Remove",
      "pyStepsDescription": "Clean up results page",
      "pyParamArray": [
        {
          "Page": "RecentReports"
        }
      ]
    }
  ]
}
```
