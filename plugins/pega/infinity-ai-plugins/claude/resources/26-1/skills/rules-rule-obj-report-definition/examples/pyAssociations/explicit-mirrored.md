---
name: Association — explicit pyAssociations block (mirrored)
description: Author the pyAssociations entry in BOTH pyContent.pySource.pyAssociations[] and pyUI.pySource.pyAssociations[] when you want the association recorded even with no current field reference, or when reproducing an exported payload. Also add a pyPagesAndClasses entry at both top-level and pyContent level with pyPagesAndClassesPage = purpose name and pyPagesAndClassesClass = associated class.
---

```json
{
  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
      "pyPagesAndClassesPage": "AppointmentSchedulingReference" }
  ],

  "pyContent": {
    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
        "pyPagesAndClassesPage": "AppointmentSchedulingReference" }
    ],
    "pySource": {
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard",
      "pyAssociations": [
        { "pyClassName": "MyOrg-MyApp-Work-Patient",
          "pyPurpose": "AppointmentSchedulingReference",
          "pyAssociatedClass": "MyOrg-MyApp-Work-Appointment" }
      ]
    }
  },

  "pyUI": {
    "pySource": {
      "pyAssociations": [
        { "pyClassName": "MyOrg-MyApp-Work-Patient",
          "pyPurpose": "AppointmentSchedulingReference",
          "pyAssociatedClass": "MyOrg-MyApp-Work-Appointment" }
      ]
    }
  }
}
```
