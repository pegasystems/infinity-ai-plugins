---
name: pyDataSourceList entry — ObjOpen
description: Minimum-viable ObjOpen (Lookup) source entry. Retrieves a single record by key. Required fields pyLookupClassName and pyClassKeyValueList. Server auto-sets pyLoadActivity to pxCallObjOpen.
---

```json
{
  "pyDeclarePagesDataSource": "ObjOpen",
  "pySourceWhen": "Always",
  "pyClassName": "Data-Admin-Operator-ID",
  "pyStructure": "page",
  "pyLookupClassName": "Data-Admin-Operator-ID",
  "pyLookupName": "Operator ID",
  "pyClassKeyValueList": [
    {
      "pxObjClass": "Embed-NameValuePair",
      "pyName": "pyUserIdentifier",
      "pyValue": "Param.OperatorID"
    }
  ]
}
```
