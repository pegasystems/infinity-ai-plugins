---
name: business-action-single-reference-field-advanced-searchby
description: Load when a Business Action form has one reference picker displayed as advancedSearch and the picker has only a "Search by" dropdown (no "Search for"). Contains sample DX API payload and UI playwright code.
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
      "pyParameterName": "Approver_searchBy",
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
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Assign approver');\nif (params['Approver']) {\n  await commonUtils.Handle_SearchAndSelectSingle(page, 'Approver', { searchBy: params['Approver_searchBy'] || '' }, [{ label: 'Approver number', type: 'TextInput', value: '301' }], params['Approver']);\n}\nawait caseUtils.clickSubmit(page);"
}
```
