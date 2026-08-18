---
name: Auto Transition
description: Case type with automatic stage transitions and conditional process execution using when-rules.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-DataImport",
  "pyLabel": "Data Import",
  "pyDescription": "Automated data import case with conditional processing stages.",
  "pyIcon": "pi pi-gear-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyCreateTemporaryObject": "false",
  "pyStageIDMax": "4",
  "pyStages": [
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
          "pySkipOrAllowType": "when",
          "pyStartWhen": "CreatedViaUI",
          "pyWhenToSkip": "CreatedViaUI",
          "pyLaunchOnReentry": "false"
        }
      ]
    },
    {
      "pyStageID": "PRIM1",
      "pyStageName": "Validate",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pySkipOrAllowType": "always",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "ValidateData",
          "pyLabel": "Validate Data",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pySLAType": "Never"
        }
      ]
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Process",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pySkipOrAllowType": "when",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "ProcessImport",
          "pyLabel": "Process Import",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true"
        }
      ]
    },
    {
      "pyStageID": "PRIM3",
      "pyStageName": "Completed",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Completed",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ],
  "pyAlternateStages": [
    {
      "pyStageID": "ALT1",
      "pyStageName": "Failed",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Rejected",
      "pyIsTerminalStage": "true"
    }
  ]
}
```
