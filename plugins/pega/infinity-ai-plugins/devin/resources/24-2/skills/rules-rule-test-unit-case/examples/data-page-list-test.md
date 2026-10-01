---
name: Data Page Test (List)
description: Tests a list data page with ResultCount and List assertions -- verifies page count and item property values. From production TC_D_pzParagraphCategories.
---

```json
{
  "pyClassName": "@baseclass",
  "pyPurpose": "TC_D_pzParagraphCategories",
  "pyLabel": "D_pzParagraphCategories",
  "pyDescription": "Run and verify D_pzParagraphCategories data page",
  "pyAddedClassName": "Code-Pega-List",
  "pyCleanUpTestData": "true",
  "pyRuleUnderTest": {
    "pyDetails": {
      "pyIsSinglePageImplementation": "true",
      "pyRuleUnderTestInsName": "D_PZPARAGRAPHCATEGORIES",
      "pyRuleUnderTestName": "D_pzParagraphCategories",
      "pyRuleUnderTestObjClass": "@baseclass",
      "pyRuleUnderTestType": "Rule-Declare-Pages"
    }
  },
  "pyExpectedResults": [
    {
      "pyAssertionType": "ResultCount",
      "pyCardApplyToClass": "Code-Pega-List",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "2",
      "pyFilterClass": "@baseclass",
      "pyListContext": ".pxResults",
      "pyPropertyApplyToClass": "@baseclass",
      "pyStepPageClass": "Code-Pega-List"
    },
    {
      "pyAssertionType": "List",
      "pyCardApplyToClass": "Code-Pega-List",
      "pyComparator": "Is Equals To",
      "pyListContext": ".pxResults",
      "pyNumberOfAppearances": "InAnyInstance",
      "pyPropertyApplyToClass": "@baseclass",
      "pyStepPageClass": "Code-Pega-List",
      "pyExpectedResults": [
        {
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"Rich text\"",
          "pyPageName": "D_pzParagraphCategories.pxResults(1)",
          "pyPropertyAbsolutePath": ".pyLabel",
          "pyPropertyApplyToClass": "@baseclass",
          "pyPropertyMode": "Text",
          "pyPropertyName": "pyLabel"
        },
        {
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"\"",
          "pyPageName": "D_pzParagraphCategories.pxResults(1)",
          "pyPropertyAbsolutePath": ".pyPromptValue",
          "pyPropertyApplyToClass": "@baseclass",
          "pyPropertyMode": "Text",
          "pyPropertyName": "pyPromptValue"
        }
      ]
    },
    {
      "pyAssertionType": "List",
      "pyCardApplyToClass": "Code-Pega-List",
      "pyComparator": "Is Equals To",
      "pyListContext": ".pxResults",
      "pyNumberOfAppearances": "InAnyInstance",
      "pyPropertyApplyToClass": "@baseclass",
      "pyStepPageClass": "Code-Pega-List",
      "pyExpectedResults": [
        {
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"Plain text\"",
          "pyPageName": "D_pzParagraphCategories.pxResults(2)",
          "pyPropertyAbsolutePath": ".pyLabel",
          "pyPropertyApplyToClass": "@baseclass",
          "pyPropertyMode": "Text",
          "pyPropertyName": "pyLabel"
        },
        {
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"simple\"",
          "pyPageName": "D_pzParagraphCategories.pxResults(2)",
          "pyPropertyAbsolutePath": ".pyPromptValue",
          "pyPropertyApplyToClass": "@baseclass",
          "pyPropertyMode": "Text",
          "pyPropertyName": "pyPromptValue"
        }
      ]
    }
  ]
}
```
