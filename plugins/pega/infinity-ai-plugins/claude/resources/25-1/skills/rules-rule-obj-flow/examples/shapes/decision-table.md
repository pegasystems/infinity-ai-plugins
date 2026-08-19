---
name: flow-shape-decision-table
description: 'Use when adding a Decision (decision table) shape to a flow that branches via a decision table.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Rule-Declare-DecisionTable",
  "pyImplementation": "FlagCriticalIssues",
  "pyStoreProperty": ".pyLabel",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "Critical", "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "High",     "pyTaskName": "Assignment3"},
    {"pyTaskStatusOrWhen": "Medium",   "pyTaskName": "Assignment4"},
    {"pyTaskStatusOrWhen": "Low",      "pyTaskName": "Assignment5"},
    {"pyTaskStatusOrWhen": "ELSE",     "pyTaskName": "End1"}
  ]
}
```
