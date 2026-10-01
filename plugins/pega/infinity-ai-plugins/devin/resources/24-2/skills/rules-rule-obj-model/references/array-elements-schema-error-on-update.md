---
name: json-dt-array-elements-schema-error
description: Resolve "schema for 'pyArrayElements' is false" / "schema for 'pyListProperty' is false" errors on update-rule against an existing Object-top-level JSON Data Transform — recognize the pre-existing invalid state and recreate the rule instead of retrying the update.
---

# Troubleshooting: "schema for 'pyArrayElements' is false" on `update-rule`

## Symptom

Calling `update-rule` against an **existing** `Rule-Obj-Model` (JSON-format,
`pyTopLevelElement: "Object"`) fails with a schema validation error resembling:

```
ERRORS (3):
  - /pyMappingModel/pyArrayElements: schema for 'pyArrayElements' is false
  - /pyMappingModel/pyListProperty: schema for 'pyListProperty' is false
  - /pyMappingModel: must not be valid to the schema {"required":["pyArrayElements"]}
```

This happens on rules that already have `pyArrayElements` (and/or `pyListProperty`)
populated (e.g. `pyArrayElements: "Objects"`) even though `pyTopLevelElement` is
`"Object"` (not `"Array"`) — an invalid combination per schema (array fields must be
completely **absent** for Object top-level, not merely empty). This is a confirmed,
reproducible platform behavior, not an isolated incident: the platform itself (Dev
Studio UI, or the Blueprint/generator pipeline) can produce and persist this invalid
combination without complaint — **the rule is already saved in this invalid-per-schema
state before the agent ever touches it.** The error is not caused by anything new in
the update payload.

## Why it recurs on every retry

`update-rule` performs a patch-style deep merge (see `methodology-rule-authoring` →
"Deep merge semantics"). It **cannot unset an already-populated scalar field** by
omitting it from the update payload — omission means "leave unchanged," not "clear" —
and there is no sentinel value for clearing a scalar (the `{"__delete": true}`
sentinel only works for Map/PageGroup list entries, not scalar fields). Every retry
that changes anything else on the same rule re-validates the **full merged object**
and hits the same pre-existing violation again, regardless of what the new payload
contains. Changing the update payload will not fix this — stop retrying variations of
it.

This confirms a callout already documented in `model-json-data-transforms` (the JSON
Data Transform reference, under "Top-level element structure"):

> **`pyTopLevelElement` cannot be changed in place via `update-rule`.** The schema
> requires `pyArrayElements`/`pyListProperty` to be completely absent when
> `pyTopLevelElement: "Object"` (not merely empty), and `update-rule`'s patch-style
> merge cannot unset scalar fields a prior save already populated — every retry fails
> the same way. Create a new Data Transform with the target shape instead of trying to
> convert an existing one.

Verify that callout is still present and current before assuming this note is
redundant — this file exists to capture the exact error text and confirm the pattern
recurs, not to restate the mechanism.

## Resolution (confirmed working)

Do not keep retrying variations of the `update-rule` payload. Instead:

1. Use `create-rule` to make a **brand-new** `Rule-Obj-Model` with the corrected,
   complete shape from scratch: correct `pyTopLevelElement`, no `pyArrayElements` or
   `pyListProperty` fields at all, and the same field mappings as the broken rule.
2. Repoint whatever referenced the broken rule at the new rule's name instead — for
   example, a Data Page's `pyResDataTransform`, or a Clipboard bridge DT's
   `APPLY_MODEL` step (`pyPropertiesName`/`pyModelName`).
3. Verify with `get-rule` on both the new DT and the rule that now references it.
