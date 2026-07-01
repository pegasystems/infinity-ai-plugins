---
name: Get Case Types Activity-backed Tool
description: Activity-backed tool that returns case types and demonstrates nested pyIntentActionPage.pyParameters with Embed-AutomationRule-IO entries.
---

```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "Get Case Types",
  "pyPurpose": "pxGetCaseTypes",
  "pyRuleName": "pxGetCaseTypes",
  "pyRuleAvailable": "Final",
  "pyIntentDescription": "This tool returns list of case types for which user is allowed to create cases. For creating cases, you must use only case types listed in this tool output.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "Get case types for creating cases."
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "@baseclass",
    "pyCategory": "Rule-Obj-Activity",
    "pyClassName": "Pega-API-CaseManagement",
    "pyRuleName": "pxGetCasetypesForNativeMCP",
    "pyParameters": [
      {
        "pyAutomationIOTextFormat": "None",
        "pyAutomationParamTextOption": "None",
        "pyAutomationParamType": "String",
        "pyParameterName": "caseTypeFilter",
        "pyParametersInOut": "In",
        "pyParametersParamName": "caseTypeFilter",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.caseTypeFilter",
        "pyRequired": "false"
      }
    ]
  }
}
```
