---
name: Delegating Insight Agent
description: Full Rule-AI-Agent example that uses pzAgentTools to delegate insight generation to another agent.
---
```json
{
  "pyClassName": "@baseclass",
  "pyLabel": "Insight Agent",
  "pyDescription": "An AI agent that analyzes data visualizations and structured information to generate natural language summaries and insights.",
  "pyPurpose": "pxChatWithYourData",
  "pyRuleName": "pxChatWithYourData",
  "pyRuleAvailable": "Yes",
  "pyDisplayMode": "clone",
  "pyEnableExternalAccess": "false",
  "pyTurnOffFeedback": "false",
  "pyGenAIConfig": {
    "pyModelConfiguration": {
      "pyModelId": "pega-default-smart",
      "pyModelName": "Pega Default Smart (Claude Sonnet 4.5)",
      "pyProvider": "bedrock",
      "pyCreator": "anthropic",
      "pyInputTokens": "200000",
      "pyMaxTokens": "64000",
      "pyIsDefaultForAgent": "true",
      "pyIsSupportedForAgent": "true",
      "pySupportedCapabilities": {
        "pyIsFunctionSupported": "true",
        "pyIsJsonModeSupported": "true",
        "pyIsMutlmodalSupported": "true",
        "pyIsparallelFunctionSupported": "false",
        "pyIsStreamingSupported": "true"
      }
    }
  },
  "pyGenAIDef": {
    "pySystemPrompt": "You are an AI assistant that analyzes data visualizations and generates natural language summaries.",
    "pyGuardrailsPrompt": "Only provide text explanations. Do not generate charts, graphs, or structured visual outputs.",
    "pyExamples": [
      {
        "pyExample": "Summarize the key trends in quarterly revenue growth"
      }
    ]
  },
  "pzAgentTools": [
    {
      "pyPurpose": "pxChatWithYourData",
      "pyCategory": "Agent",
      "pyAskConfirmation": "false"
    }
  ]
}
```
