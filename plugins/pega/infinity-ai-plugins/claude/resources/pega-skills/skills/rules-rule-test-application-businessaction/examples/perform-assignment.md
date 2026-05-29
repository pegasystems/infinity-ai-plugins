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
  "pyPlaywrightMethod": "Travel_Details(page, browser, context, Whats_your_preferred_travel_class, When_do_you_plan_to_depart);",
  "pyPlaywrightScript": "Travel_Details = async (page, browser, context, Whats_your_preferred_travel_class, When_do_you_plan_to_depart): Promise<void> => {\n  await caseUtils.clickGo(page, \"Travel details\");\n\n  if (Whats_your_preferred_travel_class) { await page.locator(`//fieldset[@data-testid=\"What's your preferred travel class?\"]//label[text()='` + Whats_your_preferred_travel_class + `']`).click(); }\n  if (When_do_you_plan_to_depart) { await page.getByTestId(`When do you plan to depart?:select:control`).selectOption(When_do_you_plan_to_depart); }\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
