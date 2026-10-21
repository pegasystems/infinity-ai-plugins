---
name: usecase-with-linked-implementations
description: "Load when authoring a specification rule with Implementation tab entries — linking the spec to its implementing rules (activities, properties, views, data transforms)."
---

```json
{
  "content": {
    "pyLabel": "Schedule Appointment",
    "pyOwner": "AppointmentScheduling",
    "pyProductName": "Appointm",
    "pyProductVersion": "01.01.01",
    "pyUsedAs": "pxFlowaction",
    "pyCategory": "New",
    "pySpecFormat": "UserStory",
    "pyPurpose": "ScheduleAppt",
    "pyDescription": "<p>As a patient, I want to schedule an appointment so that I can see a doctor.</p>"
  },
  "pageInstructions": [
    {
      "instruction": "APPEND",
      "target": "pyLinkedImps",
      "content": {
        "pxObjClass": "Data-Rule-Summary",
        "pzInsKey": "RULE-OBJ-ACTIVITY @BASECLASS PROCESSACTIONINSPECTOROLD #20130814T122126.701 GMT",
        "pyRuleKey": "RULE-OBJ-ACTIVITY @BASECLASS PROCESSACTIONINSPECTOROLD #20130814T122126.701 GMT",
        "pxInsName": "@BASECLASS!PROCESSACTIONINSPECTOROLD",
        "pyRuleName": "ProcessActionInspectorOld",
        "pyClassName": "@baseclass",
        "pyClass": "Rule-Obj-Activity",
        "pyClassLabel": "Activity",
        "pyLabel": "Process a flow action",
        "pyRuleSet": "PegaTeamRAPs",
        "pyRuleSetVersion": "01-64-01",
        "pyProductName": "Appointm",
        "pyProductVersion": "01.01.01",
        "pyRuleAvailable": "Final",
        "pxPages": {
          "LinkTB": {
            "pxObjClass": "Link-UseCase",
            "pxLinkedRefTo": "RULE-OBJ-ACTIVITY @BASECLASS PROCESSACTIONINSPECTOROLD #20130814T122126.701 GMT",
            "pxSubscript": "LinkTB",
            "pyTaskID": "0"
          }
        }
      }
    }
  ]
}
```
