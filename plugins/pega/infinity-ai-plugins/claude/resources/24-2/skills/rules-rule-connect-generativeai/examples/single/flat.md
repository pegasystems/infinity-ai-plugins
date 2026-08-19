---
name: genai-single-flat
description: Single-entity extraction with multiple flat scalar response fields (temperature 0.4, privacy enabled).
---

```json
{
  "pyLabel": "ExtractCustomerInfo",
  "pyServiceName": "ExtractCustomerInfo",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Extracts a single customer entity from unstructured text input.",
  "pyExpectedResponseEntity": "Single",
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
    "pyEnablePII": "true",
    "pyModelConfiguration": {
      "pxObjClass": "Embed-GenAI-Model",
      "pyModelId": "pega-default-fast",
      "pyModelParameters": [
        {
          "pxObjClass": "Embed-GenAI-Model-Parameters",
          "pyName": "temperature",
          "pyType": "float",
          "pyValue": "0.4"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyCustomerName"
    },
    {
      "pyFieldName": ".pyEmailAddress"
    },
    {
      "pyFieldName": ".pyPhoneNumber"
    }
  ]
}
```
