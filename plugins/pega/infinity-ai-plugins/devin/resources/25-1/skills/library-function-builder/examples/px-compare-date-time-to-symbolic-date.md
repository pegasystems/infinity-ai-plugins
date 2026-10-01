---
name: "pxCompareDateTimeToSymbolicDate"
description: "pxCompareDateTimeToSymbolicDate: Compare [date] using [comparator] to [symbolic date]"
---

```json
{
  "purpose": "pxCompareDateTimeToSymbolicDate",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pxCompareDateTimeToSymbolicDate",
    "pyCity": "pxCompareDateTimeToSymbolicDate",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RulesEngine:DateTimeUtils).pxCompareDateTimeToSymbolicDate({strDate}, \"{comparator}\", \"{symbolicDate}\")",
    "pyEcho": "Compare [date] using [comparator] to [symbolic date]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RulesEngine",
    "pyUsage": "java",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Param.strDate",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".LastModifiedDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "comparator",
        "pyEchoParametersParamValue": "pySymbolicDateComparators",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDateComparators",
        "pyIsOptional": "false",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-Validate",
            "pxSubscript": "HtmlPropPage",
            "pySymbolicDateComparators": "="
          }
        },
        "pyParametersParamValue": "is after",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "symbolicDate",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "symbolic date",
        "pyEchoParametersParamValue": "pySymbolicDatePeriod",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDatePeriod",
        "pyIsOptional": "false",
        "pxPages": {
          "HtmlPropPage": {
            "pxObjClass": "Rule-Obj-Validate",
            "pxSubscript": "HtmlPropPage",
            "pySymbolicDatePeriod": "Current and next month"
          }
        },
        "pyParametersParamValue": "beginning of this week",
        "pyAllowedValues": [
          "Current and next month",
          "Current and next quarter",
          "Current and next year",
          "Current and previous 2 years",
          "Current and previous month",
          "Current and previous quarter",
          "Current and previous year",
          "Current month",
          "Current quarter",
          "Current week",
          "Current year",
          "Last 120 days",
          "Last 30 days",
          "Last 60 days",
          "Last 7 days",
          "Last 90 days",
          "Next 120 days",
          "Next 30 days",
          "Next 60 days",
          "Next 7 days",
          "Next 90 days",
          "Next month",
          "Next quarter",
          "Next week",
          "Next year",
          "Previous 2 years",
          "Previous month",
          "Previous quarter",
          "Previous week",
          "Previous year",
          "Today",
          "Tomorrow",
          "Yesterday"
        ]
      }
    ],
    "pyUIParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "Compare"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Param.strDate",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "comparator",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDateComparators",
        "pyIsOptional": "false",
        "pyReference": "4",
        "pyAllowedValues": [
          "=",
          ">",
          "<",
          "<=",
          ">=",
          "!="
        ]
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamType": "Label",
        "pyParametersParamValue": "to"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "3",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamName": "symbolicDate",
        "pyParametersParamType": "HTMLProperty",
        "pyParametersParamDesc": "symbolic date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDatePeriod",
        "pyIsOptional": "false",
        "pyReference": "6",
        "pyAllowedValues": [
          "Current and next month",
          "Current and next quarter",
          "Current and next year",
          "Current and previous 2 years",
          "Current and previous month",
          "Current and previous quarter",
          "Current and previous year",
          "Current month",
          "Current quarter",
          "Current week",
          "Current year",
          "Last 120 days",
          "Last 30 days",
          "Last 60 days",
          "Last 7 days",
          "Last 90 days",
          "Next 120 days",
          "Next 30 days",
          "Next 60 days",
          "Next 7 days",
          "Next 90 days",
          "Next month",
          "Next quarter",
          "Next week",
          "Next year",
          "Previous 2 years",
          "Previous month",
          "Previous quarter",
          "Previous week",
          "Previous year",
          "Today",
          "Tomorrow",
          "Yesterday"
        ]
      }
    ],
    "pyLabel": "Compare[date]using[comparator]to[symbolic date]"
  },
  "pyCallParams": {
    "strDate": ".LastModifiedDate",
    "comparator": "is after",
    "symbolicDate": "beginning of this week"
  }
}
```
