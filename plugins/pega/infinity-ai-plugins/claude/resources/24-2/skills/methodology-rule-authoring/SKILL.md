---
name: methodology-rule-authoring
description: Load before creating or updating Pega rules. Covers branch selection, deterministic workflow routing, branch-scoped write APIs, durable context, and verification.
---

# Rule Authoring — General Guide

This skill explains how to choose the correct write API for a Pega rule type, then
create or update the rule using that API.

## Maintaining Branch Context

Branch context is a durable summary for future sessions, not a transcript of tool calls.
Follow this lifecycle after the target branch has been identified:

1. **Read the existing context.** At the start of the session, call `D_pxBranchContext`
   with the selected `branchID`, before deciding what work remains. If the data page is
   unavailable, continue and inform the user that the context could not be read.
2. **Record the initial plan.** Once the intended approach and remaining work are clear,
   call `D_pxUpdateBranchContext` to replace `pyTaskList` with the remaining tasks. Put
   important decisions, constraints, or future-work notes in `pyNotesAboutIntendedFutureWork`.
3. **Record meaningful milestones.** After a phase is complete, append a concise summary
   to `pySummaryOfCompletedWork` if it adds useful durable context, and replace
   `pyTaskList` with the current remaining tasks. Group related actions into one
   milestone; do not update after every rule or tool call.
   `create-rule` and `update-rule` automatically append their `changeDescription` to
   `pySummaryOfCompletedWork` so there is no need to append again that the rule has been created
   or updated.
4. **Record completion.** When the requested work is finished, append only new completion
   or verification details to `pySummaryOfCompletedWork`; do not repeat a rule-write
   description already added automatically by `create-rule` or `update-rule`. Then clear
   `pyTaskList` so no completed tasks remain active. Preserve future-work notes.
5. **Record deferred work.** If the user says to do something later, next, or in a future
   step, append a note to `pyNotesAboutIntendedFutureWork` describing the deferred action
   and its scope. “Do not do this yet” is not the same as “do not do this.” Deferred work
   belongs in future notes, not `pyTaskList`, unless the user explicitly asks for it to be
   active work in the current session.
6. **Record exceptions.** For a blocker, changed scope, important decision, or handoff,
   append the situation and the required next step to `pyNotesAboutIntendedFutureWork`.

Do not update branch context after skill loads, lookups, searches, or routine verification
calls unless one of those actions completes a meaningful milestone. For a trivial,
one-step task, skip the initial plan update when there is no useful durable context to
preserve, but still record explicitly deferred future work. Record completion if the
result will help a future session. See the `D_pxUpdateBranchContext` section in
`AGENTS.md` for the operation contract.

## Branch Authoring Lifecycle

All rule writes are branch-scoped. Rule writes do not merge automatically into the
base application ruleset.

1. **Select a branch.** If a Branch Preference exists, confirm with the user that it
   should be used. If the user declines, change or remove the preference. If no
   preference exists, ask which existing branch to use or whether to create one.
2. **Create or attach the branch.** Create a new branch with
   `D_pxCreateBranchAndAddToTopApplication`. Before adding an existing branch with
   `D_pxAddExistingBranchToTopApplication`, ask for explicit confirmation.
3. **Validate the branch ID locally.** Trim it, require 3–16 characters, allow only
   letters, numbers, `_`, and `-`, require an alphanumeric first character, and reject
   `px`, `py`, and `pz` prefixes. Do not use local validation as an existence or access
   check; let the write API report those errors.
4. **Use branch-scoped writes.** Pass the selected `branchID` to every `create-rule`
   and `update-rule` call. Pass `branchID` and `sourceKey` to `copy-rule` when the user
   explicitly requests Save As.
5. **Verify and report.** Verify each write with `get-rule(detail="full")`. Run
   branch-scoped PegaUnit tests when applicable. Summarize changes and verification;
   leave review and merge to standard Pega branch management.

## Tool Selection

Do not guess which write API to use.
When creating, updating, or copying a rule, ensure that the corresponding `rules-*` skill exists. If it does not, stop
and verify support before authoring.

## Creating a Rule

### Workflow

1. **Load guidance** — use `get-skill` to load the matching `rules-*` skill for the
   target rule type. Follow its authoring guidance and use its examples table to
   identify relevant examples and references.
2. **Read a top-level example** — read at least one example file directly under the
   rule skill's `examples/` directory, such as `rules-rule-obj-property/examples/stub`.
   Do not satisfy this requirement by reading only an example in an `examples/` subdirectory.
   Top-level examples are complete rule templates; subdirectory examples describe reusable
   steps, shapes, rows, or other components and may be read in addition.
3. **Select the template** — choose the top-level example that most closely matches
   the rule being created. Use the canonical stub when creating the simplest possible
   rule. Treat the selected example as a rigid template: preserve its property names,
   nesting structure, and field patterns. Only change values to match the user's
   requirements.
4. **Adapt safely** — base the data model on the selected example and any additional
   relevant examples. Do not invent property names or guess at field structures. Do not
   remove or add fields unless the examples and the user's requirements justify it.
5. **Create** — call `create-rule` with the selected `branchID` and a concise,
   non-empty `changeDescription`.
6. **Verify** — call `get-rule` on the returned key with `detail="full"` to confirm that
   the rule was created correctly.

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

| Skill | Label | Pattern | Description |
|---|---|---|---|
| `methodology-rule-authoring/examples/update-scalar-fields` | authoring-update-scalar-fields | Scalar replace | Change top-level fields (description, boolean flag) without touching the rule body |
| `methodology-rule-authoring/examples/update-single-list-element` | authoring-update-single-list-element | Positional list merge | Modify one element in a list using `{}` no-op placeholders to skip preceding elements |
| `methodology-rule-authoring/examples/update-append-list-element` | authoring-update-append-list-element | Append to list | Add a new element at the end of a list by placing `{}` placeholders for all existing elements |

### Workflow

1. **Identify the rule** — obtain the `pzInsKey` via `list-rules` if possible. If not,
   use `search-rules`.
  2. **Read current state** — call `get-rule` with `detail='full'` to see the current
     fields and structure. If the rule is not already in the selected branch, continue
     with `update-rule` using the selected `branchID`; the update call handles the
     branch copy behavior internally.
3. **Construct the update** — find the closest update example above, then adapt it.
   Provide only the fields you want to change. Use `{}` placeholders in lists to skip
   elements you want to keep unchanged. Add `listUpdateModeOverrides` when one nested
   list needs different behavior from the global default.
  4. **Call `update-rule`** with the selected `branchID` and a concise, non-empty
     `changeDescription`.
5. **Verify** — call `get-rule` with `detail='full'` to confirm the update persisted.

**Never substitute a different rule type because creation failed.** Rule types serve
distinct architectural purposes and are not interchangeable. Report the failure,
consult the rule-type skill, and try alternative payloads before escalating.

## Copying a Rule (Explicit Save As)

Use `copy-rule` only when the user explicitly requests Save As behavior (for example,
manual duplication before experimentation). It fetches the source rule, strips
identity/audit fields, applies the branch ruleset, and creates the copy in a single
call. For normal modification of existing rules, call `update-rule` directly.

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

## References

| Skill | Label | When to load |
|---|---|---|
| `methodology-rule-authoring/references/branch-ruleset-not-candidate-test-cases` | authoring-branch-ruleset-not-candidate | Resolve "Branch ruleset not candidate" errors when creating test cases |
