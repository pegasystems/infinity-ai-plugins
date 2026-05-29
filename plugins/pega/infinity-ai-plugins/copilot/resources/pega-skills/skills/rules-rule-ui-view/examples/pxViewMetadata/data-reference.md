---
name: "pxViewMetadata entry - DataReference"
description: "pxViewMetadata children entry for a Data Reference field (type 'reference'). Uses inheritedProps for label and required. referenceType is 'Data' for data types or 'Case' for case types / LDM entities. Optional visibility uses @W WhenRuleName pattern."
---

```json
{
  "type": "reference",
  "config": {
    "authorContext": ".Customer",
    "inheritedProps": [
      {"prop": "label", "value": "@FL .Customer"},
      {"prop": "required", "value": false}
    ],
    "name": "Edit_Customer",
    "referenceType": "Data",
    "ruleClass": "MyCo-MyApp-Work-Case",
    "type": "view",
    "visibility": "@W IsNotBlank_Customer"
  }
}
```
