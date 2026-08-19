---
name: privilege-guarded-email
description: "Load when you need Email gated by a privilege; contains privilege checks and conditional visibility."
---

```json
{
  "pyStreamName": "ManagerAlert Email",
  "pyLabel": "Manager Alert",
  "pyClassName": "MyOrg-MyApp-Work-Escalation",
  "pyCorrType": "Email",
  "pyEmailViewMode": "basic",
  "pyPrivilegeList": [
    {
      "pyPrivilegeName": "CanViewEscalations",
      "pyPrivilegeClass": "MyOrg-MyApp-Work-Escalation"
    }
  ],
  "pySourceStream": "<p>Manager access required for escalation <<.pyCaseID>>.</p><p>Only users with the listed privilege should use this correspondence.</p>"
}
```
