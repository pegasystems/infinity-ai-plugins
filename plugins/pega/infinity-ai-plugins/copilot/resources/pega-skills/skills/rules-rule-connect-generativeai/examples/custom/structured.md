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
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.6"
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyJsonData"
    }
  ]
}
```
