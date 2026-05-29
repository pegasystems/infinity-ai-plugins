---
name: verify-email-before-send
description: "Load when you need Email that is shown to a user for review before it is sent; contains a pre-send review example."
---

```json
{
  "pyStreamName": "SensitiveNotification Email",
  "pyLabel": "Sensitive Notification",
  "pyClassName": "MyOrg-MyApp-Work-Alert",
  "pyCorrType": "Email",
  "pyEmailViewMode": "basic",
  "pyNextAction": "Verify",
  "pyVerifyCorr": "true",
  "pySourceStream": "<p>Please review this alert for <<.pyEmployeeName>> before sending.</p><p>Alert type: <<.pyAlertType>> | Severity: <<.pySeverity>></p>"
}
```
