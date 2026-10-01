---
name: business-action-approval-rejected
description: Load when creating a Business Action for an approval shape (reject path). Shows PerformAssignment with pyApprovalResult set to Rejected.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-LeadFollowup",
  "pyPurpose": "RejectLeadFollowupApproval",
  "pyLabel": "Manager Approval Reject",
  "pyKeywordDescription": "User rejects the Manager Approval assignment",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyBusinessActionPersona": "Manager",
  "pyBusinessActionDecision": "Approval is rejected, case moves to rejected/declined stage",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Deal Progress",
      "pyParameterValue": "Contacted"
    },
    {
      "pyParameterName": "Action Taken",
      "pyParameterValue": "Called customer"
    },
    {
      "pyParameterName": "Lead Title",
      "pyParameterValue": "Sales Lead"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyOutputParameters": [],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "Manager Approval",
      "pyExecutionContext": "MyOrg-MyApp-Work-LeadFollowup",
      "pyStepDescription": "User rejects the Manager Approval",
      "pyForm": [
        {
          "pyParameterName": "DealProgress",
          "pyParameterValue": "Deal Progress",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "ActionTaken",
          "pyParameterValue": "Action Taken",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "LeadTitle",
          "pyParameterValue": "Lead Title",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "pyApprovalResult",
          "pyParameterValue": "Rejected",
          "pyMapRequestFieldFrom": "Constant"
        }
      ],
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "pyApproval"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Get Approval\");\n\nif (params[\"Deal Progress\"]) { await page.getByTestId('Deal Progress:select:control').selectOption(params[\"Deal Progress\"]); }\nif (params[\"Action Taken\"]) { await page.getByTestId('Action Taken:input:control').fill(params[\"Action Taken\"]); }\nif (params[\"Lead Title\"]) { await page.getByTestId('Lead Title:input:control').fill(params[\"Lead Title\"]); }\n\nawait caseUtils.clickReject(page);"
}
```
