---
name: attach-summary-report-to-case
description: "Load when you need Mail that attaches generated output to the case; contains a source-only attachment example."
---

```json
{
  "pyStreamName": "SummaryReport",
  "pyLabel": "Summary Report",
  "pyClassName": "MyOrg-MyApp-Work-Report",
  "pyCorrType": "Mail",
  "pySourceOnlyMode": "true",
  "pyNextAction": "Attach",
  "pySourceStream": "<h1>Summary Report</h1><p>Attached for case <<.pyID>>.</p><p>Total items: <<.pyTotalItems>> | Completed: <<.pyCompletedItems>></p>"
}
```
