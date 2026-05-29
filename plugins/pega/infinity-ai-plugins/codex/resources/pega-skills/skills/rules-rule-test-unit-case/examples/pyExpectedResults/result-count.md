---
name: ResultCount Assertion
description: ResultCount assertion -- single-level check on the count of items in a page list.
---

```json
{
  "pyAssertionType": "ResultCount",
  "pyComparator": "Is Greater Than",
  "pyExpectedValue": "0",
  "pyStepPageName": "ResultsPage.pxResults(1)",
  "pyStepPageClass": "Data-NLP-Taxonomy",
  "pyCardApplyToClass": "Data-NLP-Taxonomy",
  "pyListContext": ".pyFscores",
  "pyFilterClass": "Data-NLP-MLScores",
  "pyPropertyApplyToClass": "Data-NLP-MLScores"
}
```
