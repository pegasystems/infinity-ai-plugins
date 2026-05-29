---
name: Sub-Report — complete LEFT OUTER worked example
description: Verified-minimum payload for a sub-report join via the DX API. Parent MyOrg-MyApp-Work-Patient; sub-report Report1 returns Appointment rows joined on Case ID. pySubReportInfo block is identical in pyContent.pySource and pyUI.pySource. Substitute LEFT OUTER with INNER or RIGHT OUTER with identical surrounding structure.
---

```json
{
  "pxInsName": "Report2",
  "pyName": "Report2",
  "pyPurpose": "Report2",
  "pyStreamName": "Report2",
  "pyReportTitle": "Report2",
  "pyLabel": "Report2",
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
        { "pyFieldLabel": "Case ID", "pyFieldName": ".pyID",
          "pySortOrder": "1", "pySortType": "ASC" },
        { "pyFieldLabel": "Client Name", "pyFieldName": ".ClientName" }
      ]
    },
    "pySource": {
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard",
      "pySubReportInfo": [
        {
          "pyReportName": "Report1",
          "pyClassName": "MyOrg-MyApp-Work-Appointment",
          "pySubClassName": "MyOrg-MyApp-Work-Appointment",
          "pyPrefix": "B",
          "pyJoinType": "LEFT OUTER",
          "pyAutoPopulateMatchingParams": "false",
          "pyIgnoreOriginalFilters": "false",
          "pyReturnMultipleRows": "true",
          "pyUsageInfo": {
            "select": "true",
            "LHSFilter": "false",
            "RHSFilter": "false"
          },
          "pyColumns": [
            { "pyFieldName": ".pyID", "pyAlias": "Case_ID",
              "pyEchoFieldName": "Case ID",
              "pyDataType": "Text", "pyPrefix": "B" },
            { "pyFieldName": ".pyLabel", "pyAlias": "Label",
              "pyEchoFieldName": "Label",
              "pyDataType": "Text", "pyPrefix": "B" },
            { "pyFieldName": ".pxCreateDateTime", "pyAlias": "Created",
              "pyEchoFieldName": "Created",
              "pyDataType": "DateTime", "pyPrefix": "B" }
          ],
          "pyFilters": {
            "pyFilterLogic": "B",
            "pyFilter": [
              { "pyFilterName": ".pyID",
                "pyEchoFilterName": "Case ID",
                "pyFilterOperation": "=",
                "pyFilterValue": ".pyID",
                "pyDataType": "Text",
                "pyLogicLabel": "B",
                "pyPromptType": "AllAccess" }
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
        { "pyFieldLabel": "Client Name", "pyFieldName": ".ClientName",
          "pyEchoFieldName": ".ClientName", "pyDataType": "Text",
          "pyHide": "false" }
      ]
    },
    "pyChart": {
      "pyEnableChart": "false",
      "pyGraphType": "Column"
    },
    "pySource": {
      "pySubReportInfo": [
        {
          "pyReportName": "Report1",
          "pyClassName": "MyOrg-MyApp-Work-Appointment",
          "pySubClassName": "MyOrg-MyApp-Work-Appointment",
          "pyPrefix": "B",
          "pyJoinType": "LEFT OUTER",
          "pyAutoPopulateMatchingParams": "false",
          "pyIgnoreOriginalFilters": "false",
          "pyReturnMultipleRows": "true",
          "pyUsageInfo": {
            "select": "true",
            "LHSFilter": "false",
            "RHSFilter": "false"
          },
          "pyColumns": [
            { "pyFieldName": ".pyID", "pyAlias": "Case_ID",
              "pyEchoFieldName": "Case ID",
              "pyDataType": "Text", "pyPrefix": "B" },
            { "pyFieldName": ".pyLabel", "pyAlias": "Label",
              "pyEchoFieldName": "Label",
              "pyDataType": "Text", "pyPrefix": "B" },
            { "pyFieldName": ".pxCreateDateTime", "pyAlias": "Created",
              "pyEchoFieldName": "Created",
              "pyDataType": "DateTime", "pyPrefix": "B" }
          ],
          "pyFilters": {
            "pyFilterLogic": "B",
            "pyFilter": [
              { "pyFilterName": ".pyID",
                "pyEchoFilterName": "Case ID",
                "pyFilterOperation": "=",
                "pyFilterValue": ".pyID",
                "pyDataType": "Text",
                "pyLogicLabel": "B",
                "pyPromptType": "AllAccess" }
            ]
          }
        }
      ]
    }
  }
}
```
