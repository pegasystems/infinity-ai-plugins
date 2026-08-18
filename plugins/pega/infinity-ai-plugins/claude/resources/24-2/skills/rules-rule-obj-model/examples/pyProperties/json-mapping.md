---
name: Data Transform pyProperties JSON Mapping — UPDATE_PAGE with nested SET
description: Maps a JSON object field to a clipboard page, with child SET steps mapping individual properties. This is an entry in pyMappingModel.pyProperties (Embed-MappingParams).
---

```json
{
  "pyActionName": "UPDATE_PAGE",
  "pyElementType": "Objects",
  "pyPageClass": "MyOrg-MyApp-Data-Release",
  "pyPropertiesName": ".pyBinaries",
  "pyPropertiesValue": "binaries",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyElementType": "Objects",
      "pyPageClass": "@baseclass",
      "pyPageRef": ".pyBinaries",
      "pyPropertiesName": ".pyName",
      "pyPropertiesValue": "name"
    },
    {
      "pyActionName": "SET",
      "pyElementType": "Objects",
      "pyPageClass": "@baseclass",
      "pyPageRef": ".pyBinaries",
      "pyPropertiesName": ".pyURLContent",
      "pyPropertiesValue": "url"
    }
  ]
}
```
