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
  "pyUseOpLocaleForResponse": "true",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt"
  },
  "pyGenAIConfig": {
    "pxObjClass": "Embed-GenAI-Config",
    "pyEnableLocalization": "true",
    "pyEnablePII": "false",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": [
        {
          "pxObjClass": "Embed-GenAI-Model-Parameters",
          "pyName": "temperature",
          "pyType": "float",
          "pyValue": "0.2"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyResponseData"
    }
  ]
}
```
