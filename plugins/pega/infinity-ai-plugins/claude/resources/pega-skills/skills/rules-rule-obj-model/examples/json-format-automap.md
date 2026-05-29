---
name: JSON Format Data Transform — Automap
description: JSON format Data Transform with automap enabled. All JSON fields are mapped automatically to matching clipboard properties.
---

```json
{
  "pyModelName": "MapApiResponse",
  "pyLabel": "Map API Response",
  "pyClassName": "MyOrg-MyApp-Data-MyDataType",
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
    "pyClassName": "MyOrg-MyApp-Data-MyDataType",
    "pyTopLevelElement": "Object",
    "pyAutomapAll": "true",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Pega",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
      {
        "pyActionName": "SET",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-MyDataType"
      }
    ]
  }
}
```
