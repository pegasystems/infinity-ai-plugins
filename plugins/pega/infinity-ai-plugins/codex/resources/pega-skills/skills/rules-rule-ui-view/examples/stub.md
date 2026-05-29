---
name: Stub Rule-UI-View
description: Minimal Rule-UI-View payload with one region and one text field.
---

**Before submitting this payload**, verify every referenced property exists:

```
list-rules(ruleType="Rule-Obj-Property", className="MyCo-MyApp-Work-Case", ruleName="CaseName")
```

If the result is empty, create the property first using `skills/rules-rule-obj-property`
(schema and examples for `Rule-Obj-Property` creation). Do not proceed with view
creation until every backing property is confirmed.

---

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "MySimpleView",
  "pyLabel": "My Simple View",
  "pyClassName": "MyCo-MyApp-Work-Case",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DefaultForm",
  "pyContent": [
    {
      "pxObjClass": "Pega-UI-Content-Region",
      "pyName": "Fields",
      "pyPromptClass": "MyCo-MyApp-Work-Case",
      "pyComponentName": "Region",
      "pyDisplayLabel": "Region",
      "pyContent": [
        {
          "pxObjClass": "Pega-UI-Content-Field-Text",
          "pyComponentName": "TextInput",
          "pyFieldReference": "CaseName",
          "pyLabel": ".CaseName",
          "pyLabelOption": "field",
          "pyPromptClass": "MyCo-MyApp-Work-Case",
          "pyValue": ".CaseName",
          "pyValueWithoutAnnotation": ".CaseName"
        }
      ]
    }
  ],
  "pxViewMetadata": "{\"name\":\"MySimpleView\",\"type\":\"View\",\"config\":{\"template\":\"DefaultForm\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"localeReference\":\"@LR MYCO-MYAPP-WORK-CASE!VIEW!MYSIMPLEVIEW\"},\"children\":[{\"name\":\"Fields\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .CaseName\",\"label\":\"@FL .CaseName\"}}]}]}",
  "pxContextMetadata": "{\"$properties\":[\".CaseName\"]}"
}
```
