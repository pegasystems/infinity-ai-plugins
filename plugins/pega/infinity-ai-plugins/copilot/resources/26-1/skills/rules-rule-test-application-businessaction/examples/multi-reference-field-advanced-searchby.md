---
name: business-action-multi-reference-field-advanced-searchby
description: Load when a Business Action form lets the user choose several records from a reference picker displayed as advancedSearch and the picker has only a "Search by" dropdown (no "Search for"). Contains sample DX API payload and UI playwright code.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "SelectamenitiesAssignment",
  "pyLabel": "Select amenities",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User selects in-flight amenities",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Amenities_searchBy",
      "pyParameterValue": "Search by Amenities provider"
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
      "pyAssignmentName": "Select amenities",
      "pyExecutionContext": "MyOrg-MyApp-Work-FlightBooking",
      "pyStepDescription": "User submits Select amenities assignment",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SelectAmenities"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "AmenityList",
          "pyParameterType": "Multi-Reference",
          "pyTestMultiReferenceList": [
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "AmenityID",
                  "pyParameterValue": "AMEN-EXTRA-LEGROOM"
                }
              ]
            },
            {
              "pyTestReferenceField": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "AmenityID",
                  "pyParameterValue": "AMEN-PRIORITY-BOARDING"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, \"Select amenities\");\n\nconst amenities = ['Extra legroom', 'Priority boarding'];\nawait commonUtils.Handle_SearchAndSelectMulti(page, 'Amenities', { searchBy: params[\"Amenities_searchBy\"] }, [{label: \"Amenities provider\", type: \"pxAutoComplete\", value: \"vendor1\"}], amenities);\n\nawait caseUtils.clickSubmit(page);"
}
```
