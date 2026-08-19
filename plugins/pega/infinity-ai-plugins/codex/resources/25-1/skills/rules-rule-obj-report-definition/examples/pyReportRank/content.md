---
name: Report Rank — pyContent.pyReportRank
description: Top-N ranking block on the content layer. Set pyContent.pyReportContainsRank="true" and mirror at pyUI.pyBody.pyReportRank (see report-rank-ui.md).
---

```json
{
  "pyRankType": "TopRanked",
  "pyPartitionType": "Grouping",
  "pyRows": "1",
  "pyRankField": {
    "pyFieldName": ".pxUpdateDateTime",
    "pyFieldLabel": "Updated",
    "pySortOrder": "1",
    "pySortType": "DESC"
  }
}
```
