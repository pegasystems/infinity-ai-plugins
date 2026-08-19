---
name: "Append Embedded Data Field"
description: "Three-surface update-rule payload that appends a Page embedded data field rendered as an inline form. Uses `context` (not `authorContext`) — this is the standard Page pattern. For PageList (SimpleTable delegation), see append/embedded-data-pagelist-field. pxViewMetadata and pxContextMetadata are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
---

```json
{
  "updates": {
    "pyContent": [
      {
        "pxObjClass": "Pega-UI-Content-Region",
        "pyName": "Fields",
        "pyPromptClass": "MyCo-MyApp-Work-Case",
        "pyComponentName": "Region",
        "pyDisplayLabel": "Region",
        "pyContent": [
          {},
          {
            "pxObjClass": "Pega-UI-Content-Field-Data-Embedded",
            "pyComponentName": "reference",
            "pyFieldReference": "Address",
            "pyLabel": "Shipping Address",
            "pyLabelOption": "text",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyRuleName": "AddressData_Address_1",
            "pyRuleType": "view",
            "pyType": "Page",
            "pyClassContext": "MyCo-MyApp-Data-Address",
            "pyJsonConfig": "{\"context\":\".Address\"}"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"reference\",\"config\":{\"context\":\".Address\",\"inheritedProps\":[{\"prop\":\"label\",\"value\":\"@L Shipping Address\"}],\"name\":\"AddressData_Address_1\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"type\":\"view\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\"],\"$fields\":[{\"name\":\".CaseName\"}],\"$views\":[{\"name\":\"AddressData_Address_1\",\"context\":\".Address\",\"ruleClass\":\"MyCo-MyApp-Work-Case\"}]}"
  }
}
```
