---
name: Search Rule Data Page-backed Tool
description: Data page-backed tool that searches for rules and mirrors parameters at the tool and backing-rule levels.
---

```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "Search Rule",
  "pyPurpose": "pzSearchRule",
  "pyRuleName": "pzSearchRule",
  "pyRuleAvailable": "Final",
  "pyIntentDescription": "Validate if a Pega rule exists in the given context. If found, return the matching rule model(s).\n\nInput Requirements:\n- ruleType (mandatory): Friendly name mapped to class\n- appliesToClass (optional): Defaults to current context\n- searchText (mandatory): Rule name or partial name",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "Find <rule name> <rule type> rule"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "Rule-Application",
    "pyCategory": "Rule-Declare-Pages",
    "pyClassName": "Rule-Application",
    "pyRuleName": "D_pzSearchRule",
    "pyParameters": [
      {
        "pyParametersParamDesc": "Class of rule type",
        "pyParametersParamInOut": "IN",
        "pyParametersParamName": "ruleTypeClass",
        "pyParametersParamReq": "-1",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.ruleTypeClass",
        "pyRequired": "true"
      },
      {
        "pyParametersParamDesc": "Container class",
        "pyParametersParamInOut": "IN",
        "pyParametersParamName": "appliesToClass",
        "pyParametersParamReq": "0",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.appliesToClass",
        "pyRequired": "false"
      },
      {
        "pyParametersParamDesc": "searchText",
        "pyParametersParamInOut": "IN",
        "pyParametersParamName": "searchText",
        "pyParametersParamReq": "-1",
        "pyParametersParamType": "STRING",
        "pyParametersParamValue": "Param.searchText",
        "pyRequired": "true"
      },
      {
        "pyParametersParamDefaultValue": "true",
        "pyParametersParamDesc": "Whether to include ancestor rules or not",
        "pyParametersParamInOut": "IN",
        "pyParametersParamName": "includeAncestorRules",
        "pyParametersParamReq": "0",
        "pyParametersParamType": "BOOLEAN",
        "pyParametersParamValue": "Param.includeAncestorRules",
        "pyRequired": "false"
      }
    ]
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "Class of rule type",
      "pyParametersParamName": "ruleTypeClass",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Container class",
      "pyParametersParamName": "appliesToClass",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Rule name or partial name to search for",
      "pyParametersParamName": "searchText",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "Whether to include ancestor rules or not",
      "pyParametersParamName": "includeAncestorRules",
      "pyParametersParamReq": "0",
      "pyParametersParamType": "BOOLEAN",
      "pyParametersParamDefaultValue": "true"
    }
  ]
}
```
