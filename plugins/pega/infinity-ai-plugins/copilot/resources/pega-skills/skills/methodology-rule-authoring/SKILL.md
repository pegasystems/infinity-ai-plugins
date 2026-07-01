---
name: methodology-rule-authoring
description: General instructions for creating and updating Pega rules using the schema-backed authoring tools
---

# Rule Authoring — General Guide

This skill explains how to choose the correct write API for a Pega rule type, then
create or update the rule using that API.

## Creating a Rule

### Workflow

1. **Load the rule-type skill** — use `get-skill` to load the `rules-*` skill for
    the target rule type. This provides examples and the JSON schema.
2. **Find the closest example and use it as-is** — identify the example from the
   skill's `examples/` directory that most closely matches what you need to create.
   `examples/` contains full rule examples while subfolders in `examples/` contain
   example steps or shapes or rows. The file `examples/stub.md` is a good start if
   you want to create the simplest possible rule. **Treat the example as a rigid
   template:** use the exact same property names, nesting structure, and field
   patterns it uses. Only change the _values_ to match the user's requirements. Do
   not invent property names, guess at field structures, or add fields that do not
   appear in the example — the example is the source of truth for which fields exist
   and how they are spelled.
3. **Adapt the example** — change the field values to match the user's requirements.
   Base all of your decision regarding the data model on the examples. Do not
   combine examples. Do not get creative. Do not remove or add fields you don't need.
   Don't add fields the example.
4. **Call `create-rule`.**
   See `methodology-change-request-workflow` for the full ChangeRequest lifecycle
   that provides the `changeRequestID`.
5. **Verify** — call `get-rule` on the returned key to confirm the rule was created
   correctly.

## Updating a Rule

### Deep merge semantics

`update-rule` uses **recursive deep merge**:

- **Maps** merge recursively — provide only the nested keys you want to change;
  sibling keys at every level are preserved.
- **Lists** use `listUpdateMode="patch"` by default — every list reached while
  merging the updated subtree is merged positionally by index. If both the base and
  update elements at an index are maps, they are deep-merged recursively. Use `{}`
  as a **no-op placeholder** only in that map-to-map case. Omitted trailing base
  elements are preserved.
- **Lists can be replaced wholesale** — `listUpdateMode="replace"` clears and
  replaces every list reached while merging the updated subtree.
- **Scalars** replace — strings, numbers, and booleans overwrite the existing value.

### Choosing `listUpdateMode` and `listUpdateModeOverrides`

The `listUpdateMode` parameter on `update-rule` controls the default behavior for
list fields:

| Mode | When to use |
|------|-------------|
| Omit / `"patch"` | Sending a **sparse** list with `{}` placeholders — only the non-empty elements are merged; omitted elements are preserved. |
| `"replace"` | Sending the **complete** desired list — the provided array becomes the full state and omitted elements are deleted. Use when replacing typed arrays (e.g., all view fields, all activity steps) where positional merge could leak stale metadata from the old element at the same index. |

`listUpdateModeOverrides` lets one `update-rule` call mix modes for exact list field
paths. Use it when an outer list should stay in patch mode but a nested list should
replace. Examples: `{"pySteps.pySteps":"replace"}` or
`{"pyModelProcess.pyConnectors.pyWaypoints":"replace"}`.

- Override keys must be exact non-blank list field paths.
- Override values must be `"patch"` or `"replace"`.
- Dot notation is supported only in `listUpdateModeOverrides`, not in `updates`.

### Update examples

| Skill | Pattern | Description |
|-------|---------|-------------|
| `authoring-update-scalar-fields` | Scalar replace | Change top-level fields (description, boolean flag) without touching the rule body |
| `authoring-update-single-list-element` | Positional list merge | Modify one element in a list using `{}` no-op placeholders to skip preceding elements |
| `authoring-update-append-list-element` | Append to list | Add a new element at the end of a list by placing `{}` placeholders for all existing elements |

### Workflow

1. **Identify the rule** — obtain the `pzInsKey` via `list-rules` if possible. If not,
   use `search-rules`.
2. **Read current state** — call `get-rule` with `detail='full'` to see the current
   fields and structure. If the rule is not already in the branch ruleset defined
   in the Change Request, see "Copying a Rule (Save As)" below to first copy the
   rule to the branch before making changes.
3. **Construct the update** — find the closest update example above, then adapt it.
   Provide only the fields you want to change. Use `{}` placeholders in lists to skip
   elements you want to keep unchanged. Add `listUpdateModeOverrides` when one nested
   list needs different behavior from the global default.
4. **Call `update-rule`.**
   See `methodology-change-request-workflow` for the full ChangeRequest lifecycle
   that provides the `changeRequestID`.
5. **Verify** — call `get-rule` with `detail='full'` to confirm the update persisted.

**Never substitute a different rule type because creation failed.** Rule types serve
distinct architectural purposes and are not interchangeable. Report the failure,
consult the rule-type skill, and try alternative payloads before escalating.

## Copying a Rule (Save As)

To copy an existing rule into the ChangeRequest's branch ruleset, use `copy-rule`
— it fetches the source rule, strips identity/audit fields, applies the branch ruleset,
and creates the copy in a single call. If you later need to modify the copied rule,
use `update-rule`.

## Test-Driven Feedback Loop

When modifying rules that have existing test cases, follow this discipline:

1. **Make one change** — update the rule
2. **Run tests immediately** — use `run-pegaunits` with the branch ID
3. **Triage failures** — see `rules-rule-test-unit-case` for the decision framework
4. **Fix and repeat** — apply one fix, then run tests again

**Do not batch multiple changes before running tests.** The feedback loop's value
comes from immediate verification — if you change three things and tests fail, you
don't know which change caused the failure.

Use `methodology-dx-api-assignment-action` when an assignment requires complex `pageInstructions` or non-trivial embedded/page-list mutations.

## Troubleshooting

See these troubleshooting skills for common error resolutions:

- `authoring-branch-ruleset-not-candidate` — Resolve "Branch ruleset not candidate" errors when creating test cases
