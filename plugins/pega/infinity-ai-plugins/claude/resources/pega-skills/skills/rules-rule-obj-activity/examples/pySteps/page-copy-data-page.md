---
name: Page-Copy from Data Page
description: Load a parameterized data page onto the clipboard using Page-Copy. Parameters use bracket syntax with dot-notation property references.
---

```json
{
  "pyStepsActivityName": "Page-Copy",
  "pyStepsObjectName": "CustomerInfo",
  "pyStepsDescription": "Load customer data page by ID",
  "pyStepsCallParams": {
    "CopyFrom": "D_Customer[CustomerID: .pyID]",
    "CopyInto": "CustomerInfo",
    "Model": "",
    "PageList": ""
  }
}
```
