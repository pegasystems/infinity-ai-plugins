---
name: "pzCompareADateTimeToASymbolicDateWrapper"
description: "pzCompareADateTimeToASymbolicDateWrapper: pzCompareADateTimeToASymbolicDateWrapper using [date to be compared (DateTime/String)] [comparator] [symbolic date]"
---

```json
{
  "purpose": "pzCompareADateTimeToASymbolicDateWrapper",
  "pyFunctionData": {
    "pxObjClass": "Embed-UserFunction",
    "pyName": "pzCompareADateTimeToASymbolicDateWrapper",
    "pyCity": "pzCompareADateTimeToASymbolicDateWrapper",
    "pyBaseClass": "Rule-Obj-When",
    "pyClassName": "Work-",
    "pySmartPromptClass": "pyClassName",
    "pySignature": "@(Pega-RulesEngine:DateTimeUtils).pzCompareADateTimeToASymbolicDateWrapper({strDate}, \"{comparator}\", \"{symbolicDate}\")",
    "pyEcho": "pzCompareADateTimeToASymbolicDateWrapper using [date to be compared (DateTime/String)] [comparator] [symbolic date]",
    "pyReturnType": "boolean",
    "pyRuleSet": "Pega-RulesEngine",
    "pyUsage": "java",
    "pyDescription": "Safe wrapper for pxCompareDateTimeToSymbolicDate. Empty inputs evaluate to false, runtime errors caught as false.",
    "pyParameters": [
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "strDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "date to be compared (DateTime/String)",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Param.strDate",
        "pyIsOptional": "false",
        "pyParametersParamValue": ".CreatedDate"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDateComparators",
        "pyIsOptional": "false",
        "pyParametersParamValue": "=",
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
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "symbolic date",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDatePeriod",
        "pyIsOptional": "false",
        "pyParametersParamValue": "Current and next month",
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
        "pyParametersParamValue": "pzCompareADateTimeToASymbolicDateWrapper using"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "1",
        "pyParametersParamName": "strDate",
        "pyParametersParamType": "Freeform",
        "pyParametersParamDesc": "date to be compared (DateTime/String)",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Param.strDate",
        "pyIsOptional": "false",
        "pyReference": "2"
      },
      {
        "pxObjClass": "Embed-MethodParams",
        "pyNodeCaption": "2",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamName": "comparator",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "comparator",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDateComparators",
        "pyIsOptional": "false",
        "pyReference": "3",
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
        "pyNodeCaption": "3",
        "pyHtmlPropertyDropDownValues": "Property",
        "pyParametersParamName": "symbolicDate",
        "pyParametersParamType": "Values",
        "pyParametersParamDesc": "symbolic date",
        "pyParametersParamDropdownValues": "Property",
        "pyParametersParamIntelliValidateAs": "Primary.pySymbolicDatePeriod",
        "pyIsOptional": "false",
        "pyReference": "4",
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
    "pyLabel": "pzCompareADateTimeToASymbolicDateWrapper using[date to be compared (DateTime/String)][comparator][symbolic date]"
  },
  "pyCallParams": {
    "strDate": ".CreatedDate",
    "comparator": "is before",
    "symbolicDate": "end of last month"
  }
}
```
