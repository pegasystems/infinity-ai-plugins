---
name: With Local Actions
description: Stage exposing one or more stage-scoped local actions (visible only while the case is in this stage). Supplements case-wide local actions.
---

```json
{
  "pyStageID": "PRIM1",
  "pyStageName": "Review",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pyLocalActions": [
    {
      "pyActionLabel": "Request more info",
      "pyActionName": "ReviewLocalAction1",
      "pyClassName": "MyOrg-MyApp-Work-Approval",
      "pySkipOrAllowType": "always",
      "pyStepPlaceHolder": "Local Action"
    }
  ],
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "ManagerReview",
      "pyLabel": "Manager Review",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
