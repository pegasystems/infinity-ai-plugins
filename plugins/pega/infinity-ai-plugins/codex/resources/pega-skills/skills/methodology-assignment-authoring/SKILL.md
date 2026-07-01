---
name: methodology-assignment-authoring
description: "Load when creating or modifying Assignment steps in a Pega flow. Covers new step creation (FlowAction + View) and form field changes. References rule-type skills for examples and patterns."
---

Orchestration guide for creating new Assignment steps or modifying fields on existing
Assignment step forms. This skill references other skills for examples and detailed
patterns.

## Prerequisites

- Load `methodology-change-request-workflow` for the ChangeRequest lifecycle.
- Load `methodology-rule-authoring` for general create/update workflows.

## Scenario A — Create a New Assignment Step

Use this when the Assignment step does not yet exist (no FlowAction or View rule
exists for this step name).

### Step 1: Identify the target flow

Find and inspect the flow that should contain the new Assignment step.

**Load:** `rules-rule-obj-flow`

Note the current shape sequence and identify the insertion point.

### Step 2: Choose a name

Assignment step names follow PascalCase verb+noun convention (e.g., `ReviewRequest`,
`ApproveProposal`, `ConfirmDetails`). The FlowAction and View must share the same name.

Verify the name is not already in use on the case class.

### Step 3: Create required properties

For each field that will appear on the form, ensure the backing property exists.

**Load:** `rules-rule-obj-property`

Create any missing properties before proceeding. Properties must exist before the
view can reference them.

### Step 4: Create the View

Create the `Rule-UI-View` that backs the assignment form.

**Load:** `rules-rule-ui-view`

Key fields:

| Field | Value |
|-------|-------|
| `pxInsName` | Same name as the FlowAction |
| `pyClassName` | Case type class |
| `pyTemplateName` | `DefaultForm` |

After creation, verify with `get-rule`: `pyRuleFormStatus: Good`.

### Step 5: Create the FlowAction

Create the `Rule-Obj-FlowAction` that controls the assignment step.

**Load:** `rules-rule-obj-flowaction`

**Reference:** `view-assignment-flowaction-wiring` for
the `pyViewReference` vs `pySectionReference` wiring rules.

Key fields:

| Field | Value |
|-------|-------|
| `pyActionName` | Step name (e.g., `ReviewRequest`) |
| `pyViewReference` | Same as step name (for Constellation apps) |
| `pySectionReference` | `""` (blank for Constellation apps) |
| `pyUsedAs` | `"LOCALACTION"` |

After creation, verify with `get-rule`: `pyRuleFormStatus: Good`.

### Step 6: Wire the Assignment shape into the flow

Add the new Assignment shape to the target flow at the desired position.

**Load:** `rules-rule-obj-flow`

**Reference:** `flowaction-wiring-patterns` for
routing patterns.

**Reference:** `rules-rule-obj-flow/examples/shapes/assignment-worklist` for shape JSON.

Update connectors to link the new shape into the flow sequence.

After update, verify with `get-rule` on the flow: `pyRuleFormStatus: Good`.

*After completing Scenario A, proceed to Scenario B Step 3 if you need to add
fields to the newly created view.*

---

## Scenario B — Modify an Existing Assignment Step

Use this when the FlowAction and View already exist for the step.

### Step 1: Find the Assignment step's rules

**Start from the flow — do not guess the view name.**

**Reference:** `view-assignment-inspection` for the
full discovery workflow (flow -> FlowAction -> `pyViewReference` -> View).

Record the `pzInsKey` for the FlowAction and View.

### Step 2: Inspect the FlowAction

Use `get-rule` with `detail="full"` on the FlowAction.

**Reference:** `view-assignment-flowaction-wiring` for
wiring rules and what to look for.

If `pyViewReference` is blank and `pySectionReference` is populated, the FlowAction
uses legacy wiring and must be updated for Constellation.

### Step 3: Inspect the View

Use `get-rule` with `detail="full"` on the View.

**Load:** `rules-rule-ui-view` for the three-surface structure (`pyContent`,
`pxViewMetadata`, `pxContextMetadata`).

### Step 4: Classify each field change

**Reference:** `view-assignment-update-patterns` for
the classification table and update patterns.

| Classification | Condition | Action |
|----------------|-----------|--------|
| **A — New** | Property does not exist | Create property, then add to view |
| **B — Add to view** | Property exists, not in view | Add to view only |
| **C — Update view entry** | Change component, order, or read-only | Update view entry |
| **D — Update property** | Change label, max length, description | Update property, then view if needed |
| **E — Remove from view** | Remove field from form | Remove from all three surfaces |

### Step 5: Create missing properties (Classification A only)

**Load:** `rules-rule-obj-property`

Create all missing properties before updating the view.

### Step 6: Update the View

Apply all field changes in a **single** `update-rule` call.

**Reference:** `view-update-workflow` for the
standard workflow (find, read, update, verify).

**Reference:** `view-assignment-update-patterns` for
field-specific patterns:

| Pattern | Skill |
|---------|-------|
| Add a text field | `Append Text Field` |
| Add a dropdown field | `Append Dropdown Field` |
| Add a date field | `Append DateTime Field` |
| Add a data reference | `Append Data Reference Field` |
| Make a field required | `view-field-patterns` |
| Make a field read-only | `view-assignment-update-patterns` |
| Reorder fields | `view-assignment-update-patterns` |
| Remove a field | `view-assignment-update-patterns` |

**Critical:** Always update `pyContent`, `pxViewMetadata`, and `pxContextMetadata`
together in a single call.

### Step 7: Verify

Use `get-rule` with `detail="full"` on the View.

**Check:**
- `pyRuleFormStatus: Good`
- `pxWarnings[0]` is empty
- `pyContent` count matches expected field count
- `pxContextMetadata.$fields` reflects final field set

---

## Common Variations

| Variation | Skill |
|-----------|-------|
| Dropdown with FieldValue prompt list | `Append Dropdown Field` |
| Required field (two-surface wiring) | `view-field-patterns` |
| Conditional visibility (When rule) | `view-field-patterns` |
| Data reference field | `view-path-b-data-reference` |
| Embedded data field | `view-path-a-embedded-data` |
| Pre-processing activity | `rules-rule-obj-flowaction` (lifecycle hooks section) |
| Post-processing data transform | `rules-rule-obj-flowaction` (lifecycle hooks section) |
| Server-side validation | `rules-rule-obj-flowaction` (`pyValidateActivity` field) |

---

## Verification Checklist

- [ ] Properties (Classification A): `pyRuleFormStatus: Good`
- [ ] View: `pyRuleFormStatus: Good`; `pxWarnings[0]` empty
- [ ] FlowAction: `pyRuleFormStatus: Good`; `pyViewReference` set (Constellation)
- [ ] All three view surfaces updated together
- [ ] `pxContextMetadata.$fields` matches final field set

---

## Dependency Order

```
[New Assignment Step]
  1. Create properties (Rule-Obj-Property)
  2. Create View (Rule-UI-View)
  3. Create FlowAction (Rule-Obj-FlowAction)
  4. Update Flow: add Assignment shape + connectors

[Modify Existing Step]
  1. Create missing properties (if Classification A)
  2. Update View (all three surfaces together)
```

Properties must exist before the View references them. The View should exist before
the FlowAction references it (or use draft-mode wiring).
