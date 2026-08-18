---
name: Copy Data from Data Page
description: Use when a property should copy values from a source data page once. Contains a Page/PageList example using pyDataRetrievalType="AUTOMATICNONREF" (snapshot, not live reference).
---

```json
{
  "pyPropertyName": "LinkedUserStory",
  "pyLabel": "Linked User Story",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPropertyMode": "Page",
  "pyPageClass": "PegaProjMgmt-Work-UserStory",
  "pyDataRetrievalType": "AUTOMATICNONREF",
  "pyDataObject": "D_UserStory",
  "pyDOParamList": [
    {
      "pyName": "pyID",
      "pyValue": ".LinkedUserStory.pyID"
    }
  ]
}
```
