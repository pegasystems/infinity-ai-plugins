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
          "pyParameterName": "EntertainmentList",
          "pyParameterType": "Multi-Reference",
          "pyTestMultiReferenceList": [
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "ContentID",
                  "pyParameterValue": "ENT-MOV-ACTION-001"
                }
              ]
            },
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "ContentID",
                  "pyParameterValue": "ENT-MOV-ACTION-005"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Select entertainment');\nconst searchFor = params['Entertainment_searchFor'] || '';\nconst searchBy = params['Entertainment_searchBy'] || '';\nconst movieTitles = ['Sky Runner', 'Horizon Chase'];\nif (searchFor === 'Movies') {\n  if (searchBy === 'Search by Genre') {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor, searchBy }, [{ label: 'Genre', type: 'Dropdown', value: 'Action' }], movieTitles);\n  } else {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor, searchBy }, [{ label: 'Title', type: 'TextInput', value: 'Sky' }], movieTitles);\n  }\n} else {\n  await commonUtils.Handle_SearchAndSelectMulti(page, 'Entertainment', { searchFor }, [{ label: 'Series name', type: 'TextInput', value: 'Horizon' }], movieTitles);\n}\nawait caseUtils.clickSubmit(page);"
}
```
