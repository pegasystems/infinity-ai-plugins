---
name: Data Transform pyProperties UPDATE_PAGE with BLANK
description: Update a page with BLANK initialization. BLANK clears the page's existing data before applying child SET steps, ensuring a known initial state. Use '' (empty string) instead of BLANK to update the page in place without clearing it.
---

```json
{
  "pyActionName": "UPDATE_PAGE",
  "pyPropertiesName": ".pyAddCaseContextPage",
  "pyRelationNameUpdatepage": "BLANK",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyID",
      "pyPropertiesValue": "\"\""
    },
    {
      "pyActionName": "SET",
      "pyPropertiesName": ".pyLabel",
      "pyPropertiesValue": "\"\""
    }
  ]
}
```
