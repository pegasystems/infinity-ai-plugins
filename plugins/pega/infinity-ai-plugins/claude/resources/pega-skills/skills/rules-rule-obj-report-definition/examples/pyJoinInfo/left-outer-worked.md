---
name: Direct Table Join — complete LEFT OUTER worked example
description: Verified-minimum payload that persists a LEFT OUTER join via the DX API. Shows dual-mirror pyJoinInfo (pyContent.pySource AND pyUI.pySource), join prefix referenced by a pyListFields entry, and matching pyPagesAndClasses. Substitute INNER or RIGHT OUTER with identical surrounding structure.
---

```json
{
  "pxInsName": "PatientsLeftOuterToAppointment",
  "pyName": "PatientsLeftOuterToAppointment",
  "pyPurpose": "PatientsLeftOuterToAppointment",
  "pyStreamName": "PatientsLeftOuterToAppointment",
  "pyReportTitle": "Patients Left Outer To Appointment",
  "pyLabel": "Patients Left Outer To Appointment",
  "pyClassName": "MyOrg-MyApp-Work-Patient",
  "pyAppliesToClass": "MyOrg-MyApp-Work-Patient",
  "pyRuleSet": "MyApp_MyBranch",
  "pyRuleSetVersion": "01-01-01",

  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
      "pyPagesAndClassesPage": "Appointment" }
  ],

  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "MyOrg-MyApp-Work-Patient",
    "pyIsOrdered": "true",
    "pyMaxRecords": "500",
    "pyQueryTimeoutValue": "30",
    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Patient" },
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work-Appointment",
        "pyPagesAndClassesPage": "Appointment" }
    ],
    "pyFields": {
      "pyListFields": [
        { "pyFieldLabel": "Case ID", "pyFieldName": ".pyID",
          "pySortOrder": "1", "pySortType": "ASC" },
        { "pyFieldLabel": "First Name", "pyFieldName": ".PatientFirstName" },
        { "pyFieldLabel": "Appointment ID", "pyFieldName": "Appointment.pyID" }
      ]
    },
    "pySource": {
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard",
      "pyJoinInfo": [
        {
          "pyJoinClassName": "MyOrg-MyApp-Work-Appointment",
          "pyJoinType": "LEFT OUTER",
          "pyPrefix": "Appointment",
          "pyTemporaryObject": "true",
          "pyFilters": {
            "pyFilterLogic": "A",
            "pyFilter": [
              { "pyFilterName": "Appointment.PatientID",
                "pyFilterOperation": "=",
                "pyFilterValue": ".pyID",
                "pyDataType": "Text",
                "pyLogicLabel": "A",
                "pyPromptType": "NoAccess",
                "pyIsLeftOperandAFunction": "false",
                "pyIsRightOperandAFunction": "false",
                "pySkipValidation": "false" }
            ]
          }
        }
      ]
    }
  },

  "pyUI": {
    "pzIsSummary": "false",
    "pyReportingDbDropdown": "Standard",
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyUIFields": [
        { "pyFieldLabel": "Case ID", "pyFieldName": ".pyID",
          "pyEchoFieldName": ".pyID", "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "1", "pySortType": "ASC" },
        { "pyFieldLabel": "First Name", "pyFieldName": ".PatientFirstName",
          "pyEchoFieldName": ".PatientFirstName", "pyDataType": "Text",
          "pyHide": "false" },
        { "pyFieldLabel": "Appointment ID", "pyFieldName": "Appointment.pyID",
          "pyEchoFieldName": "Appointment.pyID", "pyDataType": "Text",
          "pyHide": "false" }
      ]
    },
    "pyChart": {
      "pyEnableChart": "false",
      "pyGraphType": "Column"
    },
    "pySource": {
      "pyJoinInfo": [
        {
          "pyJoinClassName": "MyOrg-MyApp-Work-Appointment",
          "pyJoinType": "LEFT OUTER",
          "pyPrefix": "Appointment",
          "pyTemporaryObject": "true",
          "pyFilters": {
            "pyFilterLogic": "A",
            "pyFilter": [
              { "pyFilterName": "Appointment.PatientID",
                "pyFilterOperation": "=",
                "pyFilterValue": ".pyID",
                "pyDataType": "Text",
                "pyLogicLabel": "A",
                "pyPromptType": "NoAccess",
                "pyIsLeftOperandAFunction": "false",
                "pyIsRightOperandAFunction": "false",
                "pySkipValidation": "false" }
            ]
          }
        }
      ]
    }
  }
}
```
