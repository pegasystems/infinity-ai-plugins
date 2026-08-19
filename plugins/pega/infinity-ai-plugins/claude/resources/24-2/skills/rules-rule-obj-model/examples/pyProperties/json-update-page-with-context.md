---
name: Data Transform pyProperties JSON nested-object descent — UPDATE_PAGE chain with pyUpdateContextOptions
description: Step-level JSON nested-descent fix pattern. Chain UPDATE_PAGE steps with pyUpdateContextOptions "JSON" to traverse a multi-level response without moving the clipboard target. Use this instead of dotted paths in pyPropertiesValue (silently skipped at runtime).
---

```json
{
  "pyActionName": "UPDATE_PAGE",
  "pyElementType": "Objects",
  "pyPageClass": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyPropertiesName": "",
  "pyPropertiesValue": "result",
  "pyUpdateContextOptions": "JSON",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "UPDATE_PAGE",
      "pyElementType": "Objects",
      "pyPageClass": "MyOrg-MyApp-Data-GeocodedLocation",
      "pyPropertiesName": "",
      "pyPropertiesValue": "addressMatches",
      "pyUpdateContextOptions": "JSON",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "UPDATE_PAGE",
          "pyElementType": "Objects",
          "pyPageClass": "MyOrg-MyApp-Data-GeocodedLocation",
          "pyPropertiesName": "",
          "pyPropertiesValue": "coordinates",
          "pyUpdateContextOptions": "JSON",
          "pyExpanded": "true",
          "pyProperties": [
            {
              "pyActionName": "SET",
              "pyElementType": "Objects",
              "pyPageClass": "@baseclass",
              "pyPropertiesName": ".Longitude",
              "pyPropertiesValue": "x"
            },
            {
              "pyActionName": "SET",
              "pyElementType": "Objects",
              "pyPageClass": "@baseclass",
              "pyPropertiesName": ".Latitude",
              "pyPropertiesValue": "y"
            }
          ]
        }
      ]
    }
  ]
}
```
