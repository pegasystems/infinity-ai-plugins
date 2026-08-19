---
name: Date Columns
description: 3 columns (text + date + date), 3 rows, dual date range pattern.
---

### create-rule

```json
{
  "pyLabel": "Confirm Scope Feasibility",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "ConfirmScopeFeasibility",
  "pyDescription": "Evaluates if the defined scope is realistic and achievable within constraints.",
  "pyDefaultResult": "Not Feasible",
  "pyColumns": [
    {
      "pyProperty": ".Scope",
      "pyPropertyLabel": "Scope",
      "pyColumnDataType": "text",
      "pyCondition": ["Comprehensive", "Comprehensive", "Limited"]
    },
    {
      "pyProperty": ".StartDate",
      "pyPropertyLabel": "Start Date",
      "pyColumnDataType": "date",
      "pyCondition": [">=20230601", ">=20230601", ">=20230601"]
    },
    {
      "pyProperty": ".EndDate",
      "pyPropertyLabel": "End Date",
      "pyColumnDataType": "date",
      "pyCondition": ["<=20230831", "<=20230715", "<=20230715"]
    }
  ],
  "pyResults": ["Feasible", "Review", "Feasible"]
}
```
