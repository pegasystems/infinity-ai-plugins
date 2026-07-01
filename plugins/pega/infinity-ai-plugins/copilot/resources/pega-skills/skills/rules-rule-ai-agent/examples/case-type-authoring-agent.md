---
name: Case Type Authoring Agent
description: Full Rule-AI-Agent example scoped to Rule-Obj-CaseType with one automation action tool and one data page knowledge tool.
---
```json
{
  "pyClassName": "Rule-Obj-CaseType",
  "pyLabel": "pzCaseAutopilot",
  "pyRuleName": "pzCaseAutopilot",
  "pyPurpose": "pzCaseAutopilot",
  "pyRuleAvailable": "Final",
  "pyDescription": "Case Autopilot",
  "pyAgentScope": "Other",
  "pyDisplayMode": "clone",
  "pyGenAIConfig": {
    "pyModelConfiguration": {
      "pyModelId": "azure/openai/GPT-4.1-Mini/2025-04-14",
      "pyModelName": "GPT-4.1 Mini",
      "pyProvider": "azure"
    }
  },
  "pyGenAIDef": {
    "pySystemPrompt": "## 1. Role & Identity\nYou are **Autopilot**, an intelligent assistant embedded in Pega App Studio.",
    "pyGuardrailsPrompt": "## Guardrails (Non-Negotiable)\n- **Prefix-based rule protection**",
    "pyResponseStylePrompt": "<h1>Response Tone and Formatting Rules (Must Follow)</h1>",
    "pyExamples": [
      {
        "pyExample": "How to author SLA in Case Type",
        "pyInstruction": "What are the steps to configure Service Level Agreement (SLA) for Case Type?"
      }
    ]
  },
  "pzActionTools": [
    {
      "pyPurpose": "pzGetRuleSchemaBasedOnType",
      "pyCategory": "Automation",
      "pyActivityType": "AUTOMATION",
      "pyAskConfirmation": "true"
    }
  ],
  "pzKnowledgeTools": [
    {
      "pyPurpose": "pzGetClassesFromApplication",
      "pyCategory": "Data page",
      "pyAskConfirmation": "true"
    }
  ]
}
```
