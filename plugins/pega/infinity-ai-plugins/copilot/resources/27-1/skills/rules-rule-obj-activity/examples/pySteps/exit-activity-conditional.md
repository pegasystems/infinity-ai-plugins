---
name: Exit-Activity with precondition
description: Conditional Exit-Activity step that exits when a parameter is blank.
---

```json
{
  "pyStepsActivityName": "Exit-Activity",
  "pyStepsObjectName": "",
  "pyStepsDescription": "Exit when city is blank",
  "pyStepsPreCondition": "true",
  "pyStepsPreCondParams": [
    {
      "pyStepsPreCondParamsWhen": "Param.City==\"\"",
      "pyStepsPreCondParamsWhenTrue": "2",
      "pyStepsPreCondParamsWhenTruePrms": "",
      "pyStepsPreCondParamsWhenFalse": "3",
      "pyStepsPreCondParamsWhenFalsePrms": ""
    }
  ]
}
```
