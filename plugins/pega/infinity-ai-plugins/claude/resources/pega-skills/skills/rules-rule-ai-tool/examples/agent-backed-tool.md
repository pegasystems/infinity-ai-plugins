---
name: Data Transform Agent-backed Tool
description: Agent-backed tool that delegates data transform authoring requests to another AI agent rule.
---

```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "Data Transform Agent Tool",
  "pyPurpose": "pzDataTransformAgentTool",
  "pyRuleName": "pzDataTransformAgentTool",
  "pyRuleAvailable": "Final",
  "pyIntentDescription": "This tool is responsible for handling all authoring-related queries for data transform rules, including the creation, editing, and management of these rules.",
  "pyGenAIDef": {
    "pyExamples": [
      {
        "pyExample": "Create a data transform rule"
      }
    ]
  },
  "pyIntentActionPage": {
    "pyBrowseClass": "@baseclass",
    "pyCategory": "Rule-AI-Agent",
    "pyClassName": "Rule-Obj-Model",
    "pyRuleName": "pzDataTransformAgent"
  },
  "pyParameters": [
    {
      "pyParametersParamDesc": "User Instructions for Agent",
      "pyParametersParamName": "question",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    },
    {
      "pyParametersParamDesc": "CaseID of a current case type",
      "pyParametersParamName": "ContextObjectID",
      "pyParametersParamReq": "-1",
      "pyParametersParamType": "STRING"
    }
  ]
}
```
