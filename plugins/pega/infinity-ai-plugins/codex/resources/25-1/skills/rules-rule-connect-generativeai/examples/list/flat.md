---
name: genai-list-flat
description: List-entity extraction with pyListName and multiple scalar fields per item (temperature 0.8).
---

```json
{
  "pyLabel": "ExtractActionItems",
  "pyServiceName": "ExtractActionItems",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Extracts a list of action items from meeting notes, each with a title, assignee, and due date.",
  "pyExpectedResponseEntity": "List",
  "pyListName": ".pyActionItems",
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
          "pyValue": "0.8"
        }
      ]
    }
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyTitle"
    },
    {
      "pyFieldName": ".pyAssignee"
    },
    {
      "pyFieldName": ".pyDueDate"
    },
    {
      "pyFieldName": ".pyPriority"
    }
  ]
}
```
