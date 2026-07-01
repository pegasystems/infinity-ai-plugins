---
name: flow-shape-decision-fork
description: 'Use when adding a Decision (fork) shape to a flow that branches on a property value.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Data-MO-Gateway-DataXOR",
  "pyImplementation": ".pyWorkStatus",
  "pyStoreProperty": "",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "Open",      "pyTaskName": "Assignment1"},
    {"pyTaskStatusOrWhen": "Pending",   "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "ELSE",      "pyTaskName": "End1"}
  ]
}
```
