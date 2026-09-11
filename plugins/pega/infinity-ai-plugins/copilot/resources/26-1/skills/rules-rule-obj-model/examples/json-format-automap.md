---
name: JSON Format Data Transform — Automap (Object)
description: "JSON format Data Transform with automap enabled, Object top-level (single record, not an array) — all JSON keys map automatically to matching clipboard properties by name. For the Array top-level automap pattern used with list data pages, see json-dt-automap-array."
---

```json
{
  "pyModelName": "MapApiResponse",
  "pyLabel": "Map API Response",
  "pyClassName": "MyOrg-MyApp-Data-MyDataType",
  "pyDataModelFormat": "JSON",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "jsonData",
      "pyParametersParamDesc": "The incoming or outgoing JSON data.",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "0"
    },
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "executionMode",
      "pyParametersParamDefaultValue": "DESERIALIZE",
      "pyParametersParamDesc": "Direction to execute the mapping in: SERIALIZE or DESERIALIZE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses",
      "pyPagesAndClassesPage": "",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-MyDataType"
    }
  ],
  "pyMappingModel": {
    "pxObjClass": "Rule-Obj-Mapping-JSON",
    "pyClassName": "MyOrg-MyApp-Data-MyDataType",
    "pyPageClass": "MyOrg-MyApp-Data-MyDataType",
    "pyTopLevelElement": "Object",
    "pyAutomapAll": "true",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Default",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "COMMENT",
        "pyElementType": "Objects",
        "pyPropertiesName": "Automap all fields by name match"
      }
    ]
  }
}
```
