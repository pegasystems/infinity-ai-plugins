---
name: ListView (Worklist / Case Type List)
description: Full create payload for a ListView worklist view — table-based list backed by a data page with personalization, grouping, search, and column definitions.
---

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "TaskWorklist",
  "pyLabel": "Task Worklist",
  "pyDescription": "Worklist view showing tasks with priority and due date",
  "pyClassName": "MyCo-MyApp-Work-Task",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "ListView",
  "pxViewType": "casetypelist",
  "pyDefaultHeading": "Task Worklist",
  "pySchemaVersion": "3",
  "pyJsonConfig": "{\"title\":\"@L Task Worklist\",\"type\":\"casetypelist\",\"referenceList\":\"D_pyMyWorkList\",\"personalization\":true,\"grouping\":true,\"globalSearch\":true,\"reorderFields\":true,\"toggleFieldVisibility\":true,\"personalizationId\":\"a1b2c3d4e5f6789012345678abcdef01\",\"caseTypeReference\":\"MyCo-MyApp-Work-Task\",\"presets\":[{\"name\":\"presets\",\"label\":\"@L All tasks\",\"template\":\"Table\",\"config\":{},\"children\":[{\"name\":\"Columns\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyID\",\"label\":\"@L Case ID\",\"fillAvailableSpace\":false,\"displayAsLink\":true}},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyLabel\",\"label\":\"@L Label\",\"fillAvailableSpace\":true,\"displayAsLink\":true}},{\"type\":\"Dropdown\",\"config\":{\"value\":\"@P .Priority\",\"label\":\"@L Priority\",\"fillAvailableSpace\":false}},{\"type\":\"DateTime\",\"config\":{\"value\":\"@P .TaskDueDate\",\"label\":\"@L Due date\",\"fillAvailableSpace\":false}},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyStatusWork\",\"label\":\"@L Status\",\"fillAvailableSpace\":false}}]}]}]}",
  "pxViewMetadata": "{\"name\":\"TaskWorklist\",\"type\":\"View\",\"config\":{\"title\":\"@L Task Worklist\",\"type\":\"casetypelist\",\"template\":\"ListView\",\"referenceList\":\"D_pyMyWorkList\",\"caseTypeReference\":\"MyCo-MyApp-Work-Task\",\"personalization\":true,\"grouping\":true,\"globalSearch\":true,\"reorderFields\":true,\"toggleFieldVisibility\":true,\"personalizationId\":\"a1b2c3d4e5f6789012345678abcdef01\",\"ruleClass\":\"MyCo-MyApp-Work-Task\",\"label\":\"@L Task Worklist\",\"localeReference\":\"@LR MYCO-MYAPP-WORK-TASK!PAGE!TASKWORKLIST\",\"presets\":[{\"name\":\"presets\",\"label\":\"@L All tasks\",\"template\":\"Table\",\"config\":{},\"children\":[{\"name\":\"Columns\",\"type\":\"Region\",\"children\":[{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyID\",\"label\":\"@L Case ID\",\"fillAvailableSpace\":false,\"displayAsLink\":true}},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyLabel\",\"label\":\"@L Label\",\"fillAvailableSpace\":true,\"displayAsLink\":true}},{\"type\":\"Dropdown\",\"config\":{\"value\":\"@P .Priority\",\"label\":\"@L Priority\",\"fillAvailableSpace\":false}},{\"type\":\"DateTime\",\"config\":{\"value\":\"@P .TaskDueDate\",\"label\":\"@L Due date\",\"fillAvailableSpace\":false}},{\"type\":\"TextInput\",\"config\":{\"value\":\"@P .pyStatusWork\",\"label\":\"@L Status\",\"fillAvailableSpace\":false}}]}]}]}}",
  "pxContextMetadata": "{\"$associated\":[],\"$properties\":[],\"$users\":[],\"$insights\":[],\"$personalizations\":[\"a1b2c3d4e5f6789012345678abcdef01\"],\"$classesmetadata\":[{\"name\":\"MyCo-MyApp-Work-Task\",\"fetchDefaultDataSources\":true}],\"$views\":[],\"$widgets\":[],\"$pagelists\":[{\"$properties\":[\".pyID\",\".pyLabel\",\".Priority\",\".TaskDueDate\",\".pyStatusWork\"],\"metaDataOnly\":true,\"pagelist\":\"D_pyMyWorkList\",\"allprimaryfields\":true,\"includePrimaryFields\":false}],\"$whens\":[],\"$addresses\":[],\"$paragraphs\":[]}",
  "pxDependencies": "{\"components\":[\"ListView\"],\"localeReferences\":[\"MYCO-MYAPP-WORK-TASK!PAGE!TASKWORKLIST\"]}"
}
```
