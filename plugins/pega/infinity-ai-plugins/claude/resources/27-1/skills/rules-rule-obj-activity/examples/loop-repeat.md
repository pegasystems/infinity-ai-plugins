---
name: Loop Repeat Counted
description: REPEAT counted loop iterating 1 to N using <CURRENT> as a subscript.
---

```json
{
  "pyActivityName": "InitializeSlots",
  "pyLabel": "Initialize Slots",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Loops from 1 to result count, marking each result as processed.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "ResultsPage", "pyPagesAndClassesClass": "Code-Pega-List" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Initialize each slot",
      "pyStepsObjectName": "",
      "pyStepsRepeatDef": {
        "pyStepsRepeatDefHasRepeat": "REPEAT",
        "pyForEachProperty": "",
        "pyStepsRepeatDefStart": "1",
        "pyStepsRepeatDefIteration": "1",
        "pyStepsRepeatDefLimit": "ResultsPage.pxResultCount",
        "pyStepsRepeatDefStop": "",
        "pyForEachValidClasses": [
          { "pyForEachClass": "" }
        ]
      },
      "pyParamArray": [
        {
          "PropertiesName": "ResultsPage.pxResults(<CURRENT>).pyProcessed",
          "PropertiesValue": "true"
        }
      ]
    }
  ]
}
```
