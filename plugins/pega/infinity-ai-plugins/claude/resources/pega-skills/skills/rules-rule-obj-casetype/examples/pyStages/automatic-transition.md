---
name: Automatic Transition
description: Mid-lifecycle stage that auto-advances when all processes complete. Sets pyStageEntryStatus to mark the case as in-progress.
---

```json
{
  "pyStageID": "PRIM1",
  "pyStageName": "Fulfillment",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "Fulfillment",
      "pyLabel": "Fulfillment",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "true",
      "pyShowBackButton": "false"
    }
  ]
}
```
