---
name: Data Transform pyProperties APPEND New Page
description: Append single new page with SET children.
---

```json
{
  "pyActionName": "APPEND_AND_MAP_TO",
  "pyPropertiesName": "Primary.ParameterList",
  "pyRelationNameAppend": "NEW_PAGE",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyName",
      "pyPropertiesValue": ".pyParametersParamName"
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyEditable",
      "pyPropertiesValue": "true"
    }
  ]
}
```
