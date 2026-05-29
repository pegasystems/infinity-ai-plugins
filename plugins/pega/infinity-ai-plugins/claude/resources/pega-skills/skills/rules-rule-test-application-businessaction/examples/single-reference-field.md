---
name: business-action-single-reference-field
description: Load when a Business Action form has one reference picker. Contains selecting reference which is displayed as auto compelte on UI.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "AssignapproverAssignment",
  "pyLabel": "Assign approver",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User assigns an approver to the booking",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Approver",
      "pyParameterValue": "Jane Manager:EMP-301"
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
      "pyAssignmentName": "Assign approver",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Assign approver assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "AssignApprover"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "ApproverRef",
          "pyParameterType": "Reference",
          "pyTestReferenceField": [
            {
              "pyMapActionParameterFrom": "Input",
              "pyParameterName": "StaffID",
              "pyParameterValue": "Approver"
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Assign_approver(page, browser, context, Approver);",
  "pyPlaywrightScript": "Assign_approver = async (page, browser, context, Approver): Promise<void> => {\n  await caseUtils.clickGo(page, \"Assign approver\");\n\n  if (Approver) { await commonUtils.Handle_ReferenceListMethods(page, 'autocomplete', 'Approver', 'singleselect', Approver); }\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
