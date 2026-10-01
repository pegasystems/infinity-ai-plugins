---
name: Multi Process Pipeline
description: Single stage running two processes — one PARALLEL (starts immediately) and one SEQUENTIAL (waits for the parallel process to finish).
---

```json
{
  "pyStageID": "PRIM2",
  "pyStageName": "Implementation",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "Implementation",
      "pyLabel": "Implementation",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "true"
    },
    {
      "pxFlowID": "FLOW1",
      "pyFlowName": "QualityCheck",
      "pyLabel": "Quality Check",
      "pyStartType": "SEQUENTIAL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "false"
    }
  ]
}
```
