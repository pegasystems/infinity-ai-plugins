---
name: Decision Assertion
description: Decision assertion with triple-nested structure -- tests a decision table with input/output rows. Text-mode pyExpectedValue values are bare strings without inner quotes.
---

```json
{
  "pyAssertionType": "Decision",
  "pyPropertyType": "Decision Result",
  "pyExpectedResults": [
    {
      "pyPageName": "rowLevelPage",
      "pyExpectedResults": [
        {
          "pyDisplayLabel": "Input Property Label",
          "pyExpectedValue": "100",
          "pyPropertyAbsolutePath": ".InputPropertyName",
          "pyPropertyMode": "decimal",
          "pyPropertyName": ".InputPropertyName",
          "pyPropertyType": "input"
        },
        {
          "pyDisplayLabel": "Text Input Label",
          "pyExpectedValue": "SomeTextValue",
          "pyPropertyAbsolutePath": ".TextInputProperty",
          "pyPropertyMode": "text",
          "pyPropertyName": ".TextInputProperty",
          "pyPropertyType": "input"
        },
        {
          "pyDisplayLabel": "Result",
          "pyExpectedValue": "ExpectedResult",
          "pyPropertyAbsolutePath": "Result",
          "pyPropertyMode": "text",
          "pyPropertyName": "Result",
          "pyPropertyType": "result"
        }
      ]
    }
  ]
}
```
