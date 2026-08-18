---
name: "SemanticLink"
description: "pxViewMetadata-only children entry for a SemanticLink component inside a readonly DataReference view. Renders the associated record as a clickable navigation link with hover preview. Requires dotted property paths in pxContextMetadata.$properties. No pyContent equivalent exists."
---

```json
{
  "type": "SemanticLink",
  "config": {
    "label": "@L Service account",
    "caseClass": "MyCo-MyApp-Data-ServiceAccount",
    "contextPage": "@P .ServiceAccount",
    "text": "@P .ServiceAccount.Name",
    "caseID": "@P .ServiceAccount.ServiceAccountID",
    "caseLabel": "@P .ServiceAccount.pyLabel",
    "previewKey": "@P .ServiceAccount.pzInsKey",
    "resourceParams": {
      "workID": "@P .ServiceAccount.ServiceAccountID"
    },
    "resourcePayload": {
      "caseClassName": "MyCo-MyApp-Data-ServiceAccount"
    }
  }
}
```
