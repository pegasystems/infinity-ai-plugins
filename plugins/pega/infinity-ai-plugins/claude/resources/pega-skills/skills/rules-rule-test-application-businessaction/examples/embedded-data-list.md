---
name: business-action-embedded-data-list
description: Load when a Business Action form has a embedded list. Contains example for mapping multiple embedded rows with two fields.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-ExpenseReport",
  "pyPurpose": "SubmitlineitemsAssignment",
  "pyLabel": "Submit line items",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "User submits expense line items",
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
      "pyAssignmentName": "Submit line items",
      "pyStepDescription": "User submits Submit line items form",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Assignment",
          "pyParameterValue": "SubmitLineItems"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyParameterName": "LineItemList",
          "pyParameterType": "Embedded List",
          "pyTestEmbeddedList": [
            {
              "pyTestEmbeddedObject": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "ItemDescription",
                  "pyParameterType": "String",
                  "pyParameterValue": "Airport taxi"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Amount",
                  "pyParameterType": "String",
                  "pyParameterValue": "45.00"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Quantity",
                  "pyParameterType": "String",
                  "pyParameterValue": "4"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Date",
                  "pyParameterType": "String",
                  "pyParameterValue": "2025-03-15"
                }
              ]
            },
            {
              "pyTestEmbeddedObject": [
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "ItemDescription",
                  "pyParameterType": "String",
                  "pyParameterValue": "Hotel stay"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Amount",
                  "pyParameterType": "String",
                  "pyParameterValue": "120.00"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Quantity",
                  "pyParameterType": "String",
                  "pyParameterValue": "5"
                },
                {
                  "pyMapActionParameterFrom": "Constant",
                  "pyParameterName": "Date",
                  "pyParameterType": "String",
                  "pyParameterValue": "2025-03-16"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "pyPlaywrightMethod": "Submit_line_items(page, browser, context);",
  "pyPlaywrightScript": "Submit_line_items = async (page, browser, context): Promise<void> => {\n  await caseUtils.clickGo(page, \"Submit line items\");\n\n  const SubmitLineItems_LineItemListlocators = {\n    \"Item description\": \"Item description:input:control\",\n    \"Amount\": \"Amount:currency-input:control\",\n    \"Quantity\": \"Quantity:select:control\",\n    \"Date\": \"commonUtils.Handle_Date(page, 'Date', Signature_date);\"\n  };\n  const SubmitLineItems_LineItemListinputValues = [\n    {\"Item description\": \"Airport taxi\", \"Amount\": \"45.00\", \"Quantity\": \"4\", \"Date\": \"2025-03-15\"},\n    {\"Item description\": \"Hotel stay\", \"Amount\": \"120.00\", \"Quantity\": \"5\", \"Date\": \"2025-03-16\"}\n  ];\n await commonUtils.Handle_MultiRecordMethods(page, 'Line items', 'table', 'modal', \"//button[@aria-label='Add Items']\", SubmitLineItems_LineItemListlocators, SubmitLineItems_LineItemListinputValues);\n  await caseUtils.clickSubmit(page);\n}" 
}
```
