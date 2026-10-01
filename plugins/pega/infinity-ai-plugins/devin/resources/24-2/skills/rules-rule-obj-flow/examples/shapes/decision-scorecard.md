---
name: flow-shape-decision-scorecard
description: 'Use when adding a Decision (scorecard) shape to a flow that branches on a weighted score.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Rule-Decision-Scorecard",
  "pyImplementation": "ApplicationRiskScorecard",
  "pyStoreProperty": ".pyRiskScore",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "Pass",   "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "Review", "pyTaskName": "Assignment3"},
    {"pyTaskStatusOrWhen": "Fail",   "pyTaskName": "End1"},
    {"pyTaskStatusOrWhen": "ELSE",   "pyTaskName": "End1"}
  ]
}
```
