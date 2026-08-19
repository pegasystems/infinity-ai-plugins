---
name: Property-Map-Value
description: Look up a value in a one-dimensional Rule-Obj-MapValue and store the result in a property
---

```json
{
  "pyStepsActivityName": "Property-Map-Value",
  "pyStepsDescription": "Map status code to display label via map value",
  "pyStepsCallParams": {
    "MapName": "pyStatusToLabel",
    "PropertyName": ".pyStatusLabel",
    "RowInput": ".pyStatusWork",
    "AllowMissingProperties": "true"
  }
}
```
