---
name: flow-connector-status
description: 'Use when adding a Status connector to a flow Decision shape that fires on a specific result.'
---

```json
{
  "pxObjClass": "Data-MO-Connector-Transition",
  "pyFromMODefName": "Transition",
  "pyConditionType": "Status",
  "pyExpression": "Complete",
  "pyMOName": "Complete",
  "pyLikelihood": "100",
  "pyFrom": "Decision1",
  "pyTo": "Assignment2"
}
```
