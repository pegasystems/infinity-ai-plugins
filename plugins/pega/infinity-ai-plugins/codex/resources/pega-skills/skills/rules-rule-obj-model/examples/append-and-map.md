---
name: APPEND_AND_MAP_TO
description: Appends rows from a source page list into a target page list, mapping key fields from each source entry. Requires a DataSource parameter declared in pyPagesAndClasses.
---

```json
{
  "pyModelName": "PopulateClientList",
  "pyLabel": "Populate Client List",
  "pyClassName": "MyOrg-MyApp-Data-MyDataType",
  "pyParameters": [
    {
      "pyParametersParamName": "DataSource",
      "pyParametersParamDesc": "Source data page",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "PAGE",
      "pyParametersParamReq": "0"
    }
  ],
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "DataSource",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-MyDataType",
      "pyPagesAndClassesMode": ""
    }
  ],
  "pyProperties": [
    {
      "pyActionName": "APPEND_AND_MAP_TO",
      "pyPropertiesName": "Primary.pxResults",
      "pyPropertiesValue": "DataSource.pxResults",
      "pyRelationNameAppend": "EXISTING_PAGE_LIST",
      "pyExpanded": "true",
      "pyProperties": [
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pyRuleName",
          "pyPropertiesValue": ".pyRuleName"
        },
        {
          "pyActionName": "SET",
          "pyPropertiesName": ".pyRuleSet",
          "pyPropertiesValue": ".pyRuleSet"
        }
      ]
    }
  ]
}
```
