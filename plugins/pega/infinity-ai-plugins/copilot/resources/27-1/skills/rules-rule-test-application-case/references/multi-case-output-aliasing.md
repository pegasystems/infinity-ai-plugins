---
name: testcase-multi-case-aliasing
description: Load when a test case creates multiple cases. Shows unique pyParameterUniqueName aliases per CreateCase and how subsequent keywords reference the correct case.
---

Two CreateCase keywords each capture `CaseID` with a different alias:

```json
{
  "pxObjClass": "Rule-Test-Application-BusinessAction",
  "pyPurpose": "CreateSprintCase",
  "pyClassName": "MyCo-AgileApp-Work-Sprint",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User creates a new Sprint case",
  "pyLabel": "Create Sprint",
  "pyOutputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyMapOutputFrom": "Response",
      "pyParameterName": "SprintCaseID",
      "pyParameterUniqueName": "SprintCaseID"
    }
  ],
  "pyInputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterValue": "False",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "ValidationFails"
    }
  ]
}
```

```json
{
  "pxObjClass": "Rule-Test-Application-BusinessAction",
  "pyPurpose": "CreateUserStoryCase",
  "pyClassName": "MyCo-AgileApp-Work-UserStory",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User creates a User Story",
  "pyLabel": "Create User Story",
  "pyOutputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyMapOutputFrom": "Response",
      "pyParameterName": "StoryCaseID",
      "pyParameterUniqueName": "StoryCaseID"
    }
  ],
  "pyInputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterValue": "False",
      "pyMapTestInputFrom": "Constant",
      "pyParameterName": "ValidationFails"
    }
  ]
}
```

A subsequent keyword picks the correct alias:

```json
{
  "pxObjClass": "Rule-Test-Application-BusinessAction",
  "pyPurpose": "AddStoryToSprint",
  "pyClassName": "MyCo-AgileApp-Work-Sprint",
  "pyKeywordType": "WHEN",
  "pyKeywordDescription": "User adds story to sprint",
  "pyLabel": "Add Story to Sprint",
  "pyInputParameters": [
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterValue": "SprintCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "CaseID"
    },
    {
      "pxObjClass": "Embed-TestParameter",
      "pyParameterValue": "StoryCaseID",
      "pyMapTestInputFrom": "Keyword Output",
      "pyParameterName": "StoryCaseID"
    }
  ]
}
```

## Mapping rules

- Each CreateCase keyword uses the `{CaseTypeName}CaseID` convention for both `pyParameterName` and `pyParameterUniqueName` (e.g., `SprintCaseID`, `StoryCaseID`)
- This matches the Business Action's root-level `pyOutputParameters[].pyParameterName` and the Playwright script's `config.outputParameters` key
- Downstream keywords reference the exact unique name via `Keyword Output`
- A keyword can reference CaseIDs from multiple cases in the same `pyInputParameters` array
- For multiple instances of the same case type, append a number (e.g., `Story1CaseID`, `Story2CaseID`)
