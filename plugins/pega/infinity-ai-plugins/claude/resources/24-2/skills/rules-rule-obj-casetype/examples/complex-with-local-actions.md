---
name: Complex with Local Actions
description: Case type with case-wide and stage-level local actions, child cases with property mapping, conditional processes, multi-process stages, and expression-based skip conditions.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-Approval",
  "pyLabel": "Approval Request",
  "pyDescription": "Multi-stage approval with conditional routing, local actions, and child case support.",
  "pyIcon": "pi pi-clipboard-check-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyInitialCaseUrgency": "10",
  "pyLockingMode": "Optimistic",
  "pyEnableSearch": "true",
  "pyCascadingCancellation": "true",
  "pyIsConstellationCase": "true",
  "pyStageIDMax": "4",
  "pyAltStageIDMax": "2",
  "pyCaseWideLocalActions": [
    {
      "pyActionLabel": "Edit details",
      "pyActionName": "pyUpdateCaseDetails",
      "pyClassName": "MyOrg-MyApp-Work",
      "pySkipOrAllowType": "always",
      "pyAllowWhenCaseIsResolved": "false"
    },
    {
      "pyActionLabel": "Withdraw",
      "pyActionName": "CasewideLocalActions1",
      "pyClassName": "MyOrg-MyApp-Work-Approval",
      "pySkipOrAllowType": "expression",
      "pyExpressionToSkipOrAllow": ".pyStatusWork != \"Resolved-Completed\"",
      "pyAllowWhenCaseIsResolved": "false",
      "pyStepPlaceHolder": "Local Action"
    }
  ],
  "pyCoverableClasses": [
    {
      "pyClass": "MyOrg-MyApp-Work-ReviewItem",
      "pyLabel": "Review Item",
      "pyAutomaticStart": "true",
      "pyAutomaticStartOption": "ParentCaseStart",
      "pyManualStart": "true",
      "pyRequired": "false",
      "pyIsValidCircumstance": "true",
      "pyApplyDataTransform": "CopyParentData",
      "pyProperties": [
        {"pyFrom": ".pyID", "pyTo": ".ParentCaseID"},
        {"pyFrom": ".CustomerName", "pyTo": ".CustomerName"}
      ]
    }
  ],
  "pyAttachments": [
    {
      "pyAttachmentCategory": "SupportingDocs",
      "pyLabel": "Supporting Documents",
      "pyType": "File",
      "pyIsRequired": "false"
    },
    {
      "pyAttachmentCategory": "ApprovalEvidence",
      "pyLabel": "Approval Evidence",
      "pyType": "File",
      "pyIsRequired": "false"
    }
  ],
  "pyStages": [
    {
      "pyStageID": "PRIM0",
      "pyStageName": "Create",
      "pyStageTransition": "automatic",
      "pyIsInitializationStage": "true",
      "pyIsTerminalStage": "false",
      "pyChannels": [
        {
          "pyLabel": "Default",
          "pyShowChannel": "true",
          "pzChannelName": "Default"
        }
      ],
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "CreateForm_Default",
          "pyLabel": "Create",
          "pyChannelName": "Default",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "when",
          "pyStartWhen": "CreatedViaUI",
          "pyWhenToSkip": "CreatedViaUI",
          "pyLaunchOnReentry": "false",
          "pyShowBackButton": "false"
        }
      ]
    },
    {
      "pyStageID": "PRIM1",
      "pyStageName": "Review",
      "pyStageTransition": "automatic",
      "pyStageEntryStatus": "Open-InProgress",
      "pyIsTerminalStage": "false",
      "pyLocalActions": [
        {
          "pyActionLabel": "Request more info",
          "pyActionName": "ReviewLocalAction1",
          "pyClassName": "MyOrg-MyApp-Work-Approval",
          "pySkipOrAllowType": "always",
          "pyStepPlaceHolder": "Local Action"
        }
      ],
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "ManagerReview",
          "pyLabel": "Manager Review",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "false",
          "pySLAType": "Always",
          "pyStepSLA": "ReviewDeadline"
        }
      ],
      "pyRequiredCategories": ["Supporting Documents"]
    },
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
      "pyStageName": "Rejected",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Rejected",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ]
}
```
