---
name: flow-shape-subprocess
description: 'Use when adding a SubProcess shape that calls another flow within the current case.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-SubProcess",
  "pxSubscript": "SubProcess1",
  "pyFromMODefName": "SubProcess",
  "pyMOId": "SubProcess1",
  "pyMOName": "Run Approval Flow",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyImplementation": "pxApproval",
  "pySubProcessCategory": "ProcessFlow",
  "pyDefineFlowOn": "Current",
  "pySpinOff": "false",
  "pyStoreCompletedFlowPath": "false",
  "pyOtherWorkClass": "",
  "pyPageClass": "",
  "pyPageRef": "",
  "pyWorkObjRef": "",
  "pyCallParams": {},
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyRouterProp": {},
  "pyTicketShapes": [{ "pxObjClass": "Data-MO-Event-Exception" }],
  "pyCoordX": "1.6", "pyCoordY": "0.096",
  "pyWidth": "0.96", "pyHeight": "0.48"
}
```
