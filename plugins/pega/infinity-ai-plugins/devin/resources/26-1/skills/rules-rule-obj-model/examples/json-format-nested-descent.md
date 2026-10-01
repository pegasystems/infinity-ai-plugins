---
name: JSON Format Data Transform — Nested-Object Descent
description: "JSON Data Transform mapping a multi-level response via chained UPDATE_PAGE steps with pyUpdateContextOptions 'JSON'. See model-json-data-transforms for the full mapping-actions reference."
---

```json
{
  "pyModelName": "MapNestedResponseJSON",
  "pyLabel": "Map Nested Response JSON",
  "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
  "pyDataModelFormat": "JSON",
  "pyParameters": [
    {
      "pyParametersParamName": "jsonData",
      "pyParametersParamDesc": "The incoming or outgoing JSON data.",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "0"
    },
    {
      "pyParametersParamName": "executionMode",
      "pyParametersParamDefaultValue": "DESERIALIZE",
      "pyParametersParamDesc": "Direction to execute the mapping in: SERIALIZE or DESERIALIZE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyMappingModel": {
    "pxObjClass": "Rule-Obj-Mapping-JSON",
    "pyClassName": "MyOrg-MyApp-Data-GeocodedLocation",
    "pyTopLevelElement": "Object",
    "pyAutomapAll": "false",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Pega",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
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
    ]
  }
}
```
