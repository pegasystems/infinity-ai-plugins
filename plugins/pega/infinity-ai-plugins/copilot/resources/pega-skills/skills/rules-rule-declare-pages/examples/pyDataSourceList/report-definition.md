---
name: pyDataSourceList entry — ReportDefinition
description: Minimum-viable report-definition source entry. Required fields pyLoadReportDefinition and pyReportDefinitionClass. Server auto-sets pyLoadActivity to pxCallRetrieveReportData.
---

```json
{
  "pyDeclarePagesDataSource": "ReportDefinition",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Work",
  "pyStructure": "list",
  "pyLoadReportDefinition": "CaseListReport",
  "pyReportDefinitionClass": "MyOrg-MyApp-Work",
  "pyPassCurrentParamPageForActivity": "true"
}
```
