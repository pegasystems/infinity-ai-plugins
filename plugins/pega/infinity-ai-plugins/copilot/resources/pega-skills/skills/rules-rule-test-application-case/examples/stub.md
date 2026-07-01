---
name: testcase-stub
description: Minimal test case — Login, CreateCase, and one stage assertion. Shows keyword chaining with CaseID output wiring.
---

```json
{
  "pyPurpose": "MyCase_Minimal",
  "pyLabel": "Create MyCase - Minimal",
  "pyDescription": "Creates a new MyCase and verifies it reaches the Initial Stage after creation",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyTestType": "Case",
  "pyTestContext": "Case Type: My Case",
  "pyApplicationName": "MyApp",
  "pyApplicationVersion": "01.01.01",
  "pyTestKeywords": [
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyPurpose": "Login",
      "pyClassName": "Work-",
      "pyKeywordType": "GIVEN",
      "pyKeywordDescription": "User logins to system / Set User context",
      "pyLabel": "Login/User Context",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "URL",
          "pyMapTestInputFrom": "Global Test Data",
          "pyParameterName": "URL",
          "pyParameterType": "String"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "Applicant",
          "pyMapTestInputFrom": "Global Test Data",
          "pyParameterName": "Persona",
          "pyParameterType": "String"
        }
      ]
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyPurpose": "CreateMyCaseCase",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyKeywordType": "WHEN",
      "pyKeywordDescription": "I Create the My Case by performing \"Create My Case\" Assignment",
      "pyLabel": "Create My Case",
      "pyOutputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyMapOutputFrom": "Response",
          "pyParameterName": "CaseID",
          "pyParameterUniqueName": "MyCaseID"
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
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyStageName": "Initial Stage",
      "pyPurpose": "AssertCaseStage",
      "pyClassName": "Work-",
      "pyKeywordType": "THEN",
      "pyKeywordDescription": "Verify the Case Stage",
      "pyLabel": "Assert Case Stage",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "MyCaseID",
          "pyMapTestInputFrom": "Keyword Output",
          "pyParameterName": "CaseID",
          "pyParameterType": "String"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "Initial Stage",
          "pyMapTestInputFrom": "Constant",
          "pyParameterName": "StageName",
          "pyParameterType": "String"
        }
      ]
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyStatusValue": "Pending-InitialReview",
      "pyPurpose": "AssertCaseStatus",
      "pyClassName": "Work-",
      "pyKeywordType": "THEN",
      "pyKeywordDescription": "Verify the case status is Pending-InitialReview",
      "pyLabel": "Assert Case Status",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "MyCaseID",
          "pyMapTestInputFrom": "Keyword Output",
          "pyParameterName": "CaseID",
          "pyParameterType": "String"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "Pending-InitialReview",
          "pyMapTestInputFrom": "Constant",
          "pyParameterName": "Status",
          "pyParameterType": "String"
        }
      ]
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyPurpose": "SubmitReview",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyKeywordType": "WHEN",
      "pyKeywordDescription": "User submits the review details",
      "pyLabel": "Submit Review",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "MyCaseID",
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
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyStageName": "Review",
      "pyPurpose": "AssertCaseStage",
      "pyClassName": "Work-",
      "pyKeywordType": "THEN",
      "pyKeywordDescription": "Verify the case is in Review stage",
      "pyLabel": "Assert Case Stage",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "MyCaseID",
          "pyMapTestInputFrom": "Keyword Output",
          "pyParameterName": "CaseID",
          "pyParameterType": "String"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "Review",
          "pyMapTestInputFrom": "Constant",
          "pyParameterName": "StageName",
          "pyParameterType": "String"
        }
      ]
    },
    {
      "pxObjClass": "Rule-Test-Application-BusinessAction",
      "pyStatusValue": "Pending-Review",
      "pyPurpose": "AssertCaseStatus",
      "pyClassName": "Work-",
      "pyKeywordType": "THEN",
      "pyKeywordDescription": "Verify the case status is Pending-Review",
      "pyLabel": "Assert Case Status",
      "pyInputParameters": [
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "MyCaseID",
          "pyMapTestInputFrom": "Keyword Output",
          "pyParameterName": "CaseID",
          "pyParameterType": "String"
        },
        {
          "pxObjClass": "Embed-TestParameter",
          "pyParameterValue": "Pending-Review",
          "pyMapTestInputFrom": "Constant",
          "pyParameterName": "Status",
          "pyParameterType": "String"
        }
      ]
    }
  ],
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses"
    }
  ]
}
```
