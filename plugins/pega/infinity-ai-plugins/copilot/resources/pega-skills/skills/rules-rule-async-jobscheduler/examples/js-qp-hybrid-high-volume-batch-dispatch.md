---
name: JS + QP Hybrid — High-Volume Batch Dispatch
description: Cluster scope JS that dispatches items to a Dedicated QP for parallel processing. Reduces multi-hour single-threaded batch runs to minutes.
---

```json
{
  "pyLabel": "Nightly Batch Dispatcher",
  "pyPurpose": "NightlyBatchDispatcher",
  "pyActivityName": "DispatchBatchItems",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyRecurringFrequency": "Daily",
  "pyRecurrencePattern": {
    "pyStartTime": "020000",
    "pyUseTimeZone": "GMT",
    "pyDailyInterval": "1"
  },
  "pyApplicableTo": "Cluster",
  "pyAccessGroupContext": "false",
  "pyAccessGroup": "MyOrg-MyApp:Administrators",
  "pyIsEnabled": "true"
}
```

