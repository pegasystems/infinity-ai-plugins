---
name: Primitive Array Extraction — Multiple Fields
description: Clipboard-format Data Transform extracting multiple primitive JSON array values with guarded pxReplaceAllViaRegex. Repeats the contains() + regex pattern per field — latitude, longitude, and location name from a geocode response.
---

```json
{
  "pyModelName": "MapGeocodedLocationResponse",
  "pyLabel": "Map Geocoded Location Response",
  "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyDescription": "Extracts latitude, longitude, and name from geocode response where results are primitive arrays. Guarded regex — non-match returns blank.",
  "pyDateFormat": "Pega",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".LatitudeText",
      "pyPropertiesValue": "@if(@(Pega-RULES:String).contains(DataSource.pyResponseData, \"\\\"latitude\\\"\"), @(Pega-RulesEngine:String).pxReplaceAllViaRegex(DataSource.pyResponseData, \".*\\\"latitude\\\":\\\\[([^\\\\]]*)\\\\].*\", \"$1\"), \"\")"
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".LongitudeText",
      "pyPropertiesValue": "@if(@(Pega-RULES:String).contains(DataSource.pyResponseData, \"\\\"longitude\\\"\"), @(Pega-RulesEngine:String).pxReplaceAllViaRegex(DataSource.pyResponseData, \".*\\\"longitude\\\":\\\\[([^\\\\]]*)\\\\].*\", \"$1\"), \"\")"
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".LocationName",
      "pyPropertiesValue": "@if(@(Pega-RULES:String).contains(DataSource.pyResponseData, \"\\\"name\\\"\"), @(Pega-RulesEngine:String).pxReplaceAllViaRegex(DataSource.pyResponseData, \".*\\\"name\\\":\\\\[\\\"([^\\\"]*)\\\"\\\\].*\", \"$1\"), \"\")"
    }
  ]
}
```
