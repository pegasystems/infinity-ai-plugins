---
name: List Report with Filters and Parameters
description: List report with three columns, two filters using a parameter, and pagination. Demonstrates the mandatory dual-population pattern — every pyContent.pyFields/pyFilters entry has a matching pyUI.pyBody.pyUIFields/pyUIFilters entry. Parameters must be declared at BOTH top-level pyParameters AND pyContent.pyParameters for Param.* references to work in filters. Do NOT include pyRuleSet or pyRuleSetVersion (auto-derived by v2 builder). Filter literal values must be unquoted (e.g. Resolved-Completed, not "Resolved-Completed").
---

```json
{
  "pyStreamName": "MyOpenCases",
  "pyLabel": "My Open Cases",
  "pyReportTitle": "My Open Cases",
  "pyDescription": "Lists open cases assigned to the current operator.",
  "pyClassName": "Work-",
  "pyParameters": [
    {
      "pyParametersParamName": "OperatorID",
      "pyParametersParamType": "Text",
      "pyParametersParamDesc": "Current operator ID"
    }
  ],
  "pyUI": {
    "pzIsSummary": "false",
    "pyReportContentPageName": "pyReportContentPage",
    "pyReportingDbDropdown": "Standard",
    "pyUseAlternateDb": "false",
    "pyChart": {
      "pyEnableChart": "false",
      "pyGraphType": "Column"
    },
    "pyBody": {
      "pyHeaderDisplay": "Default",
      "pyReportRank": {
        "pyRankType": "",
        "pyRankUIField": {}
      },
      "pyUIFields": [
        {
          "pyDataType": "Text",
          "pyEchoFieldName": ".pyID",
          "pyFieldName": ".pyID",
          "pyFieldLabel": "Case ID",
          "pyHide": "false",
          "pySelected": "false",
          "pySortOrder": "1",
          "pySortType": "ASC"
        },
        {
          "pyDataType": "Text",
          "pyEchoFieldName": ".pyLabel",
          "pyFieldName": ".pyLabel",
          "pyFieldLabel": "Description",
          "pyHide": "false",
          "pySelected": "false"
        },
        {
          "pyDataType": "DateTime",
          "pyEchoFieldName": ".pxCreateDateTime",
          "pyFieldName": ".pxCreateDateTime",
          "pyFieldLabel": "Created",
          "pyHide": "false",
          "pySelected": "false"
        }
      ],
      "pyUIFilters": {
        "pyFilterLogic": "A AND B",
        "pyShowLabels": "true",
        "pyFilter": [
          {
            "pyFilterName": ".pxCreateOperator",
            "pyFieldLabel": "Create Operator",
            "pyFilterOperation": "=",
            "pyFilterValue": "Param.OperatorID",
            "pyDataType": "Text",
            "pyLogicLabel": "A",
            "pyPromptType": "NoAccess"
          },
          {
            "pyFilterName": ".pyStatusWork",
            "pyFieldLabel": "Status",
            "pyFilterOperation": "!=",
            "pyFilterValue": "Resolved-Completed",
            "pyDataType": "Text",
            "pyLogicLabel": "B",
            "pyPromptType": "NoAccess"
          }
        ]
      }
    },
    "pyUserInteractions": {
      "pyPagingParams": {
        "pyPagingEnabled": "true",
        "pyPageSize": "50",
        "pyPageMode": "Numeric",
        "pyReturnTotalResultCount": "true"
      }
    }
  },
  "pyContent": {
    "pxIsSummary": "false",
    "pyClassName": "Work-",
    "pyContentPageName": "pyReportContentPage",
    "pyReportContentPageName": "pyReportContentPage",
    "pyMaxRecords": "",
    "pyQueryTimeoutValue": "30",
    "pyIsOrdered": "true",
    "pyFields": {
      "pyListFields": [
        {
          "pyFieldName": ".pyID",
          "pyFieldLabel": "Case ID",
          "pySortOrder": "1",
          "pySortType": "ASC"
        },
        {
          "pyFieldName": ".pyLabel",
          "pyFieldLabel": "Description"
        },
        {
          "pyFieldName": ".pxCreateDateTime",
          "pyFieldLabel": "Created"
        }
      ]
    },
    "pyFilters": {
      "pyFilterLogic": "A AND B",
      "pyShowLabels": "true",
      "pyFilter": [
        {
          "pyFilterName": ".pxCreateOperator",
          "pyFieldLabel": "Create Operator",
          "pyFilterOperation": "=",
          "pyFilterValue": "Param.OperatorID",
          "pyDataType": "Text",
          "pyLogicLabel": "A",
          "pyPromptType": "NoAccess"
        },
        {
          "pyFilterName": ".pyStatusWork",
          "pyFieldLabel": "Status",
          "pyFilterOperation": "!=",
          "pyFilterValue": "Resolved-Completed",
          "pyDataType": "Text",
          "pyLogicLabel": "B",
          "pyPromptType": "NoAccess"
        }
      ]
    },
    "pyReportRank": {
      "pyRankType": "",
      "pyRankField": {}
    },
    "pyParameters": [
      {
        "pyParametersParamName": "OperatorID",
        "pyParametersParamType": "Text",
        "pyParametersParamDesc": "Current operator ID"
      }
    ],
    "pyPagesAndClasses": [
      {
        "pyPagesAndClassesClass": "Work-"
      }
    ],
    "pyPaging": {
      "pyPagingEnabled": "true",
      "pyPageSize": "50",
      "pyPageMode": "Numeric",
      "pyReturnTotalResultCount": "true"
    },
    "pySource": {
      "pyUseAlternateDB": "false",
      "pyIncludeAllDescendantclasses": "false",
      "pyForceUseStandardDB": "true",
      "pyReportDBType": "Standard"
    }
  }
}
```
