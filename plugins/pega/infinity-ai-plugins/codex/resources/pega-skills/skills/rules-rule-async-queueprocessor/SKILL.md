---
name: rules-rule-async-queueprocessor
description: Schema and authoring guide for Pega Queue Processor rules (Rule-Async-QueueProcessor), including creation fields, rule form configuration, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first

**When to use Queue Processor vs Job Scheduler:**

| Pattern | Use |
|---------|-----|
| Event-driven (enqueue on event, process async) | Queue Processor — Immediate mode |
| Deferred processing with per-item variable delay | Queue Processor — Delayed mode |
| Schedule-driven (recurring task at fixed time) | Job Scheduler — do not use QP |

## Authoring Notes

### Create the processing Activity first

Every Queue Processor rule must reference a real processing Activity through
`pyActivityName`. Design and create that Activity first based on the required
processing logic, then author the Queue Processor that points to it.

### `pyBaseClass` must match the Activity's class

`pyBaseClass` must be set to the class of the activity referenced by
`pyActivityName`. Do not default to `@baseclass` — an incorrect applies-to
class will cause the QP to fail at runtime.

### `pyPurpose` is required

`pyPurpose` is the identity key (from `pyKeyDefList`). Ask the user for the
rule name and use it as `pyPurpose`. The server uses `pyPurpose` to populate
`pyRuleName` automatically; do not set `pyRuleName` directly. If `pyPurpose`
is omitted, the builder fills an empty string and the rule is created without
a proper name or identity key.

### `pyLongRunningInterruptThreshold` is builder auto-filled

The builder unconditionally auto-fills `pyLongRunningInterruptThreshold` to
`900000` (15 minutes, milliseconds). The server validates this field regardless
of `pyIsAlertThresholdManuallyEnabled`. The UI variant
(`pyLongRunningInterruptThresholdUI`) is server-computed and cannot be set
via API — it is not included in the schema.

### Manual alert thresholds are conditional

Only set `pyIsAlertThresholdManuallyEnabled` to `true` when the rule must use
explicit thresholds. In that scenario, both `pyLongRunningThreshold` and
`pyLongRunningInterruptThreshold` are mandatory. The builder auto-fills
`pyLongRunningInterruptThreshold` to `900000` by default, but the LLM may
override it. For standard Queue Processor payloads that do not manually manage
alert thresholds, omit both fields.

## References

| Skill | When to load |
|-------|--------------|
| `queueprocessor-alerts` | Alert IDs, recommended actions, and API creation failures (including `pyNodeTypes` validation errors) |
| `Enqueue and Dispatch` | Creating a QP also requires a dispatch Activity that enqueues items; load for the enqueue-and-dispatch design pattern |


## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Queue Processor` | Minimal valid create payload — required fields only |
| `Immediate Event-Driven Queue Processor` | Immediate mode with Auto-Tune and retry config |
| `Delayed Queue Processor` | Delayed mode with property-based delay |
| `Run as Specific Operator` | Standard QP that sets a specific execution operator |
| `Queue Processor With Manual Alert Thresholds` | Manual alert-threshold scenario with explicit warning threshold |
