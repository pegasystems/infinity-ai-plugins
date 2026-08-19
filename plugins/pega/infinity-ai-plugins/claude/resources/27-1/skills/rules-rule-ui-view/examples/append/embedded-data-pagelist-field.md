---
name: "Append Embedded Data PageList Field"
description: "Three-surface update-rule payload that appends a PageList embedded data field delegated to a SimpleTable sub-view. Uses `authorContext` (not `context`). The `$views` entry does NOT include a `context` property for PageList delegation (only Page inline forms include it). pxViewMetadata and pxContextMetadata are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
---

```json
{
  "updates": {
    "pyContent": [
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "Fields",
        "pyPromptClass": "MyCo-MyApp-Data-PartyData",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {},
          {
            "pxObjClass": "Pega-UI-Content-Field-Data-Embedded",
            "pyComponentName": "reference",
            "pyFieldReference": "AddressList",
            "pyLabel": ".AddressList",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Data-PartyData",
            "pyRuleName": "AddressData_AddressList_1",
            "pyRuleType": "view",
            "pyType": "PageList",
            "pyClassContext": "MyCo-MyApp-Data-Address",
            "pyJsonConfig": "{\"authorContext\":\".AddressList\"}"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"reference\",\"config\":{\"authorContext\":\".AddressList\",\"inheritedProps\":[{\"prop\":\"label\",\"value\":\"@FL .AddressList\"}],\"name\":\"AddressData_AddressList_1\",\"ruleClass\":\"MyCo-MyApp-Data-PartyData\",\"type\":\"view\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".Name\"],\"$fields\":[{\"name\":\".Name\"}],\"$views\":[{\"name\":\"AddressData_AddressList_1\",\"ruleClass\":\"MyCo-MyApp-Data-PartyData\"}]}"
  }
}
```
