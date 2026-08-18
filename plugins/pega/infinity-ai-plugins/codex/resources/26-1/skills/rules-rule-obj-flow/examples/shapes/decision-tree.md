---
name: flow-shape-decision-tree
description: 'Use when adding a Decision (decision tree) shape to a flow that branches via a decision tree.'
---

```json
{
  "pyFromMODefName": "Decision",
  "pxObjClass": "Data-MO-Gateway-Decision",
  "pyDecisionClass": "Rule-Declare-DecisionTree",
  "pyImplementation": "hasDeveloperRuleSet",
  "pyStoreProperty": "",
  "pyTaskInfo": {
    "pyDecisionMapType": "DECISIONTREE",
    "pyDecisionMap": "hasDeveloperRuleSet"
  },
  "pyFromTasks": [
    {"pyTaskStatusOrWhen": "true",  "pyTaskName": "Assignment2"},
    {"pyTaskStatusOrWhen": "false", "pyTaskName": "End1"},
    {"pyTaskStatusOrWhen": "ELSE",  "pyTaskName": "End1"}
  ]
}
```
