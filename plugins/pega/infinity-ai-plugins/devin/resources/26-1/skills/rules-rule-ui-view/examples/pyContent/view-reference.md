---
name: "pyContent entry - ViewReference"
description: "pyContent entry for a plain view reference (Pega-UI-Content-Reference with pyRuleType view). Used to embed another Rule-UI-View inline without a data property binding. Requires $views entry in pxContextMetadata. Do NOT use Pega-UI-Content-Field-Data-Embedded — that is for property-bound embedded data (Page/PageList), not standalone view inclusion."
---

```json
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
```
