---
name: flow-shape-decision-expression
description: 'Use when adding a Decision (expression) shape to a flow that branches on a boolean property reference.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "EXPRESSION",
  "pyImplementation": ".HasAllRequiredData",
  "pyStoreProperty": "",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "true",  "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "false", "pyTaskName": "Assignment1"},
    {"pyTaskStatusOrWhen": "ELSE",  "pyTaskName": "End1"}
  ]
}
```
