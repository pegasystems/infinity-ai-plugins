---
name: Pipeline with Params
description: Data pipeline case type with parameterized processes, conditional stage skipping via when-rules, and process-level SLAs.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-DataSync",
  "pyLabel": "Data Sync",
  "pyDescription": "Automated data synchronization pipeline with conditional export and import stages.",
  "pyIcon": "pi pi-gear-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyCreateTemporaryObject": "false",
  "pyStageIDMax": "5",
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
          "pySkipOrAllowType": "when",
          "pyStartWhen": "CreatedViaUI",
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
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "ValidateConfig",
          "pyLabel": "Validate Configuration",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pySLAType": "Always",
          "pyStepSLA": "ValidationDeadline"
        }
      ]
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Export",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pySkipOrAllowType": "when",
      "pySkipStageWhen": "pySkipExportStage",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "DataSyncProcess",
          "pyLabel": "Export Data",
          "pyDescription": "Exports data to the target system using ADM format",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyCallParams": {
            "DataSyncType": "ADM",
            "Operation": "export"
          },
          "pzRuleParameters": [
            {
              "pyParametersParamName": "DataSyncType",
              "pyParametersParamType": "STRING",
              "pyParametersParamDesc": "Data format type (ADM, JSON, CSV)",
              "pyParametersParamReq": "1"
            },
            {
              "pyParametersParamName": "Operation",
              "pyParametersParamType": "STRING",
              "pyParametersParamDesc": "Operation to perform (export, import)",
              "pyParametersParamReq": "1"
            }
          ]
        }
      ]
    },
    {
      "pyStageID": "PRIM3",
      "pyStageName": "Import",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pySkipOrAllowType": "when",
      "pySkipStageWhen": "pySkipImportStage",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "DataSyncProcess",
          "pyLabel": "Import Data",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyCallParams": {
            "DataSyncType": "ADM",
            "Operation": "import"
          }
        }
      ]
    },
    {
      "pyStageID": "PRIM4",
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
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ]
}
```
