---
name: Pie Chart (pyUI.pyChart)
description: Minimal Pie chart over a summary report. Goes in pyUI.pyChart (Embed-ReportGraph). All numeric values are string-encoded.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work",
  "pyGraphType": "Pie",
  "pySubType": "Normal",
  "pyEnableChart": "true",
  "pzChartAllowed": "true",
  "pyChartOutputType": "Flash",
  "pyTitle": "Cases by Status",
  "pyTitleEnabled": "true",
  "pyTitleFontSize": "14",
  "pyTitleFontStyle": "regular",
  "pyHeight": "400",
  "pyWidth": "500",
  "pySize": "Large",
  "pyLegendEnable": "true",
  "pyLegendDirection": "horizontal",
  "pyLegendPlacement": "bottom",
  "pyShowDataTips": "true",

  "pxResults": [
    {
      "pyLabel": "Status",
      "pyTargetProperty": ".pyStatusWork",
      "pyStringType": "Text",
      "pySelected": "true",
      "pzIndexCount": "1"
    },
    {
      "pxApplication": "COUNT",
      "pyLabel": "Cases",
      "pyTargetProperty": ".pzInsKey",
      "pyStringType": "Decimal",
      "pySelected": "true",
      "pzIndexCount": "2"
    }
  ],

  "pyCategoryAxis": [
    {
      "pyDataType": "Text",
      "pyLabel": "Status",
      "pyPropertyName": ".pyStatusWork",
      "pyTargetProperty": ".pyStatusWork",
      "pyGroupOrder": "1",
      "pyHeight": "1"
    }
  ],
  "pyDataAxis": [
    {
      "pyDataType": "Decimal",
      "pyFunction": "COUNT",
      "pyLabel": "Cases",
      "pyPropertyName": ".pySummaryCount(1)",
      "pyTargetProperty": ".pzInsKey"
    }
  ],

  "pyPie": {
    "pyLabelEnabled": "true",
    "pyLabelPosition": "outside",
    "pyLabelPercent": "true",
    "pyField": "pySummaryCount_1",
    "pyNameField": "pyStatusWork"
  }
}
```
