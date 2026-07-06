---
name: Refer to Data Page
description: Use when a property should stay linked to a source data page. Contains a Page/PageList example using pyDataRetrievalType="AUTOMATIC" (live reference, not snapshot).
---

```json
{
  "pyPropertyName": "LinkedEnhancement",
  "pyLabel": "Linked Enhancement",
  "pyClassName": "PegaProjMgmt-Work-Bug",
  "pyPropertyMode": "Page",
  "pyPageClass": "PegaProjMgmt-Work-Enhancement",
  "pyDataRetrievalType": "AUTOMATIC",
  "pyDataObject": "D_Enhancement",
  "pyDOParamList": [
    {
      "pyName": "pyID",
      "pyValue": ".LinkedEnhancement.pyID"
    }
  ]
}
```
