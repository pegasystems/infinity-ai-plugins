---
name: Initialization Stage
description: First primary stage entered during case creation. Marked with pyIsInitializationStage and contains the create form process.
---

```json
{
  "pyStageID": "PRIM0",
  "pyStageName": "Create",
  "pyStageTransition": "automatic",
  "pyIsInitializationStage": "true",
  "pyIsTerminalStage": "false",
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "CreateForm_Default",
      "pyLabel": "Create",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always",
      "pyLaunchOnReentry": "false",
      "pyShowBackButton": "false"
    }
  ]
}
```
