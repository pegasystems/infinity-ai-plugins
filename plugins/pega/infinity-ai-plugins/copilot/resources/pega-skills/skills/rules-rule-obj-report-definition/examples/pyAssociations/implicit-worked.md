---
name: Association — implicit list report worked example
description: "WARNING: This implicit pattern relies on the Dev Studio save activity auto-populating pyAssociations from field references. When creating via the DX API, this auto-population does NOT reliably occur — use the explicit pattern (explicit-worked.md) instead. This example is retained only as a reference for how Dev Studio interactive saves behave."
---

```json
{
  "pxInsName": "PatientsWithAppointmentByAssociation",
  "pyName": "PatientsWithAppointmentByAssociation",
  "pyPurpose": "PatientsWithAppointmentByAssociation",
  "pyStreamName": "PatientsWithAppointmentByAssociation",
  "pyReportTitle": "Patients With Appointment (Association)",
  "pyLabel": "Patients With Appointment (Association)",
  "pyClassName": "MyOrg-MyApp-Work-Patient",
  "pyAppliesToClass": "MyOrg-MyApp-Work-Patient",
  "pyRuleSet": "MyApp_MyBranch",
  "pyRuleSetVersion": "01-01-01",

  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" }
  ],

  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "MyOrg-MyApp-Work-Patient",
    "pyIsOrdered": "true",
    "pyMaxRecords": "500",
    "pyQueryTimeoutValue": "30",
    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" }
    ],
    "pyFields": {
      "pyListFields": [
        { "pyFieldLabel": "Patient ID",     "pyFieldName": ".pyID",
          "pySortOrder": "1",     "pySortType": "ASC" },
        { "pyFieldLabel": "First Name",     "pyFieldName": ".PatientFirstName",
          "pySortOrder": "2", "pySortType": "ASC" },
        { "pyFieldLabel": "Appointment ID", "pyFieldName": "AppointmentSchedulingReference.pyID",
          "pySortOrder": "3", "pySortType": "ASC" }
      ]
    },
    "pySource": {
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard"
    }
  },

  "pyUI": {
    "pzIsSummary": "false",
    "pyReportingDbDropdown": "Standard",
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyUIFields": [
        { "pyFieldLabel": "Patient ID",     "pyFieldName": ".pyID",
          "pyEchoFieldName": ".pyID",                                   "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "1",     "pySortType": "ASC" },
        { "pyFieldLabel": "First Name",     "pyFieldName": ".PatientFirstName",
          "pyEchoFieldName": ".PatientFirstName",                       "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "2", "pySortType": "ASC" },
        { "pyFieldLabel": "Appointment ID", "pyFieldName": "AppointmentSchedulingReference.pyID",
          "pyEchoFieldName": "AppointmentSchedulingReference.pyID",     "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "3", "pySortType": "ASC" }
      ]
    },
    "pyChart": { "pyEnableChart": "false", "pyGraphType": "Column" }
  }
}
```
