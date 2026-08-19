---
name: admin-system-settings-stub
description: Minimal, full valid Rule-Admin-System-Settings create payload — all 5 environment tiers, no pySettingMetaData. Use as a starting template before adding a pySettingMetaData value-type shape.
---

```json
{
  "pxObjClass": "Rule-Admin-System-Settings",
  "pyOwner": "Onboarding-Payroll",
  "pyPurpose": "BaseURL",
  "pyLabel": "BaseURL",
  "pyProductionLevel": [
    { "pyDescription": "1 - Sandbox", "pySetting": "" },
    { "pyDescription": "2 - Development", "pySetting": "https://payroll-dev.example.com" },
    { "pyDescription": "3 - Quality assurance", "pySetting": "" },
    { "pyDescription": "4 - Staging", "pySetting": "" },
    { "pyDescription": "5 - Production", "pySetting": "" }
  ]
}
```
