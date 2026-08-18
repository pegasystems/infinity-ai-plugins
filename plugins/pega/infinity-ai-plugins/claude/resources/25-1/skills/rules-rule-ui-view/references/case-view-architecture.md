---
name: view-case-architecture
description: "Case view architecture for Constellation Rule-UI-View rules, including surface mapping, assignment view discovery, and region models"
---
# Case View Architecture

A Constellation case page is assembled from multiple cooperating `Rule-UI-View` rules.
Understanding which view to edit prevents accidental changes to the wrong surface.

```
pyDetails  (template: CaseView — the page shell, holds no scalar fields)
├── pyCaseSummary       ← Summary sidebar always visible on the right
├── pyStages            ← Stage progress bar
├── pyCaseWorkarea      ← Active assignment form area
└── Tabs
    ├── pyReview        ← "Details" tab — main scrollable data display
    ├── Pulse
    ├── Emails
    └── History
```

## Finding the Assignment Form View

**Critical:** The assignment form view name is **not always predictable** from the step
name alone. Do not search for a view by guessing its name. Generic views like `pyEdit`
exist on the case class but are **not** the form shown during an assignment step —
`pyEdit` is the generic edit harness and is unrelated to assignment flow actions.

**Always trace from the flow to the view:**

1. **Find the flow** that contains the assignment step.
   - `search-rules` with `searchText="{CaseTypeName}"`, filter to `Rule-Obj-Flow`
   - Use `get-rule` (full) on the flow; inspect `pyModelProcess.pyShapes` for the
     `Data-MO-Activity-Assignment` shape whose `pyMOName` matches the step name.

2. **Get the FlowAction name** from the shape's `pyMOName` field.

3. **Find the FlowAction rule.**
   - `search-rules` with `searchText="{FlowActionName}"`, filter to `Rule-Obj-FlowAction`
   - Use `get-rule` (full); read `pyViewReference` — that is the name of the backing
     `Rule-UI-View` that is actually rendered when the user works the assignment.

4. **Find the view by its confirmed name.**
   - `list-rules` with `ruleType="Rule-UI-View"`, `className="{CaseClass}"`,
     `ruleName="{ViewReference}"`

This flow → FlowAction → view traversal is the only reliable way to identify the
correct assignment form.

## Region Models

**pyCaseSummary** has two regions:

```
pyCaseSummary
├── Region: "Primary fields"   ← 2–3 header fields (always visible, keep brief)
└── Region: "Secondary fields" ← Expandable metadata list (add most new fields here)
```

**Designer UI label mapping for CaseSummary:**

| API region name | Pega Designer UI label | Purpose | Default placement |
|-----------------|----------------------|---------|-------------------|
| `"Primary fields"` | **Highlighted fields** | High-visibility KPIs at the top of the summary card (urgency, status) | Only for 2–3 key metrics the user needs at a glance |
| `"Secondary fields"` | **Summary** | Scrollable metadata list below the highlighted strip | **Default for new fields** — unless the user explicitly asks for "highlighted" placement |

> **Rule of thumb:** When a user asks to "add fields to the Summary View", place
> them in `"Secondary fields"` (the "Summary" section in the designer). Only use
> `"Primary fields"` when the user explicitly requests highlighted/prominent
> placement or the field is a core status indicator.

**pyReview and most assignment views** have a flat region:

```
pyReview  (and most assignment views)
└── Region: "Fields"           ← Flat list of all fields (no sub-regions)
```

## View-to-Surface Mapping

Standard view names control specific UI surfaces:

