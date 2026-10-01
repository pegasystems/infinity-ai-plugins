---
name: Max Records and Timeout Configuration
description: "pyMaxRecords limits result rows and must be mirrored in BOTH pyContent and pyUI. pyQueryTimeoutValue, pyMaxRecordsForExport, and pyQueryTimeoutValueForExport are independent optional fields — only set them when explicitly requested. Paging must be disabled in both layers for pyMaxRecords to take effect."
---

```json
{
  "pyContent": {
    "pyMaxRecords": "10",
    "pyPaging": {
      "pyPagingEnabled": "false",
      "pyPageSize": "50",
      "pyPageMode": "Numeric",
      "pyReturnTotalResultCount": "true"
    }
  },
  "pyUI": {
    "pyMaxRecords": "10",
    "pyUserInteractions": {
      "pyPagingParams": {
        "pyPagingEnabled": "false",
        "pyPageSize": "50",
        "pyPageMode": "Numeric",
        "pyReturnTotalResultCount": "true"
      }
    }
  }
}
```
