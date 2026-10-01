---
name: business-action-perform-assignment
description: Load when creating a Business Action for a standard assignment. Shows PerformAssignment step type with form field mapping and input parameters.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-TravelRequest",
  "pyPurpose": "TraveldetailsAssignment",
  "pyLabel": "Travel details",
  "pyKeywordDescription": "User submits Travel details",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "What's your preferred travel class?",
      "pyParameterValue": "Economy"
    },
    {
      "pyParameterName": "When do you plan to depart?",
      "pyParameterValue": "2026-07-15"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    }
  ],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "Travel details",
      "pyExecutionContext": "MyOrg-MyApp-Work-TravelRequest",
      "pyStepDescription": "User submits Travel details form",
      "pyForm": [
        {
          "pyParameterName": "PreferredTravelClass",
          "pyParameterValue": "What's your preferred travel class?",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "DepartureDate",
          "pyParameterValue": "When do you plan to depart?",
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
          "pyParameterValue": "TravelDetails",
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
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Travel details\");\n\nif (params[\"What's your preferred travel class?\"]) { await page.locator(`//fieldset[@data-testid=\"What's your preferred travel class?\"]//label[text()='` + params[\"What's your preferred travel class?\"] + `']`).click(); }\nif (params[\"When do you plan to depart?\"]) { await page.getByTestId(`When do you plan to depart?:select:control`).selectOption(params[\"When do you plan to depart?\"]); }\n\nawait caseUtils.clickSubmit(page);"
}
```
