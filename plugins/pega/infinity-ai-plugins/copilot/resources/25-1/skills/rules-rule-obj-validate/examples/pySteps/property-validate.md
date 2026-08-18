---
name: property-validate
description: VALIDATE-mode step using Property-Validate to enforce required fields.
---

```json
{
  "pyActivityName": "MyValidateRule",
  "pyLabel": "My Validate Rule",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyActivityType": "VALIDATE",
  "pyDescription": "Validates required fields on MyCase.",
  "pySteps": [
    {
      "pyStepsActivityName": "Property-Validate",
      "pyStepsDescription": "Validate Field1 is required",
      "pyParamArray": [
        {
          "PropertyName": ".Field1",
          "Required": "-1",
          "Continue": "-1",
          "Default": "",
          "ErrorMessage": "",
          "ValidateAs": "",
          "OnlyIfChanged": ""
        }
      ]
    },
    {
      "pyStepsActivityName": "Property-Validate",
      "pyStepsDescription": "Validate Field2 is required",
      "pyParamArray": [
        {
          "PropertyName": ".Field2",
          "Required": "-1",
          "Continue": "-1",
          "Default": "",
          "ErrorMessage": "",
          "ValidateAs": "",
          "OnlyIfChanged": ""
        }
      ]
    }
  ]
}
```
