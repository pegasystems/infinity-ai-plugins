---
name: business-action-single-reference-field-advanced-searchfor-and-searchby
description: Load when a Business Action form has one reference picker displayed as advancedSearch and the picker has both a "Search for" radio/dropdown and a "Search by" dropdown. Contains sample DX API payload and UI playwright code.
---

```json
{
  "pyClassName": "DMOrg-Passenger-Work-Grp2-ServiceAlert",
  "pyPurpose": "SearchforcustomerAssignment",
  "pyLabel": "Search for customer",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User searches for and selects a customer",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "Enter search criteria and select the customer from the search results_searchFor",
      "pyParameterValue": "Customer information"
    },
    {
      "pyParameterName": "Enter search criteria and select the customer from the search results_searchBy",
      "pyParameterValue": "Last name, First name and Date of birth"
    },
    {
      "pyParameterName": "Enter search criteria and select the customer from the search results",
      "pyParameterValue": "Biggs:SA-031"
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
      "pyAssignmentName": "Search for customer",
      "pyExecutionContext": "DMOrg-Passenger-Work-Grp2-ServiceAlert",
      "pyStepDescription": "User searches for and selects a customer",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SearchForCustomer"
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
              "pyParameterName": "pyGUID",
              "pyParameterValue": "Enter search criteria and select the customer from the search results"
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.clickGo(page, 'Search for customer');\nconst searchFor = params['Enter search criteria and select the customer from the search results_searchFor'] || '';\nconst searchBy = params['Enter search criteria and select the customer from the search results_searchBy'] || '';\nif (params['Enter search criteria and select the customer from the search results']) {\n  if (searchFor === 'Service account information') {\n    await commonUtils.Handle_SearchAndSelectSingle(page, 'Enter search criteria and select the customer from the search results', { searchFor }, [{ label: 'Service account ID', type: 'TextInput', value: 'SA-031' }], params['Enter search criteria and select the customer from the search results']);\n  } else if (searchBy === 'Phone number or Email or SSN/National ID') {\n    await commonUtils.Handle_SearchAndSelectSingle(page, 'Enter search criteria and select the customer from the search results', { searchFor, searchBy }, [{ label: 'Phone number', type: 'TextInput', value: '' }, { label: 'Email', type: 'TextInput', value: '' }, { label: 'SSN/National ID', type: 'TextInput', value: '' }], params['Enter search criteria and select the customer from the search results']);\n  } else {\n    await commonUtils.Handle_SearchAndSelectSingle(page, 'Enter search criteria and select the customer from the search results', { searchFor, searchBy }, [{ label: 'Last name', type: 'TextInput', value: 'Biggs' }, { label: 'First name', type: 'TextInput', value: 'Rebecca' }, { label: 'Date of birth', type: 'TextInput', value: '1980-01-15' }], params['Enter search criteria and select the customer from the search results']);\n  }\n}\nawait caseUtils.clickSubmit(page);"
}
```
