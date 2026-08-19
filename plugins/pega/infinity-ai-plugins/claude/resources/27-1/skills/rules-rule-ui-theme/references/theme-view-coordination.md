---
name: Theme / View Coordination
description: How to keep the Rule-UI-Theme class aligned with dependent Rule-UI-View rules.
---

# Theme / View Coordination

`Rule-UI-Theme` is the class anchor. It does not replace `Rule-UI-View` work.

## Live Class Facts

The live `Rule-UI-Theme` class queried through MCP currently returns:

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
- `pyRuleSet`: `Pega-UIEngine`
- `pyRuleAvailable`: `Yes`

## Token Inspection

Use `Theme Class Token Inventory` when you need the documented token catalogue for `get-rule(detail="full")`.
Use `Full Theme Class Snapshot` when you need a worked example of the inspected payload shape.

## Lookalike Rules

The following similarly named rules are not the anchor this skill describes:

- `Pega-UI-PanelContent-ThemePanel`
- `PegaBI-API-Theme`
- `Rule-PegaBI-Theme`
- `Embed-Skin-Component-Theme`

## Working Rules

1. Read the theme class with `get-rule(detail="full")` first.
2. Confirm whether the requested change is really a class-definition update or a view/layout update.
3. If the user wants field wiring, region changes, or screen layout, switch to `rules-rule-ui-view`.
4. If the user wants to customize the theme class itself, branch-copy the class before updating it.
5. Verify both the theme class and any dependent views after the change.

## Why token inspection matters

The live theme class does not just expose authoring fields. It also exposes rule-resolution, circumstance, provenance, and embedded container tokens. Keep those details in inspection references while keeping authoring payloads narrow and branch-safe.

## Safe split

- `rules-rule-ui-theme` for the class-definition anchor
- `rules-rule-ui-view` for screen and field authoring
