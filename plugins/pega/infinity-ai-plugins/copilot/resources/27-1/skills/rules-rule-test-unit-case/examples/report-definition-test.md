---
name: Report Definition Test (Complex Test with Setup/Cleanup)
description: Tests a report definition with List assertion, setup/cleanup activities, setup pages, RUT parameters, and pages-and-classes. The setup/cleanup, pySetupPages, pyPagesAndClasses, and pyParameters patterns shown here are RUT-type-agnostic -- they work the same for activities, data transforms, data pages, etc. Based on real TC_VerifyNavigationList test case.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Data-MyClass",
  "pyPurpose": "TC_VerifyReportResults",
  "pyLabel": "Verify Report Results",
  "pyDescription": "Run and verify MyReportDefinition report definition with following parameters, <FilterClass : Data-Portal>",
  "pyTemporaryObject": "true",
  "pyClipboardPageSelected": "SourcePage",
  "pySelectedPageName": "ResultsList",
  "pySelectedPageNameForDisplay": "ResultsList",
  "pyColor": "ResultsList",
  "pyAddedClassName": "Code-Pega-List",
  "pyCleanUpTestData": "true",
  "pyTypeOfSetupPageSelection": "CLIPBOARDPAGES",
  "pyRuleUnderTest": {
    "pyTempText": "pyNewResults",
    "pyDetails": {
      "pyRuleUnderTestInsName": "MYORG-MYAPP-DATA-MYCLASS!MYREPORTDEFINITION",
      "pyRuleUnderTestName": "MyReportDefinition",
      "pyRuleUnderTestObjClass": "MyOrg-MyApp-Data-MyClass",
      "pyRuleUnderTestType": "Rule-Obj-Report-Definition"
    },
    "pyParameters": [
      {
        "pyParametersParamDesc": "Filter class",
        "pyParametersParamName": "FilterClass",
        "pyParametersParamType": "Text",
        "pyParametersParamValue": "\"Data-Portal\""
      }
    ]
  },
  "pyPagesAndClasses": [
    {
      "pyPagesAndClassesPage": "ResultsList",
      "pyPagesAndClassesClass": "Code-Pega-List"
    },
    {
      "pyPagesAndClassesPage": "ResultsList.pxResults",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-MyClass"
    }
  ],
  "pySetup": [
    {
      "pyClassName": "MyOrg-MyApp-Data-MyClass",
      "pyRuleName": "SetupTestData",
      "pyRuleType": "Rule-Obj-Activity",
      "pySetupParams": "filterClass=\"Data-Portal\"",
      "pzHasAtleastOneParameterValue": "true",
      "pyParametersDetails": [
        {
          "pyParametersParamName": "filterClass",
          "pyParametersParamReq": "0",
          "pyParametersParamValue": "\"Data-Portal\""
        }
      ]
    }
  ],
  "pySetupPages": [
    {
      "pySetupPageName": "SourcePage",
      "pyPageDetails": {
        "pxObjClass": "MyOrg-MyApp-Data-MyClass",
        "pyClassName": "Data-Portal",
        "pyLabel": "TestPortal",
        "pyPurpose": "TestPortal",
        "pyRuleName": "TestPortal",
        "pyRuleAvailable": "Yes"
      }
    }
  ],
  "pyCleanup": [
    {
      "pyClassName": "MyOrg-MyApp-Data-MyClass",
      "pyRuleName": "CleanUpTestData",
      "pyRuleType": "Rule-Obj-Activity",
      "pyRuleTypeCleanUp": "Rule-Obj-Activity",
      "pySetupParams": "None"
    }
  ],
  "pyExpectedResults": [
    {
      "pyAssertionType": "List",
      "pyCardApplyToClass": "Code-Pega-List",
      "pyDisableDelete": "false",
      "pyListContext": ".pxResults",
      "pyNumberOfAppearances": "InAnyInstance",
      "pyPropertyApplyToClass": "MyOrg-MyApp-Data-MyClass",
      "pyStepPageClass": "Code-Pega-List",
      "pyStepPageMethodName": "PageExpression_1_1",
      "pyStepPageName": "ResultsList",
      "pyStepPageNameActual": "pyReportContentPage",
      "pyExpectedResults": [
        {
          "pyAssertionType": "Property",
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"TestPortal\"",
          "pyPropertyName": "pyLabel",
          "pyPropertyRealName": "pyLabel",
          "pyPropertyAbsolutePath": ".pyLabel",
          "pyPropertyMode": "Text",
          "pyPropertyApplyToClass": "MyOrg-MyApp-Data-MyClass",
          "pyClassName": "MyOrg-MyApp-Data-MyClass",
          "pyPageName": "ResultsList",
          "pzListObjectClass": "MyOrg-MyApp-Data-MyClass"
        },
        {
          "pyAssertionType": "Property",
          "pyComparator": "Is Equals To",
          "pyExpectedValue": "\"TestPortal\"",
          "pyPropertyName": "pyPurpose",
          "pyPropertyRealName": "pyPurpose",
          "pyPropertyAbsolutePath": ".pyPurpose",
          "pyPropertyMode": "Text",
          "pyPropertyApplyToClass": "MyOrg-MyApp-Data-MyClass",
          "pyClassName": "MyOrg-MyApp-Data-MyClass",
          "pyPageName": "ResultsList",
          "pzListObjectClass": "MyOrg-MyApp-Data-MyClass"
        }
      ]
    }
  ]
}
```
