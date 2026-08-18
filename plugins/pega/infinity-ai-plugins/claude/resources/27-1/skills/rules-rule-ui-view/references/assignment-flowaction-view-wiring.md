---
name: view-assignment-flowaction-wiring
description: "Assignment FlowAction and Rule-UI-View wiring patterns for Constellation, including pyViewReference, pySectionReference, naming convention, and companion view creation"
---
# Assignment FlowAction View Wiring

## How Assignment Steps Are Wired

An Assignment step in a Pega flow is backed by **three rules** that must stay in sync:

| Rule Type | Purpose |
|-----------|---------|
| `Rule-Obj-FlowAction` | The flow action -- controls submit label, routing, pre/post processing |
| `Rule-UI-View` (main) | The main form view -- lists all fields displayed to the user |
| `Rule-UI-View` (sub) | Optional embedded sub-views (e.g. data reference pickers) |

## Critical Cosmos/Constellation Wiring Rule

The FlowAction must reference the `Rule-UI-View` via `pyViewReference`, not
`pySectionReference`. `pySectionReference` targets the legacy `Rule-HTML-Section`
framework and will produce a blank or incorrectly rendered form in Constellation even
if a `Rule-UI-View` with the same name exists.

| UI Framework | FlowAction field to populate | Field to leave blank |
|---|---|---|
| Cosmos/Constellation | `pyViewReference` = view name | `pySectionReference` = `""` |
| Traditional HTML | `pySectionReference` = section name | `pyViewReference` = `""` |

> **Do NOT create `Rule-UI-Section`.**
> The backing UI rule for a Cosmos/Constellation FlowAction is always a `Rule-UI-View`
> (created with `pxObjClass: "Rule-UI-View"`). `Rule-UI-Section` is a distinct,
> rarely-used rule type — never use it here. If the app is traditional HTML, the
> backing rule is `Rule-HTML-Section`, not `Rule-UI-Section`.

## FlowAction Wiring Patterns

FlowActions support three view wiring patterns:

| Pattern | When to use | Key fields |
|---------|-------------|------------|
| **Old-style (Classic UI)** | Pre-Constellation (Pega < 8.4) | `pySectionReference` + `pyOldStreamType: "Rule-HTML-Section"` |
| **New-style (Constellation)** | Pega 8.4+ / Cosmos React | `pyViewReference` pointing to a `Rule-UI-View` |
| **Naming convention** | SAMMAsse and many Pega apps | `pyStreamName` = FlowAction name; Pega resolves a same-named `Rule-UI-View` implicitly |

All three patterns set `pyUsedAs: "LOCALACTION"` for step-only actions. All may
include `pyLocalActionActivity` naming a post-submission activity.

**Important:** Always set `pyOldStreamType: "Rule-HTML-Section"` even on new-style
and naming-convention FlowActions. If blank, `pzAssemblePreProcess` skips HTML
generation and `pyHTMLReference` can fall back to the bare-bones `ActionNoFields`
stream.

## Explicit pyViewReference Pattern

For new Constellation UI applications, prefer the explicit `pyViewReference` pattern:

- Create the `Rule-UI-View` on the same class as the FlowAction.
- Set `pyViewReference` on the FlowAction to the view's rule name.
- Leave `pySectionReference` blank.
- Keep `pyOldStreamType: "Rule-HTML-Section"` and `pyAutoHTML: true`.

## Naming Convention Pattern

Beyond the standard `pyViewReference` (Constellation) and `pySectionReference`
(Classic UI) wiring patterns, Pega supports an implicit **naming convention** pattern:

- Set `pyStreamName` to the FlowAction's own rule name (e.g., `AnalyzeCollectedData`).
- Leave both `pyViewReference` and `pySectionReference` blank.
- Create a companion `Rule-UI-View` with the **exact same name** and same class.

Pega resolves the view at runtime by name match. This pattern works reliably within a
single application, but creates implicit coupling — renaming one rule without the other
breaks the wiring silently.

## Creating the Companion View

Create a `Rule-UI-View` with the **exact same name** as the FlowAction on the same
class when using naming-convention wiring. When using explicit Constellation wiring,
the view rule still backs the FlowAction form and should usually share the step name.

Key fields for a basic assignment view:

| Field | Value |
|---|---|
| `pxInsName` | Same name as the FlowAction |
| `pxObjClass` | `Rule-UI-View` |
| `pyClassName` | Case type class |
| `pyRuleSet` | Target ruleset name |
| `pyRuleSetVersion` | Target ruleset version |
| `pyLabel` | Human-readable label (same as FlowAction label) |
| `pyTemplateName` | `DefaultForm` |

Views must have fields configured. Do not create an empty view shell. Use
`rules-rule-ui-view/references/property-first-view-authoring`,
`rules-rule-ui-view/references/field-type-selection`, and
`rules-rule-ui-view/references/view-update-workflow` for the field wiring.

After creation, verify with `get-rule`: `pyRuleFormStatus: Good`.

## FlowAction Field Notes For View Wiring

- `pyViewReference`: set to the `Rule-UI-View` name for explicit Constellation wiring.
- `pySectionReference`: leave blank for Cosmos/Constellation apps.
- `pyOldStreamType: "Rule-HTML-Section"`: required despite the name.
- `pyAutoHTML: true`: enables auto-generation of the HTML wrapper.
- `pyRuleName`, `pyActionName`, and `pyStreamName` must all have the same value.
- `pySections` provides a placeholder section skeleton; the actual form content is
  wired via `pyViewReference` or same-name `Rule-UI-View` resolution.
