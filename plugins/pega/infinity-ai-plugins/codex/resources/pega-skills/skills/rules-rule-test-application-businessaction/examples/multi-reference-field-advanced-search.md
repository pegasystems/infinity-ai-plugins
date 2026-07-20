---
name: business-action-multi-reference-field-advanced-search
description: Load when a Business Action form lets the user choose several records from a reference picker that is displayed as advancedSearch. Contains sample DX API payload and UI playwright code for selecting multiple records where the search field also is a reference.
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
      "pyParameterName": "Amenities_searchCriterion",
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
  "pyPlaywrightMethod": "Select_amenities(page, browser, context, Amenities_searchCriterion);",
  "pyPlaywrightScript": "Select_amenities = async (page, browser, context, Amenities_searchCriterion): Promise<void> => {\n  await caseUtils.clickGo(page, \"Select amenities\");\n\n  const amenities = ['Extra legroom', 'Priority boarding'];\n  if (Amenities_searchCriterion === 'Search by Amenities provider') {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Amenities', Amenities_searchCriterion, [{label: \"Amenities provider\", type: \"pxAutoComplete\", value: \"vendor1\"}], amenities);\n  } else if (Amenities_searchCriterion === 'Search by Amenities category') {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Amenities', Amenities_searchCriterion, [{label: \"Amenities category\", type: \"Dropdown\", value: \"Comfort\"}], amenities);\n  } else {\n    await commonUtils.Handle_SearchAndSelectMulti(page, 'Amenities', '', [{label: \"Amenities provider\", type: \"pxAutoComplete\", value: \"vendor1\"}], amenities);\n  }\n\n  await caseUtils.clickSubmit(page);\n}"
}
```
