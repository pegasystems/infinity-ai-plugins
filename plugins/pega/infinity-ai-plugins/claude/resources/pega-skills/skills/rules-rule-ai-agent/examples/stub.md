---
name: Minimal AI Agent
description: Minimal create payload for a Rule-AI-Agent with no tools or AI data sources.
---
```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "MyAgent",
  "pyRuleName": "pzMyAgent",
  "pyPurpose": "pzMyAgent",
  "pyDescription": "Description of the agent",
  "pyGenAIConfig": {
    "pyModelConfiguration": {
      "pyModelId": "pega-default-smart",
      "pyModelName": "Pega-Default-Smart(Claude-Sonnet-45)",
      "pyProvider": "bedrock"
    }
  },
  "pyGenAIDef": {
    "pySystemPrompt": "You are a helpful AI assistant."
  },
  "pyEnableExternalAccess": "false",
  "pyBaseRule": "false",
  "pyValueChanged": "false"
}
```
