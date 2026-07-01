---
name: Method Catalog
description: Load when choosing which method to use in a step. Lists all 108 valid pyStepsActivityName values with brief usage notes and constraints.
---

# Activity Step Method Catalog

All valid values for `pyStepsActivityName` (108 total: 5 keywords + 103 Rule-Method instances).

---

## Keywords (no Rule-Method instance — built-in runtime verbs)

These 5 entries have no `pxObjClass` or `pzInsKey` — they are built-in
keywords handled directly by the activity runtime, not Rule-Method rules.

| Keyword | Description | Example file |
|---------|-------------|--------------|
| `Call` | Call another activity (same-class or cross-class via `Call Class.Activity`) | `call.md` |
| `Branch` | Transfer control to another activity without returning | `branch.md` |
| `Collect` | Collect pages from child requestors | — |
| `Java` | Execute inline Java code | `java.md` |
| `Queue` | Legacy queue keyword | — |

---

## Methods by category

---

### Activity control

| Method | Label | Notes |
|--------|-------|-------|
| `Activity-Clear-Status` | Clear activity status | Param: `BackoutWorstOnly` |
| `Activity-End` | Ends all currently running activities | Terminates the entire activity stack |
| `Activity-List-Add` | Adds an Activity to a dispatching list | Agent/dispatcher pattern |
| `Activity-Set-Status` | Activity-Set-Status | Set status programmatically |
| `Exit-Activity` | Exit the currently running activity | |
| `TaskStatus-Set` | Set the Value of pxActivityTaskStatus | `pyMethodStatus: API` |

### Apply / Parse

| Method | Label | Notes |
|--------|-------|-------|
| `Apply-DataTransform` | Apply the specified data transform to the page | Params: `DataTransform`, `PassParameterPage` |
| `Apply-Parse-Delimited` | Parse a stream of delimited data | `pyMethodStatus: API` |
| `Apply-Parse-Structured` | Parse data from ParsePage.pyInputStream | `pyMethodStatus: API` |
| `Apply-Parse-XML` | Parse a stream of XML data | `pyMethodStatus: API` |
| `Map-Structured` | Map-Structured | Structured data mapping |

### Assignment

| Method | Label | Notes |
|--------|-------|-------|
| `Assign-Delete` | Delete the Assign record | `pyMethodStatus: API` |
| `Assign-EstablishContext` | Open all object references for the Assignment | ⛔ **UNSUPPORTED** — server returns "Unsupported or unknown operation". `pyMethodStatus: API` |

### Call / Branch / Async

| Method | Label | Notes |
|--------|-------|-------|
| `Call-Async-Activity` | Executes an activity asynchronously | Fire-and-forget async call |
| `Call-Automation` | Call-Automation | ⛔ **AUTOMATION-only** — requires `pyActivityType: "AUTOMATION"` which is not supported for authoring |
| `Call-Function` | Call-Function | Call a function alias |
| `Assert-No-Invocation` | Assert-No-Invocation | Test assertion — verify no invocation occurred |

### Commit / Rollback

| Method | Label | Notes |
|--------|-------|-------|
| `Commit` | Commit changes to database | `pyMethodStatus: API` |
| `Rollback` | Discard deferred changes to database | `pyMethodStatus: API` |

### Connectors (Connect-*)

Connect-* methods have **three distinct parameter shapes** (not all the same):

1. **ServiceName + ExecutionMode shape** — `Connect-REST`, `Connect-SOAP`,
   `Connect-SAP`, `Connect-Cassandra`, `Connect-HBase`: `ServiceName` (req),
   `ExecutionMode` (DROPDOWN: Run/RunInParallel/Queue), `EndPointURL`.
   Connect-REST also has `MethodName` (DROPDOWN: GET/POST/PUT/PATCH/DELETE).
   Connect-Cassandra/HBase also have `Operation` (DROPDOWN: Get/Put/List).
2. **ServiceName + RunInParallel shape** — `Connect-JMS`, `Connect-MQ`,
   `Connect-CMIS`: `ServiceName` (req), `RunInParallel` (BOOLEAN). Simpler.
3. **FTP shape** — `Connect-FTP`: completely different — `FTPServer` (req,
   SmartPrompt Data-Admin-Connect-FTPServer), `RemotePath`, `LocalFile` (req),
   `TransferMode` (DROPDOWN: ASCII/Binary).

