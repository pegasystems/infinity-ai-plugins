---
name: business-action-single-reference-field-advanced-searchfor
description: Load when a Business Action form has one reference picker displayed as advancedSearch and the picker has only a "Search for" radio/dropdown (no "Search by"). Contains sample DX API payload and UI playwright code.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "SelectseatAssignment",
  "pyLabel": "Select seat",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User selects a preferred seat",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Seat_searchFor",
      "pyParameterValue": "Economy"
    },
    {
      "pyParameterName": "Seat",
      "pyParameterValue": "12A Window:SEAT-12A"
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
      "pyAssignmentName": "Select seat",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Select seat assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SelectSeat"
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
          "pyParameterType": "Reference",
          "pyTestReferenceField": [
            {
              "pyMapActionParameterFrom": "Input",
              "pyParameterName": "SeatID",
              "pyParameterValue": "Seat"
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Select seat');\nconst searchFor = params['Seat_searchFor'] || '';\nif (params['Seat']) {\n  if (searchFor === 'Business') {\n    await commonUtils.Handle_SearchAndSelectSingle(page, 'Seat', { searchFor }, [{ label: 'Suite number', type: 'TextInput', value: 'B1' }], params['Seat']);\n  } else {\n    await commonUtils.Handle_SearchAndSelectSingle(page, 'Seat', { searchFor }, [{ label: 'Row number', type: 'TextInput', value: '12' }], params['Seat']);\n  }\n}\nawait caseUtils.clickSubmit(page);"
}
```
