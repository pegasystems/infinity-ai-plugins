---
name: business-action-single-reference-field-advanced-search
description: Load when a Business Action form has one reference picker which is displayed as advancedSearch. Contains sample DX API payload and UI playwright code for selecting reference.
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
      "pyParameterName": "Approver_searchCriterion",
      "pyParameterValue": "Search by Approver Number"
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
  "pyPlaywrightMethod": "Assign_approver(page, browser, context, Approver_searchCriterion, Approver);",
  "pyPlaywrightScript": "Assign_approver = async (page, browser, context, Approver_searchCriterion, Approver): Promise<void> => {\n  await caseUtils.clickGo(page, \"Assign approver\");\n\n  if (Approver) {\n    if (Approver_searchCriterion === 'Search by Approver Number') {\n      await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', Approver_searchCriterion, [{label: \"Approver number\", type: \"TextInput\", value: \"301\"}], Approver);\n    } else if (Approver_searchCriterion === 'Search by Department') {\n      await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', Approver_searchCriterion, [{label: \"Department\", type: \"Dropdown\", value: \"Finance\"}], Approver);\n    } else {\n      await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', '', [{label: \"Approver number\", type: \"TextInput\", value: \"301\"}], Approver);\n    }\n  }\n  await caseUtils.clickSubmit(page);\n}"
}
```
