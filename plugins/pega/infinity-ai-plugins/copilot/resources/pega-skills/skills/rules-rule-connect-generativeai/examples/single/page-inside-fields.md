---
name: genai-single-page-inside-fields
description: Single-response connector with an embedded Page — child scalars addressed via .pyPage.pyChild dot notation. Modeled after pzGenerateApplicationManualTest.
---

```json
{
  "pyLabel": "GenerateTestScenario",
  "pyServiceName": "GenerateTestScenario",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleAvailable": "Yes",
  "pyDescription": "Generates a single Cucumber-style test scenario; result is written to a single .pyCucumberScenario page with four scalar children.",
  "pyExpectedResponseEntity": "Single",
  "pyUseCase": "qa",
  "pyCustomizeSystemPrompt": "false",
  "pySystemPromptName": "pzDefaultSystemPrompt",
  "pyPromptName": "pyGenerativeAIPromptTemplate",
  "pyImprovePrivacy": "false",
  "pyUseOpLocaleForResponse": "false",
  "pyGenAIProvConfig": {
    "pyTemperature": "0.4"
  },
  "pyResponseFields": [
    {
      "pyFieldName": ".pyCucumberScenario.pyTestCaseLevel"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyCucumberScenarioName"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyCucumberScenarioContent"
    },
    {
      "pyFieldName": ".pyCucumberScenario.pyPath"
    }
  ]
}
```
