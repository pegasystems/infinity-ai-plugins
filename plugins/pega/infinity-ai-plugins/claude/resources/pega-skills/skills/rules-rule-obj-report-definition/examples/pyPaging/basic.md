---
name: Pagination Configuration
description: "Paging must be mirrored in BOTH pyContent.pyPaging AND pyUI.pyUserInteractions.pyPagingParams. Omitting the pyUI mirror causes the auto-fill to default paging, which can silently override pyMaxRecords. When paging is enabled (pyPagingEnabled=true), pyMaxRecords is ignored. To limit results to a fixed number of rows, set pyPagingEnabled to false in both layers and use pyMaxRecords instead."
---

```json
{
  "pyContent": {
    "pyPaging": {
      "pyPagingEnabled": "true",
      "pyPageSize": "50",
      "pyPageMode": "Numeric",
      "pyReturnTotalResultCount": "true"
    }
  },
  "pyUI": {
    "pyUserInteractions": {
      "pyPagingParams": {
        "pyPagingEnabled": "true",
        "pyPageSize": "50",
        "pyPageMode": "Numeric",
        "pyReturnTotalResultCount": "true"
      }
    }
  }
}
```
