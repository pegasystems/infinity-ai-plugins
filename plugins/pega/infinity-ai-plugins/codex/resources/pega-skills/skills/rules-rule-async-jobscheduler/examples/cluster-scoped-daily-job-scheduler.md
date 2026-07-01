---
name: Cluster-Scoped Daily Job Scheduler
description: Cluster scope JS running daily at 02:00 Europe/London — for nightly archival or aggregation. Design the activity using the Checkpoint Pattern.
---

```json
{
  "pyLabel": "Nightly Case Archival",
  "pyPurpose": "NightlyCaseArchival",
  "pyActivityName": "ArchiveResolvedCases",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyRecurringFrequency": "Daily",
  "pyRecurrencePattern": {
    "pyStartTime": "020000",
    "pyUseTimeZone": "Europe/London",
    "pyDailyInterval": "1"
  },
  "pyApplicableTo": "Cluster",
  "pyAccessGroupContext": "false",
  "pyAccessGroup": "MyOrg-MyApp:Administrators",
  "pyIsEnabled": "true"
}
```

Note: `pyStartTime` is the wall-clock time in the `pyUseTimeZone` timezone. `"020000"`
here means 02:00 Europe/London. Do not pre-convert to UTC — the server handles that
normalisation internally.

