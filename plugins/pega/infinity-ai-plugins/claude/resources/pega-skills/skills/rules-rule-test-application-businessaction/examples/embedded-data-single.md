---
name: business-action-embedded-data-single
description: Load when a Business Action form has an embedded page field. Shows filling all fields mentioned in the referenced form.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ExpenseReport",
  "pyPurpose": "AssignreviewerAssignment",
  "pyLabel": "Assign reviewer",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User assigns a reviewer to the expense",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
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
      "pyStepDescription": "User submits Assign reviewer form",
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
          "pyParameterName": "ReviewerDetails",
          "pyParameterType": "Reference",
          "pyTestReferenceField": [
            {
              "pyMapActionParameterFrom": "Constant",
              "pyParameterName": "ReviewerID",
              "pyParameterValue": "REV-401"
            },
            {
              "pyMapActionParameterFrom": "Constant",
              "pyParameterName": "ReviewerName",
              "pyParameterValue": "Jane Smith"
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Assign_reviewer(page, browser, context);",
  "pyPlaywrightScript": "Assign_reviewer = async (page, browser, context): Promise<void> => {\n  await caseUtils.clickGo(page, \"Assign reviewer\");\n\n  await page.getByTestId('Reviewer ID:input:control').fill('REV-401');\n  await page.getByTestId('Reviewer name:input:control').fill('Jane Smith');\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
