---
name: business-action-multi-reference-field
description: Load when a Business Action form lets the user choose several records from a reference picker. Contains a sample for selecting multiple values for the reference.
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
  "pyPlaywrightMethod": "Select_amenities(page, browser, context);",
  "pyPlaywrightScript": "Select_amenities = async (page, browser, context): Promise<void> => {\n  await caseUtils.clickGo(page, \"Select amenities\");\n\n  const amenities = ['Extra legroom', 'Priority boarding'];\n  await commonUtils.Handle_ReferenceListMethods(page, 'table', 'Amenities', 'multiselect', amenities); \n\n  await caseUtils.clickSubmit(page);\n}"
}
```
