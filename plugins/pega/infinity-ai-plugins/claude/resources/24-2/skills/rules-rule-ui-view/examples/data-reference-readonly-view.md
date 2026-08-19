---
name: "DataReference Readonly View"
description: Full create payload for a readonly DataReference template view with SemanticLink child — displays a linked data record as a clickable navigation link with hover preview. Uses mode "readonly" and displayAs "readonly".
---

```json
{
  "pxObjClass": "Rule-UI-View",
  "pyRuleName": "Details_ServiceAccount",
  "pyLabel": "Service account",
  "pyClassName": "MyCo-MyApp-Work-Case",
  "pyRuleSet": "MyApp",
  "pyRuleSetVersion": "01-01-01",
  "pyTemplateName": "DataReference",
  "pxViewType": "datareference",
  "pyJsonConfig": "{\"classKeys\":[{\"name\":\"ServiceAccountID\"}],\"contextClass\":\"MyCo-MyApp-Data-ServiceAccount\",\"displayAs\":\"readonly\",\"mode\":\"readonly\",\"name\":\"ServiceAccount\",\"selectionMode\":\"single\"}",
  "pxViewMetadata": "{\"name\":\"Details_ServiceAccount\",\"type\":\"View\",\"config\":{\"classKeys\":[{\"name\":\"ServiceAccountID\"}],\"contextClass\":\"MyCo-MyApp-Data-ServiceAccount\",\"displayAs\":\"readonly\",\"localeReference\":\"@LR MYCO-MYAPP-WORK-CASE!VIEW!DETAILS_SERVICEACCOUNT\",\"mode\":\"readonly\",\"name\":\"ServiceAccount\",\"ruleClass\":\"MyCo-MyApp-Work-Case\",\"selectionMode\":\"single\",\"template\":\"DataReference\"},\"children\":[{\"type\":\"SemanticLink\",\"config\":{\"label\":\"@L Service account\",\"caseClass\":\"MyCo-MyApp-Data-ServiceAccount\",\"contextPage\":\"@P .ServiceAccount\",\"text\":\"@P .ServiceAccount.Name\",\"caseID\":\"@P .ServiceAccount.ServiceAccountID\",\"caseLabel\":\"@P .ServiceAccount.pyLabel\",\"previewKey\":\"@P .ServiceAccount.pzInsKey\",\"resourceParams\":{\"workID\":\"@P .ServiceAccount.ServiceAccountID\"},\"resourcePayload\":{\"caseClassName\":\"MyCo-MyApp-Data-ServiceAccount\"}}},{\"name\":\"Views\",\"type\":\"Region\",\"children\":[]}]}",
  "pxContextMetadata": "{\"$properties\":[\".ServiceAccount\",\".ServiceAccount.pyLabel\",\".ServiceAccount.ServiceAccountID\",\".ServiceAccount.Name\",\".ServiceAccount.pzInsKey\"],\"$fields\":[{\"name\":\".ServiceAccount\"},{\"name\":\".ServiceAccount.pyLabel\"},{\"name\":\".ServiceAccount.ServiceAccountID\"},{\"name\":\".ServiceAccount.Name\"},{\"name\":\".ServiceAccount.pzInsKey\"}],\"$classesmetadata\":[],\"$pagelists\":[],\"$views\":[],\"$associated\":[],\"$insights\":[],\"$genAICoaches\":[],\"$AIAgents\":[],\"$attachments\":[],\"$widgets\":[],\"$addresses\":[],\"$users\":[],\"$whens\":[],\"$paragraphs\":[]}"
}
```
