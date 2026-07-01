---
name: Create Rule Activity-backed Tool
description: Complex activity-backed tool with confirmation, detailed instructions, and mirrored parameter definitions.
---

```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "Create Rule Tool",
  "pyPurpose": "pzCreateRuleTool",
  "pyRuleName": "pzCreateRuleTool",
  "pyRuleAvailable": "Final",
  "pyAskConfirmation": "true",
  "pyAskConfirmationMessage": "Are you sure you want to create this rule? Please confirm to proceed.",
  "pyIntentDescription": "You are an AI assistant responsible for creating a Pega rule using the Create Tool.\n\n1) Purpose\nCreate a rule of the requested type by retrieving the authoritative schema template and populating it using user inputs.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "create a property <INPUT>"
      },
      {
        "pyExample": "add property to data model <INPUT>"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "@baseclass",
    "pyCategory": "Rule-Obj-Activity",
    "pyClassName": "@baseclass",
    "pyRuleName": "pxCreateRuleTool",
    "pyParameters": [
      {
        "pyAutomationIOTextFormat": "None",
        "pyAutomationParamTextOption": "None",
        "pyAutomationParamType": "String",
        "pyDescription": "Type of the Rule to create",
        "pyLabel": "ruleType",
        "pyParameterName": "ruleType",
        "pyParametersInOut": "In",
        "pyParametersParamName": "ruleType",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.ruleType",
        "pyRequired": "true"
      },
      {
        "pyAutomationIOTextFormat": "None",
        "pyAutomationParamTextOption": "None",
        "pyAutomationParamType": "String",
        "pyDescription": "Schema of the rule",
        "pyLabel": "ruleSchema",
        "pyParameterName": "ruleSchema",
        "pyParametersInOut": "In",
        "pyParametersParamName": "ruleSchema",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.ruleSchema",
        "pyRequired": "true"
      }
    ]
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "Type of the Rule to create",
      "pyParametersParamName": "ruleType",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Schema of the rule",
      "pyParametersParamName": "ruleSchema",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    }
  ]
}
```
