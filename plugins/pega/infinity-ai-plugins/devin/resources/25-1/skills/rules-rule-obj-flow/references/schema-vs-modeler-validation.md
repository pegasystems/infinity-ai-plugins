---
name: flow-schema-vs-modeler-validation
description: Why schema validation is necessary but not sufficient for flow shapes — fields the schema accepts may not render correctly in Process Modeler
---

# Schema-Tolerated vs Modeler-Significant Fields

Schema validation is necessary but not sufficient for flow shape edits. The
schema may accept fields that the Process Modeler ignores or misrenders.

## The problem

A shape can pass `pyRuleFormStatus: "Good"` and have no `pxWarnings`, yet
still render incorrectly in the Process Modeler. This happens when the shape
contains fields that are schema-tolerated but not part of the shape contract
the Modeler uses to render.

Common symptoms:
- Shape appears as a generic box instead of the correct icon
- Shape label or configuration panel shows blank/default values
- Connector wiring looks correct in JSON but arrows are missing in Modeler
- Utility shape shows no linked rule despite `pyActivityName` being set

## Verification approach

For complex shape edits (especially utility shapes), compare the authored
shape against a known-good UI-authored shape of the same type in the same
flow:

1. Author the shape via API
2. `get-rule(detail='full')` — confirm `pyRuleFormStatus: "Good"`, no warnings
3. Open the flow in Process Modeler (or have the user check)
4. If readback shows no warnings but the Modeler renders incorrectly, the
   shape likely contains fields that are schema-tolerated but not part of
   the shape contract

## When this matters most

- **Utility shapes** — the most field-sensitive shape type; many fields are
  accepted by the schema but only a subset drives Modeler rendering
- **ScreenFlow sub-flows** — connector and navigation fields have
  Modeler-specific semantics
- **Decision shapes** — `pyDecisionClass` + `pyImplementation` must match
  exactly; extra fields are silently ignored

## Mitigation

When authoring a shape type for the first time, create the same shape type
manually in Infinity Studio first, then `get-rule(detail='full')` to capture
the exact field set the Modeler produces. Use that as your template.
