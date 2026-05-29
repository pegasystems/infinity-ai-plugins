---
name: rules-rule-obj-flowaction
description: Schema and authoring guide for Pega flow action rules (Rule-Obj-FlowAction), including view wiring, lifecycle hooks, guards, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first for general create/update
workflows, deep merge semantics, and update examples that apply to all rule types.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Flow Action` | Minimal local action — smallest valid create payload for Constellation apps, with draft-mode pattern |
| `Connector Action (Assignment Shape)` | Connector action wired to an assignment shape in a flow (`pyUsedAs: "LOCALANDCONNECTOR"`) |
| `Simple Local Action (Traditional HTML)` | Local action for pre-8.4 apps using Rule-HTML-Section |
| `Guarded Action with Lifecycle Hooks` | Action with pre-processing activity, validation, data transform, privilege guard, and when guard |
| `Pre-Processing Data Transform` | Pre-processing data transform to populate fields before form display |
| `Pre-Processing Activity` | Pre-processing activity to load external data before form renders |
| `Post-Processing Data Transform` | Post-processing data transform (`pyActionTransformRule`) to compute values after submit |
| `Post-Processing Activity` | Post-processing activity (`pyLocalActionActivity`) to run logic after submit |
| `Combined Pre and Post Processing` | Full lifecycle: pre-processing activity + data transform, post-processing transform + validation |

## References

| Skill | When to load |
|-------|--------------|
| `flowaction-assignment-preview` | Displaying external/integrated data on a Constellation assignment view with live field-change refresh — architecture, timing, `pxFARefreshSettingsOfView` wiring, embedded display page pattern |

### Code generation (critical — controls pySourceStream generation)

| Field | Default | Purpose |
|-------|---------|---------|
| `pyAutoHTML` | `"true"` | Enables auto-generated HTML stream |
| `pyHTMLVersion` | `"1"` | HTML version for modern JSP syntax |
| `pyJavaGenerateAPIVersion` | `"04-02"` | Modern `<%...%>` JSP code path (vs legacy `{%...%}`) |
| `pyClientRuntimeVersion` | `"05-03"` | Offline template + inspector integration |
| `pyCompact` | `"true"` | Compact rendering mode |

**Without these fields**, `pzAssemblePreProcess` generates legacy `{%...%}` syntax
with explicit `{include}` directives, no offline support, and no inspector integration.

### Design template

| Field | Default | Notes |
|-------|---------|-------|
| `pyIsUsingDesignTemplate` | — | **Must be set explicitly to `"true"` for Pega 8.4+** (Constellation/Cosmos apps). Not auto-filled. Leave blank or `"false"` for pre-8.4 traditional HTML apps. |
| `pyDesignTemplateName` | `"pzDesignTemplate1Column"` | Auto-filled when `pyIsUsingDesignTemplate` is true |
| `pyDesignTemplateInsName` | `"@BASECLASS!PZDESIGNTEMPLATE1COLUMN"` | Auto-filled |
| `pyDesignTemplateLabel` | `"1 Column"` | Auto-filled |
| `pyDesignTemplateIcon` | `"webwb/pzDesignTemplate1Column.svg"` | Auto-filled |

**Important:** Always set `pyIsUsingDesignTemplate: "true"` explicitly when creating
flow actions for Constellation apps (Pega 8.4+). The design template fields
(`pyDesignTemplateName`, etc.) are auto-filled, but the enabling flag is not.
For pre-8.4 traditional HTML apps, omit this field or set it to `"false"`.

### Button/label configuration

| Field | Default |
|-------|---------|
| `pyShowFAButtons` | `"false"` |
| `pyCustomizeFALabels` | `"false"` |
| `pySubmitLabel` | `"Submit"` |
| `pyCancelLabel` | `"Cancel"` |
| `pyNextLabel` | `"Next"` |
| `pyPreviousLabel` | `"Previous"` |
| `pySaveButtonVisibility` | `"Always"` |
| `pySaveLabel` | `"Save for later"` |

### Runtime editing

| Field | Default | Notes |
|-------|---------|-------|
| `pyAllowRuntimeEdit` | — | **Must be set explicitly to `"true"` for Pega 8.4+** (Constellation/Cosmos apps). Not auto-filled. When `"true"`, the flow action can be modified at runtime (e.g., via App Studio or case designer). Set to `"false"` to lock the flow action from runtime modifications. Leave blank or `"false"` for pre-8.4 traditional HTML apps. |

**Important:** Always set `pyAllowRuntimeEdit: "true"` explicitly when creating
flow actions for Constellation apps (Pega 8.4+). This field is not auto-filled
by the builder. Omitting it may result in the flow action being locked from
runtime modifications. For pre-8.4 traditional HTML apps, omit this field or
set it to `"false"`.

### Behavioral defaults

| Field | Default |
|-------|---------|
| `pyDisqualifyAction` | `"true"` |
| `pyDisplayMode` | `"basic"` |
| `pySectionReferencePassParamPage` | `"true"` |
| `pyActionInstructionsCaption` | `"Instructions"` |
| `pySortDateCircumWithinRSMajor` | `"true"` |
| `pyHelpType` | `"DEFINE"` |
| `pyCategoryDisplayName` | `"None"` |

### Explicit false/zero defaults

| Field | Default |
|-------|---------|
| `pyExpressionCalculation` | `"false"` |
| `pyJSRCompliant` | `"false"` |
| `pyBulkOnlyAction` | `"false"` |
| `pyAuditUse` | `"false"` |
| `pyUpdateStatus` | `"false"` |
| `pyNextAssignmentCover` | `"false"` |
| `pyNextAssignmentFlow` | `"false"` |
| `pyNextAssignmentWorkBasket` | `"false"` |
| `pyLocalized` | `"false"` |
| `pySystemAction` | `"false"` |
| `pyAccessibilityCount` | `"0"` |
| `pyAccessibilityLevel` | `"0"` |

Any auto-filled field can be overridden by including it in the create payload
with a different value (e.g., `"pyUpdateStatus": "true"` in the guarded action
example).

## Authoring Notes

### `pyActionName` is the class key

`pyActionName` is the identity key (from `pyKeyDefList`) and the value the
agent must supply. `pyRuleName` and `pyStreamName` are both auto-derived
from `pyActionName` and can be omitted.

### `pyViewReference` vs `pySectionReference` — set one, blank the other

| UI Framework | Form body rule | FlowAction field |
|---|---|---|
| Cosmos/Constellation (8.4+) | `Rule-UI-View` | `pyViewReference` |
| Traditional HTML (pre-8.4) | `Rule-HTML-Section` | `pySectionReference` |

Always set `pyViewReference` explicitly for Constellation apps — auto-derivation
via `pzAssemblePreProcess` is unreliable for newly created flow actions. Never
create a `Rule-UI-Section` for a flow action; always use `Rule-UI-View`.

#### Draft-mode pattern

When the backing `Rule-UI-View` does not exist yet (e.g., creating a flow action
before authoring the view), use the draft-mode stub section instead of a real
view reference:

| Field | Value |
|---|---|
| `pyViewReference` | `""` |
| `pySectionReference` | `"pzActionStubDraftMode"` |

This is safe when the flow has `pyDraftModeON: "true"`. The stub section renders
a placeholder form at runtime. Replace with the real view reference once the
`Rule-UI-View` is created.

### `pyUsedAs` must be set explicitly

If omitted, `pzAssemblePreProcess` defaults to `"LOCALANDCONNECTOR"`.
Always set this field explicitly.

| Value | Meaning | Typical use |
|---|---|---|
| `"LOCALACTION"` | Available only as a local action on assignment forms | Standard local actions not wired to flow connectors |
| `"LOCALANDCONNECTOR"` | Available as both a local action and a flow connector | Actions wired to assignment shape connectors in a flow |
| `"CONNECTORACTION"` | Available only as a flow connector (not as a local action) | Flow-only routing actions that should not appear on forms |

### `pyContainerType`

| Value | When to use |
|---|---|
| `"NOHEADER"` | Local actions (`pyUsedAs: "LOCALACTION"`) — renders without a header bar |
| `"STANDARD"` | Connector actions (`pyUsedAs: "LOCALANDCONNECTOR"` or `"CONNECTORACTION"`) — renders with a standard header |

### `pyOldStreamType = "Rule-HTML-Section"` is required at create time

Despite the name, this must be `"Rule-HTML-Section"` even for Cosmos apps.
Controls `pzAssemblePreProcess` HTML generation. Validate auto-sets it to
`"NO_UI"` when `pySectionReference` is empty. This field is auto-filled by
the schema.

### `pyconfirmchoice` has a lowercase 'c'

Field name is `pyconfirmchoice` (not `pyConfirmChoice`). Value is always
`"ShowHarness"`.

### Status update requires paired fields

When `pyUpdateStatus = true`, both `pyProposedStatus` (valid `pyStatusWork`
FieldValue) and `pyValidateActivity` (valid `Rule-Obj-Validate`) are required
or save will be blocked. Note that `pyUpdateStatus` auto-fills to `"false"`,
so it must be explicitly set to `"true"` when a status update is needed.

### `pyPageContext` / `pyUsingPage` pairing

When the section needs to render against a specific clipboard page or data page
rather than the current work object, set `pyPageContext` on the
`pySections[0]` element (HarnessSection level) and `pyUsingPage` on the
`pySections[0].pySectionBody[0]` element (HarnessSectionBody level).

| `pyPageContext` value | `pySectionBody[].pyUsingPage` | Example |
|---|---|---|
| `none` (default) | Empty — section uses the current work object | Most flow actions |
| `clipboard` | Required — clipboard page name | `pyAttachmentPage`, `TempChannelPage` |
| `datapage` | Required — data page name | `D_MyDataPage` |
| `property` | Required — property reference (rare, not observed in sample) | — |

Key details:
- The page name is set at the **sectionBody level** (`pySectionBody[0].pyUsingPage`),
  **not** at the section level (`pySections[0].pyUsingPage` is always empty).
- The top-level `pySectionReferencePage` field always mirrors the sectionBody-level
  `pyUsingPage` and is auto-managed — do not set it independently.
- The schema enforces this pairing via an `if/then` conditional on `HarnessSection`:
  when `pyPageContext` is `clipboard`, `datapage`, or `property`, `pyUsingPage` on
  the nested `HarnessSectionBody` must be non-empty.

### Flow wiring for connector actions

After creating a flow action with `pyUsedAs: "LOCALANDCONNECTOR"` or `"CONNECTORACTION"`,
wire it to an assignment shape connector in the flow rule:

- The connector's `pyExpression` must match the flow action's `pyActionName`
  (e.g., `"ConsolidateNotes"`)
- The `pyFromTasks` routing table entry must use `pyExpressionType: "STATUS"`
  with `pyExpression` matching the action name

See the `rules-rule-obj-flow` skill for full flow shape and connector structure.

### Lifecycle hooks

| Field | When it runs | User input available? | Purpose |
|---|---|---|---|
| `pyPreProcessingActivity` | Before form display | **No** — user has not typed anything | Load dropdown values, initialize pages, pre-populate fields |
| `pyPreProcessingTransformRule` | Before form display (after pre-processing activity) | **No** — user has not typed anything | Data Transform to initialize/set field values before form renders |
| `pxFARefreshSettingsOfView` | On field value change | **Yes** — triggered by user changing a driving field | Live preview — run a DT to update display data while the user is still on the form |
| `pyValidateActivity` | After submit (before transform) | **Yes** — all fields submitted | Validate form input; block submission on failure |
| `pyActionTransformRule` | After submit (after validation) | **Yes** — all fields submitted | Transform data, set derived values before flow continues. **Too late for preview** in screen flows. |
| `pyLocalActionActivity` | After submit (after transform) | **Yes** — all fields submitted | Post-processing activity — run logic (e.g., call a service, set routing) after the data transform executes |

**`pyPreProcessingActivity` is not for same-form input.** It runs before the
form is displayed. If you need to react to values the user types into the
current form, use `pxFARefreshSettingsOfView` for live preview or
`pyActionTransformRule` for submit-time processing.

**`pxFARefreshSettingsOfView`** wires field changes to Data Transforms. See
`flowaction-assignment-preview` for the full pattern, shape definition, and
implementation checklist.

**`pyActionTransformRule` must reference a Data Transform (`Rule-Obj-Model`),
not an Activity.** Setting it to an activity name causes a runtime error. If
activity logic is needed on submit, either wrap the logic in a Data Transform
that calls the activity via `APPLY_MODEL`, or wire the activity as a
post-flow-action step in the flow itself (e.g., a utility shape after the
assignment).

**`pyActionTransformRule` is the post-processing data transform.** Do not
confuse it with `pyAdditionalSubmitFieldsDataTransform` — that is a separate
Constellation-specific field for setting computed fields on submit (see
`flowaction-assignment-preview`). When adding a post-submit data transform to
a flow action, always use `pyActionTransformRule`.

**Same-name ambiguity:** If a Data Transform and an Activity share the same
name on the same class, `pyActionTransformRule` always resolves to the Data
Transform. A flow utility shape with the same name may invoke the Activity.
Avoid same-name rules across types — use distinct names that reflect purpose
(e.g., DT: `ProcessSelectedResults`, Activity: `PersistSelectedResults`).

### Guards

Flow actions can be conditionally hidden or restricted:

| Field | Type | Purpose |
|---|---|---|
| `pyActionWhensList` | List of `{ pyWhenName }` | Action only appears when all listed when rules evaluate to true |
| `pyActionPrivilegeList` | List of `{ pyPrivilegeName, pyPrivilegeClass }` | Restricts action to operators with the named privilege on the specified class |

### `pxLimitedAccess`

Controls whether the action is available in production environments.
`pxLimitedAccess: "Prod"` means the action **is** accessible in production.
When omitted or empty, the action has no production access restriction.

### Copying FlowActions with mixed legacy/Constellation fields

Base or OOTB FlowActions may have both `pyViewReference` and
`pySectionReference` set (mixed legacy + Constellation wiring). `copy-rule`
rejects this combination:
```
/pySectionReference: must be at most 0 characters long
/pyViewReference: must be at most 0 characters long
```

**Workaround:** Do not copy-rule. Instead, create a clean branch FlowAction:
- For Constellation: set `pyViewReference` to the view name, leave
  `pySectionReference` blank.
- For draft mode: set `pySectionReference: "pzActionStubDraftMode"`, leave
  `pyViewReference` blank.

Copy the remaining fields (guards, hooks, connector wiring) manually from the
base FlowAction's `get-rule` output.
