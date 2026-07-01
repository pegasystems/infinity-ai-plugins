---
name: Multi-Column Mixed Types
description: 3 columns (integer + decimal + text), 3 rows, mixed data types.
---

### create-rule

```json
{
  "pyLabel": "Verify Data Completeness",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "VerifyDataCompleteness",
  "pyDescription": "Evaluates data completeness based on score, analysis, and feedback.",
  "pyDefaultResult": "Fail",
  "pyColumns": [
    {
      "pyProperty": ".CompletenessScore",
      "pyPropertyLabel": "Completeness Score",
      "pyColumnDataType": "integer",
      "pyCondition": ["100", "75", "50"]
    },
    {
      "pyProperty": ".AnalysisScore",
      "pyPropertyLabel": "Analysis Score",
      "pyColumnDataType": "decimal",
      "pyCondition": [">=7.5", ">=5.0", ">=0"]
    },
    {
      "pyProperty": ".FeedbackReceived",
      "pyPropertyLabel": "Feedback Received",
      "pyColumnDataType": "text",
      "pyCondition": ["true", "true", "false"]
    }
  ],
  "pyResults": ["Complete", "Partial", "Insufficient"]
}
```
