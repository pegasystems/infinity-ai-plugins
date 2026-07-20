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

## Naming Best Practices

- **Use PascalCase, no spaces or punctuation.** SLA names are rule keys — keep them identifier-safe (e.g., `ResolveLoanApplication`, not `Resolve loan application!`).
- **Lead with the work, not the word "SLA".** Prefer `ApproveDisbursement` over `SLAApproveDisbursement`; the rule type already says it's an SLA.
- **Be specific about scope.** Name by the assignment, stage, or case milestone it governs: `UnderwritingReview`, `CustomerResponseAwaited`, `ManagerApproval`.
- **Use a verb when SLA governs an action**, a noun when it governs a waiting state: `EscalateOverdueClaim` (action) vs `AwaitingDocuments` (state).
- **Keep names ≤ 40 characters** so they remain readable in flow shape properties and assignment lists.
- **Mirror the assignment name when 1:1.** If an assignment shape is `ReviewDocuments`, name its SLA `ReviewDocuments` (or `ReviewDocumentsSLA` only when disambiguation is required against an existing rule).
- **Avoid environment/version words.** Do not bake `Prod`, `V2`, `New`, `Temp`, or dates into the name — use rulesets/versions for that.
- **Use the same vocabulary as the case type and flow.** If the case type uses "Adjudication", do not name the SLA `Review`. Consistency aids search and traceability.

## Key Authoring Rules

- **Do NOT supply timing fields unless the user specifies values.** The fields `pyGoalDefaultDays`, `pyGoalDefaultHours`, `pyGoalDefaultMinutes`, `pyGoalDefaultSeconds`, `pyDeadlineDefaultDays`, `pyDeadlineDefaultHours`, `pyDeadlineDefaultMinutes`, `pyDeadlineDefaultSeconds`, `pyLateDefaultDays`, `pyLateDefaultHours`, `pyLateDefaultMinutes`, and `pyLateDefaultSeconds` all default to 0. If the user does not request specific timing values, **omit these fields entirely** — the server will default them to `"0"`. Do not copy non-zero values from examples.
- **Property references must exist.** When using `PROPERTY` mode (`pyCalculateTimesFrom`, `pyNextActionSetting`), the referenced DateTime properties (`pyGoalTimeProperty`, `pyDeadlineTimeProperty`, `pyNextActionProperty`) must already exist on the target class. Always list properties on the class first to verify. Do not invent plausible-sounding names like `.pyGoalDateTime` — Pega will reject them with `pyEscalationProperty — is not a valid date/time value`.
- **Cumulative timing.** All three tiers measure from the **same start time** (assignment creation), not sequentially. If Goal = 1 day and Deadline = 2 days, the deadline fires 2 days after start — not 2 days after the goal. Goal time must be ≤ Deadline time ≤ Late time.
- **CASECREATE / STEPCREATE are deprecated.** Use `ASSIGNSTART` (default) or `PROPERTY` for `pyCalculateTimesFrom`.
- **`pyMaxLateEvents`** controls how many times the Late tier repeats. Set `"0"` to disable late events entirely.
