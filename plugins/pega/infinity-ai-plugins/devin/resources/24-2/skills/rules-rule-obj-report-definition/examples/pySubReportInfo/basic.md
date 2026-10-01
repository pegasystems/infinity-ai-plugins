---
name: Sub-Report (pySubReportInfo) — minimal row
description: A single Embed-SubReportInfo entry with required fields. Both pyClassName AND pySubClassName are required (same value, the sub-report's pyAppliesToClass). pyUsageInfo is required. See SKILL.md "DX-API write quirks for sub-reports" for the full rules. See sub-report-left-outer-worked.md for a full example.
---

```json
{
  "pyReportName": "Report1",
  "pyClassName": "MyOrg-MyApp-Work-Appointment",
  "pySubClassName": "MyOrg-MyApp-Work-Appointment",
  "pyPrefix": "B",
  "pyJoinType": "LEFT OUTER",
  "pyUsageInfo": {
    "select": "true",
    "LHSFilter": "false",
    "RHSFilter": "false"
  }
}
```
