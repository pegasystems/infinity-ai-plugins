---
name: business-action-create-case
description: Load when creating a Business Action with a CreateCase step. Shows CreateCase + PerformAssignment steps with CaseID output capture.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-Expense",
  "pyPurpose": "CreateExpenseCase",
  "pyLabel": "Create Expense Case",
  "pyKeywordDescription": "User Creates new Expense Case",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyInputParameters": [
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    },
    {
      "pyParameterName": "Expense title",
      "pyParameterValue": "Office supplies purchase"
    },
    {
      "pyParameterName": "Amount",
      "pyParameterValue": "149.99"
    },
    {
      "pyParameterName": "Date of expense",
      "pyParameterValue": "2025-06-10"
    },
    {
      "pyParameterName": "Category",
      "pyParameterValue": "Office Supplies"
    },
    {
      "pyParameterName": "Description",
      "pyParameterValue": "Printer paper and toner cartridges"
    }
  ],
  "pyOutputParameters": [
    {
      "pyParameterName": "ExpenseCaseID",
      "pyMapOutputFrom": "Response"
    }
  ],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-CreateCase",
      "pyStepType": "Embed-APIAutomation-Execution-CreateCase",
      "pyStepDescription": "User creates new Expense case",
      "pyOutputParameters": [
        {
          "pyParameterName": "ExpenseCaseID",
          "pyParameterValue": "data$caseInfo$ID"
        }
      ],
      "pyActionParameters": [
        {
          "pyParameterName": "CaseType",
          "pyParameterValue": "MyOrg-MyApp-Work-Expense",
          "pyMapActionParameterFrom": "Constant"
        },
        {
          "pyParameterName": "ProcessID",
          "pyParameterValue": "pyStartCase",
          "pyMapActionParameterFrom": "Constant"
        }
      ]
    },
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAssignment",
      "pyAssignmentName": "Expensedetails",
      "pyExecutionContext": "MyOrg-MyApp-Work-Expense",
      "pyStepDescription": "User submits Expense details form",
      "pyForm": [
        {
          "pyParameterName": "ExpenseTitle",
          "pyParameterValue": "Expense title",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "Amount",
          "pyParameterValue": "Amount",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "DateOfExpense",
          "pyParameterValue": "Date of expense",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "Category",
          "pyParameterValue": "Category",
          "pyMapRequestFieldFrom": "Input"
        },
        {
          "pyParameterName": "Description",
          "pyParameterValue": "Description",
          "pyMapRequestFieldFrom": "Input"
        }
      ],
      "pyOutputParameters": [
        {
          "pyParameterName": "ExpenseCaseID",
          "pyParameterValue": "data$caseInfo$ID"
        }
      ],
      "pyActionParameters": [
        {
          "pyParameterName": "CaseID",
          "pyParameterValue": "CreateCaseID",
          "pyMapActionParameterFrom": "Constant"
        },
        {
          "pyParameterName": "Assignment",
          "pyParameterValue": "Expensedetails",
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
  "pyPlaywrightMethod": "Create_Expense_Case(page, browser, context, Expense_title, Amount, Date_of_expense, Category, Description);",
  "pyPlaywrightScript": "Create_Expense_Case = async (page, browser, context, Expense_title, Amount, Date_of_expense, Category, Description): Promise<void> => {\nawait userPortal.createCase(page, 'Expense');\nif (Expense_title) {\n  await page.getByTestId('Expense title:input:control').fill(Expense_title);\n}\nif (Amount) {\n  await page.getByTestId('Amount:currency-input:control').fill(Amount);\n}\nif (Date_of_expense) {\n  await commonUtils.Handle_Date(page, 'Date of expense', Date_of_expense);\n}\nif (Category) {\n  await page.getByTestId('Category:select:control').selectOption(Category);\n}\nif (Description) {\n  await page.getByTestId('Description:text-area:control').fill(Description);\n}\n  await caseUtils.clickSubmit(page);}"
}
```
