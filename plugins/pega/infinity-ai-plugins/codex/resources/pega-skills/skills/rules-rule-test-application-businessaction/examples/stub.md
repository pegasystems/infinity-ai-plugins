---
name: business-action-stub
description: Minimal valid Business Action. Shows single assignment step with one text field — use as a starting template.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCaseType",
  "pyPurpose": "SubmitBasicForm",
  "pyLabel": "Submit basic form",
  "pyKeywordDescription": "User submits basic form",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyInputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterName": "CaseID"
    },
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterName": "FieldValue",
      "pyParameterValue": "Sample text"
    },
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "Basic form",
      "pyExecutionContext": "MyOrg-MyApp-Work-MyCaseType",
      "pyStepDescription": "User submits Basic form",
      "pyForm": [
        {
          "pyParameterName": "FieldName",
          "pyParameterValue": "FieldValue",
          "pyMapRequestFieldFrom": "Input"
        }
      ],
      "pyActionParameters": [
        {
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID",
          "pyMapActionParameterFrom": "Input"
        },
        {
          "pyParameterName": "Assignment",
          "pyParameterValue": "BasicForm",
          "pyMapActionParameterFrom": "Constant"
        },
        {
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails",
          "pyMapActionParameterFrom": "Input"
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Submit_basic_form(page, browser, context, FieldValue);",
  "pyPlaywrightScript": "Submit_basic_form = async (page, browser, context, FieldValue): Promise<void> => {\nawait caseUtils.clickGo(page, \"Basic form\");\n\nif (FieldValue) {\n  await page.getByTestId('Field label:input:control').fill(FieldValue);\n}\n\nawait caseUtils.clickSubmit(page);\n}"
}
```
