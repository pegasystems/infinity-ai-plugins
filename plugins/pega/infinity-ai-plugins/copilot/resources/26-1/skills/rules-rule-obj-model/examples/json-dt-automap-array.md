---
name: json-dt-automap-array
description: JSON DT using automap for a list Data Page where JSON keys exactly match clipboard property names — Array top-level with a stub COMMENT step, no explicit pyProperties needed.
---

```json
{
  "pyModelName": "Applicant_Response_LISTJSON",
  "pyLabel": "Applicant Response LISTJSON",
  "pyClassName": "Code-Pega-List",
  "pyDataModelFormat": "JSON",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "jsonData",
      "pyParametersParamDesc": "The incoming JSON data.",
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
      "pyPagesAndClassesPage": ".pxResults",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Applicant"
    }
  ],
  "pyMappingModel": {
    "pxObjClass": "Rule-Obj-Mapping-JSON",
    "pyClassName": "MyOrg-MyApp-Data-Applicant",
    "pyPageClass": "MyOrg-MyApp-Data-Applicant",
    "pyTopLevelElement": "Array",
    "pyArrayElements": "Objects",
    "pyListProperty": ".pxResults",
    "pyAutomapAll": "true",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Default",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "COMMENT",
        "pyElementType": "Objects",
        "pyPropertiesName": "Automap all fields from JSON array"
      }
    ]
  }
}
```
