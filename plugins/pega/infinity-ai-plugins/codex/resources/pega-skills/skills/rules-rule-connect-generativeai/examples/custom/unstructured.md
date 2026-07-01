---
name: genai-custom-unstructured
description: GenAI connector that returns unstructured text to .pyResponseData using the default system prompt (temperature 0.2).
---

```json
{
  "pyLabel": "SummarizeCase",
  "pyServiceName": "SummarizeCase",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Summarizes the current case into a brief text paragraph.",
  "pyExpectedResponseEntity": "Custom",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "true",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.2"
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyResponseData"
    }
  ]
}
```
