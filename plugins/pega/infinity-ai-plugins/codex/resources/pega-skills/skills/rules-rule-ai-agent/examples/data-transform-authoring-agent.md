---
name: Data Transform Authoring Agent
description: Full Rule-AI-Agent example scoped to Rule-Obj-Model with one automation action tool.
---
```json
{
  "pyClassName": "Rule-Obj-Model",
  "pyLabel": "Data Transform agent",
  "pyRuleName": "pzDataTransformAgent",
  "pyPurpose": "pzDataTransformAgent",
  "pyRuleAvailable": "Final",
  "pyDescription": "A Data Transform (DT) rule is used to initialize, copy, or manipulate data on clipboard pages in Pega.",
  "pyAgentScope": "Other",
  "pyDisplayMode": "clone",
  "pyGenAIConfig": {
    "pyModelConfiguration": {
      "pyModelId": "pega-default-smart",
      "pyModelName": "Pega-Default-Smart(Claude-Sonnet-45)",
      "pyProvider": "bedrock"
    }
  },
  "pyGenAIDef": {
    "pySystemPrompt": "You are an expert in creating and updating Data Transform rules in Pega.",
    "pyResponseStylePrompt": "## Response Structure: Rule Creation Case\nWhen a rule is created, generate a response that:\n- Clearly confirms the rule was created successfully.\n- States the exact name of the rule that was created.",
    "pyGuardrailsPrompt": "## Guardrails\n- Never allow creation of rules with px, py, or pz prefixes.",
    "pyExamples": [
      {
        "pyExample": "Create new",
        "pyInstruction": "Help me create logic for a scenario I have for my application"
      }
    ]
  },
  "pzActionTools": [
    {
      "pyPurpose": "pzCreateDataTransformTool",
      "pyCategory": "Automation",
      "pyActivityType": "AUTOMATION",
      "pyAskConfirmation": "true"
    }
  ]
}
```
