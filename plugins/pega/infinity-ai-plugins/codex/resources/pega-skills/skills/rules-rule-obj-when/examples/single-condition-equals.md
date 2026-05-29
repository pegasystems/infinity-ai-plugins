---
name: Single Condition Equals
description: When rule with a single string equality condition — compares a property to a literal value using CompareTwoValues.
---

```json
{
  "pyClassName": "MyOrg-MyApp-Work-MyCase",
  "pyRuleName": "IsHighPriority",
  "pyBlockName": "IsHighPriority",
  "pyLabel": "Is High Priority",
  "pyDescription": "True when priority is High",
  "pyRuleAvailable": "Yes",
  "pyLogic": "A",
  "pyCondition": [
    {
      "pyConditionLabel": "A",
      "pyConditionFieldName": ".Priority",
      "pyConditionOperation": "=",
      "pyConditionValue1": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues(.Priority, \"=\", \"High\")",
      "pyConditionValue1Purpose": "CompareTwoValues",
      "pyConditionValue1String": ".Priority = \"High\" ",
      "pyConditionValue1StringLabel": "[first value][relation][second value]",
      "pyCallParams": {
        "lValue": ".Priority",
        "comparator": "=",
        "rValue": "\"High\""
      },
      "pyFunctionData": {
        "pyName": "CompareTwoValues",
        "pyCity": "CompareTwoValues",
        "pyBaseClass": "Rule-Obj-When",
        "pyClassName": "MyOrg-MyApp-Work-MyCase",
        "pySmartPromptClass": "pyClassName",
        "pySignature": "@(Pega-RULES:ExpressionEvaluators).compareTwoValues({lValue}, \"{comparator}\", {rValue})",
        "pyEcho": "[first value] [relation] [second value]",
        "pyLabel": "[first value][relation][second value]",
        "pyReturnType": "boolean",
        "pyRuleSet": "Pega-RULES",
        "pyUsage": "java",
        "pyParameters": [
          {
            "pyParametersParamName": "lValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "first value",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "30",
            "pyParametersParamValue": ".Priority",
            "pyIsOptional": "false"
          },
          {
            "pyParametersParamName": "comparator",
            "pyParametersParamType": "Values",
            "pyParametersParamDesc": "relation",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators",
            "pyParametersParamValue": "=",
            "pyIsOptional": "false"
          },
          {
            "pyParametersParamName": "rValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "second value",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "30",
            "pyParametersParamValue": "\"High\"",
            "pyIsOptional": "false"
          }
        ],
        "pyUIParameters": [
          {
            "pyNodeCaption": "1",
            "pyParametersParamName": "lValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "first value",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "30",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "1"
          },
          {
            "pyNodeCaption": "2",
            "pyParametersParamName": "comparator",
            "pyParametersParamType": "Values",
            "pyParametersParamDesc": "relation",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "primary.pySymbolComparators",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "2"
          },
          {
            "pyNodeCaption": "3",
            "pyParametersParamName": "rValue",
            "pyParametersParamType": "Freeform",
            "pyParametersParamDesc": "second value",
            "pyParametersParamDropdownValues": "Property",
            "pyParametersParamIntelliValidateAs": "30",
            "pyParametersParamValue": "",
            "pyIsOptional": "false",
            "pyReference": "3"
          }
        ]
      }
    }
  ]
}
```

## Notes

- Replace `pyFunctionData.pyClassName` with your rule's actual Applies-To class — it must match the top-level `pyClassName`. The library carries `"Work-"` as a placeholder default.
- `pyAllowedValues` is intentionally absent — it was never present in live `Rule-Obj-When` instances and the form does not require it. Allowed comparator symbols are conveyed via `pyParametersParamIntelliValidateAs: "primary.pySymbolComparators"`.
- `pyConditionValue1StringLabel` is the un-rendered template (matches `pyFunctionData.pyLabel`); the server returns this form even if you submit a rendered variant.
- `pyParametersParamValue` is empty on every `pyUIParameters` input row. The compiler reads values only from the mirrored `pyParameters` entry.
