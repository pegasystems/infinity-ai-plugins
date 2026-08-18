---
name: Parameter Lookup
description: 1 column (Param.Name reference), 4 rows, parameter-based lookup.
---

### create-rule

```json
{
  "pyLabel": "Estimate Hours By Entity Type",
  "pyClassName": "MyOrg-MyApp-Data-MyDataType",
  "pyPurpose": "EstimateHoursByEntityType",
  "pyDescription": "Looks up estimated hours based on entity type parameter.",
  "pyDefaultResult": "0",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "EntityType",
      "pyParametersParamDesc": "",
      "pyParametersParamType": "Text"
    }
  ],
  "pyColumns": [
    {
      "pyProperty": "Param.EntityType",
      "pyPropertyLabel": "Entity Type",
      "pyColumnDataType": "text",
      "pyCondition": ["Stage", "Data object", "Attachment", "Channel"]
    }
  ],
  "pyResults": ["12", "60", "2", "20"]
}
```
