---
name: flow-shape-assignment-worklist
description: 'Use when adding an Assignment (worklist) shape to a flow.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Assignment",
  "pxSubscript": "Assignment1",
  "pyFromMODefName": "Assignment",
  "pyMOId": "Assignment1",
  "pyMOName": "Review Request",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyImplementation": "WorkList",
  "pyDisplayRouteTo": "USER",
  "pyRouteTo": "Current operator",
  "pyOperator": "",
  "pyWorkBasket": "",
  "pySkipAssignment": "false",
  "pyDoNotPerform": "false",
  "pyShouldReload": "No",
  "pyViewPolicy": "USE_CASE_POLICY",
  "pyRouterProp": {
    "pyImplementation": "ToCurrentOperator"
  },
  "pyCallParams": {
    "CheckAvailability": "false",
    "ViewPolicy": "USE_CASE_POLICY"
  },
  "pyLocalActionsPL": [],
  "pyNotifyProp": { "pxObjClass": "Data-MO-Activity-Notify" },
  "pyTicketShapes": [{ "pxObjClass": "Data-MO-Event-Exception" }],
  "pyCoordX": "1.6", "pyCoordY": "0.096",
  "pyWidth": "0.96", "pyHeight": "0.48"
}
```
