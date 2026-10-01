---
name: Direct Table Join — matching pyPagesAndClasses entries
description: For every pyJoinInfo.pyPrefix, declare a pyPagesAndClasses entry (pyPagesAndClassesPage = prefix, pyPagesAndClassesClass = pyJoinClassName) at BOTH top-level and pyContent.pyPagesAndClasses. Without this, references like "Appointment.pyID" fail with "page not declared" warnings.
---

```json
{
  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
      "pyPagesAndClassesPage": "Appointment" }
  ],
  "pyContent": {
    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
        "pyPagesAndClassesPage": "Appointment" }
    ]
  }
}
```
