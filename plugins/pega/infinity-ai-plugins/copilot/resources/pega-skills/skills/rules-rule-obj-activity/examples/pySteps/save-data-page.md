---
name: Save-DataPage Step
description: Save a savable data page to the database using Save-DataPage with WriteNow. Prefer this over calling internal pzSaveDataPage or pz* activities directly.
---

```json
{
  "pyStepsActivityName": "Save-DataPage",
  "pyStepsObjectName": "Primary",
  "pyStepsDescription": "Persist savable data page to database",
  "pyStepsCallParams": {
    "DataPage": "D_CatalogItem",
    "pyGUID": ".pzInsKey",
    "WriteNow": "true"
  }
}
```
