---
name: rules-rule-ui-theme
description: Schema and authoring guide for the Pega UI theme class (Rule-UI-Theme), including class definition handling, branch-safe updates, and related token references
---

**Prerequisites:**
- Load `methodology-rule-authoring` first.
- Load `rules-rule-obj-class` for generic class-definition authoring and branch-copy patterns.
- Load `rules-rule-ui-view` when the requested change affects screens, panels, or any view that must stay aligned with the theme class.

## Critical Authoring Rules

1. Always fetch the current rule with `get-rule(detail="full")` before update.
2. Treat `Rule-UI-Theme` as a class-definition rule (`Rule-Obj-Class`), not as a view rule.
3. Preserve the class identity fields when branching or updating:
   - `pyClassName`: `Rule-UI-Theme`
   - `pyUsage`: `View Definition Class`
   - `pyDerivesFrom`: `Rule-UI-`
4. If the change is visual or layout-related, update the dependent `Rule-UI-View` rule(s) in the same branch and verify them separately.
5. Do not invent new theme fields unless the underlying class rule actually exposes them in `get-rule(detail="full")`.

## What This Skill Covers

`Rule-UI-Theme` is the OOTB concrete class rule that anchors the theme definition class in `Pega-UIEngine`.
Use this skill when the task is about:

- inspecting or copying the theme class rule,
- preserving the class definition in a branch,
- coordinating theme changes with related views,
- validating class-level settings before deeper UI authoring,
- documenting the relevant live token surface for the class.

Use `rules-rule-ui-view` for the actual view content, field wiring, and three-surface updates.

### Live Class Shape

The current live class record resolves with these stable values:

- `pxObjClass`: `Rule-Obj-Class`
- `pyClassName`: `Rule-UI-Theme`
- `pyLabel`: `Theme`
- `pyDescription`: `View Definition Class`
- `pyDerivesFrom`: `Rule-UI-`
- `pyClassType`: `Concrete`
- `pyClassGroup`: `Rule-UI-Theme`
- `pyClassGroupIndicator`: `NOCLASSGROUP`
- `pyClassInheritance`: `true`
- `pyPatternInheritance`: `true`
- `pyCreateDedicatedTable`: `true`
- `pyExcludeFromFTIndex`: `false`
- `pyEncryptBLOB`: `false`
- `pyFormType`: `Harness`
- `pyDisplayMode`: `clone`
- `pyPreventSubClassing`: `false`
- `pyUsage`: `View Definition Class`
- `pyRuleAvailable`: `Yes`

### Token Surface

The live class exposes a much larger token surface in `get-rule(detail="full")`.

Use the linked references when you need token-level inspection:

- `Theme Class Token Inventory` for the documented live token catalogue
- `Full Theme Class Snapshot` for a worked example of the inspected payload shape

Preserve fetched read-only fields only when the current live payload already contains them; do not hard-code exact environment values into new authoring payloads.

### Common Lookalikes

These are theme-named rules, but they are not the `Rule-UI-Theme` class anchor:

- `Pega-UI-PanelContent-ThemePanel`
- `PegaBI-API-Theme`
- `Rule-PegaBI-Theme`
- `Embed-Skin-Component-Theme`

If the user asks about one of those names, confirm whether they mean the class anchor or a separate theme-related rule before authoring.

## Create vs Update Decision

Before touching the theme class, determine the correct operation:

1. Call `get-rule(detail="full")` for `RULE-OBJ-CLASS RULE-UI-THEME`.
2. If you are customizing the OOTB class in a branch, use `copy-rule` first.
3. If the branch copy already exists, use `update-rule` on that branch instance.
4. If the requested change is really a screen/layout adjustment, stop and switch to `rules-rule-ui-view`.

## Verification Rules

- Confirm `pyRuleFormStatus` is `Good` after update.
- Confirm the class rule still resolves as `Rule-Obj-Class` and keeps the expected identity fields.
- Confirm the copied rule resolves in the active branch ruleset rather than assuming `Pega-UIEngine`.
- Confirm any dependent view updates in `rules-rule-ui-view` also pass verification.

## Examples

| Skill | Description |
|------|-------------|
| `Stub Theme Class` | Minimal `Rule-UI-Theme` class payload |
| `Live Theme Class Snapshot` | Read-only snapshot of the live OOTB theme class |
| `Full Theme Class Snapshot` | Detailed live snapshot with the documented token surface from `get-rule(detail="full")` |
| `Branch Validation Snapshot` | Post-copy validation checklist for a branched theme class |
| `Branch Copy Theme Class` | Copy the live theme class into the active branch before editing |
| `Theme Class Token Inventory` | Token inventory reference grouped by token category |
| `Theme/View Coordination` | Notes for aligning the theme class with dependent `Rule-UI-View` rules |
