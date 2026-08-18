---
name: "Append View Reference"
description: "Three-surface update-rule payload that appends a plain view reference. Shows the update pattern with {} no-op placeholders. Unlike Embedded Data fields, a view reference does not bind through a data property — it simply includes another Rule-UI-View inline. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending. See pyContent/ and pxViewMetadata/ for other field types."
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
          {},
          {
            "pxObjClass": "Pega-UI-Content-Reference",
            "pyComponentName": "reference",
            "pyDisplayLabel": "reference",
            "pyClassContext": "MyCo-MyApp-Work-Case",
            "pyJsonConfig": "{}",
            "pyLabel": "Primary Fields",
            "pyHeadingOption": "text",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyRuleName": "pyPrimaryFields",
            "pyRuleType": "view",
            "pyShowHeading": "true"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{},{\"type\":\"reference\",\"config\":{\"inheritedProps\":[{\"prop\":\"label\",\"value\":\"@L Primary Fields\"},{\"prop\":\"showLabel\",\"value\":true}],\"name\":\"pyPrimaryFields\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"type\":\"view\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".CaseName\",\".Status\"],\"$fields\":[{\"name\":\".CaseName\"},{\"name\":\".Status\"}],\"$views\":[{\"name\":\"pyPrimaryFields\",\"ruleClass\":\"MyCo-MyApp-Work-Case\"}]}"
  }
}
```
