---
name: Preset Properties (pyInitialPropSet)
description: pyInitialPropSet preset properties — sets .pyDescription unconditionally before any row evaluation.
---

### create-rule

```json
{
  "pyLabel": "Example Of Initial Prop Set In Dec Tab",
  "pyClassName": "OVMYYN-GameNight-Work-GameSession",
  "pyPurpose": "ExampleOfInitialPropSetInDecTab",
  "pyDescription": "Demonstrates pyInitialPropSet — pre-seeds .pyDescription before any row logic runs.",
  "pyDefaultResult": "Default",
  "pyInitialPropSet": [
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".pyDescription",
      "pyPropertiesValue": "\"Initial Description Value\""
    }
  ],
  "pyColumns": [
    {
      "pyProperty": ".pyCategory",
      "pyPropertyLabel": "Category",
      "pyColumnDataType": "text",
      "pyCondition": ["Board", "Card"]
    }
  ],
  "pyResults": ["Board Game Night", "Card Game Night"]
}
```
