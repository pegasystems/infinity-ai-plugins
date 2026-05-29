---
name: pyDataSourceList entry — AggregateSources
description: Minimum-viable aggregate-sources source entry. Combines results from multiple independent sub-sources into a single data page. Required field pyAggregatedDataSourceList (each nested entry is itself a DeclarePageSource of any type). Rare — used when one data page must merge multiple feeds.
---

```json
{
  "pyDeclarePagesDataSource": "AggregateSources",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-Combined",
  "pyStructure": "list",
  "pyAggregatedDataSourcesLabel": "Combined feeds",
  "pyAggregatedDataSourceList": [
    {
      "pxObjClass": "Embed-DeclarePageSource",
      "pyDeclarePagesDataSource": "ReportDefinition",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-FeedA",
      "pyStructure": "list",
      "pyLoadReportDefinition": "FeedAReport",
      "pyReportDefinitionClass": "MyOrg-MyApp-Data-FeedA"
    },
    {
      "pxObjClass": "Embed-DeclarePageSource",
      "pyDeclarePagesDataSource": "DataTransform",
      "pySourceWhen": "Always",
      "pyClassName": "MyOrg-MyApp-Data-FeedB",
      "pyStructure": "list",
      "pyDTName": "LoadFeedB"
    }
  ]
}
```
