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
  "pyImprovePrivacy": "true",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.4"
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
