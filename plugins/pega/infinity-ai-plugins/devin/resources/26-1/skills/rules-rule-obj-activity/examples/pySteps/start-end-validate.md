---
name: Start-Validate / End-Validate
description: Validation envelope pattern — `Start-Validate` opens a validation scope and `End-Validate` closes it.
---

```json
[
  {
    "pyStepsActivityName": "Start-Validate",
    "pyStepsDescription": "Open validation envelope"
  },
  {
    "pyStepsActivityName": "Obj-Validate",
    "pyStepsDescription": "Validate against business rule",
    "pyStepsCallParams": {
      "Validate": "ValidateOrderSubmission",
      "OverrideClass": ""
    }
  },
  {
    "pyStepsActivityName": "Property-Validate",
    "pyStepsDescription": "Validate critical properties",
    "pyParamArray": [
      { "PropertyName": ".CustomerEmail" },
      { "PropertyName": ".OrderTotal" }
    ]
  },
  {
    "pyStepsActivityName": "End-Validate",
    "pyStepsDescription": "Close envelope; collected messages remain on the page"
  }
]
```
