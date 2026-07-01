---
name: Approval with SLA
description: Case type with manual stage transitions, case-level and stage-level SLAs, approval step type, optimistic locking, and stage-level attachments with required categories.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ExpenseApproval",
  "pyLabel": "Expense Approval",
  "pyDescription": "Expense claim approval with manager review, finance validation, and mandatory receipt attachments.",
  "pyIcon": "pi pi-clipboard-check-solid",
  "pyWorkPartiesRule": "pyCaseManagementDefault",
  "pyInitialCaseUrgency": "15",
  "pyLockingMode": "Optimistic",
  "pyEnableSearch": "true",
  "pyIsConstellationCase": "true",
  "pyStepApprovalType": "Cascading",
  "pySLAType": "Always",
  "pyStageIDMax": "4",
  "pyAltStageIDMax": "2",
  "pyAttachments": [
    {
      "pyAttachmentCategory": "Receipts",
      "pyLabel": "Receipts",
      "pyType": "File",
      "pyIsRequired": "false"
    },
    {
      "pyAttachmentCategory": "SupportingDocs",
      "pyLabel": "Supporting Documents",
      "pyType": "File",
      "pyIsRequired": "false"
    }
  ],
  "pyCaseWideLocalActions": [
    {
      "pyActionLabel": "Edit details",
      "pyActionName": "pyUpdateCaseDetails",
      "pyClassName": "MyOrg-MyApp-Work",
      "pySkipOrAllowType": "always",
      "pyAllowWhenCaseIsResolved": "false"
    },
    {
      "pyActionLabel": "Add note",
      "pyActionName": "CasewideLocalActions2",
      "pyClassName": "MyOrg-MyApp-Work-ExpenseApproval",
      "pySkipOrAllowType": "always",
      "pyAllowWhenCaseIsResolved": "true"
    }
  ],
  "pyStages": [
    {
      "pyStageID": "PRIM0",
      "pyStageName": "Submit",
      "pyStageTransition": "automatic",
      "pyIsInitializationStage": "true",
      "pyIsTerminalStage": "false",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "CreateForm_Default",
          "pyLabel": "Submit Expense",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "false",
          "pyShowBackButton": "false"
        }
      ],
      "pyRequiredCategories": ["Receipts"]
    },
    {
      "pyStageID": "PRIM1",
      "pyStageName": "Manager Review",
      "pyStageTransition": "manual",
      "pyStageEntryStatus": "Pending-Approval",
      "pyIsTerminalStage": "false",
      "pySLAType": "Always",
      "pyLocalActions": [
        {
          "pyActionLabel": "Request clarification",
          "pyActionName": "ReviewLocalAction1",
          "pyClassName": "MyOrg-MyApp-Work-ExpenseApproval",
          "pySkipOrAllowType": "always"
        },
        {
          "pyActionLabel": "Escalate",
          "pyActionName": "ReviewLocalAction2",
          "pyClassName": "MyOrg-MyApp-Work-ExpenseApproval",
          "pySkipOrAllowType": "when",
          "pyWhen": "IsHighValueExpense"
        }
      ],
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "ManagerApproval",
          "pyLabel": "Manager Approval",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "true",
          "pySLAType": "Always",
          "pyStepSLA": "ApprovalDeadline48h"
        }
      ]
    },
    {
      "pyStageID": "PRIM2",
      "pyStageName": "Finance Review",
      "pyStageTransition": "manual",
      "pyStageEntryStatus": "Pending-FinanceReview",
      "pyIsTerminalStage": "false",
      "pySkipOrAllowType": "when",
      "pySkipStageWhen": "IsLowValueExpense",
      "pyProcesses": [
        {
          "pxFlowID": "FLOW0",
          "pyFlowName": "FinanceValidation",
          "pyLabel": "Finance Validation",
          "pyStartType": "PARALLEL",
          "pySkipOrAllowType": "always",
          "pyLaunchOnReentry": "true",
          "pyShowBackButton": "true"
        }
      ],
      "pyRequiredCategories": ["Receipts", "Supporting Documents"]
    },
    {
      "pyStageID": "PRIM3",
      "pyStageName": "Approved",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Completed",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ],
  "pyAlternateStages": [
    {
      "pyStageID": "ALT1",
      "pyStageName": "Rejected",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Rejected",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    },
    {
      "pyStageID": "ALT2",
      "pyStageName": "Withdrawn",
      "pyStageTransition": "resolution",
      "pyStageWorkStatus": "Resolved-Withdrawn",
      "pyIsTerminalStage": "true",
      "pyCleanupProcess": "true"
    }
  ]
}
```
