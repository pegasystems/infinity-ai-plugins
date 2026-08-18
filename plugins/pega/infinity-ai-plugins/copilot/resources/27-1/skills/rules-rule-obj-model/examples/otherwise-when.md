---
name: WHEN / OTHERWISE_WHEN / OTHERWISE
description: Multi-branch conditional logic (if / else-if / else). OTHERWISE_WHEN adds additional condition branches between the opening WHEN and the final OTHERWISE.
---

```json
{
  "pyModelName": "SetPriorityLabel",
  "pyLabel": "Set Priority Label",
  "pyClassName": "MyOrg-MyApp-Work-Request",
  "pyProperties": [
    {
      "pyActionName": "WHEN",
      "pyPropertiesName": ".pyUrgencyWorkClass>=80",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".PriorityLabel",
          "pyPropertiesValue": "\"Critical\""
        }
      ]
    },
    {
      "pyActionName": "OTHERWISE_WHEN",
      "pyPropertiesName": ".pyUrgencyWorkClass>=50",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".PriorityLabel",
          "pyPropertiesValue": "\"High\""
        }
      ]
    },
    {
      "pyActionName": "OTHERWISE_WHEN",
      "pyPropertiesName": ".pyUrgencyWorkClass>=20",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".PriorityLabel",
          "pyPropertiesValue": "\"Medium\""
        }
      ]
    },
    {
      "pyActionName": "OTHERWISE",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".PriorityLabel",
          "pyPropertiesValue": "\"Low\""
        }
      ]
    }
  ]
}
```
