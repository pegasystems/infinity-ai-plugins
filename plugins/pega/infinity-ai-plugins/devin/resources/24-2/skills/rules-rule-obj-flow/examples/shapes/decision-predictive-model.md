---
name: flow-shape-decision-predictive-model
description: 'Use when adding a Decision (predictive model) shape to a flow that branches on a model propensity score.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Rule-Decision-PredictiveModel",
  "pyImplementation": "CreditRiskModel",
  "pyStoreProperty": ".pyPropensityScore",
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "Accept",  "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "Decline", "pyTaskName": "End1"},
    {"pyTaskStatusOrWhen": "ELSE",    "pyTaskName": "End1"}
  ]
}
```
