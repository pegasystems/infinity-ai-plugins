---
name: business-action-approval-approved
description: Load when creating a Business Action for an approval shape (approve path). Shows PerformAssignment with pyApprovalResult set to Approved.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-LeadFollowup",
  "pyPurpose": "ApproveLeadFollowupApproval",
  "pyLabel": "Manager Approval Approve",
  "pyKeywordDescription": "User approves the Manager Approval assignment",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyBusinessActionPersona": "Manager",
  "pyBusinessActionDecision": "Approval is granted, case progresses to next stage",
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
      "pyStepDescription": "User approves the Manager Approval",
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
          "pyParameterValue": "Approved",
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
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Get Approval\");\n\nif (params[\"Deal Progress\"]) { await page.getByTestId('Deal Progress:select:control').selectOption(params[\"Deal Progress\"]); }\nif (params[\"Action Taken\"]) { await page.getByTestId('Action Taken:input:control').fill(params[\"Action Taken\"]); }\nif (params[\"Lead Title\"]) { await page.getByTestId('Lead Title:input:control').fill(params[\"Lead Title\"]); }\n\nawait caseUtils.clickApprove(page);"
}
```
