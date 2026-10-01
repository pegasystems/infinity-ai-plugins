---
name: Loop Embedded with Sub-steps
description: EMBEDDED loop with nested sub-steps demonstrating multi-operation loop bodies.
---

```json
{
  "pyActivityName": "ProcessActors",
  "pyLabel": "Process Actors",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyDescription": "Iterates over actors with sub-steps that filter and set defaults.",
  "pyPagesAndClasses": [
    { "pyPagesAndClassesPage": "pyWorkPage.pyActors", "pyPagesAndClassesClass": "Embed-Accel-Actor" }
  ],
  "pyParameters": [
    { "pyParametersParamName": "currentIndex", "pyParametersParamType": "Integer", "pyParametersParamReq": "0" }
  ],
  "pyLocalParameters": [
    { "pyParametersParamName": "actorsSkipped", "pyParametersParamType": "Integer", "pyParametersParamDesc": "0" }
  ],
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Set",
      "pyStepsDescription": "Process each actor",
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
          "PropertiesName": "local.actorsSkipped",
          "PropertiesValue": "local.actorsSkipped + 1"
        }
      ],
      "pySteps": [
        {
          "pyStepsActivityName": "Property-Set",
          "pyStepsDescription": "Set index and skip invalid actors",
          "pyStepsPreCondition": "true",
          "pyStepsPreCondParams": [
            {
              "pyStepsPreCondParamsWhen": ".pyLabel==\"Any\"",
              "pyStepsPreCondParamsWhenTrue": "4",
              "pyStepsPreCondParamsWhenFalse": "",
              "pyStepsPreCondParamsWhenTruePrms": "",
              "pyStepsPreCondParamsWhenFalsePrms": ""
            },
            {
              "pyStepsPreCondParamsWhen": ".pyLabel==\"\"",
              "pyStepsPreCondParamsWhenTrue": "4",
              "pyStepsPreCondParamsWhenFalse": "",
              "pyStepsPreCondParamsWhenTruePrms": "",
              "pyStepsPreCondParamsWhenFalsePrms": ""
            }
          ],
          "pyParamArray": [
            {
              "PropertiesName": "local.actorsSkipped",
              "PropertiesValue": "local.actorsSkipped - 1"
            },
            {
              "PropertiesName": "param.currentIndex",
              "PropertiesValue": "@toInt(param.pyForEachCount) - local.actorsSkipped"
            }
          ]
        },
        {
          "pyStepsActivityName": "Property-Set",
          "pyStepsDescription": "Default type if not set",
          "pyStepsPreCondition": "true",
          "pyStepsPreCondParams": [
            {
              "pyStepsPreCondParamsWhen": ".pyType==\"\"",
              "pyStepsPreCondParamsWhenTrue": "2",
              "pyStepsPreCondParamsWhenFalse": "3",
              "pyStepsPreCondParamsWhenTruePrms": "",
              "pyStepsPreCondParamsWhenFalsePrms": ""
            }
          ],
          "pyParamArray": [
            {
              "PropertiesName": ".pyType",
              "PropertiesValue": "\"Operator\""
            }
          ]
        }
      ]
    }
  ]
}
```
