---
name: Per-Node Startup Job Scheduler
description: Associated node scope JS with Startup frequency — runs once on each qualifying node when it starts.
---

```json
{
  "pyLabel": "Node Cache Initialisation",
  "pyPurpose": "NodeCacheInitialisation",
  "pyActivityName": "InitialiseNodeCache",
  "pyNodeTypes": {
    "BackgroundProcessing": {
      "pxSubscript": "BackgroundProcessing",
      "pyNodeType": "BackgroundProcessing"
    }
  },
  "pyRecurringFrequency": "Startup",
  "pyApplicableTo": "Associated node",
  "pyAccessGroupContext": "false",
  "pyAccessGroup": "MyOrg-MyApp:Administrators",
  "pyIsEnabled": "true"
}
```

