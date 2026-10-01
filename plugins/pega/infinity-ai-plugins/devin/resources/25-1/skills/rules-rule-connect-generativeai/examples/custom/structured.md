---
name: genai-custom-structured
description: GenAI connector that returns structured JSON to .pyJsonData (temperature 0.6).
---

```json
{
  "pyLabel": "GenerateCaseSuggestions",
  "pyServiceName": "GenerateCaseSuggestions",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Generates structured JSON suggestions for next-best-actions on a case.",
  "pyExpectedResponseEntity": "Custom",
  "pyUseCase": "custom",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "custom",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt"
  },
  "pyGenAIConfig": {
    "pxObjClass": "Embed-GenAI-Config",
    "pyEnableLocalization": "false",
    "pyEnablePII": "false",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": [
        {
          "pxObjClass": "Embed-GenAI-Model-Parameters",
          "pyName": "temperature",
          "pyType": "float",
          "pyValue": "0.6"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyJsonData"
    }
  ]
}
```
