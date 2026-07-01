---
name: Association — explicit complete worked example
description: Full Report Definition payload using an association join with all required locations populated for DX API authoring. Shows pyAssociations mirrored in both pyContent.pySource and pyUI.pySource, pyPagesAndClasses at top-level and pyContent, and association markers (pyACIsAssoc, pyACAssocName, pyACAssocClass) on fields and filters that reference the associated class.
---

```json
{
  "pxObjClass": "Rule-Obj-Report-Definition",
  "pyStreamName": "PatientsWithAppointmentByAssociation",
  "pyRuleName": "PatientsWithAppointmentByAssociation",
  "pyLabel": "Patients With Appointment (Association)",
  "pyReportTitle": "Patients With Appointment (Association)",
  "pyClassName": "MyOrg-MyApp-Work-Patient",

  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
      "pyPagesAndClassesPage": "AppointmentSchedulingReference" }
  ],

  "pyParameters": [
    { "pyParametersParamName": "AppointmentStatus",
      "pyParametersParamType": "Text" }
  ],

  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "MyOrg-MyApp-Work-Patient",
    "pyMaxRecords": "500",
    "pyQueryTimeoutValue": "30",

    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
        "pyPagesAndClassesPage": "AppointmentSchedulingReference" }
    ],

    "pyParameters": [
      { "pyParametersParamName": "AppointmentStatus",
        "pyParametersParamType": "Text" }
    ],

    "pyFields": {
      "pyListFields": [
        { "pyFieldLabel": "Patient ID", "pyFieldName": ".pyID",
          "pySortOrder": "1", "pySortType": "ASC" },
        { "pyFieldLabel": "Patient Name", "pyFieldName": ".PatientFirstName" },
        { "pyFieldLabel": "Appointment ID",
          "pyFieldName": "AppointmentSchedulingReference.pyID" },
        { "pyFieldLabel": "Appointment Status",
          "pyFieldName": "AppointmentSchedulingReference.Status" }
      ]
    },

    "pyFilters": {
      "pyFilterLogic": "A",
      "pyFilter": [
        { "pyFilterName": "AppointmentSchedulingReference.Status",
          "pyFieldLabel": "Appointment Status",
          "pyFilterOperation": "=",
          "pyFilterValue": "Param.AppointmentStatus",
          "pyDataType": "Text",
          "pyLogicLabel": "A",
          "pyPromptType": "AllAccess",
          "pyACIsAssoc": "true",
          "pyACAssocName": "AppointmentSchedulingReference",
          "pyACAssocClass": "MyOrg-MyApp-Work-Appointment",
          "pyIsLeftOperandAFunction": "false",
          "pyIsRightOperandAFunction": "false" }
      ]
    },

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
    "pzIsSummary": "false",
    "pyReportingDbDropdown": "Standard",
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyUIFields": [
        { "pyFieldLabel": "Patient ID", "pyFieldName": ".pyID",
          "pyEchoFieldName": ".pyID", "pyDataType": "Text",
          "pySortOrder": "1", "pySortType": "ASC",
          "pyACIsAssoc": "false" },
        { "pyFieldLabel": "Patient Name", "pyFieldName": ".PatientFirstName",
          "pyEchoFieldName": ".PatientFirstName", "pyDataType": "Text",
          "pyACIsAssoc": "false" },
        { "pyFieldLabel": "Appointment ID",
          "pyFieldName": "AppointmentSchedulingReference.pyID",
          "pyEchoFieldName": "AppointmentSchedulingReference.pyID",
          "pyDataType": "Text",
          "pyACIsAssoc": "true",
          "pyACAssocName": "AppointmentSchedulingReference",
          "pyACAssocClass": "MyOrg-MyApp-Work-Appointment" },
        { "pyFieldLabel": "Appointment Status",
          "pyFieldName": "AppointmentSchedulingReference.Status",
          "pyEchoFieldName": "AppointmentSchedulingReference.Status",
          "pyDataType": "Text",
          "pyACIsAssoc": "true",
          "pyACAssocName": "AppointmentSchedulingReference",
          "pyACAssocClass": "MyOrg-MyApp-Work-Appointment" }
      ],
      "pyUIFilters": {
        "pyFilterLogic": "A",
        "pyFilter": [
          { "pyFilterName": "AppointmentSchedulingReference.Status",
            "pyFieldLabel": "Appointment Status",
            "pyFilterOperation": "=",
            "pyFilterValue": "Param.AppointmentStatus",
            "pyDataType": "Text",
            "pyLogicLabel": "A",
            "pyPromptType": "AllAccess",
            "pyACIsAssoc": "true",
            "pyACAssocName": "AppointmentSchedulingReference",
            "pyACAssocClass": "MyOrg-MyApp-Work-Appointment",
            "pyIsLeftOperandAFunction": "false",
            "pyIsRightOperandAFunction": "false" }
        ]
      },
      "pyReportRank": {
        "pyRankType": "",
        "pyRankUIField": {}
      }
    },
    "pyChart": { "pyEnableChart": "false", "pyGraphType": "Column" },
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
