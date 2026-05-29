---
name: Loop Embedded PageList
description: EMBEDDED loop iterating over a PageList and collecting values from each element.
---

```json
{
  "pyActivityName": "CollectActorLabels",
  "pyLabel": "Collect Actor Labels",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Iterates over actors and collects their labels into a result list.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "pyWorkPage.pyActors", "pyPagesAndClassesClass": "Embed-Accel-Actor" },
    { "pyPagesAndClassesPage": "ResultPage", "pyPagesAndClassesClass": "Code-Pega-List" },
    { "pyPagesAndClassesPage": "ResultPage.pxResults", "pyPagesAndClassesClass": "Embed-Accel-Actor" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Collect actor labels",
      "pyStepsObjectName": "pyWorkPage.pyActors",
      "pyStepsRepeatDef": {
        "pyStepsRepeatDefHasRepeat": "EMBEDDED",
        "pyForEachProperty": "",
        "pyStepsRepeatDefStart": "",
        "pyStepsRepeatDefIteration": "",
        "pyStepsRepeatDefLimit": "",
        "pyStepsRepeatDefStop": "",
        "pyForEachValidClasses": [
          { "pyForEachClass": "Embed-Accel-Actor" }
        ]
      },
      "pyParamArray": [
        {
          "PropertiesName": "ResultPage.pxResults(<APPEND>).pyLabel",
          "PropertiesValue": ".pyLabel"
        }
      ]
    }
  ]
}
```
