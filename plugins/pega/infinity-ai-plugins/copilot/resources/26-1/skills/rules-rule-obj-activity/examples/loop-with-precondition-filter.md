---
name: Loop with Precondition Filter
description: EMBEDDED loop using preconditions to filter iterations (skip system actors).
---

```json
{
  "pyActivityName": "ListNonSystemActors",
  "pyLabel": "List Non-System Actors",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Iterates over actors, skipping system actors via precondition filter.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "pyWorkPage.pyActors", "pyPagesAndClassesClass": "Embed-Accel-Actor" },
    { "pyPagesAndClassesPage": "ResultPage", "pyPagesAndClassesClass": "Code-Pega-List" },
    { "pyPagesAndClassesPage": "ResultPage.pxResults", "pyPagesAndClassesClass": "" }
  ],
  "pyParameters": [
    { "pyParametersParamName": "bOnlyNonSystemActors", "pyParametersParamType": "Boolean", "pyParametersParamReq": "0" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Process non-system actors only",
      "pyStepsObjectName": "pyWorkPage.pyActors",
      "pyStepsPreCondition": "true",
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
      "pyStepsPreCondParams": [
        {
          "pyStepsPreCondParamsWhen": "param.bOnlyNonSystemActors",
          "pyStepsPreCondParamsWhenTrue": "2",
          "pyStepsPreCondParamsWhenFalse": "5",
          "pyStepsPreCondParamsWhenTruePrms": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        },
        {
          "pyStepsPreCondParamsWhen": ".pyType==\"This System\"",
          "pyStepsPreCondParamsWhenTrue": "4",
          "pyStepsPreCondParamsWhenFalse": "2",
          "pyStepsPreCondParamsWhenTruePrms": "",
          "pyStepsPreCondParamsWhenFalsePrms": ""
        }
      ],
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
