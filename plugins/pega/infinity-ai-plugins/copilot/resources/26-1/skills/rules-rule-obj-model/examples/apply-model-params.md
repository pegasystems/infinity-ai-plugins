---
name: APPLY_MODEL with Parameters
description: Calls another Data Transform with explicit parameter values.
---

```json
{
  "pyModelName": "CleanUpDataPages",
  "pyLabel": "Clean Up Data Pages",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyProperties": [
    {
      "pyActionName": "APPLY_MODEL",
      "pyPropertiesName": "RemoveTemporaryPage",
      "pyModelName": "RemoveTemporaryPage",
      "pyClassName": "MyOrg-MyApp-Work-MyCase",
      "pyPassCurrentParameterPage": "false",
      "pyParameters": [
        {
          "pyParametersParamName": "PageName",
          "pyParametersParamType": "STRING",
          "pyParametersParamValue": "\"ReviewData\""
        }
      ]
    }
  ]
}
```
