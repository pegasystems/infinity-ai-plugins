---
name: With Call Params
description: Process passing input parameter values to its flow at start time via pyCallParams. Same flow can be reused across stages with different values.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "DataSync",
  "pyLabel": "ADM Export",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "always",
  "pyCallParams": {
    "DataSyncType": "ADM",
    "Operation": "export"
  }
}
```
