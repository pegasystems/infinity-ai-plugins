---
name: Create Case Type-backed Tool
description: Case type-backed tool that starts a Retirement Planning case after explicit confirmation.
---

```json
{
  "pyClassName": "@baseclass",
  "pyRuleName": "CreateRetirementPlan",
  "pyLabel": "Create Retirement Plan",
  "pyPurpose": "CreateRetirementPlan",
  "pyAskConfirmation": "true",
  "pyAskConfirmationMessage": "Are you sure you want to create a new Retirement Planning case?",
  "pyIntentDescription": "Use this tool to create a new Retirement Planning case. This tool initiates the retirement planning workflow for a client, covering initial consultation, goal setting, plan development, and periodic reviews.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "Create a new retirement planning case for a client"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyCategory": "Rule-Obj-CaseType",
    "pyClassName": "MyOrg-MyApp-Work-RetirementPlanning",
    "pyRuleName": "pyDefault",
    "pyRuleInsName": "MYORG-MYAPP-WORK-RETIREMENTPLANNING!PYDEFAULT",
    "pyBrowseClass": "@baseclass"
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "User instructions for the agent",
      "pyParametersParamLabel": "Question",
      "pyParametersParamName": "question",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    }
  ]
}
```
