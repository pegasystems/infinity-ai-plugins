---
name: rules-rule-classmetadata
description: Load when creating or updating Pega class metadata rules (Rule-ClassMetadata). Covers primary fields for work and data classes, data-page bindings, and data-type local actions.
---

**Prerequisites:**

- Load `methodology-rule-authoring` first.
- Load `rules-rule-ui-view` when changing `pyPrimaryFields`; the metadata and
  `pyPrimaryFields` view must stay aligned.

## Examples

| Skill | Label | Description |
|---|---|---|
| `rules-rule-classmetadata/examples/stub` | classmetadata-stub | Smallest valid class metadata record |
| `rules-rule-classmetadata/examples/with-primary-fields` | classmetadata-with-primary-fields | Work-class metadata with an ordered `pyPrimaryFields` list |
| `rules-rule-classmetadata/examples/data-class` | classmetadata-data-class | Data-page bindings, embedded `Rule-Declare-Pages` snapshots, local actions, and primary fields |
| `rules-rule-classmetadata/examples/pyDataTypeLocalActions/update-details` | classmetadata-local-action-update-details | OOTB Edit action using `Embed-Pega-DataTypeAction-UpdateDetails` |
| `rules-rule-classmetadata/examples/pyDataTypeLocalActions/add` | classmetadata-local-action-add | OOTB Add action using `Embed-Pega-DataTypeAction-Add` |
| `rules-rule-classmetadata/examples/pyDataTypeLocalActions/delete` | classmetadata-local-action-delete | OOTB Delete action using `Embed-Pega-DataTypeAction-Delete` |
| `rules-rule-classmetadata/examples/pyDataTypeLocalActions/custom` | classmetadata-local-action-custom | Custom data-type action using `Embed-Pega-DataTypeAction-Custom` |

## References

| Skill | Label | Description |
|---|---|---|
| `rules-rule-classmetadata/references/primary-fields` | classmetadata-primary-fields | Load when deciding what belongs in `pyPrimaryFields` or explaining what it affects |

## Authoring notes

### Identity

`pyClassName` is the sole identity value the agent supplies. The builder derives
`pyRuleName` and `pyLabel` from it. Pass `Rule-ClassMetadata` as both the
`create-rule` `ruleType` and content `pxObjClass`; validation auto-fills the
content field if omitted, but including it follows the tool contract.

There is at most one Class Metadata rule per class. Call `list-rules` with the
exact class first. Update the returned rule when it exists; create one only when
the class has no Class Metadata rule.

### Adding a property to primary fields

Perform all five steps:

#### 1. Ensure the property exists on the class. Create it first if needed.

#### 2. Find the ClassMetadata rule using list-rules

```
list-rules(ruleType="Rule-ClassMetadata", className="MyOrg-MyApp-Work-MyCase")
```

#### 3. Read current primary fields using get-rule

```
get-rule(key="{ClassMetadata key}", detail="full")
```

Extract the `pyPrimaryFields` array.

#### 4. Append the property to the complete array

Load `rules-rule-classmetadata/examples/with-primary-fields` for the payload shape. Call
`update-rule` with the complete intended `pyPrimaryFields` array and
`listUpdateMode="replace"`.

Include every retained entry. The default `listUpdateMode="patch"` merges list
elements by position and preserves omitted trailing entries; it does not append
a shorter array. Use `replace` for deterministic add, remove, and reorder changes.

#### 5. Update the `pyPrimaryFields` view

Follow `view-update-workflow` from `rules-rule-ui-view`.

### `pyPrimaryFields` ordering

For `Work-` subclasses the conventional first four entries are `pyID`,
`pyLabel`, `pxUrgencyWork`, `pyStatusWork`; case-specific properties follow.

For `Data-` subclasses, pick 2–4 properties: the class key
(`pyKeyDefList`) plus whichever properties a human would use to recognize a
specific record at a glance (a name/title field, optionally one
grouping/context field). Do not just inspect a sibling data class for a
convention — there isn't a fixed platform prefix for Data- classes the way
there is for Work-; choose based on what best identifies *this* class's
records.

**Always pair this with the view layer.** A freshly-built Data Type's
`pySummary` view ships with an empty "Primary fields" region by design.
Infinity Studio's Data Designer UI labels this region
**"Highlighted fields"** — the same label used for the analogous region on
a Work class's `pyCaseSummary` (see
`rules-rule-ui-view/references/view-update-workflow`'s Operational Notes).

Setting `Rule-ClassMetadata.pyPrimaryFields` alone does not populate this
region. Data classes use the same two-layer pattern as Work classes (see
`rules-rule-ui-view/references/view-update-workflow`'s "Primary Fields — Two-Layer Pattern"): the metadata
array and a separate `pyPrimaryFields` **view** rule are both required.

A Data class can have three distinct `Rule-UI-View` instances:

- `pySummary` — summary view
- `pyPrimaryFields` — highlighted/primary fields view
- `pyReview` — Details tab

Use `list-rules(ruleType="Rule-UI-View", className="{DataClass}")` to check
which of these exist. **Create** any that are missing, rather than updating
an unrelated view, and use the matching field set. See
`rules-rule-ui-view/references/view-update-workflow`
for the full pattern.

### Data-class shape — three coupled blocks

For `Data-` subclasses the three data-page bindings travel together:

| String binding | Embedded snapshot | Notes |
|----------------|-------------------|-------|
| `pyListDataPage` | `pyListDataPageInfo` | List page; no `pyDOParamList`, no `pyIsAlternateKeyStorage` |
| `pyLookUpDataPage` | `pyLookUpDataPageInfo` | Sets `pyIsAlternateKeyStorage="true"`; carries `pyDOParamList` (typically a single `pyGUID` STRING IN parameter) |
| `pySavableDataPage` | `pySavableDataPageInfo` | Same shape as the lookup info page; usually points to the same data page name as `pyLookUpDataPage` |

If you set the string binding, also send the corresponding `*Info` snapshot.
Pega's data-object tooling expects both halves. Ensure the named data
pages already exist in the application; bindings to missing pages save via
the API but fail when the data-object UI tries to open them.

### `pyDataTypeLocalActions[].pxObjClass` is action-specific

Each entry in `pyDataTypeLocalActions` uses an action-specific embed class
(e.g., `Embed-Pega-DataTypeAction-UpdateDetails` for the OOTB Edit action).
Unlike most embed classes, this is not a single auto-fill default — pick the
subclass that matches the action type. Inspect a sibling data class with
`get-rule` to see what actions and subclasses the application uses.

## See also

- `rules-rule-classmetadata/references/primary-fields` — what `pyPrimaryFields`
  is and what it drives.
- `rules-rule-ui-view/references/view-update-workflow` — how to update the `pyPrimaryFields` view after
  changing class metadata.
