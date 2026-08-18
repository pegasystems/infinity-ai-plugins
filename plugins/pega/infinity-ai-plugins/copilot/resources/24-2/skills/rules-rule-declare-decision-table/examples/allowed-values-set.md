---
name: Allowed Values with Property Assignments
description: pyAllowedValues registers result values and configures property assignments per result — allowing specific values for additional target properties when each result is selected.
---

### create-rule

```json
{
  "pyLabel": "Configure Response Stage",
  "pyClassName": "MyOrg-MyApp-Data-StrategyResult",
  "pyPurpose": "ConfigureResponseStage",
  "pyDescription": "Returns the next stage name and SETs wait time and outcome as side-effects.",
  "pyDefaultResult": "NoStage",
  "pyColumns": [
    {
      "pyProperty": ".pyResponseStage",
      "pyPropertyLabel": "Response Stage",
      "pyColumnDataType": "text",
      "pyCondition": ["Opened", "Engaged", "Converted"]
    }
  ],
  "pyResults": ["Opened", "Engaged", "Converted"],
  "pyAllowedValues": [
    {
      "pyAllowedValue": "Opened",
      "pzIsAllowedResultsPropSetExist": "true",
      "pyPropertySet": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pxResponseWaitingTime",
          "pyPropertiesValue": "60"
        },
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pyOutcome",
          "pyPropertiesValue": "Sent"
        }
      ]
    },
    {
      "pyAllowedValue": "Engaged",
      "pzIsAllowedResultsPropSetExist": "true",
      "pyPropertySet": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pxResponseWaitingTime",
          "pyPropertiesValue": "120"
        },
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pyOutcome",
          "pyPropertiesValue": "Engaged-Pending-Response"
        }
      ]
    },
    {
      "pyAllowedValue": "Converted",
      "pzIsAllowedResultsPropSetExist": "true",
      "pyPropertySet": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pxResponseWaitingTime",
          "pyPropertiesValue": "360"
        },
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pyOutcome",
          "pyPropertiesValue": "Converted-Pending-Response"
        }
      ]
    },
    {
      "pyAllowedValue": "NoStage",
      "pzIsAllowedResultsPropSetExist": "false",
      "pyPropertySet": []
    }
  ]
}
```
