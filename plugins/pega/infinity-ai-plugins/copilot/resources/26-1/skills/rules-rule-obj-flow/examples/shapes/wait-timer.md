---
name: flow-shape-wait-timer
description: 'Use when adding a Wait (timer) shape that pauses flow execution until a timer fires.'
---

```json
{
  "pxObjClass": "Data-MO-Activity-Assignment-Wait",
  "pxSubscript": "Wait1",
  "pyFromMODefName": "Wait",
  "pyMOId": "Wait1",
  "pyMOName": "Wait",
  "pyWaitType": "Timer",
  "pyTimerType": "TimeInterval",
  "pyMinutes": "1",
  "pyDays": "",
  "pyHours": "",
  "pyWeeks": "",
  "pyMonths": "",
  "pyYears": "",
  "pySLA": "pzWaitTimer",
  "pyScopeType": "CurrentCase",
  "pyImplementation": "pzWorkBasket",
  "pyRouteTo": "Current operator",
  "pyWorkBasket": "deferred@pega.com",
  "pyPerform": "false",
  "pyIgnorePrevStatusOnWaitEntry": "false",
  "pyWaitForAllChildCases": "false",
  "pyWaitForDependentCaseCreation": "false",
  "pyHarnessPurpose": "Perform",
  "pyShouldReload": "No",
  "pyViewPolicy": "USE_CASE_POLICY",
  "pyInstructions": "Await Date Time",
  "pyCallParams": {
    "ConfirmationNote": "pyStepRoutedConfirmation",
    "DoNotPerform": "",
    "FutureDateTime": "Default",
    "HarnessPurpose": "Perform",
    "Instructions": "Await Date Time",
    "StatusAssign": "",
    "StatusWork": "",
    "UseCurOperIfBasketNotFound": "",
    "ViewPolicy": "USE_CASE_POLICY"
  },
  "pyLocalActionsPL": [
    {
      "pyActionName": ""
    }
  ],
  "pyNotifyProp": {
    "pxObjClass": "Data-MO-Activity-Notify",
    "pyImplementation": "",
    "pyCallParams": {}
  },
  "pyRouterProp": {
    "pyImplementation": "ToWorkBasket",
    "pyIsCustomRouter": "false",
    "pyCallParams": {
      "Workbasket": "deferred@pega.com"
    }
  },
  "pyContextRefs": [],
  "pyModifierRefs": {},
  "pyTicketShapes": [],
  "pyCoordX": "14.72", "pyCoordY": "1.8",
  "pyWidth": "0.48", "pyHeight": "0.48"
}
```
