---
name: genai-list-pagelist-inside-pagelist
description: List-response connector where each list item itself contains a child pagelist, addressed via .pyChild().pyLeaf notation. Modeled after pzGetSuggestedStagesandSteps.
---

```json
{
  "pyLabel": "SuggestStagesAndSteps",
  "pyServiceName": "SuggestStagesAndSteps",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Suggests a list of case stages, where each stage carries an inner list of steps with name and type.",
  "pyExpectedResponseEntity": "List",
  "pyListName": ".pyStages",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "true",
  "pyGenAIProvConfig": {
    "pyTemperature": "1.0"
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyStageName"
    },
    {
      "pyFieldName": ".pySteps().pyStepName"
    },
    {
      "pyFieldName": ".pySteps().pyStepType"
    }
  ]
}
```
