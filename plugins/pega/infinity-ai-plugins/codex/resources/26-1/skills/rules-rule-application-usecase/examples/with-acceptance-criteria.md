---
name: usecase-with-acceptance-criteria
description: "Load when authoring a UserStory Use Case with acceptance criteria. Shows how to capture requirements in pyDescription and express expected outcomes as testable criteria."
---


```json
{
  "pxObjClass": "Rule-Application-UseCase",
  "pyClassName": "MyOrg-MyApp-Work-ExpenseClaim",
  "pyUseCaseName": "SubmitExpenseClaim",
  "pyLabel": "Submit Expense Claim",
  "pyPurpose": "ExpenseClaim",
  "pyOwner": "ExpenseManagement",
  "pyProductName": "FinancePortal",
  "pyProductVersion": "01.02.00",
  "pySpecFormat": "UserStory",
  "pyCategory": "Pending-Plan",
  "pyDescription": "Requirement: Employees must be able to submit an expense claim with receipts and receive confirmation that the claim was recorded. Existing claim data must remain unchanged when a new claim is submitted.",
  "pyActorsList": [
    {
      "pyName": "Employee",
      "pyDescription": "Employee submitting an expense claim."
    }
  ],
  "pyTriggersList": [
    {
      "pyLabel": "Web Browser",
      "pyDescription": "The employee submits the expense claim from the Finance Portal."
    }
  ],
  "pyAcceptanceCriteriaList": [
    {
      "pyCriteria": "An employee can submit an expense claim with one or more receipt attachments."
    },
    {
      "pyCriteria": "The submitted claim is recorded with the employee, amount, date, and receipt details."
    },
    {
      "pyCriteria": "The employee receives confirmation after the claim is successfully recorded."
    },
    {
      "pyCriteria": "Submitting a new claim does not modify existing claim records."
    }
  ]
}
```
