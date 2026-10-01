---
name: flowaction-wiring-patterns
description: "Load when creating or configuring a FlowAction for a flow's Assignment shape. Covers how FlowActions connect to their screen views, which fields to set, and common pitfalls like pyconfirmchoice casing."
---
# FlowAction Wiring Patterns

How FlowActions connect to views and how to create them for Assignment steps.

## Three View Wiring Patterns

| Pattern | When to use | Key fields |
|---------|-------------|-----------|
| **Naming convention** | Most Pega apps | `pyStreamName` = FlowAction name; Pega resolves a same-named `Rule-UI-View` implicitly |
| **Explicit (Constellation)** | Pega 8.4+ / Cosmos React | `pyViewReference` pointing to a `Rule-UI-View` |
| **Classic UI** | Pre-Constellation (Pega < 8.4) | `pySectionReference` + `pyOldStreamType: "Rule-HTML-Section"` |

All patterns set `pyUsedAs: "LOCALACTION"` for step-only actions.

**Important:** Always set `pyOldStreamType: "Rule-HTML-Section"` even on
Constellation and naming-convention FlowActions. Omitting it causes HTML
generation to be skipped silently (`pyHTMLReference` defaults to `"ActionNoFields"`).

### Naming Convention Pattern

- Set `pyStreamName` to the FlowAction's own rule name
- Leave both `pyViewReference` and `pySectionReference` blank
- Create a `Rule-UI-View` with the **exact same name** and same class

Pega resolves the view at runtime by name match. This works reliably but creates
implicit coupling -- renaming one rule without the other breaks wiring silently.

### Explicit Constellation Pattern

- Set `pyViewReference` to the view name
- Leave `pySectionReference` blank

Prefer this for new Constellation UI applications.

## FlowAction Key Fields

| Field | Value | Notes |
|-------|-------|-------|
| `pyRuleName` | Step name (PascalCase) | **Must be set explicitly** |
| `pyActionName` | Same as `pyRuleName` | **Must match exactly** |
| `pyStreamName` | Same as `pyRuleName` | Auto-set by platform |
| `pyUsedAs` | `"LOCALACTION"` | Must be set explicitly; default is `"LOCALANDCONNECTOR"` which is usually wrong |
| `pyOldStreamType` | `"Rule-HTML-Section"` | Required even on Constellation apps |
| `pyAutoHTML` | `true` | Enables auto HTML generation |
| `pyContainerType` | `"STANDARD"` or `"NOHEADER"` | Dialog container type |
| `pySubmitLabel` | `"AdvanceThisCase"` | Standard label; customize as needed |
| `pyConfirmHarness` | `"Confirm"` | Harness shown after action completes |
| `pyconfirmchoice` | `"ShowHarness"` | **Lowercase 'c'** -- intentional |

## `pyconfirmchoice` vs `pyConfirmHarness`

`pyconfirmchoice` (lowercase 'c') is a distinct field from `pyConfirmHarness`.
Always set `pyconfirmchoice` to `"ShowHarness"` and `pyConfirmHarness` to
`"Confirm"` for standard FlowActions.

## Default FlowAction Pattern

Most flows use the **default FlowAction** pattern: the Assignment shape is wired
directly to one FlowAction by name in `pyModelProcess`, and `pyLocalActions` is
left empty (contains only the auto-inserted placeholder row). Pega fires that
FlowAction as the sole available action.

To add extra action choices (e.g., "Save Draft", "Reject"), populate
`pyLocalActions` with the additional FlowAction names.

## SubProcess Shape Configuration

See `references/shapes-subprocess` for SubProcess shape fields, `pySubProcessCategory`
values (`"ProcessFlow"`, `"ScreenFlow"`, blank for approval wrappers), and spin-off behavior.
