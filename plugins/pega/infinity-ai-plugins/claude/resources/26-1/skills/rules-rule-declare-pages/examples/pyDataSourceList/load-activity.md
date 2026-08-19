---
name: pyDataSourceList entry — LoadActivity
description: Minimum-viable load-activity source entry. Use when load logic cannot be expressed as a data transform. Required field pyLoadActivity.
---

```json
{
  "pyDeclarePagesDataSource": "LoadActivity",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-Config",
  "pyStructure": "page",
  "pyLoadActivity": "LoadSystemConfig",
  "pyPassCurrentParamPageForActivity": "true"
}
```
