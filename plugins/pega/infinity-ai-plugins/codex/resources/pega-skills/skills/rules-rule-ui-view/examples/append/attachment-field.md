---
name: "Append Attachment Field"
description: "Three-surface update-rule payload that appends an Attachment field. Uses @ATTACHMENT annotation (not @P) in pxViewMetadata. Requires $attachments entry in pxContextMetadata — the attachment property does NOT go in $properties. Set allowMultiple and multiple to true for multi-file upload. pxViewMetadata and pxContextMetadata shown here are FRAGMENTS — fetch the current view with get-rule(detail='full'), merge these entries into the full fetched JSON, then JSON.stringify the complete object before sending."
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
            "pxObjClass": "Pega-UI-Content-Field-Attachment",
            "pyComponentName": "Attachment",
            "pyDisplayLabel": "Attachment",
            "pyFieldReference": "EvidenceFile",
            "pyLabel": ".EvidenceFile",
            "pyLabelOption": "field",
            "pyPromptClass": "MyCo-MyApp-Work-Case",
            "pyValue": ".EvidenceFile",
            "pyValueWithoutAnnotation": ".EvidenceFile",
            "pyType": "Page",
            "pyJsonConfig": "{\"allowMultiple\":\"false\"}"
          }
        ]
      }
    ],
    "pxViewMetadata": "{\"children\":[{\"children\":[{},{\"type\":\"Attachment\",\"config\":{\"allowMultiple\":\"false\",\"label\":\"@FL .EvidenceFile\",\"labelOption\":\"default\",\"value\":\"@ATTACHMENT .EvidenceFile\"}}]}]}",
    "pxContextMetadata": "{\"$properties\":[\".ExistingProp\"],\"$attachments\":[{\"name\":\".EvidenceFile\",\"multiple\":false}],\"$fields\":[{\"name\":\".ExistingProp\"}]}"
  }
}
```
