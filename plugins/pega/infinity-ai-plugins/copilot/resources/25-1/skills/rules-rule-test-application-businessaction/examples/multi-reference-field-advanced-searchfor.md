---
name: business-action-multi-reference-field-advanced-searchfor
description: Load when a Business Action form lets the user choose several records from a reference picker displayed as advancedSearch and the picker has only a "Search for" radio/dropdown (no "Search by"). Contains sample DX API payload and UI playwright code.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "SelectmealsAssignment",
  "pyLabel": "Select meals",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User selects in-flight meal preferences",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Meals_searchFor",
      "pyParameterValue": "Vegetarian"
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
      "pyAssignmentName": "Select meals",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Select meals assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SelectMeals"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "MealList",
          "pyParameterType": "Multi-Reference",
          "pyTestMultiReferenceList": [
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "MealID",
                  "pyParameterValue": "MEAL-VEG-PASTA"
                }
              ]
            },
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "MealID",
                  "pyParameterValue": "MEAL-VEG-SALAD"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Select meals');\nconst meals = ['Vegetarian pasta', 'Garden salad'];\nawait commonUtils.Handle_SearchAndSelectMulti(page, 'Meals', { searchFor: params['Meals_searchFor'] || '' }, [{ label: 'Meal name', type: 'TextInput', value: 'veg' }], meals);\nawait caseUtils.clickSubmit(page);"
}
```
