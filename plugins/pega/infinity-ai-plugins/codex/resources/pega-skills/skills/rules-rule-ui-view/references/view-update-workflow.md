---
name: view-update-workflow
description: "Standard view update workflow — find key, read state, build update, apply, verify — plus Primary Fields two-layer pattern and common variations"
---
# View Update Workflow

End-to-end sequence for adding, updating, or removing fields on any Constellation
case view. Applies to pyCaseSummary, pyReview, pyPrimaryFields, and assignment
step views.

## Primary Fields — Two-Layer Pattern

"Marking a field as primary" requires updating **two separate rules**, not one:

| Layer | Rule type | What it controls |
|---|---|---|
| **View layer** | `Rule-UI-View` (`pyPrimaryFields`) | Runtime rendering — fields shown in the 2-column Primary Fields panel on assignment screens |
| **Metadata layer** | `Rule-ClassMetadata` (`pyPrimaryFields` array) | Design-time designation — drives App Studio, Case Designer, and AI-assisted field placement |

Updating the view without the metadata means the field renders at runtime but App Studio
does not recognise it as primary. Updating the metadata without the view means App Studio
shows it as primary but it does not appear in the panel.

**Always do both.** For the metadata layer, load `pega-primary-fields` — it documents the
`Rule-ClassMetadata` update pattern, the `Pega-Fields` array structure, and the
branch-awareness check required to avoid shadow-rule pitfalls.

## Step 0: Find the view's instance key

**Tool:** `list-rules`
**Parameters:**
- `ruleType`: `"Rule-UI-View"`
- `className`: the case type class (e.g., `OZQTW1-DataCenter-Work-OutageManagement`)

**What to look for:**
- `pyCaseSummary` — Summary sidebar
- `pyReview` — Details tab
- `pyPrimaryFields` — Primary fields panel
- A view named after a flow action (e.g., `TriageOutage`) — assignment step form

**For assignment step views:** Do not guess the view name. Use the
"Finding the Assignment Form View" traversal in `rules-rule-ui-view/references/case-view-architecture`
(flow → FlowAction →
`pyViewReference`) to confirm the exact name of the backing view before searching
for it here.

Record the full instance key (e.g., `RULE-UI-VIEW OZQTW1-DATACENTER-WORK-OUTAGEMANAGEMENT PYREVIEW #20260318T201242.836 GMT`).

## Step 1: Read the current view state

**Tool:** `get-rule`
**Parameters:**
- `key`: the view's instance key from Step 0
- `detail`: `"full"`

**Why:** `update-rule` patches arrays **positionally by index** by default. If you
send only the new entry as a 1-element array, it is merged into element 0 of the
existing array rather than appended. Build either:

- sparse arrays with `{}` no-op placeholders up to the positions you want to touch, or
- the complete desired arrays and call `update-rule` with `listUpdateMode="replace"`
  when you are replacing the whole list.

**Extract and hold these three fields:**
- `pyContent` — the outer content array (regions containing nested field entries)
- `pxViewMetadata` — the JSON layout tree (regions → children)
- `pxContextMetadata` — the dependency index ($properties, $fields, $associated)

## Step 2: Build the updated field arrays

Construct the updated versions of all three fields using one consistent strategy for
each surface: sparse positional patches with `{}` placeholders, or complete desired
arrays when you intend to replace the whole list.

Before constructing arrays, confirm all requested backing properties exist. If any
are missing, create those properties first, then resume this step.

## Step 3: Apply the update

If working in a branch and the view is not already in the branch ruleset, use
`copy-rule` to create a branch copy with your modifications applied. Otherwise:

**Tool:** `update-rule`
**Parameters:**
- `key`: the view's instance key
- `updates`: JSON object containing the complete updated `pyContent`,
  `pxViewMetadata`, and `pxContextMetadata`
- `changeRequestID`: the active Change Request key
- `listUpdateMode`: omit / `"patch"` for sparse positional updates; use `"replace"`
  when sending the full desired arrays
- `listUpdateModeOverrides`: optional exact-path overrides when one nested list needs
  a different mode than the global default

## Step 4: Verify

**Tool:** `get-rule`
**Parameters:**
- `key`: the view's instance key
- `detail`: `"full"`

**Check:**
- `pxSaveDateTime` advanced to a timestamp after your update
- `pyRuleFormStatus` is `"Good"`
- `pyContent` has the expected number of entries (previous count + new fields added)
- `pxContextMetadata.$properties` includes all new property names

## Common Variations

- **Remove a field:** Fetch the view, rebuild `pyContent`, `pxViewMetadata`, and
  `pxContextMetadata` without the field entry, and call `update-rule` with the
  trimmed arrays.
- **Reorder fields:** Same pattern — fetch, reconstruct the arrays in the desired
  order, update.
- **Add to assignment step (not pyReview):** Use the same steps but target the
  assignment view. **First use the "Finding the Assignment Form View" traversal in
  `rules-rule-ui-view/references/case-view-architecture` (flow → FlowAction → view) to confirm the correct view name** — do not
  assume it matches the step name or search for views generically.
- **Read-only field in assignment view:** Add `"readOnly": true` to the field's
  `config` node in `pxViewMetadata`. The field will display but not accept input.
- **Two-column layout:** `pyPrimaryFields` uses a 2-column `DefaultForm` template.
  Fields are laid out in columns automatically — no extra config is needed.
- **Dropdown fields:** See `rules-rule-ui-view/examples/append/dropdown-field` for the full
  three-surface wiring pattern (or `rules-rule-ui-view/examples/pyContent/dropdown` and
  `rules-rule-ui-view/examples/pxViewMetadata/dropdown` for individual surface entries). All
  three surfaces (pyContent, pxViewMetadata, pxContextMetadata) must be wired
  in a single `update-rule` call — if any surface is missing, the dropdown
  renders but shows no options.

## Operational Notes

- `pyDetails` is the page shell only — it holds no scalar fields. Do not edit it
  to add fields to the Details tab; edit `pyReview` instead.
- `pyCaseSummary` has two regions: `Primary fields` (header strip, keep to 2–3
  items) and `Secondary fields` (expandable metadata list). Most new fields belong
  in Secondary. In the Pega Designer UI, "Primary fields" is labeled **"Highlighted
  fields"** and "Secondary fields" is labeled **"Summary"**. When the user says
  "add to the Summary View", default to the `"Secondary fields"` region.
- All three surfaces (`pyContent`, `pxViewMetadata`, `pxContextMetadata`) must be
  updated together in a single `update-rule` call. Updating only one surface leaves
  the view in a partially inconsistent state that may render incorrectly.
- Dot notation is only valid in `listUpdateModeOverrides`. Payload keys inside
  `updates` must stay nested JSON objects.
- `pxCommitDateTime` may not advance on some Pega instances after an update-rule
  call. Use `pxSaveDateTime` and `pyRuleFormStatus: Good` to confirm persistence.
- The `pxRuleReferences` index does not auto-rebuild on API saves — the stale count
  does not affect runtime rendering. Authoritative state is in `pyContent` and
  `pxViewMetadata`.
