---
name: testcase-getcase-persona-switch
description: Load when a test case switches personas mid-flow. Shows Login→GetCase→Assignment sequence — GetCase is required after every persona change to restore case context.
---

After switching from Submitter to Manager, add `GetCase` before the next assignment.
**Without GetCase, the test runner loses its case context and the assignment step fails.**

```json
[
  {
    "pxObjClass": "Rule-Test-Application-BusinessAction",
    "pyPurpose": "Login",
    "pyClassName": "Work-",
    "pyKeywordType": "GIVEN",
    "pyKeywordDescription": "User is logged in as Manager",
    "pyLabel": "Login/User Context",
    "pyInputParameters": [
      {
        "pxObjClass": "Embed-TestParameter",
        "pyParameterValue": "URL",
        "pyMapTestInputFrom": "Global Test Data",
        "pyParameterName": "URL"
      },
      {
        "pxObjClass": "Embed-TestParameter",
        "pyParameterValue": "Manager",
        "pyMapTestInputFrom": "Global Test Data",
        "pyParameterName": "Persona"
      }
    ]
  },
  {
    "pxObjClass": "Rule-Test-Application-BusinessAction",
    "pyPurpose": "GetCase",
    "pyClassName": "Work-",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "Navigate to the Expense case",
    "pyLabel": "Get Case",
    "pyInputParameters": [
      {
        "pxObjClass": "Embed-TestParameter",
        "pyParameterValue": "ExpenseCaseID",
        "pyMapTestInputFrom": "Keyword Output",
        "pyParameterName": "CaseID"
      }
    ]
  },
  {
    "pxObjClass": "Rule-Test-Application-BusinessAction",
    "pyPurpose": "ManagerApprovalAssignment",
    "pyClassName": "MyOrg-MyApp-Work-Expense",
    "pyKeywordType": "WHEN",
    "pyKeywordDescription": "Manager submits the approval",
    "pyLabel": "Manager Approval",
    "pyInputParameters": [
      {
        "pxObjClass": "Embed-TestParameter",
        "pyParameterValue": "ExpenseCaseID",
        "pyMapTestInputFrom": "Keyword Output",
        "pyParameterName": "CaseID"
      },
      {
        "pxObjClass": "Embed-TestParameter",
        "pyParameterValue": "False",
        "pyMapTestInputFrom": "Constant",
        "pyParameterName": "ValidationFails"
      }
    ]
  }
]
```

## Rules

- **GetCase is REQUIRED after every Login that switches persona.** Login resets the browser session — the test runner no longer knows which case it was on.
- GetCase wires `CaseID` from `Keyword Output` using the alias from the original CreateCase keyword.
- The same pattern applies for child case persona switches — use the child's CaseID alias instead.

## When GetCase is NOT needed

- After the **initial Login** at the start of the test (CreateCase handles navigation)
- Between assignments on the **same case with the same persona** (test runner stays in context)
