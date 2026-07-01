---
name: view-data-field-troubleshooting
description: "Troubleshooting guide, common variations, and operational notes for data field authoring"
---
# Data Field Troubleshooting & Variations

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Embedded field renders blank | Sub-view missing from `pxContextMetadata.$views` | Re-update the parent view; add the `$views` entry |
| Data Reference picker shows no results | Data page missing or not in `$pagelists` | Create the data page (Path B Step B4); add to `$pagelists` |
| Data Reference picker shows but doesn't save | `classKeys` misconfigured in DataReference view | Verify `classKeys` matches the data class key property (usually `pyGUID`) |
| "Property not found" on create-rule | Page/PageList property not created yet | Complete the Page property step before view wiring |
| Sub-view fields are empty | Properties not created on the data class | Complete Step 3; verify with `list-rules` |
| Wrong class on sub-view | `pyClassName` points to parent instead of data class | Sub-view must use the **data class** as `pyClassName` |
| User Reference doesn't resolve names | `$users` array missing the property path | Add property path to `pxContextMetadata.$users` |
| SimpleTable columns don't render | Columns defined at wrong nesting level | Columns go in `config.children[0].children` (inside a Columns Region) |
| Multiple embedded refs share same pyFieldReference | Different `context`/`authorContext` paths target different page paths | Valid — each renders independently based on its own context path and sub-view name |

## Common Variations

### Adding to an Existing Sub-View

If the sub-view already exists and just needs new fields, skip class/view creation
and use `rules-rule-ui-view/references/view-update-workflow` to add fields to the existing view.

### Multiple Data Fields

Repeat the relevant path for each data field. Each may share a data class or need
its own.

### Multiple Embedded References on Same Page Property

Multiple embedded data fields CAN share the same `pyFieldReference` when targeting
different nested page paths via different `context`/`authorContext` values. Each
renders independently.

## Notes

- The dependency chains are strict. Skipping a step causes downstream create failures.
- Always verify with `list-rules` between steps. The cost of a verification call is
  far less than debugging a failed create.
- Path B (Data Reference) is the most complex — it adds a data page and a standalone
  DataReference template view on top of the shared class/properties foundation.
