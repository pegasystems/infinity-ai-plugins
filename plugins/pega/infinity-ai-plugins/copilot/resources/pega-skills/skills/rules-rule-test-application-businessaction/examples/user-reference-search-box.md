---
name: business-action-user-reference-search-box
description: Load when a Business Action form has a UserReference displayed as a search box. Shows scalar pyForm mapping and Playwright autocomplete handling.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ServiceRequest",
  "pyPurpose": "AssignreviewerAssignment",
  "pyLabel": "Assign reviewer",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User assigns a reviewer to the service request",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Reviewer",
      "pyParameterValue": "reviewer@example.com"
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
      "pyAssignmentName": "Assign reviewer",
      "pyExecutionContext": "MyOrg-MyApp-Work-ServiceRequest",
      "pyStepDescription": "User submits Assign reviewer assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "AssignReviewer"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyMapRequestFieldFrom": "Input",
          "pyParameterName": "Reviewer",
          "pyParameterValue": "Reviewer"
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Assign_reviewer(page, browser, context, Reviewer);",
  "pyPlaywrightScript": "Assign_reviewer = async (page, browser, context, Reviewer): Promise<void> => {\n  await caseUtils.clickGo(page, \"Assign reviewer\");\n\n  if (Reviewer) { await commonUtils.Handle_ReferenceListMethods(page, 'autocomplete', 'Reviewer', 'singleselect', Reviewer); }\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
