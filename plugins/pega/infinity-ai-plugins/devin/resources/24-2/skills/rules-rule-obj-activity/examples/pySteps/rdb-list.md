---
name: RDB-List
description: Execute a Rule-Connect-SQL Browse action against an external relational database
---

```json
{
  "pyStepsActivityName": "RDB-List",
  "pyStepsDescription": "Browse external customer rows",
  "pyStepsCallParams": {
    "RequestType": "Browse",
    "Access": "Defer",
    "ClassName": "MyOrg-MyApp-Int-CustomerLookup",
    "MaxRecords": "100",
    "BrowsePage": "ResultsPage",
    "ApplyDeclaratives": "false",
    "RunInParallel": "false"
  }
}
```
