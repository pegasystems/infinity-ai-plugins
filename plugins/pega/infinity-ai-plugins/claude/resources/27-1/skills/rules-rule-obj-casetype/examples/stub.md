---
name: Stub Casetype
description: Minimal case type definition — smallest valid create payload with a single stage.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyLabel": "My Case",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyStageIDMax": "1",
  "pyAltStageIDMax": "0",
  "pyStages": [
    {
      "pyStageID": "PRIM0",
      "pyStageName": "Create",
      "pyIsInitializationStage": "true",
      "pyIsTerminalStage": "true",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Completed",
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
  ]
}
```
