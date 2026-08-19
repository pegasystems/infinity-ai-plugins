---
name: Data Transform pyProperties APPEND_TO — Existing Page / Page List
description: Append a copy of an existing page, or all pages from another list.
---

**Copy a single existing page:**

```json
{
  "pyActionName": "APPEND_TO",
  "pyPropertiesName": ".TargetList",
  "pyPropertiesValue": ".SourceList(<LAST>)",
  "pyRelationNameAppend": "EXISTING_PAGE",
  "pyProperties": []
}
```

**Append all pages from another list:**

```json
{
  "pyActionName": "APPEND_TO",
  "pyPropertiesName": ".TargetList",
  "pyPropertiesValue": ".SourceList",
  "pyRelationNameAppend": "EXISTING_PAGE_LIST",
  "pyProperties": []
}
```
