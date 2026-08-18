---
name: Pre-Processing Data Transform
description: Flow action that uses a pre-processing data transform (pyPreProcessingTransformRule) to initialize or populate fields before the form is displayed to the user.
---

```json
{
  "pyActionName": "EnterShippingDetails",
  "pyLabel": "Enter Shipping Details",
  "pyDescription": "Prepopulates shipping address from customer profile before user edits.",
  "pyClassName": "MyOrg-MyApp-Work-Order",
  "pyUsedAs": "LOCALACTION",
  "pyViewReference": "EnterShippingDetails",
  "pySectionReference": "",
  "pyIsUsingDesignTemplate": "true",
  "pyAllowRuntimeEdit": "true",
  "pyPreProcessingTransformRule": "PrePopulateShippingAddress",
  "pyAuditActivity": "Audit",
  "pyClientValidation": "true",
  "pyNextAssignment": "true",
  "pyConfirmHarness": "Confirm",
  "pyconfirmchoice": "ShowHarness",
  "pyContainerType": "NOHEADER"
}
```
