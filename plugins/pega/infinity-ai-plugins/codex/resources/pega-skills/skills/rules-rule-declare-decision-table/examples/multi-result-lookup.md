---
name: Multi-Result Lookup Table
description: Multi-result DT — 1 condition column maps to 3 output property columns, first-match, no page list macros.
---

### create-rule

```json
{
  "pyLabel": "Get Locale Date Formats",
  "pyClassName": "MyOrg-MyApp-Data-ImportConfig",
  "pyPurpose": "GetLocaleDateFormats",
  "pyDescription": "Maps locale code to date, datetime, and time format strings.",
  "pyDefaultResult": "",
  "pyColumns": [
    {
      "pyProperty": ".pyLocale",
      "pyPropertyLabel": "Locale",
      "pyColumnDataType": "text",
      "pyCondition": ["en_US", "en_GB", "de_DE", "fr_FR", "ja_JP"]
    }
  ],
  "pyResults": ["", "", "", "", ""],
  "pyPropertyColumns": [
    {
      "pyProperty": ".pyDateFormat",
      "pyPropertyLabel": "Date Format",
      "pyPropertyValues": ["\"M/d/yyyy\"", "\"dd/MM/yyyy\"", "\"dd.MM.yyyy\"", "\"dd/MM/yyyy\"", "\"yyyy/MM/dd\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": "M/d/yyyy"
    },
    {
      "pyProperty": ".pyDateTimeFormat",
      "pyPropertyLabel": "DateTime Format",
      "pyPropertyValues": ["\"M/d/yyyy H:mm\"", "\"dd/MM/yyyy HH:mm\"", "\"dd.MM.yyyy HH:mm\"", "\"dd/MM/yyyy HH:mm\"", "\"yyyy/MM/dd H:mm\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": "M/d/yyyy H:mm"
    },
    {
      "pyProperty": ".pyTimeFormat",
      "pyPropertyLabel": "Time Format",
      "pyPropertyValues": ["\"h:mm:ss a\"", "\"HH:mm:ss\"", "\"HH:mm:ss\"", "\"HH:mm:ss\"", "\"H:mm:ss\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": "h:mm:ss a"
    }
  ],
  "pyDefaultResultPropSet": [
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".pyDateFormat",
      "pyPropertiesValue": "M/d/yyyy"
    },
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".pyDateTimeFormat",
      "pyPropertiesValue": "M/d/yyyy H:mm"
    },
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".pyTimeFormat",
      "pyPropertiesValue": "h:mm:ss a"
    }
  ]
}
```

**Pattern notes:**
- `pyResults` is all-empty — property columns carry all the output
- `pyPropertyValues` use embedded quotes (`"\"M/d/yyyy\""`) for literal string values
- `pyPropSetDefaultValue` on each property column provides the US-locale fallback
- `pyDefaultResultPropSet` parallels `pyPropertyColumns` — one entry per column
- No `pyPagesAndClasses` needed (sets properties on current page, not a page list)
- First-match evaluation (default `pyEvaluateAllRows: "no"`)
