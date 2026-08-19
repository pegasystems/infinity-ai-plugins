---
name: JSON Format Data Transform — Manual Mapping
description: JSON format Data Transform with explicit field-level mappings. Uses UPDATE_PAGE with nested SET steps to map JSON fields to clipboard properties.
---

```json
{
  "pyModelName": "pzBinary",
  "pyLabel": "Binary",
  "pyClassName": "MyOrg-MyApp-Data-Release",
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
      "pyParametersParamDefaultValue": "SERIALIZE",
      "pyParametersParamDesc": "Direction to execute the mapping in: SERIALIZE or DESERIALIZE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyMappingModel": {
    "pxObjClass": "Rule-Obj-Mapping-JSON",
    "pyClassName": "MyOrg-MyApp-Data-Release",
    "pyTopLevelElement": "Object",
    "pyAutomapAll": "false",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Pega",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
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
    ]
  }
}
```
