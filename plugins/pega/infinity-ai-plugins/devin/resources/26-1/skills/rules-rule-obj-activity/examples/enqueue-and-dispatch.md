---
name: Enqueue and Dispatch
description: Job Scheduler dispatch activity that browses work items and enqueues each to a Queue Processor.
---

```json
{
  "pyActivityName": "DispatchNewItems",
  "pyLabel": "Dispatch New Items",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyDescription": "Browses items in NEW status, marks each as QUEUED, and enqueues to a dedicated Queue Processor.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "BrowsePage", "pyPagesAndClassesClass": "Code-Pega-List" },
    { "pyPagesAndClassesPage": "BrowsePage.pxResults", "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Order" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Obj-Browse",
      "pyStepsDescription": "Load items in NEW status",
      "pyStepsCallParams": {
        "ObjClass": "MyOrg-MyApp-Work-Order",
        "PageName": "BrowsePage",
        "RowKey": ".pyID",
        "WhereClause": ".pyStatusWork = \"New-\"",
        "SelectList": ".pyID, .pyStatusWork, .pzInsKey",
        "MaxRecords": "100",
        "ReadOnly": ""
      }
    },
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Mark as queued and enqueue",
      "pyStepsObjectName": "BrowsePage.pxResults",
      "pyStepsRepeatDef": {
        "pyStepsRepeatDefHasRepeat": "EMBEDDED",
        "pyForEachProperty": "",
        "pyStepsRepeatDefStart": "",
        "pyStepsRepeatDefIteration": "",
        "pyStepsRepeatDefLimit": "",
        "pyStepsRepeatDefStop": "",
        "pyForEachValidClasses": [
          { "pyForEachClass": "MyOrg-MyApp-Work-Order" }
        ]
      },
      "pyParamArray": [
        { "PropertiesName": ".pyStatusWork", "PropertiesValue": "\"Queued-\"" }
      ],
      "pySteps": [
        {
          "pyStepsActivityName": "Obj-Save",
          "pyStepsDescription": "Commit status before enqueue",
          "pyStepsCallParams": {
            "WriteNow": "true"
          }
        },
        {
          "pyStepsActivityName": "Queue-For-Processing",
          "pyStepsDescription": "Enqueue to dedicated QP",
          "pyStepsCallParams": {
            "QueueName": "MyOrg-MyApp-Work-Order",
            "QueueClass": "MyOrg-MyApp-Work-Order",
            "QueueType": "DEDICATED",
            "ActivityName": "ProcessItem",
            "WorkPage": ""
          }
        }
      ]
    },
    {
      "pyStepsActivityName": "Log-Message",
      "pyStepsDescription": "Log dispatch count",
      "pyStepsCallParams": {
        "Message": "\"Dispatched \" + BrowsePage.pxResultCount + \" items\"",
        "LoggingLevel": "InfoForced",
        "SendToTracer": "false",
        "GenerateStackTrace": "false"
      }
    }
  ]
}
```

## Key patterns demonstrated

- **Job Scheduler dispatch pattern** — the JS calls this activity on schedule
- **Obj-Browse with WhereClause** — scoped query for items in initial state
- **EMBEDDED loop with sub-steps** — iterate results, mark + save + enqueue per item
- **Obj-Save before enqueue** — prevents double-dispatch on retry
- **Queue-For-Processing with DEDICATED type** — routes to a specific Queue Processor
- **Per-item logic in QP, not here** — dispatch activity only loads and enqueues
