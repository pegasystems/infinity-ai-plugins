---
name: pyDataSourceList entry — GenAI
description: Minimum-viable GenAI source entry. Loads data via a Generative AI connector (Rule-Connect-GenerativeAI). Required field pyConnectorName. Server auto-sets pyLoadActivity to pxCallGenAI.
---

```json
{
  "pyDeclarePagesDataSource": "GenAI",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-AIResult",
  "pyStructure": "page",
  "pyConnectorName": "GetAISuggestions",
  "pyIsRequired": "true"
}
```
