---
name: With Validation
description: Stage that runs a validate rule on entry via pyValidate. If validation fails, the transition into the stage is blocked.
---

```json
{
  "pyStageID": "PRIM2",
  "pyStageName": "Implementation",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pyValidate": "CompleteStageEntryValidation",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "Implementation",
      "pyLabel": "Implementation",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
