---
name: Stub When Rule
description: Minimal When rule — smallest valid create payload, always evaluates to true. Use as a starting template for new When rules before adding real conditions.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleName": "MyWhenRule",
  "pyBlockName": "MyWhenRule",
  "pyLabel": "My When Rule",
  "pyRuleAvailable": "Yes",
  "pyLogic": "A",
  "pyCondition": [
    {
      "pyConditionLabel": "A",
      "pyConditionFieldName": "",
      "pyConditionOperation": "=",
      "pyConditionValue1": "true",
      "pyConditionValue1Purpose": "1FreeFormExpressionBoolean",
      "pyConditionValue1String": "true ",
      "pyConditionValue1StringLabel": "[expression evaluates to true]",
      "pyCallParams": {
        "expression": "true"
      },
      "pyFunctionData": {
        "pyName": "1FreeFormExpressionBoolean",
        "pyCity": "1FreeFormExpressionBoolean",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "{expression}",
        "pyEcho": "[expression evaluates to true]",
        "pyLabel": "[expression evaluates to true]",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {
            "pyParametersParamName": "expression",
            "pyParametersParamType": "HTMLProperty",
            "pyParametersParamDesc": "expression evaluates to true",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
            "pyParametersParamValue": "true",
            "pxPages": {
              "HtmlPropPage": {
                "pxSubscript": "HtmlPropPage",
                "pyExpressionBuilder": "true"
              }
            }
          }
        ],
        "pyUIParameters": [
          {
            "pyNodeCaption": "1",
            "pyParametersParamName": "expression",
            "pyParametersParamType": "HTMLProperty",
            "pyParametersParamDesc": "expression evaluates to true",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "Primary.pyExpressionBuilder",
            "pyParametersParamValue": "",
            "pyReference": "1"
          }
        ]
      }
    }
  ]
}
```

## Notes

- `pyClassName` on `pyFunctionData` MUST match the rule's Applies-To class (`pyClassName` at top level). The library default `"Work-"` is a placeholder; replace it with the real class so smart-prompt property pickers in the rule form scope correctly.
- `HTMLProperty` params with a populated value require the nested `pxPages.HtmlPropPage` sibling shown above.
- `pyParametersParamValue` on `pyUIParameters` input rows must be `""` — only the mirrored `pyParameters` entry carries the authored value.
