---
name: business-action-perform-action
description: Load when creating a Business Action for a case-wide or stage-wide action. Shows PerformAction step type with action name wiring and configured DOM test-id locator usage.
---

```json
{
  "pxCaseName": "Flight booking",
  "pyClassName": "MyOrg-MyApp-Work-FlightBooking",
  "pyPurpose": "ChangestageAction",
  "pyLabel": "Change stage",
  "pyKeywordType": "WHEN",
  "pyRuleAvailable": "Yes",
  "pyKeywordDescription": "For a case with stages, this flow action allows the user to switch to either the next stage or a specified stage.",
  "pyBusinessActionValidation": "used to validate change stage attributes",
  "pySkipValidations": "false",
  "pyInputParameters": [
    {
      "pyParameterName": "CaseID"
    },
    {
      "pyParameterName": "ValidationFails",
      "pyParameterValue": "False"
    },
    {
      "pyParameterName": "Stage name",
      "pyParameterValue": "Review"
    }
  ],
  "pyOutputParameters": [],
  "pyTestSteps": [
    {
      "pxObjClass": "Embed-APIAutomation-Execution-PerformAction",
      "pyStepType": "Embed-APIAutomation-Execution-PerformAction",
      "pyStepDescription": "User submits Change stage Action",
      "pyActionParameters": [
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "CaseID",
          "pyParameterValue": "CaseID"
        },
        {
          "pyMapActionParameterFrom": "Constant",
          "pyParameterName": "Action Name",
          "pyParameterValue": "pyChangeStage"
        },
        {
          "pyMapActionParameterFrom": "Input",
          "pyParameterName": "ValidationFails",
          "pyParameterValue": "ValidationFails"
        }
      ],
      "pyForm": [
        {
          "pyMapRequestFieldFrom": "Input",
          "pyParameterName": "pyGotoStage",
          "pyParameterValue": "Stage name"
        }
      ]
    }
  ],
  "pyPlaywrightScript": "await caseUtils.openCaseWideActions(page, \"Change stage\");\n\nif (params[\"Stage name\"]) { await page.getByTestId('201501141429570566259932:select:control').selectOption(params[\"Stage name\"]); }\n\nawait caseUtils.clickSubmit(page);"
}
```
