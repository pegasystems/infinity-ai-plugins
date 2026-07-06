---
name: rules-rule-async-jobscheduler
description: Schema and authoring guide for Pega Job Scheduler rules (Rule-Async-JobScheduler), including schedule types, scope, and examples
---

**Prerequisite:** Load `methodology-rule-authoring` first

**When to use Job Scheduler vs Queue Processor:**

| Pattern | Use |
|---------|-----|
| Recurring task at a fixed time or interval | Job Scheduler |
| Large-volume batch (100 000+ records) | JS + QP Hybrid — JS dispatches; QP processes in parallel |
| Per-node cache initialisation at startup | JS `ASSOCIATED_NODE` scope + `Startup` frequency |
| Event-driven processing | Queue Processor — never use JS for event-driven |
| "Background job" that processes "items in the queue" or "waiting records" | **Ambiguous — ask before proceeding** |

### Disambiguating "background job" + "queue" requests

When the user says they want a "background job" (or "scheduled job") that
processes "items in the queue", "waiting records", or similar, the architecture
depends on *how items enter the queue*. Ask before creating any rule:

> "When items are added — are they pushed immediately when an event occurs
> (e.g. a case reaches a certain status), or do they wait in the database
> until a scheduled sweep picks them up?"

- **Event-pushed** → Queue Processor only. Items are enqueued via
  `Queue-For-Processing`; no Job Scheduler is needed.
- **Schedule-swept** → Job Scheduler + Queue Processor hybrid. The JS
  activity browses and dispatches; the QP processes each item in parallel.

## Authoring Notes

### `pyPurpose` and `pyRuleName`

Ask the user for the rule name. Use it for `pyPurpose`; the server auto-derives
`pyRuleName` from it. The builder's auto-derivation from `pyLabel` is unreliable
and returns empty strings, producing a malformed instance key (double space in
the key where the name should be). If `pyPurpose` is omitted, the builder fills
an empty string and the rule is created without a proper name or identity key.
If the user provides a description rather than a name, derive a CamelCase
identifier (e.g. "check for latest tickets" → `CheckForLatestTickets`).

### `pyStartTime` is local time in `pyUseTimeZone` — never pre-convert to UTC

`pyStartTime` must be the wall-clock time in the timezone named by `pyUseTimeZone`.
Do **not** convert to UTC before sending. If the user wants a job at 17:00 IST
(`Asia/Calcutta`), send `"170000"` — not `"113000"`. The server normalises to UTC
internally when it saves the rule; the stored value will differ from what you sent,
but that is correct and expected. Pre-converting to UTC will cause the job to fire at
the wrong local time.

### `update-rule` and `pyRecurrencePattern`

Never include `pyRecurrencePattern` in an `update-rule` payload unless you
explicitly intend to change the schedule. Deep merge will overwrite the existing
`pyStartTime` even if the only intended change was to a different field (e.g.,
`pyNodeTypes`).

## References

| Skill | When to load |
|-------|--------------|
| `jobscheduler-checkpoint-pattern` | Resumable JS activity design — NEW/IN-PROGRESS/PROCESSED pattern |
| `jobscheduler-legacy-agent-replacement` | Migrating `Rule-Async-Agent` to JS or QP |
| `jobscheduler-alerts` | Alert IDs and recommended actions |

## Examples

### Rule-level

| Skill | Description |
|-------|-------------|
| `Stub Job Scheduler` | Minimal valid create payload — required fields only |
| `Cluster-Scoped Daily Job Scheduler` | Cluster scope, daily at 02:00, using the Checkpoint Pattern |
| `Per-Node Startup Job Scheduler` | Associated node scope, Startup frequency — per-node initialisation |
| `JS + QP Hybrid — High-Volume Batch Dispatch` | Cluster scope JS dispatch activity — see `Enqueue and Dispatch` for the activity design |
