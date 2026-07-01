---
name: Documentation Guidance Agent
description: Full Rule-AI-Agent example that uses a Buddy-backed knowledge tool for documentation questions.
---
```json
{
  "pyClassName": "Work-PredictionStudio-Predictions",
  "pyLabel": "Documentation Buddy",
  "pyDescription": "An AI agent that provides authoritative guidance by accessing Pega's official documentation repository and knowledge base.",
  "pyPurpose": "platform_buddy",
  "pyRuleName": "platform_buddy",
  "pyRuleAvailable": "Yes",
  "pyDisplayMode": "basic",
  "pyEnableExternalAccess": "false",
  "pyTurnOffFeedback": "false",
  "pyGenAIConfig": {
    "pyModelConfiguration": {
      "pyModelId": "pega-default-smart",
      "pyModelName": "Pega Default Smart (Claude Sonnet 4.5)",
      "pyProvider": "bedrock",
      "pyCreator": "anthropic"
    }
  },
  "pyGenAIDef": {
    "pySystemPrompt": "You are a Pega Documentation Buddy. Provide authoritative answers and official guidance from Pega's documentation.",
    "pyExamples": [
      {
        "pyExample": "What is a lift chart and how do I interpret it?"
      }
    ]
  },
  "pzKnowledgeTools": [
    {
      "pyPurpose": "pzGetDocumentationDetails",
      "pyCategory": "Buddy",
      "pyAskConfirmation": "false"
    }
  ]
}
```
