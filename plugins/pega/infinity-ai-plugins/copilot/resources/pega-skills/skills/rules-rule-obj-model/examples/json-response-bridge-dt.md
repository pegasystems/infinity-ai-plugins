---
name: JSON Response Bridge DT (Clipboard Wrapper)
description: Clipboard-format wrapper Data Transform that bridges a data page response to a JSON-format DT via APPLY_MODEL. Wire this as pyResDataTransform on the data page — JSON DTs cannot be invoked directly by the data page framework because it does not populate their jsonData parameter.
---

```json
{
  "pyModelName": "MapResponseBridge",
  "pyLabel": "Map Response Bridge",
  "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyProperties": [
    {
      "pyActionName": "APPLY_MODEL",
      "pyPropertiesName": "MapResponseJSON",
      "pyModelName": "MapResponseJSON",
      "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
      "pyPassCurrentParameterPage": "false",
      "pyParameters": [
        {
          "pyParametersParamName": "jsonData",
          "pyParametersParamType": "STRING",
          "pyParametersParamValue": "DataSource.pyResponseData"
        },
        {
          "pyParametersParamName": "executionMode",
          "pyParametersParamType": "STRING",
          "pyParametersParamValue": "\"DESERIALIZE\""
        }
      ]
    }
  ]
}
```
