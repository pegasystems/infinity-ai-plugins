---
name: Stub Job Scheduler
description: Minimal valid Job Scheduler create payload — required fields only.
---

```json
{
  "pyLabel": "My Job Scheduler",
  "pyPurpose": "MyJobScheduler",
  "pyActivityName": "RunScheduledJob",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyRecurringFrequency": "Daily",
  "pyRecurrencePattern": {
    "pyStartTime": "000000",
    "pyUseTimeZone": "GMT",
    "pyDailyInterval": "1"
  },
  "pyApplicableTo": "Cluster",
  "pyAccessGroupContext": "false",
  "pyAccessGroup": "MyOrg-MyApp:Administrators"
}
```
