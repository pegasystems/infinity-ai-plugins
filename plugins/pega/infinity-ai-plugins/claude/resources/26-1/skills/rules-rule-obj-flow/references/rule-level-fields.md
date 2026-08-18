---
name: rule-level-fields
description: "Load when copying or recreating a flow and encountering unfamiliar rule-level fields. Documents UI flags, modeler state, and metadata fields that the server writes but agents typically omit on create."
---

## Rule-level form-post UI flags

When the server round-trips a flow through the Process Modeler form-post
handler, it writes back a large block of UI/session flags regardless of
the author's input. Authors MAY omit these on fresh authoring; **preserve
them verbatim on update/recreation** of a flow that already carries them.

| Field | Default on server | Purpose |
|---|---|---|
| `pxRuleOpenedInPopUp` | `"false"` | Whether editor opened in popup window. |
| `pyBaseRule` | `"false"` | Base-rule reference for inheritance overlays. |
| `pyBaseRuleHolder` | `""` | Stringified holder for `pyBaseRule`. |
| `pyCurrentViewMode` | `"modeler"` | Last-used view (`"Process"`, `"Parameters"`, etc.). |
| `pyDisplayMode` | `"clone"` | Last-used display mode. |
| `pyReloadForm` | `"true"` | Triggers form reload on next open. |
| `pySelected` | `"false"` | Rule-list selection state. |
| `pyValueChanged` | `"false"` | Dirty-bit flag set by the UI. |
| `pyForecasterAvailable` | `"unavailable"` | Forecaster-widget availability marker. |
| `pyHasCustomFields` | `"false"` | `"true"` when `pyCustomFields` is non-empty. |
| `pyHistoryObject` | `""` | Rule-history handle. |
| `pyInterface` | `""` | Interface selector on the form. |
| `pyInterfaceHolder` | `""` | Default interface-holder label. |
| `pyModelerGridModeON` | `"true"` | Grid-snapping enabled in Process Modeler. |
| `pyNextAssignmentWorkBasket` | `""` | Form-level workbasket selector companion. |
| `pyNextAssignmentWorkBasketHolder` | `""` | Stringified holder for the above. |
| `pyPlaceGlobalLocalsAtTop` | `"false"` | Layout flag for Local Actions panel. |
| `pyPostVisio2000Saved` | `"false"` | Post-Visio-2000 save-format marker. |
| `pyPurpose` | `"false"` | Rule-purpose boolean flag. |
| `pyShowGrid` | `"true"` | Grid visibility in Process Modeler. |
| `pySkipNewHarness` | `"false"` | Skip creating a new harness on save. |
| `pySortDateCircumWithinRSMajor` | `"true"` | Circumstance-date sort order within ruleset-major. |
| `pySystemFlow` | `"false"` | `"true"` for platform-library / system-owned flows. |
| `pyVisioCompatFlag` | `"false"` | Legacy Visio-compat marker. |
| `pyVisioScaleFactor` | `"100"` | Legacy Visio scale factor. |
| `pyTemplateDisplayText` | `"No ruleset versions available"` (literal) | Ruleset-picker placeholder text. |

> **Inverted-boolean alert.** Three flags have non-obvious defaults. On
> recreation, the correct values are `pyShowGrid: "true"`,
> `pyModelerGridModeON: "true"`, and `pySkipNewHarness: "false"`. Inverting
> any of these is the most frequent author error on this block.

## Auto-generated rule-level `pyRuleParamsStreamName`

Flows that expose a parameter form (self-registering platform flows such
as `pxCascadingApproval`) carry an auto-generated rule-level
`pyRuleParamsStreamName` (e.g. `"pzCascadingApproval"`) that points at the
server-materialized parametric-form stream for the flow. Distinct from
the shape-level `pyRuleParamsStreamName` on smart-shape Utility /
SubProcess shapes (covered above). Omit on fresh rule-authored flows;
preserve verbatim on update/recreation when the server has written it.

## `pyCustomFields.pyGalleryType` — palette self-registration

When `pyFlowType == pyRuleName` — the flow declares itself as its own
flow-type slot, the self-registering-palette pattern used by platform-
library flows like `pxCascadingApproval` — the server writes
`pyCustomFields.pyGalleryType: "CaseManagementGallery"`. This registers
the flow into the Case Management palette so it is palette-discoverable
to downstream authors. Preserve the block verbatim on update; omit on
fresh rule-authored flows where `pyFlowType != pyRuleName`.

## `pxNamedPageReferences` empty-array marker

Rule-level `pxNamedPageReferences: []` is an empty-array marker written
by the server on platform/legacy flows. Authors MAY omit it; preserve
verbatim when present.

## `pyContexts` — PrimaryPath / AlternatePath default labels

Every flow's `pyModelProcess.pyContexts` carries two default context
rows (authoring-path labels used by Process Modeler for path-coloring).
Not an empty map:

```json
"pyContexts": [
  { "pxObjClass": "Embed-ModelContext", "pyContextName": "PrimaryPath",   "pyContextLabel": "Primary path (pyPrimaryPath=True)" },
  { "pxObjClass": "Embed-ModelContext", "pyContextName": "AlternatePath", "pyContextLabel": "Alternate Steps" }
]
```