| Method | Label | Notes |
|--------|-------|-------|
| `Connect-Cassandra` | Method to invoke an instance of Rule-Connect-Cassandra | ServiceName+ExecutionMode+Operation shape |
| `Connect-CMIS` | Method to invoke an instance of Rule-Connect-CMIS | ServiceName+RunInParallel shape |
| `Connect-FTP` | Method for transferring files to remote location over FTP | Unique FTP shape (FTPServer, LocalFile, TransferMode) |
| `Connect-HBase` | Method to invoke an instance of Rule-Connect-HBase | ServiceName+ExecutionMode+Operation shape |
| `Connect-JMS` | Method to Invoke a Rule-Connect-JMS | ServiceName+RunInParallel shape |
| `Connect-MQ` | Method to Invoke a Rule-Connect-MQ | ServiceName+RunInParallel shape |
| `Connect-REST` | Method to invoke an instance of Rule-Connect-REST | Primary connector example |
| `Connect-SAP` | Method to Invoke a Rule-Connect-SAP | ServiceName+ExecutionMode shape |
| `Connect-SOAP` | Method to Invoke a Rule-Connect-SOAP | ServiceName+ExecutionMode shape |
| `Connect-Wait` | Synchronize with child requestor | Params: WaitSeconds, PoolID |

### Data operations (DataFlow / DataSet / DataPage)

| Method | Label | Notes |
|--------|-------|-------|
| `DataFlow-Execute` | Execute an operation on a DataFlow | Data pipeline execution |
| `DataSet-Execute` | Execute an operation on a DataSet | Dataset operation |
| `Load-DataPage` | Queues Data Page for asynchronous processing | Params: `DataPage`, `PoolID` |
| `Save-DataPage` | Save-DataPage | ⚠️ **COMPILATION ERROR** — Java compilation fails even with no parameters. Persist data page changes |

### Flow control

| Method | Label | Notes |
|--------|-------|-------|
| `Flow-End` | End current Flow | Terminates the running flow |
| `Flow-New` | Create a new Flow instance | `pyMethodStatus: API`. Starts a sub-flow |

### History

| Method | Label | Notes |
|--------|-------|-------|
| `History-Add` | Add a History Instance | |
| `History-List` | List History instances of the page | `pyMethodStatus: API` |

### Index / Search

| Method | Label | Notes |
|--------|-------|-------|
| `Index-Finish` | Finish indexing on a page | Full-text search index |

### Link

| Method | Label | Notes |
|--------|-------|-------|
| `Link-Objects` | Adds a Link entry | Creates a reference link between objects |

### Log / Debug

| Method | Label | Notes |
|--------|-------|-------|
| `Log-Message` | Logs a message and Java StackTrace and sends them to the Tracer | Params: `Message`, `LoggingLevel`, `GenerateStackTrace`, `SendToTracer` |

### Obj-* (database / persistence)

| Method | Label | Notes |
|--------|-------|-------|
| `Obj-Browse` | Retrieve to a page, read-only, a selected set of properties | Row-based filter + WhereClause |
| `Obj-Delete` | Delete the specified instance from clipboard and database | `pyMethodStatus: API` |
| `Obj-Delete-By-Handle` | Delete the specified instance from clipboard and database | `pyMethodStatus: API` |
| `Obj-Filter` | Filter the result set based on When rules | Params: `ListPage`, `ResultClass`, `When` |
| `Obj-List-View` | Retrieve to a page, a set of properties, based on ListView | Params: `ObjClass`, `ListView`, `Owner` |
| `Obj-Open` | Opens an instance of a given class | Params: `OpenClass`, `Lock`, `ReleaseOnCommit`, `LockInfoPage` |
| `Obj-Open-By-Handle` | Open object by handle to the pzInsKey value | Params: `InstanceHandle`, `CheckSecondaryStorage` |
| `Obj-Refresh-And-Lock` | If step page is not locked, refresh from database and lock | `pyMethodStatus: API` |
| `Obj-Save` | Saves an Instance to the database | `pyMethodStatus: API` |
| `Obj-Save-Cancel` | Cancels the Obj-Save if it was pending | `pyMethodStatus: API` |
| `Obj-Sort` | Sort the PageList given by the StepPage | `pyMethodStatus: API`. Params: `PageListProperty`, `Class`, `SortProperty`, `Descending` |
| `Obj-Validate` | Call Validate Rule | `pyMethodStatus: API` |

### Page-* (clipboard)

| Method | Label | Notes |
|--------|-------|-------|
| `Page-Change-Class` | Change a class of a page | Params: `ObjClassNew`, `Model`, `Keep`, `SkipDeclarativeProcessing` |
| `Page-Clear-Messages` | Clear all messages on a Page | `pyMethodStatus: API` |
| `Page-Copy` | Copy contents of a Page to another page | `pyMethodStatus: API`. |
| `Page-Merge-Into` | Merges two or more pages into one | `pyMethodStatus: API`. Params: `MergeFromList`, `Keep` |
| `Page-New` | Create a new object page | `pyMethodStatus: API` |
| `Page-Remove` | Remove all pages specified | `pyMethodStatus: API`. Multi-page via `pyParamArray` |
| `Page-Rename` | Renames the object page | |
| `Page-Set-Messages` | Sets a message to a property on a page | `pyMethodStatus: API` |
| `Page-Unlock` | Remove pegarules database lock for this page | `pyMethodStatus: API` |
| `Page-Validate` | Validate the Page | `pyMethodStatus: API` |

