---
name: servicelevel-wiring-to-flows
title: Wiring SLA to Flows
description: How to attach an SLA rule to a flow, assignment shape, or case type stage.
---

## SLA on a Flow (Whole-Flow SLA)

After creating the SLA rule, set `pySLAName` on the Flow rule via `update-rule`:

```json
{
  "pySLAName": "StandardSLA" 
}
```

**Requirements:**
- The SLA's `pyRuleName` must match the value of `pySLAName`
- The SLA must be defined on the same class (or an ancestor class) as the flow
- The SLA rule must exist before wiring it to the flow

## SLA on an Assignment Shape

Individual assignment shapes in a flow can reference a specific SLA. This is
configured in the Process Modeler by setting the SLA property on the shape's
configuration panel.

To wire via API, update the assignment shape in `pyModelProcess.pyShapes` with:
- `pySLAType`: `"Use existing"` (to reference an existing SLA rule)
- `pySLA`: the `pyRuleName` of the `Rule-Obj-ServiceLevel` rule

Valid `pySLAType` values on assignment shapes:

| Value | Description |
|-------|-------------|
| `"Never"` | No SLA on this assignment (default) |
| `"Custom"` | Define SLA timing inline on the shape |
| `"Use existing"` | Reference an existing `Rule-Obj-ServiceLevel` rule by name via `pySLA` |

## SLA on a Case Type Stage

Case type stages can reference SLAs in their stage configuration. The SLA
applies to the entire stage duration. Uses the same `pySLAType` and `pySLA`
fields as assignment shapes.

## Creation Order

Always create the SLA rule **before** wiring it to a flow or case type:

1. Create the `Rule-Obj-ServiceLevel` rule
2. Verify the SLA was created successfully (`get-rule`)
3. Update the flow or case type to reference the SLA name

## Related Rule Types

| Rule | How it connects to SLA |
|------|----------------------|
| **Flow** (`Rule-Obj-Flow`) | `pySLAName` field references the SLA — applies to the whole flow |
| **Activity** (`Rule-Obj-Activity`) | Escalation actions can invoke activities via `pyActivity` |
| **Correspondence** (`Rule-Corr-Email`) | Email notifications via `pyCorrForSendEmail` in escalation actions |
| **Calendar** (`Rule-Calendar`) | Business calendar for `pyInBusinessDays: "true"` |
| **When Rule** (`Rule-Obj-When`) | `pyActionWhen` can conditionally gate escalation actions |
