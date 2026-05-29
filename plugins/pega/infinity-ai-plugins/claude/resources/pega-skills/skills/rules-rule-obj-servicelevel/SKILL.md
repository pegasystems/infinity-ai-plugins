---
name: rules-rule-obj-servicelevel
description: Schema and authoring guide for Pega Service Level Agreement rules (Rule-Obj-ServiceLevel), including goal/deadline/late escalations, urgency, timing, and wiring to flows
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Service Level Agreement` | Minimal valid create payload — required fields only |
| `Goal and Deadline` | Goal and deadline with escalation tiers |
| `Timed Delay Assignment Ready` | Timed delay before assignment becomes ready |
| `Escalation Actions with CallActivity and When Rule` | CallActivity escalation actions with When rule and activity parameters |

## References

| Skill | When to load |
|-------|--------------|
| `servicelevel-timing-and-urgency` | SLA timing semantics, urgency increments, business days vs calendar days |
| `servicelevel-wiring-to-flows` | How to wire an SLA to a flow, assignment shape, or case type stage |

## Key Authoring Rules

- **Property references must exist.** When using `PROPERTY` mode (`pyCalculateTimesFrom`, `pyNextActionSetting`), the referenced DateTime properties (`pyGoalTimeProperty`, `pyDeadlineTimeProperty`, `pyNextActionProperty`) must already exist on the target class. Always list properties on the class first to verify. Do not invent plausible-sounding names like `.pyGoalDateTime` — Pega will reject them with `pyEscalationProperty — is not a valid date/time value`.
- **Cumulative timing.** All three tiers measure from the **same start time** (assignment creation), not sequentially. If Goal = 1 day and Deadline = 2 days, the deadline fires 2 days after start — not 2 days after the goal. Goal time must be ≤ Deadline time ≤ Late time.
- **CASECREATE / STEPCREATE are deprecated.** Use `ASSIGNSTART` (default) or `PROPERTY` for `pyCalculateTimesFrom`.
- **`pyMaxLateEvents`** controls how many times the Late tier repeats. Set `"0"` to disable late events entirely.
