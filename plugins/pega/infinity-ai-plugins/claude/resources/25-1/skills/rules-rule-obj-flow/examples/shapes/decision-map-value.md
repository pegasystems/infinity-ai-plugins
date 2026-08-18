---
name: flow-shape-decision-map-value
description: 'Use when adding a Decision (map value) shape to a flow that branches via a map value lookup.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Rule-Obj-MapValue",
  "pyImplementation": "RiskCategoryMap",
  "pyStoreProperty": ".pyRiskCategory",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "High",   "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "Medium", "pyTaskName": "Assignment3"},
    {"pyTaskStatusOrWhen": "Low",    "pyTaskName": "End1"},
    {"pyTaskStatusOrWhen": "ELSE",   "pyTaskName": "End1"}
  ]
}
```
