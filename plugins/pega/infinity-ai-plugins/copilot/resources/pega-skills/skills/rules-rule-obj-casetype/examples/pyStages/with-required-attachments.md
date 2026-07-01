---
name: With Required Attachments
description: Stage that blocks advancement until specific attachment categories have at least one attachment. Combines pyAttachments with pyRequiredCategories.
---

```json
{
  "pyStageID": "PRIM1",
  "pyStageName": "Document Review",
  "pyStageTransition": "automatic",
  "pyStageEntryStatus": "Open-InProgress",
  "pyIsTerminalStage": "false",
  "pyAttachments": [
    {
      "pyAttachmentCategory": "EDoR",
      "pyLabel": "Epic Definition of Ready",
      "pyType": "File",
      "pyIsRequired": "true",
      "pyAttachCategoryClass": "MyOrg-MyApp-Work-Approval",
      "pyPagelistReference": "EDoRAttachments"
    }
  ],
  "pyRequiredCategories": ["EDoR"],
  "pyProcesses": [
    {
      "pxFlowID": "FLOW0",
      "pyFlowName": "ReviewDocuments",
      "pyLabel": "Review Documents",
      "pyStartType": "PARALLEL",
      "pySkipOrAllowType": "always"
    }
  ]
}
```
