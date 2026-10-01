---
name: view-assignment-inspection
description: "Assignment view discovery and inspection workflow for existing FlowActions and Rule-UI-View forms"
---
# Assignment View Inspection

Use this reference when the FlowAction and View already exist for an assignment step.

## Step 1: Find the Assignment Step's Rules

**Start from the flow — do not guess the view name.**

Generic views like `pyEdit` exist on the case class but are **not** the form shown
during an assignment step. The correct assignment form view is identified by tracing
the flow to the FlowAction, then using either `pyViewReference` or the same-name
FlowAction/View convention.

1. **Find the flow** that contains the step.
   - `search-rules` with `searchText="{CaseTypeName}"`, filter to `Rule-Obj-Flow`.
   - Use `get-rule` (full) on the flow; inspect `pyModelProcess.pyShapes` for the
     `Data-MO-Activity-Assignment` shape whose `pyMOName` matches the step name.

2. **Find the FlowAction** from the shape's `pyMOName`.
   - `search-rules` with `searchText="{FlowActionName}"`, filter to `Rule-Obj-FlowAction`.
   - Use `get-rule` (full); read `pyViewReference`. If populated, this is the name of
     the backing view.
   - If `pyViewReference` is blank and `pySectionReference` is also blank, check the
     same-name convention: use the FlowAction's `pyStreamName`/`pyRuleName` as the
     expected `Rule-UI-View` name. See
     `rules-rule-ui-view/references/assignment-flowaction-view-wiring`.

3. **Find the view by its confirmed name.**
   - `list-rules` with `ruleType="Rule-UI-View"`, `className="{CaseClass}"`,
     `ruleName="{ViewReferenceOrFlowActionName}"`.

Record the `insKey` for the FlowAction and view rule.

## Step 2: Inspect the FlowAction

**Tool:** `get-rule`
**Parameters:** `key="{FlowActionKey}"`, `detail="full"`

What to look for:

- `pyViewReference` -- **Cosmos/Constellation apps:** explicit wiring sets this to the
  `Rule-UI-View` name. Same-name convention wiring may leave it blank; then use
  `pyStreamName`/`pyRuleName` to find the companion view.
- If `pyViewReference` is blank and `pySectionReference` is populated, the FlowAction
  is using legacy HTML-Section wiring and must be fixed for Constellation via
  `update-rule` (`pyViewReference` = view name, `pySectionReference` = `""`).
- `pySectionReference` -- **Traditional HTML apps only:** section name; blank for Cosmos apps.
- `pySubmitLabel` -- the submit button label.
- `pyPreProcessingActivity` -- pre-processing activity (if any).
- `pyValidateActivity` -- validation activity (if any).
- `pySections` -- the sections/views included in the form.

For the full FlowAction/View wiring rules, load
`rules-rule-ui-view/references/assignment-flowaction-view-wiring`.

## Step 3: Inspect the Main View

**Tool:** `get-rule`
**Parameters:** `key="{MainViewKey}"`, `detail="full"`

What to look for:

- `pxViewMetadata` -- JSON string; parse to understand current field layout.
- `pyContent` -- structured content array; note field types and component names.
- `pxContextMetadata` -- JSON string; note which properties are already tracked.
- `pyTemplateName` -- the layout template (e.g., `DefaultForm`, `DataReference`).

`pxViewMetadata` structure for a DefaultForm view:

```json
{
  "children": [{
    "children": [
      {"config": {"label": "@FL .FieldName", "labelOption": "default", "value": "@P .FieldName"}, "type": "TextInput"},
      {"config": {"label": "@FL .DateField", "labelOption": "default", "value": "@P .DateField"}, "type": "DateTime"},
      {"config": {"authorContext": ".PageProp", "inheritedProps": [{"prop": "label", "value": "@FL .PageProp"}], "name": "SubViewName", "referenceType": "Data", "ruleClass": "ClassName", "type": "view"}, "type": "reference"}
    ],
    "name": "Fields", "type": "Region"
  }],
  "config": {"NumCols": "2", "inheritParentLayout": false, "label": "@L View Label", "localeReference": "@LR CLASS!VIEW!VIEWNAME", "ruleClass": "ClassName", "template": "DefaultForm"},
  "name": "ViewName", "type": "View"
}
```

`pxContextMetadata` structure:

```json
{
  "$properties": [".Field1", ".Field2"],
  "$fields": [{"name": ".Field1"}, {"name": ".Field2"}],
  "$views": [{"name": "SubViewName", "ruleClass": "ClassName"}],
  "$insights": [], "$genAICoaches": [], "$AIAgents": [], "$attachments": [],
  "$widgets": [], "$addresses": [], "$associated": [], "$users": [],
  "$classesmetadata": [], "$pagelists": [], "$whens": [], "$paragraphs": []
}
```

## Step 4: Inspect Any Sub-Views (Optional)

**Tool:** `get-rule` on each sub-view key, `detail="full"`

What to look for:

- `pyTemplateName` -- e.g., `DataReference` for a data picker.
- `pyJsonConfig` -- configuration for the data reference (datasource, columns, etc.).
- `pyContent` -- fields embedded in the sub-view.

For metadata internals, load `rules-rule-ui-view/references/view-metadata-structures`.