Older flows may serialize the same structure as a **map** keyed by
`pyContextName` (with label as the value). Either form is valid; preserve
whichever form the server uses on update. Do not emit `pyContexts: {}` or
`pyContexts: []` — the server always writes the two default rows.

## Next-assignment quad combinatorics

Four correlated rule-level flags control next-assignment routing
behaviour: `pyNextAssignment`, `pyNextAssignmentAdhoc`,
`pyNextAssignmentWorkBasket`, `pyNextAssignmentWorkBasketAdhoc`. Values
are `"true"` / `"false"` strings. The combination is structure-type
dependent; do **not** emit all-true uniformly.

| Structure type | Next / Adhoc / WorkBasket / WorkBasketAdhoc |
|---|---|
| `Linear` (Start → Assignment* → End) | `true` / `true` / `false` / `false` |
| `Complex` (branching / smart-shape Utility) | `true` / `true` / `false` / `false` |
| ScreenFlow (`pyCategory: "ScreenFlow"`) | `true` / `true` / `false` / `false` |
| BPMN (`pyCategory: "BPMN"`) | preserve server values verbatim; varies by template |

Preserve verbatim on recreation. The `pyNextAssignmentWorkBasket` /
`pyNextAssignmentWorkBasketHolder` form-post companion pair (see
Rule-level form-post UI flags table above) is orthogonal to this quad —
those hold the selector/holder strings, not the routing booleans.

## Placeholder-row convention — which rule-level lists emit placeholders

The following rule-level arrays always emit a single empty placeholder
row even when the author has not added any entries:

- `pyLocalActions` / `pyLocalActionsPL` — `Embed-Pega-AssignAction` (**5 fields**: `pxObjClass`, `pyActionName`, `pyUseCaseApplication`, `pyUseCaseName`, `pyUseCaseWorkType` — all three use-case fields are part of the placeholder;).
- `pyPagesAndClasses` — `Embed-PagesAndClasses` (5 fields including `pyTemplateInputBox`).
- `pyWhensList` — `Embed-Rule-Whens` (pxObjClass + `pyWhenName`).
- `pyPrivilegeList` — `Embed-Rule-PrivilegeSecurity` (pxObjClass + `pyPrivilegeName` + `pyPrivilegeClass` defaulting to applies-to class).
- `pyParameters` / `pzRuleParameters` — one minimal `Embed-MethodParams` row.
- `pyCoveredBy` — one empty cover row.
- `pyStencils` — one empty stencil element.

**Exceptions (NOT placeholder-emitted):**

- `pyTicketShapes` — FlowStandard shapes emit a placeholder row
  `[{ "pxObjClass": "Data-MO-Event-Exception", "pyMOName": "" }]`;
  ScreenFlow shapes emit `[]`. See `references/shapes-assignment.md`.
- `pyModifiers` / `pyModifierRefs` — emit only when populated.

## Rule-level authoring-environment fields

On flows that have round-tripped through the rule-form editor (as
opposed to pure Process Modeler), the server writes an additional block
of authoring-environment fields alongside the form-post UI flags listed
below. Extend the form-post set with these — preserve verbatim on
update/recreation; authors MAY omit on fresh rule-authored flows.

| Field | Typical value on server | Notes |
|---|---|---|
| `pyMethodStatus` | `"Extension"` on derived flows; `""` otherwise | Rule-lineage status. |
| `pyPanelViewToggle` | `"Specification"` / `"Process"` | Last-used editor panel. |
| `pyLabelOld` | prior value of `pyLabel` | Old-shadow breadcrumb. Extends the existing `pyStartingHarnessOld` / `pyStartingModelOld` / `pyCanCreateWorkObjectOld` trio. |
| `pyFirstTimeOpenByLeftBrowser` | `"true"` / `"false"` | Editor-open bookkeeping. |
| `pySubProcessCategory` | `""` / `"ProcessFlow"` / `"ScreenFlow"` | Rule-level mirror of shape-level SplitForEach category. |
| `pyFlowCheckedOutIntoBranch` | branch name or `""` | Branch-checkout state. |
| `pyIsSourceRule` | `"true"` / `"false"` | Branch-source marker. |
| `pyOriginalRFB` | original ruleset / branch name | Rule-form provenance. |
| `pyVisioRFB` | Visio ruleset / branch name | Legacy Visio provenance. |
| `pyVisioOrientation` | `"Portrait"` / `"Landscape"` or `""` | Visio layout orientation. |
| `pyAcceptConversion` | `"true"` / `"false"` | Conversion-dialog accepted marker. |
| `pyHideLockIcon` | `"true"` / `"false"` | UI lock-icon visibility. |
| `pyRefreshViewHint` | `"true"` / `""` | View-refresh hint. |
| `pyShowROIcon` | `"true"` / `"false"` | Read-only icon visibility. |
| `pyCoveredByCount` | `"0"` (string) | Counter mirror of `pyCoveredBy` length. |
| `pyModelerDefaultClickMode` | `"Pan"` | Process Modeler default click mode. Distinct from the form-post block. |