### Privilege

| Method | Label | Notes |
|--------|-------|-------|
| `Privilege-Check` | Checks access to a Privilege | `pyMethodStatus: API` |

### Property-* (field operations)

| Method | Label | Notes |
|--------|-------|-------|
| `Property-Map-DecisionTable` | Map a value to a property via decision table | Params: `DecisionTableName`, `PropertyName`, `AllowMissingProperties` |
| `Property-Map-DecisionTree` | Map a value to a property via decision tree | Params: `DecisionTreeName`, `PropertyName`, `AllowMissingProperties` |
| `Property-Map-Value` | Map a value to a property | Params: `PropertyName`, `MapName`, `RowInput`, `AllowMissingProperties` |
| `Property-Map-ValuePair` | Map a value to a property | ValuePair variant |
| `Property-Ref` | Creates link between a reference property and a source property | |
| `Property-Remove` | Remove properties from a specified page | `pyMethodStatus: API`. Multi-property via `pyParamArray` |
| `Property-Seek-Value` | Invoke backward chaining to compute the value of this property | Declarative backward chaining |
| `Property-Set` | Sets a properties value | |
| `Property-Set-Corr` | Stores a Rule-Obj-Corr stream into a property | `pyMethodStatus: API`. Correspondence |
| `Property-Set-HTML` | Stores a Rule-HTML-Stream content in a property | `pyMethodStatus: API` |
| `Property-Set-Messages` | Sets a message to a property on a page | |
| `Property-Set-Special` | Sets a property as a special property | `pyMethodStatus: API` |
| `Property-Set-Stream` | Stores a Rule-Stream derived stream into a property | `pyMethodStatus: API` |
| `Property-Set-XML` | Stores a Rule-Obj-XML stream into a property | |
| `Property-Validate` | Edits the value of a property | `pyMethodStatus: API` |

### Publish

| Method | Label | Notes |
|--------|-------|-------|
| `Publish-Notifications` | Publish Notifications | |

### Queue / Background processing

| Method | Label | Notes |
|--------|-------|-------|
| `Queue-For-Agent` | Queue an item for background processing by an Agent | Legacy agent-based queuing |
| `Queue-For-Processing` | Queue an item for background processing by Queue Processor | |

### RDB-* (relational database)

| Method | Label | Notes |
|--------|-------|-------|
| `RDB-Delete` | Relational Database Delete | `pyMethodStatus: API` |
| `RDB-List` | Relational Database List | `pyMethodStatus: API` |
| `RDB-Open` | Relational Database Open | `pyMethodStatus: API` |
| `RDB-Save` | Relational Database Save | `pyMethodStatus: API` |

### Requestor / Thread

| Method | Label | Notes |
|--------|-------|-------|
| `Requestor-Stop` | Stops processing of the requestor | `pyMethodStatus: API` |
| `Thread-Clear` | Removes all pages of a thread except those specified | `pyMethodStatus: API` |
| `Thread-Stop` | Stops the activity specified on a named thread | `pyMethodStatus: API` |
| `Wait` | Waits for specified period of time | `pyMethodStatus: API` |
| `Wait-For-Requestor` | Synchronize with child requestor | |

### Show-* (output / UI streaming)

| Method | Label | Notes |
|--------|-------|-------|
| `Show-Applet` | Displays the applet specified | `pyMethodStatus: API`. Legacy |
| `Show-Applet-Data` | Send a message to an Applet | `pyMethodStatus: API`. Legacy |
| `Show-Harness` | Displays the specified harness in the browser | `pyMethodStatus: API` |
| `Show-HTML` | Displays the specified Stream | `pyMethodStatus: API` |
| `Show-Page` | Sends the Page specified to the browser in XML format | `pyMethodStatus: API` |
| `Show-Property` | Sends the Property contents to the Browser | `pyMethodStatus: API` |
| `Show-Stream` | Displays the specified Stream | `pyMethodStatus: API` |

### StringBuffer

| Method | Label | Notes |
|--------|-------|-------|
| `StringBuffer-Append` | Append to a local stringbuffer | Requires `StringBuffer` local variable |
| `StringBuffer-Insert` | Insert into a stringbuffer | |
| `StringBuffer-Reset` | Reset a stringbuffer local var to "" | |

### Text

| Method | Label | Notes |
|--------|-------|-------|
| `Text-Infer` | Text-Infer | NLP text inference |
| `Text-Normalize` | Replace Various Strings With A Common One | Text normalization |

### Validation envelope

| Method | Label | Notes |
|--------|-------|-------|
| `Start-Validate` | Enables reference tracking for a particular rule | Always paired with `End-Validate` |
| `End-Validate` | Stops reference tracking for a rule page | |


