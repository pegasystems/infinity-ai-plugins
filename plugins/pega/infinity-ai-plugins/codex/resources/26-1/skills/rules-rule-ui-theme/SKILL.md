---
name: rules-rule-ui-theme
description: Authoring guide for Pega Theme rules (Rule-UI-Theme), including the pyDefinition design-token content field, instance discovery, and branch-safe updates
---

**Prerequisites:**
- Load `methodology-rule-authoring` first.
- Load `rules-rule-ui-view` when the requested change affects screens, panels, or any view that must stay aligned with a theme.

## Critical Authoring Rules

1. `pyDefinition` is the most important field on a `Rule-UI-Theme` instance. It is a JSON-encoded string holding the theme's design tokens under two top-level sections, `base` (global tokens) and `components` (per-component overrides) — see `Theme Definition Token Inventory` for the confirmed key catalogue. Two value shapes are confirmed: a flat literal shape (raw values) and a richer `$type`/`$value` shape supporting `"literal"` values and `"inherited"` alias references to other token paths — see `theme-pydefinition-token-shape-sample`. Always check which shape the live instance uses and preserve it; never omit, blank, or wholesale-replace `pyDefinition` unless the user explicitly wants the entire theme replaced.
2. Always fetch the current instance with `get-rule(detail="full")` before update, and merge changes into `pyDefinition` rather than reconstructing it from scratch — see `theme-pydefinition-merge-pattern` for the fetch-then-merge procedure.
3. Find the target instance first with `list-rules(ruleType="Rule-UI-Theme", ruleName=<themeName>)`. Do not confuse a specific named theme (e.g. `pzAuriga`) with the `Rule-UI-Theme` class-definition anchor (`RULE-OBJ-CLASS RULE-UI-THEME`) — they are different rule records.
4. If the change is visual or layout-related (fields, regions, screens) rather than a design token, switch to `rules-rule-ui-view`.
5. Do not invent `pyDefinition` sub-keys beyond those confirmed in `Theme Definition Token Inventory` or a live `get-rule(detail="full")` result. Confirm exact structure against the actual instance before authoring.

## What This Skill Covers

`Rule-UI-Theme` is the Pega rule type used to define a Constellation/Cosmos theme (an application's design-token set: colors, typography, spacing, elevation, motion, and component style overrides). Named theme instances (e.g. `MyAppTheme`) are stored as `Rule-UI-Theme` records and carry that content in `pyDefinition`.

Use this skill when the task is about:

- inspecting or authoring a named theme instance and its `pyDefinition` content,
- discovering which theme instances exist in the application,
- coordinating theme token changes with related views.

Use `rules-rule-ui-view` for actual view content, field wiring, and three-surface updates.

### Theme Instance Identity Fields

Confirmed from a live `Rule-UI-Theme` instance (`RULE-UI-THEME PZAURIGA #...`), a theme instance carries at least these fields, in addition to `pyDefinition`:

- `pyRuleName`: The unique short name for the theme (e.g. `pzAuriga`)
- `pyLabel`: display label shown in App Studio's theme picker (e.g. `Auriga (2026)`)
- `pyRuleAvailable`: `Final` for a shipped/locked theme, `Yes` for one still open to edits
- `pyIsOTBTheme`: `true` on OOTB-shipped themes; omit or `false` on app-authored themes
- `pyDisplayMode`: `clone`

There is no `pyClassName` ("applies to" class) field on a theme instance — do not add one.

`RULE-OBJ-CLASS RULE-UI-THEME` is a different record entirely: the platform's own `Rule-Obj-Class` definition for the `Rule-UI-Theme` rule type. It has no `pyDefinition` and is not something application teams author — do not branch-copy or edit it; if a user's request seems to point there, confirm they don't actually mean a named theme instance.

### Common Lookalikes

These are theme-named rules, but they are not `Rule-UI-Theme` instances:

- `Pega-UI-PanelContent-ThemePanel`
- `PegaBI-API-Theme`
- `Rule-PegaBI-Theme`
- `Embed-Skin-Component-Theme`

If the user asks about one of those names, confirm whether they mean an actual `Rule-UI-Theme` instance or a separate theme-related rule before authoring.

## Create vs Update Decision

Before touching a theme, determine the correct operation:

1. Call `list-rules(ruleType="Rule-UI-Theme", ruleName=<themeName>)` to check whether the instance exists.
2. If **no results** → the theme does not exist → create a new `Rule-UI-Theme` instance with `pyDefinition` populated.
3. If **results returned** → `get-rule(detail="full")` on the matching instance, merge the requested change into `pyDefinition`, and `update-rule` with `changeRequestID` (branch-copy is handled automatically when required).
4. If the requested change is really a screen/layout adjustment, stop and switch to `rules-rule-ui-view`.

## Verification Rules

- Confirm `pyRuleFormStatus` is `Good` after update.
- Confirm `pyDefinition` still contains the full expected token set — not a truncated or blanked value.
- Confirm the resolved instance is in the active branch ruleset rather than assuming the source ruleset.
- Confirm any dependent view updates in `rules-rule-ui-view` also pass verification.

## References

| Skill | When to load |
|-------|--------------|
| `theme-pydefinition-merge-pattern` | Before updating a theme's `pyDefinition` — fetch, preserve the existing token shape, merge the requested change, and verify the complete JSON value. |
| `Theme Definition Token Inventory` | When selecting or verifying `base` and `components` token paths inside `pyDefinition`. |

## Examples

| Skill | Description |
|------|-------------|
| `theme-stub` | Minimal `Rule-UI-Theme` instance payload with `pyDefinition` |
| `theme-pydefinition-flat-sample` | Second confirmed full `pyDefinition` payload (flat literal shape) showing every `base`/`components` key together |
| `theme-pydefinition-token-shape-sample` | Full confirmed `pyDefinition` payload in the `$type`/`$value`/`inherited` token shape |
