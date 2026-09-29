---
name: business-action-multi-reference-field-advanced-searchfor-and-searchby
description: Load when a Business Action form lets the user choose several records from a reference picker displayed as advancedSearch and the picker has both a "Search for" radio/dropdown and a "Search by" dropdown. Contains sample DX API payload and UI playwright code.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "SelectentertainmentAssignment",
  "pyLabel": "Select entertainment",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User selects in-flight entertainment options",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Entertainment_searchFor",
      "pyParameterValue": "Movies"
    },
    {
      "pyParameterName": "Entertainment_searchBy",
      "pyParameterValue": "Search by Genre"
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
      "pyAssignmentName": "Select entertainment",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Select entertainment assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SelectEntertainment"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "SelectedSearchResult",
          "pyParameterType": "Multi-Reference",
          "pyTestMultiReferenceList": [
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "EntertainmentID",
                  "pyParameterValue": "ENT-MOV-ACTION-001"
                }
              ]
            },
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "EntertainmentID",
                  "pyParameterValue": "ENT-MOV-ACTION-005"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Select entertainment');\nconst searchFor = params['Entertainment_searchFor'] || '';\nconst searchBy = params['Entertainment_searchBy'] || '';\nif (searchFor === 'Movies') {\n  const movieTitles = ['Sky Runner', 'Horizon Chase'];\n  if (searchBy === 'Search by Genre') {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor, searchBy }, [{ label: 'Genre', type: 'Dropdown', value: 'Action' }], movieTitles);\n  } else {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor, searchBy }, [{ label: 'Title', type: 'TextInput', value: 'Sky' }], movieTitles);\n  }\n} else {\n  const tvTitles = ['Sky Drama S1', 'Night Comedy S2'];\n  await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor, searchBy }, [{ label: 'Series name', type: 'TextInput', value: 'Sky' }], tvTitles);\n}\nawait caseUtils.clickSubmit(page);"
}
```
