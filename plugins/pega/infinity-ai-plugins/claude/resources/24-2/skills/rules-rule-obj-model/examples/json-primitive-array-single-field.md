---
name: Primitive Array Extraction — Single Field
description: Clipboard-format Data Transform extracting one primitive JSON array value with guarded pxReplaceAllViaRegex. Shows the minimal contains() guard + regex pattern for a geocode latitude response.
---

```json
{
  "pyModelName": "ExtractGeocodedLatitude",
  "pyLabel": "Extract Geocoded Latitude",
  "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyDescription": "Extracts latitude from geocode response where coordinates are primitive arrays. Guarded regex — non-match returns blank.",
  "pyDateFormat": "Pega",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".LatitudeText",
      "pyPropertiesValue": "@if(@(Pega-RULES:String).contains(DataSource.pyResponseData, \"\\\"latitude\\\"\"), @(Pega-RulesEngine:String).pxReplaceAllViaRegex(DataSource.pyResponseData, \".*\\\"latitude\\\":\\\\[([^\\\\]]*)\\\\].*\", \"$1\"), \"\")"
    }
  ]
}
```
