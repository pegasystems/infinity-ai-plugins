---
name: Declare-Index Join — three INNER joins on one Work case
description: Worked example with three pyIndexInfo entries (Index-TrackStatus, Index-WorkPartyUri, Index-DiscussionThread) mirrored in pyContent.pySource AND pyUI.pySource, each prefix referenced by a pyListFields entry, with matching pyPagesAndClasses entries at both layers.
---

```json
{
  "pxInsName": "WorkCasesWithIndexJoins",
  "pyName": "WorkCasesWithIndexJoins",
  "pyPurpose": "WorkCasesWithIndexJoins",
  "pyStreamName": "WorkCasesWithIndexJoins",
  "pyReportTitle": "Work Cases With Index Joins",
  "pyLabel": "Work Cases With Index Joins",
  "pyClassName": "MyOrg-MyApp-Work",
  "pyAppliesToClass": "MyOrg-MyApp-Work",
  "pyRuleSet": "MyApp_MyBranch",
  "pyRuleSetVersion": "01-01-01",

  "pyPagesAndClasses": [
    { "pyPagesAndClassesClass": "MyOrg-MyApp-Work" },
    { "pyPagesAndClassesClass": "Index-TrackStatus",      "pyPagesAndClassesPage": "B"  },
    { "pyPagesAndClassesClass": "Index-WorkPartyUri",     "pyPagesAndClassesPage": "WP" },
    { "pyPagesAndClassesClass": "Index-DiscussionThread", "pyPagesAndClassesPage": "T"  }
  ],

  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "MyOrg-MyApp-Work",
    "pyIsOrdered": "true",
    "pyMaxRecords": "500",
    "pyQueryTimeoutValue": "30",
    "pyPagesAndClasses": [
      { "pyPagesAndClassesClass": "MyOrg-MyApp-Work" },
      { "pyPagesAndClassesClass": "Index-TrackStatus",      "pyPagesAndClassesPage": "B"  },
      { "pyPagesAndClassesClass": "Index-WorkPartyUri",     "pyPagesAndClassesPage": "WP" },
      { "pyPagesAndClassesClass": "Index-DiscussionThread", "pyPagesAndClassesPage": "T"  }
    ],
    "pyFields": {
      "pyListFields": [
        { "pyFieldLabel": "Case ID",        "pyFieldName": ".pyID",
          "pySortOrder": "1",     "pySortType": "ASC" },
        { "pyFieldLabel": "Status (Hist.)", "pyFieldName": "B.pyStatusWork" },
        { "pyFieldLabel": "Party Role",     "pyFieldName": "WP.pyPartyRole" },
        { "pyFieldLabel": "Thread Subject", "pyFieldName": "T.pySubject" }
      ]
    },
    "pySource": {
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard",
      "pyIndexInfo": [
        { "pyIndexClassName": "Index-TrackStatus",      "pyIndexName": "pxTrackStatus", "pyPrefix": "B",  "pyIndexType": "INNER" },
        { "pyIndexClassName": "Index-WorkPartyUri",     "pyIndexName": "pxWorkParty",   "pyPrefix": "WP", "pyIndexType": "INNER" },
        { "pyIndexClassName": "Index-DiscussionThread", "pyIndexName": "pxThread",      "pyPrefix": "T",  "pyIndexType": "INNER" }
      ]
    }
  },

  "pyUI": {
    "pzIsSummary": "false",
    "pyReportingDbDropdown": "Standard",
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyUIFields": [
        { "pyFieldLabel": "Case ID",        "pyFieldName": ".pyID",
          "pyEchoFieldName": ".pyID",            "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "1",     "pySortType": "ASC" },
        { "pyFieldLabel": "Status (Hist.)", "pyFieldName": "B.pyStatusWork",
          "pyEchoFieldName": "B.pyStatusWork",   "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "2", "pySortType": "ASC" },
        { "pyFieldLabel": "Party Role",     "pyFieldName": "WP.pyPartyRole",
          "pyEchoFieldName": "WP.pyPartyRole",   "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "3", "pySortType": "ASC" },
        { "pyFieldLabel": "Thread Subject", "pyFieldName": "T.pySubject",
          "pyEchoFieldName": "T.pySubject",      "pyDataType": "Text",
          "pyHide": "false", "pySortOrder": "4", "pySortType": "ASC" }
      ]
    },
    "pyChart": {
      "pyEnableChart": "false",
      "pyGraphType": "Column"
    },
    "pySource": {
      "pyIndexInfo": [
        { "pyIndexClassName": "Index-TrackStatus",      "pyIndexName": "pxTrackStatus", "pyPrefix": "B",  "pyIndexType": "INNER" },
        { "pyIndexClassName": "Index-WorkPartyUri",     "pyIndexName": "pxWorkParty",   "pyPrefix": "WP", "pyIndexType": "INNER" },
        { "pyIndexClassName": "Index-DiscussionThread", "pyIndexName": "pxThread",      "pyPrefix": "T",  "pyIndexType": "INNER" }
      ]
    }
  }
}
```
