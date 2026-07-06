---
name: genai-single-flat-with-attachment
description: Single-entity extraction with attachment input enabled — pyIncludeAttachment='true' and pyGenAIDef.pyImageAttachRefValue set to the clipboard attachment path (temperature 0.4).
---

```json
{
  "pyLabel": "AnalyzeAttachedDocument",
  "pyServiceName": "AnalyzeAttachedDocument",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Analyzes a case attachment and extracts key fields from the document.",
  "pyExpectedResponseEntity": "Single",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyIncludeAttachment": "true",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIDef": {
    "pxObjClass": "Embed-GenAI-Definition",
    "pyUseCase": "qa",
    "pyUserPrompt": "pyGenerativeAIPromptTemplate",
    "pySystemPrompt": "pzDefaultSystemPrompt",
    "pyImageAttachRefValue": ".pyAttachment"
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
          "pyValue": "0.4"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyDocumentTitle"
    },
    {
      "pyFieldName": ".pyDocumentDate"
    },
    {
      "pyFieldName": ".pySummary"
    }
  ]
}
```
