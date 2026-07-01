---
name: Manual Transition
description: Stage that waits for an explicit user/system action to advance. Used for approval gates or external dependencies.
---

```json
{
  "pyStageID": "PRIM2",
  "pyStageName": "Awaiting Approval",
  "pyStageTransition": "manual",
  "pyStageEntryStatus": "Pending-Approval",
  "pyIsTerminalStage": "false",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "ApprovalProcess",
      "pyLabel": "Approval",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "false"
    }
  ]
}
```
