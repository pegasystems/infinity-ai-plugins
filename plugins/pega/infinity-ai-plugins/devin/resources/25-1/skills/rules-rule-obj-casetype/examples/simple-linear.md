---
name: Simple Linear
description: Case type with three primary stages (Create, Fulfillment, Completed) and one alternate stage (Withdrawn).
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ServiceRequest",
  "pyLabel": "Service Request",
  "pyDescription": "Tracks customer service requests through triage, fulfillment, and completion.",
  "pyIcon": "pi pi-case-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyInitialCaseUrgency": "10",
  "pyLockingMode": "Default",
  "pyEnableSearch": "true",
  "pyStageIDMax": "3",
  "pyAltStageIDMax": "1",
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
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false",
          "pyShowBackButton": "false"
        }
      ]
    },
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
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Completed",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Completed",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true",
      "pyResolveChildCases": "false"
    }
  ],
  "pyAlternateStages": [
    {
      "pyStageID": "ALT1",
      "pyStageName": "Withdrawn",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Withdrawn",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true",
      "pyResolveChildCases": "false"
    }
  ]
}
```
