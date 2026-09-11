---
name: JSON Format Data Transform — Manual Mapping (Object)
description: "JSON format Data Transform with manual UPDATE_PAGE + SET field mappings, Object top-level (single record, not an array). For the Array top-level pattern with nested objects and page-list mapping, see json-dt-array-nested-objects."
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