| View Name | Template | UI Surface | Notes |
|-----------|----------|-----------|-------|
| `pyCaseSummary` | `CaseSummary` | Always-visible summary sidebar | Add header or metadata fields to the case panel |
| `pyDetails` | `CaseView` | Page shell / tab chrome | No scalar fields — but override to customize Utilities widgets (see below) |
| `pyReview` | `Details` | "Details" tab content | `pxViewType: "details"` required. Add fields visible when browsing the closed/open case |
| `pyPrimaryFields` | `DefaultForm` | Primary fields panel (2-column) | Editing this view is only half the job — see `rules-rule-ui-view/references/view-update-workflow` "Primary Fields — Two-Layer Pattern" |
| `pyEdit` | (varies) | Full edit form | All editable fields for the case |
| `pyStages` | `Stages` | Stage progress bar | **Do not edit** — layout only, no scalar fields |
| `pyCaseWorkarea` | (varies) | Active assignment form area | **Do not edit directly** — edit the specific assignment step view instead (see "Finding the Assignment Form View" above) |
| `pySummary` | (varies) | Compact summary display | Compact case overview |
| `pyWorkList` | (varies) | Work list page | Uses `listpage` view type |
| *(step name)* | `DefaultForm` | Assignment form for that workflow step | e.g., `ConfirmScope` controls the Confirm Scope step |

The create case form is the view for the **first step of the first stage** in the
case type's flow. There is no single property that encodes "this view is the create
form" — it is implicit in the case lifecycle.

## CaseView Utilities Region (pyDetails)

The `pyDetails` view (template: `CaseView`) contains a **Utilities** region that hosts
utility widgets rendered in the right-side panel of the case page. The base `Work-`
class provides default Utilities (Attachments + Followers). To add or remove widgets,
create a class-specific `pyDetails` override — copy the full inherited structure and
modify the Utilities region.

### Inherited tree (from Work-)

```
pyDetails  (template: CaseView)
├── Summary region      → pyCaseSummary reference
├── Stages region       → pyStages reference
├── Todo region         → pyCaseWorkarea reference
├── Tabs region         → DeferLoad tabs (Details, Pulse, Emails, History)
├── Utilities region    → FileUtility, Followers   ← widgets live here
├── pyPersistentUtilities reference
└── AddOns region       → pyCaseAddOns reference
```

### Standard Utility Widgets

| Widget | Component Name | Icon | Purpose |
|--------|---------------|------|---------|
| Attachments | `FileUtility` | `paper-clip` | File upload and management |
| Followers | `Followers` | `user-star` | Case follower subscription list |
| Tags | `Tags` | `tag` | Tagging/categorization of cases |

### Widget structure — pyContent

Each widget is a child of the Utilities region in `pyContent`:

```json
{
  "pxObjClass": "Pega-UI-Content-Widget",
  "pyComponentName": "Tags",
  "pyDisplayLabel": "Tags",
  "pyLabel": "Tags",
  "pyPromptClass": "MyCo-MyApp-Work-CaseType"
}
```

### Widget structure — pxViewMetadata

In the Utilities region of `pxViewMetadata`:

```json
{
  "children": [
    {
      "config": { "label": "@L Attachments", "iconName": "paper-clip" },
      "type": "FileUtility"
    },
    {
      "config": { "label": "@L Followers", "iconName": "user-star" },
      "type": "Followers"
    },
    {
      "config": { "label": "@L Tags", "iconName": "tag" },
      "type": "Tags"
    }
  ],
  "name": "Utilities",
  "type": "Region"
}
```

### When to override pyDetails

- **Adding a widget** (e.g., Tags) that the base `Work-` view does not include
- **Removing a widget** (e.g., removing Followers for a case type where it's not needed)
- **Reordering widgets** in the Utilities panel

> **Do not add scalar fields to pyDetails.** The CaseView template is a layout shell —
> use `pyCaseSummary`, `pyReview`, or assignment step views for data fields.

### Override workflow

1. **Get the inherited view** — `get-rule` on the `Work-` class `pyDetails` (or the
   nearest class-specific override) with `detail=full`
2. **Create a class-specific copy** — use `create-rule` with the case type's
   `pyClassName`, copying all regions and updating `pyPromptClass` references to the
   target class
3. **Modify the Utilities region** — add/remove widget entries in both `pyContent`
   and `pxViewMetadata`
4. **Update pxDependencies** — include the component names of all widgets present
   (e.g., `["Region", "DeferLoad", "FileUtility", "Followers", "Tags", "CaseView"]`)
