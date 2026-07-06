---
name: pyDataSourceList entry — KnowledgeBuddy
description: Minimum-viable Knowledge Buddy source entry. Queries a Knowledge Buddy for AI-powered responses. Required field pyKBName. Optional pyKBQuery, pyKBQueryJSON, pyKBResponse. Server auto-sets pyLoadActivity to pxCallKnowledgeBuddy.
---

```json
{
  "pyDeclarePagesDataSource": "KnowledgeBuddy",
  "pySourceWhen": "Always",
  "pyClassName": "MyOrg-MyApp-Data-KBResult",
  "pyStructure": "page",
  "pyKBName": "ProductKnowledgeBuddy",
  "pyKBQuery": "Param.QueryText",
  "pyKBQueryJSON": "",
  "pyKBResponse": ".pyResponseData",
  "pyConnectorName": "MyGenAIConnector",
  "pyIsRequired": "true"
}
```
