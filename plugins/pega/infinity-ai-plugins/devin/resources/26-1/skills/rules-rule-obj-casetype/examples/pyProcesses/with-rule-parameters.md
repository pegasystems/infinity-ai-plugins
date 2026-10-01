---
name: With Rule Parameters
description: Process declaring its parameter interface via pzRuleParameters (name, type, description, required flag). pyCallParams supplies the values; pzRuleParameters describes the contract.
---

```json
{
  "pxFlowID": "FLOW0",
  "pyFlowName": "DataSync",
  "pyLabel": "ADM Export",
  "pyStartType": "PARALLEL",
  "pySkipOrAllowType": "always",
  "pyCallParams": {
    "DataSyncType": "ADM",
    "Operation": "export"
  },
  "pzRuleParameters": [
    {
      "pyParametersParamName": "DataSyncType",
      "pyParametersParamType": "STRING",
      "pyParametersParamDesc": "Type of data sync operation (ADM, IH, etc.)",
      "pyParametersParamReq": "1"
    },
    {
      "pyParametersParamName": "Operation",
      "pyParametersParamType": "STRING",
      "pyParametersParamDesc": "Direction of sync: export or import",
      "pyParametersParamReq": "1"
    }
  ]
}
```
