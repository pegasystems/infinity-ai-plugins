---
name: Data Transform pyProperties APPEND_TO — Current Source Page
description: Append the currently iterated page to a target list. Used inside FOR_EACH_PAGE_IN loops.
---

```json
{
  "pyActionName": "FOR_EACH_PAGE_IN",
  "pyPropertiesName": ".SourceList",
  "pyUpdateSourceContext": "true",
  "pyExpanded": "true",
  "pyProperties": [
    {
      "pyActionName": "APPEND_TO",
      "pyPropertiesName": ".FilteredList",
      "pyRelationNameAppend": "CURRENT_SOURCE_PAGE",
      "pyProperties": []
    }
  ]
}
```
