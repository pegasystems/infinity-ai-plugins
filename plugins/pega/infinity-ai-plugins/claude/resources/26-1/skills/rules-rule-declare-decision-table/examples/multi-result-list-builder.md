---
name: Multi-Result List Builder
description: Multi-result DT — builds a page list using <APPEND>/<LAST> macros, pyEvaluateAllRows "yes", with pyPagesAndClasses. Condition column filters by region.
---

### create-rule

```json
{
  "pyLabel": "Get Compliance Checks For Region",
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyPurpose": "GetComplianceChecksForRegion",
  "pyDescription": "Builds a list of applicable compliance checks based on case region.",
  "pyDefaultResult": "",
  "pyEvaluateAllRows": "yes",
  "pyDelegatedRestrictions": {
    "default": {
      "pxObjClass": "Embed-Restrictions-FunctionAliases",
      "pyAllowedToReturnValues": "yes",
      "pyAllowedToReturnValuesStr": "true",
      "pyAllowedToChangeRows": "no",
      "pyAllowedToChangeRowsStr": "false",
      "pyAllowedToChangeColumns": "no",
      "pyAllowedToChangeColumnsStr": "false",
      "pyAllowedToChangePropSets": "no",
      "pyAllowedToChangePropSetsStr": "false",
      "pyAllowedToBuildExpressions": "no",
      "pyAllowedToBuildExpressionsStr": "false",
      "pyEvaluateAllRows": "yes",
      "pyEvaluateAllRowsStr": "true"
    }
  },
  "pyColumns": [
    {
      "pyProperty": ".Region",
      "pyPropertyLabel": "Region",
      "pyColumnDataType": "text",
      "pyCondition": ["US", "EU", "US", "EU"]
    }
  ],
  "pyResults": ["", "", "", ""],
  "pyPropertyColumns": [
    {
      "pyProperty": ".ComplianceChecks(<APPEND>).pyCheckName",
      "pyPropertyLabel": "Check Name",
      "pyPropertyValues": ["\"SOX Audit\"", "\"GDPR Review\"", "\"AML Screening\"", "\"DPA Validation\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": ""
    },
    {
      "pyProperty": ".ComplianceChecks(<LAST>).pyCategory",
      "pyPropertyLabel": "Category",
      "pyPropertyValues": ["\"Financial\"", "\"Privacy\"", "\"Financial\"", "\"Privacy\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": ""
    },
    {
      "pyProperty": ".ComplianceChecks(<LAST>).pyRequired",
      "pyPropertyLabel": "Required",
      "pyPropertyValues": ["\"true\"", "\"true\"", "\"true\"", "\"false\""],
      "pyDefaultPropertySetOperator": "=",
      "pyPropSetDefaultValue": "false"
    }
  ],
  "pyDefaultResultPropSet": [
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".ComplianceChecks(<APPEND>).pyCheckName",
      "pyPropertiesValue": ""
    },
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".ComplianceChecks(<LAST>).pyCategory",
      "pyPropertiesValue": ""
    },
    {
      "pxObjClass": "Embed-ModelParams",
      "pyPropertiesName": ".ComplianceChecks(<LAST>).pyRequired",
      "pyPropertiesValue": "false"
    }
  ],
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses",
      "pyPageName": ".ComplianceChecks",
      "pyPageClass": "MyOrg-MyApp-Data-ComplianceCheck"
    }
  ]
}
```

**Pattern notes:**
- `pyEvaluateAllRows: "yes"` — all matching rows contribute to the output list
- Set **both** top-level `pyEvaluateAllRows` and inside `pyDelegatedRestrictions.default` for consistency
- Condition column `.Region` does real filtering — `.Region = "US"` yields 2 checks (SOX Audit, AML Screening), `.Region = "EU"` yields 2 different checks (GDPR Review, DPA Validation)
- First property column uses `<APPEND>` to create a new page per matching row
- Subsequent columns use `<LAST>` to set properties on the last-appended page
- `pyResults` is all-empty — property columns carry all the data
- `pyPagesAndClasses` declares the page list class mapping (required for `<APPEND>`/`<LAST>`)
- `pyDefaultResultPropSet` mirrors `pyPropertyColumns` with fallback values
