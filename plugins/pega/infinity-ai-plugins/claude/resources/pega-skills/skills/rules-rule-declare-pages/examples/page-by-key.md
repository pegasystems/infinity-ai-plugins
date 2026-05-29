---
name: List Data Page with Key-Based Retrieval
description: List-structure data page that supports fetching a single entry by key via pyEnableRetrievePageByKey + pyKeysForPageList, instead of requiring the caller to load the full list. Only valid when pyStructure is "list" and pyPageType is "normal".
---

```json
{
  "pyPageName": "D_Customers",
  "pyLabel": "Customers",
  "pyDescription": "All customers; supports key-based retrieval by pyGUID",
  "pyClassName": "Code-Pega-List",
  "pyStructure": "list",
  "pyScope": "thread",
  "pyPageType": "normal",
  "pyEnableRetrievePageByKey": "true",
  "pyKeysForPageList": [
    ".pyGUID"
  ],
  "pyDataSourceList": [
    {
      "pyDeclarePagesDataSource": "ReportDefinition",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-Customer",
      "pyStructure": "list",
      "pyLoadReportDefinition": "AllCustomers",
      "pyReportDefinitionClass": "MyOrg-MyApp-Data-Customer"
    }
  ]
}
```

Notes:

- Each entry in `pyKeysForPageList` must start with `.` and reference a valid property on the list entry class (the actual data class loaded into the list, not `Code-Pega-List`).
- The server forces `pyEnableRetrievePageByKey` to `"false"` when `pyStructure` is `"page"` or `pyPageType` is `"loadonly"`.
