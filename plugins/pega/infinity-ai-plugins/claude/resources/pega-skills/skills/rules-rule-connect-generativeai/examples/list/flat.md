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
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.8"
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
