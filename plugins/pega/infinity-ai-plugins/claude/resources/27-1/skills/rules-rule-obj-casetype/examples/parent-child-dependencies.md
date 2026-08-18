---
name: Parent Child Dependencies
description: Case type with multiple child case types using both auto-start on parent creation and dependency fulfillment, required children blocking resolution, data transforms, and status groups.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ProjectOnboarding",
  "pyLabel": "Project Onboarding",
  "pyDescription": "Onboards new projects through verification, setup, and handoff with required child cases for compliance and provisioning.",
  "pyIcon": "pi pi-case-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyInitialCaseUrgency": "20",
  "pyLockingMode": "Default",
  "pyEnableSearch": "true",
  "pyIsConstellationCase": "true",
  "pyCascadingCancellation": "true",
  "pyStageIDMax": "4",
  "pyAltStageIDMax": "2",
  "pyCoverableClasses": [
    {
      "pyClass": "MyOrg-MyApp-Work-ComplianceCheck",
      "pyLabel": "Compliance Check",
      "pyAutomaticStart": "true",
      "pyAutomaticStartOption": "ParentCaseStart",
      "pyManualStart": "false",
      "pyRequired": "true",
      "pyIsValidCircumstance": "true",
      "pyApplyDataTransform": "MapProjectToCompliance",
      "pyProperties": [
        {"pyFrom": ".pyID", "pyTo": ".ParentProjectID"},
        {"pyFrom": ".ProjectType", "pyTo": ".ProjectType"},
        {"pyFrom": ".Region", "pyTo": ".Region"}
      ]
    },
    {
      "pyClass": "MyOrg-MyApp-Work-EnvironmentSetup",
      "pyLabel": "Environment Setup",
      "pyAutomaticStart": "true",
      "pyAutomaticStartOption": "DependencyFulfillment",
      "pyManualStart": "true",
      "pyRequired": "true",
      "pyIsValidCircumstance": "true",
      "pyApplyDataTransform": "MapProjectToEnvSetup"
    },
    {
      "pyClass": "MyOrg-MyApp-Work-AccessRequest",
      "pyLabel": "Access Request",
      "pyAutomaticStart": "false",
      "pyManualStart": "true",
      "pyRequired": "false",
      "pyIsValidCircumstance": "true"
    }
  ],
  "pyStatusGroups": [
    {
      "pyClassName": "MyOrg-MyApp-Work-ProjectOnboarding",
      "pyStatusGroup": "New",
      "pyStatusWorkList": [
      ]
    },
    {
      "pyClassName": "MyOrg-MyApp-Work-ProjectOnboarding",
      "pyStatusGroup": "Open",
      "pyStatusWorkList": [
      ]
    },
    {
      "pyClassName": "MyOrg-MyApp-Work-ProjectOnboarding",
      "pyStatusGroup": "Resolved",
      "pyStatusWorkList": [
      ]
    }
  ],
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
      "pyStageName": "Verification",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "VerifyProject",
          "pyLabel": "Verify Project Details",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "true"
        }
      ]
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Setup",
      "pyStageTransition": "manual",
      "pyStageEntryStatus": "Pending-Setup",
      "pyIsTerminalStage": "false",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "MonitorChildCases",
          "pyLabel": "Monitor Child Cases",
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
      "pyCleanupProcess": "true",
      "pyResolveChildCases": "true",
      "pyChildCaseStatus": "Resolved-Completed"
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
      "pyResolveChildCases": "true",
      "pyChildCaseStatus": "Resolved-Cancelled"
    },
    {
      "pyStageID": "ALT2",
      "pyStageName": "On Hold",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Rejected",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ]
}
```
