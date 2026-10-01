---
name: flow-shape-assignment-workbasket
description: 'Use when adding an Assignment (workbasket) shape to a flow.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Assignment",
  "pxSubscript": "Assignment1",
  "pyFromMODefName": "Assignment",
  "pyMOId": "Assignment1",
  "pyMOName": "Route to Queue",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyImplementation": "WorkBasket",
  "pyDisplayRouteTo": "WORKBASKET",
  "pyRouteTo": "SeniorConsultant",
  "pyOperator": "",
  "pyWorkBasket": "SeniorConsultant",
  "pySkipAssignment": "false",
  "pyDoNotPerform": "false",
  "pyShouldReload": "No",
  "pyViewPolicy": "USE_CASE_POLICY",
  "pyRouterProp": {
    "pyImplementation": "ToWorkbasket"
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
