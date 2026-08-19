---
name: Property Assertion on a Custom Page
description: Property assertion targeting a named page created by the rule under test (not RunRecordPrimaryPage). Requires pyPagesAndClasses to declare the page. Use this pattern when the activity writes to a page created by Page-New or any page other than the primary page.
---

```json
{
  "pyAssertionType": "Property",
  "pyStepPageClass": "MyOrg-MyApp-Data-MyClass",
  "pyStepPageMethodName": "PageExpression_1",
  "pyStepPageName": "myPageName",
  "pyExpectedResults": [
    {
      "pyAssertionType": "Property",
      "pyComparator": "Is Equals To",
      "pyExpectedValue": "\"ExpectedTextValue\"",
      "pyPropertyName": "pyLabel",
      "pyPropertyRealName": "pyLabel",
      "pyPropertyAbsolutePath": ".pyLabel",
      "pyPropertyMode": "Text",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Data-MyClass",
      "pyClassName": "MyOrg-MyApp-Data-MyClass",
      "pyPageName": "myPageName",
      "pzListObjectClass": "MyOrg-MyApp-Data-MyClass"
    }
  ]
}
```

```json
"pyPagesAndClasses": [
  {
    "pyClassName": "MyOrg-MyApp-Data-MyClass",
    "pyPageName": "myPageName"
  }
]
```
