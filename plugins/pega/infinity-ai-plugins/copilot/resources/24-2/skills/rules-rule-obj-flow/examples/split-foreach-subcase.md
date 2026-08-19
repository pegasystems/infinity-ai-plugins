---
name: flow-split-foreach-subcase
description: 'Start → Assignment (workbasket) → Utility → SplitForEach → SubProcess → End. Use when creating a BPMN flow that iterates a list and spawns sub-cases.'
---

```json
{
  "pyFlowType": "pyStartSupportRequest",
  "pyLabel": "Start Support Request",
  "pyClassName": "PegaSample-SupportRequest",
  "pyWorkClass": "PegaSample-SupportRequest",
  "pyCategory": "BPMN",
  "pyStartActivity": "Start51",
  "pyEndingActivities": ["End52"],
  "pyCoveredBy": [ { "pxObjClass": "Embed-RuleCoveredBy" } ],
  "pyStencils": [ {} ],
  "pyCoveredByCount": "0",
  "pyFromTasks": [
    { "pyFromTaskName": "Start51",       "pyToTasks": { "Assignment1":   { "pyID": "Transition1", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "Assignment1" } } },
    { "pyFromTaskName": "Assignment1",   "pyToTasks": { "Utility1":      { "pyID": "Transition3", "pyTaskStatusOrWhen": "STATUS", "pyTaskStatus": "Resolve", "pyTaskWhen": "Resolve", "pyLikelihood": "100", "pxSubscript": "Utility1" } } },
    { "pyFromTaskName": "Utility1",      "pyToTasks": { "SPLITFOREACH1": { "pyID": "Transition4", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "SPLITFOREACH1" } } },
    { "pyFromTaskName": "SPLITFOREACH1", "pyToTasks": { "SubProcess1":   { "pyID": "Transition6", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "SubProcess1" } } },
    { "pyFromTaskName": "SubProcess1",   "pyToTasks": { "End52":         { "pyID": "Transition7", "pyTaskStatusOrWhen": "ALWAYS", "pyLikelihood": "100", "pxSubscript": "End52" } } },
    { "pyFromTaskName": "End52", "pyToTasks": {} }
  ],
  "pyModelProcess": {
    "pyContexts": [
      { "pxObjClass": "Embed-ModelContext", "pyContextName": "PrimaryPath",   "pyContextLabel": "Primary path (pyPrimaryPath=True)" },
      { "pxObjClass": "Embed-ModelContext", "pyContextName": "AlternatePath", "pyContextLabel": "Alternate Steps" }
    ],
    "pyModifiers": {
      "Ticket1": { "pxObjClass": "Data-MO-Event-Exception", "pyFromMODefName": "Ticket", "pyMOName": "AllCoveredResolved" }
    },
    "pyAnnotationShapes": {
      "Annotation1": {
        "pxObjClass": "Data-MO-Annotation", "pyMOId": "Annotation1", "pyFromMODefName": "Annotation",
        "pyAnnotation": "Spawn one repair sub-case per product in the request",
        "pxCreateOperator": "garga"
      }
    },
    "pyShapes": {
      "Start51": {
        "pxObjClass": "Data-MO-Event-Start", "pyMOId": "Start51", "pyFromMODefName": "Start",
        "pyCategory": "BPMN", "pyFlowType": "FlowStandard",
        "pyStartingHarness": "NewSample", "pyUseCaseApplication": "PegaRULES"
      },
      "Assignment1": {
        "pxObjClass": "Data-MO-Activity-Assignment", "pyMOId": "Assignment1", "pyFromMODefName": "Assignment",
        "pyMOName": "Review Support Request", "pyCategory": "BPMN",
        "pyImplementation": "WorkBasket",
        "pyHarnessPurpose": "Perform", "pySLA": "Default", "pyWorkStatus": "Open",
        "pyPreviousRule": "WorkBasket", "pyUseCaseWorkType": "SupportRequest",
        "pyCallParams": {
          "ConfirmationNote": "\"The Case is created and ready to be managed\"",
          "DoNotPerform": "false", "HarnessPurpose": "Perform",
          "Instructions": "Resolve Support Request",
          "UseCurOperIfBasketNotFound": "false"
        },
        "pyLocalActionsPL": [
          { "pxObjClass": "Embed-Pega-AssignAction", "pyActionName": "",
            "pyUseCaseApplication": "CMGalleryDemos", "pyUseCaseWorkType": "SupportRequest" }
        ],
        "pyRouterProp": {
          "pxObjClass": "Data-MO-Activity-Router", "pyImplementation": "ToWorkbasket",
          "pyCallParams": { "Workbasket": "\"default@pega.com\"" }
        }
      },
      "Utility1": {
        "pxObjClass": "Data-MO-Activity-Utility", "pyMOId": "Utility1", "pyFromMODefName": "Utility",
        "pyMOName": "Send Email to Customer", "pyCategory": "BPMN",
        "pyImplementation": "CorrNew", "pyPreviousRule": "CorrNew",
        "pyUseCaseApplication": "CMGalleryDemos", "pyUseCaseWorkType": "SupportRequest",
        "pyCallParams": {
          "Broadcast": "false", "CorrName": "ResolutionSample",
          "EmailSubject": "Support Request Resolution",
          "PartyRole": "Customer", "SendAllAttachments": "false", "SendNow": "true"
        },
        "pyTicketShapes": [
          { "pxObjClass": "Data-MO-Event-Exception", "pxSubscript": "Ticket1", "pyMOId": "Ticket1", "pyMOName": "AllCoveredResolved" }
        ],
        "pyModifierRefs": { "Ticket1": "Data-MO-Event-Exception" }
      },
      "SPLITFOREACH1": {
        "pxObjClass": "Data-MO-Activity-SubProcess-SplitForEach", "pyMOId": "SPLITFOREACH1", "pyFromMODefName": "SplitForEach",
        "pyMOName": "For each product", "pyCategory": "BPMN",
        "pyPageRef": ".pyProductList", "pyPageClass": "Data-SampleSRProduct",
        "pyJoinAllAny": "All", "pyProcessRemainingSubscripts": "true",
        "pySpinOff": "false", "pyStoreCompletedFlowPath": "false",
        "pyAbortIterationWhenRule": "", "pyWhenRule": "", "pyHeaderLabelProperty": "",
        "pySubProcessCategory": "ProcessFlow", "pyDefineFlowOn": "Current",
        "pyImplementation": "pyCreateSubCases", "pyPreviousRule": "PegaSample-Repair",
        "pyUseCaseApplication": "CleanApp", "pyUseCaseWorkType": "SupportRequest",
        "pyCallParams": {
          "ChildClass": "PegaSample-Repair", "CopyAllPageDataToChild": "false",
          "DataTransform": "\"pyCopyProblemDataToChild\"",
          "FlowName": "pyStartRepair", "SourcePageParamName": "SelectedProduct"
        }
      },
      "SubProcess1": {
        "pxObjClass": "Data-MO-Activity-SubProcess", "pyMOId": "SubProcess1", "pyFromMODefName": "SubProcess",
        "pyMOName": "Create repair sub-case", "pyCategory": "BPMN",
        "pyImplementation": "pyCreateSubCases",
        "pySubProcessCategory": "ProcessFlow", "pyDefineFlowOn": "Current", "pySpinOff": "false"
      },
      "End52": {
        "pxObjClass": "Data-MO-Event-End", "pyMOId": "End52", "pyFromMODefName": "End", "pyCategory": "BPMN"
      }
    },
    "pyConnectors": {
      "Transition1": { "pyMOId": "Transition1", "pyFrom": "Start51", "pyFromClass": "Data-MO-Event-Start", "pyTo": "Assignment1", "pyConditionType": "Always", "pyLikelihood": "100" },
      "Transition3": { "pyMOId": "Transition3", "pyFrom": "Assignment1", "pyFromClass": "Data-MO-Activity-Assignment", "pyTo": "Utility1", "pyConditionType": "Action", "pyExpression": "Resolve", "pyMOName": "Resolve", "pyPreviousRule": "Resolve", "pyUseCaseApplication": "CMGalleryDemos", "pyWorkStatus": "Open", "pyLikelihood": "100" },
      "Transition4": { "pyMOId": "Transition4", "pyFrom": "Utility1", "pyFromClass": "Data-MO-Activity-Utility", "pyTo": "SPLITFOREACH1", "pyConditionType": "Always", "pyLikelihood": "100" },
      "Transition6": { "pyMOId": "Transition6", "pyFrom": "SPLITFOREACH1", "pyFromClass": "Data-MO-Activity-SubProcess-SplitForEach", "pyTo": "SubProcess1", "pyConditionType": "Always", "pyLikelihood": "100" },
      "Transition7": { "pyMOId": "Transition7", "pyFrom": "SubProcess1", "pyFromClass": "Data-MO-Activity-SubProcess", "pyTo": "End52", "pyConditionType": "Always", "pyLikelihood": "100" }
    }
  }
}
```
