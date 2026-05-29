---
name: "FieldGroup Table View"
description: "Full create payload for a SimpleTable multi-record list displayed as a FieldGroup (stacked card layout) instead of an inline table. Uses multiRecordDisplayAs 'fieldGroup' — same column definitions as table mode but rendered as stacked cards."
---

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "OrderDetails_LineItems",
  "pyLabel": "Order Details - Line Items",
  "pyClassName": "MyCo-MyApp-Work-Order",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "SimpleTable",
  "pxViewType": "multirecordlist",
  "pyJsonConfig": "{\"type\":\"multirecordlist\",\"contextClass\":\"MyCo-MyApp-Data-LineItem\",\"referenceList\":\"@P .LineItems\",\"targetClassLabel\":\"@L Line Item\",\"heading\":\"@L Line Items\",\"name\":\"LineItems\",\"renderMode\":\"Editable\",\"multiRecordDisplayAs\":\"fieldGroup\",\"parentClass\":\"MyCo-MyApp-Work-Order\",\"dataRetrievalType\":\"MANUAL\",\"propertyLabel\":\"@L Line Items\",\"children\":[{\"name\":\"Columns\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .Description\",\"label\":\"@FL .Description\",\"labelOption\":\"default\"}},{\"type\":\"Decimal\",\"config\":{\"value\":\"@P .Quantity\",\"label\":\"@FL .Quantity\",\"labelOption\":\"default\"}},{\"type\":\"Currency\",\"config\":{\"value\":\"@P .UnitPrice\",\"label\":\"@FL .UnitPrice\",\"labelOption\":\"default\",\"currencyISOCode\":\"@P .Currency\",\"isoCodeSelection\":\"propertyRef\",\"allowDecimals\":true}}]}],\"editMode\":\"modal\",\"editModeConfig\":{\"defaultView\":\"Create\",\"editType\":\"action\",\"defaultAction\":\"pyEdit\",\"useSeparateActionForEdit\":false},\"tableFormat\":\"simple\"}",
  "pxViewMetadata": "{\"name\":\"OrderDetails_LineItems\",\"type\":\"View\",\"config\":{\"type\":\"multirecordlist\",\"contextClass\":\"MyCo-MyApp-Data-LineItem\",\"referenceList\":\"@P .LineItems\",\"targetClassLabel\":\"@L Line Item\",\"heading\":\"@L Line Items\",\"name\":\"LineItems\",\"ruleClass\":\"MyCo-MyApp-Work-Order\",\"renderMode\":\"Editable\",\"multiRecordDisplayAs\":\"fieldGroup\",\"template\":\"SimpleTable\",\"parentClass\":\"MyCo-MyApp-Work-Order\",\"dataRetrievalType\":\"MANUAL\",\"propertyLabel\":\"@L Line Items\",\"localeReference\":\"@LR MYCO-MYAPP-WORK-ORDER!VIEW!ORDERDETAILS_LINEITEMS\",\"children\":[{\"name\":\"Columns\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .Description\",\"label\":\"@FL .Description\",\"labelOption\":\"default\"}},{\"type\":\"Decimal\",\"config\":{\"value\":\"@P .Quantity\",\"label\":\"@FL .Quantity\",\"labelOption\":\"default\"}},{\"type\":\"Currency\",\"config\":{\"value\":\"@P .UnitPrice\",\"label\":\"@FL .UnitPrice\",\"labelOption\":\"default\",\"currencyISOCode\":\"@P .Currency\",\"isoCodeSelection\":\"propertyRef\",\"allowDecimals\":true}}]}],\"editMode\":\"modal\",\"editModeConfig\":{\"defaultView\":\"Create\",\"editType\":\"action\",\"defaultAction\":\"pyEdit\",\"useSeparateActionForEdit\":false},\"tableFormat\":\"simple\"}}",
  "pxContextMetadata": "{\"$properties\":[],\"$classesmetadata\":[{\"name\":\"MyCo-MyApp-Data-LineItem\",\"fetchDefaultDataSources\":true}],\"$pagelists\":[{\"$associated\":[],\"$properties\":[\".Description\",\".Quantity\",\".UnitPrice\",\".Currency\"],\"$actions\":[{\"name\":\"pyEdit\"}],\"pagelist\":\".LineItems\",\"$fields\":[{\"name\":\".Description\"},{\"name\":\".Quantity\"},{\"name\":\".UnitPrice\"},{\"name\":\".Currency\"}]}],\"$fields\":[],\"$views\":[],\"$associated\":[],\"$insights\":[],\"$genAICoaches\":[],\"$AIAgents\":[],\"$attachments\":[],\"$widgets\":[],\"$addresses\":[],\"$users\":[],\"$whens\":[],\"$paragraphs\":[]}"
}
```
