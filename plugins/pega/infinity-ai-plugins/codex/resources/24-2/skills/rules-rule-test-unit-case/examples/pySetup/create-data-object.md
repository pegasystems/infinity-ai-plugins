---
name: Create Data Object Setup
description: Use when a PegaUnit test requires a data-object instance before execution; contains a pySetup example.
---

```json
{
  "pySetup": [
    {
      "pxObjClass": "Embed-Testcase-RuleDetails",
      "pyAdditionalDataTransform": "ExampleDataObjectData",
      "pyClassName": "MyOrg-MyApp-Data-MyDataObject",
      "pyLoadOnPageName": "RunRecordPrimaryPage",
      "pyRuleName": "MyOrg-MyApp-Data-MyDataObject",
      "pyRuleType": "Create-Data-Object",
      "pySetupParams": "MyDataObjectIdentifier=\"test-object\"",
      "pyClassKeyValueList": [
        {
          "pxObjClass": "Embed-NameValuePair",
          "pyName": "MyDataObjectIdentifier",
          "pyValue": "\"test-object\""
        }
      ],
      "pyParametersDetails": []
    }
  ]
}
```
