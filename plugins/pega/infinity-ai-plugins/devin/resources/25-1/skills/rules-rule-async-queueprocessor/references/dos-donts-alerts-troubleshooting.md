---
name: queueprocessor-alerts
title: Queue Processor Alerts
description: Alert IDs raised by Pega for Queue Processor rules, with conditions and recommended actions.
---

| Alert ID | Condition | Action |
|----------|-----------|--------|
| PEGA0117 | Activity execution time exceeded long-running threshold | Refactor activity to complete faster; check for slow external calls |
| PEGA0134 | High broken queue count | Read `pzProcessingErrorDetails`; fix root cause before requeuing |
| PEGA0168 | Activity exceeded interrupt threshold (QP auto-disabled) | Fix slow activity; re-enable QP |

## Rule Creation

### `pyNodeTypes` validation failure

**Error:** `"Queue should have at least one Node type association"`

**Cause:** Server-side validation on the `pyNodeTypes` map. The canonical format is:

```json
"pyNodeTypes": {
  "BackgroundProcessing": {
    "pxObjClass": "Embed-Rule-FutureQueue-nodeInfo",
    "pxSubscript": "BackgroundProcessing",
    "pyNodeType": "BackgroundProcessing"
  }
}
```

`pxObjClass` is auto-filled by the MCP server when using `create-rule` and should be
omitted from the payload.

The builder auto-fills `pyNodeTypesText` to `BackgroundProcessing`.
Server-side create can fail if `pyNodeTypesText` is omitted.

**Do not substitute a Job Scheduler.** A Queue Processor and a Job Scheduler serve
fundamentally different purposes — event-driven vs schedule-driven — and are never
interchangeable. If creation fails, report the failure and investigate; see
`methodology-rule-authoring` for the general principle.

### Interrupt threshold validation failure

**Applies:** Unconditionally on every QP create.

**Error:** `".pyLongRunningInterruptThresholdUI: Interrupt threshold value is too short. The minimum value is 10 seconds."`

**Cause:** The server always validates the interrupt threshold regardless of
`pyIsAlertThresholdManuallyEnabled`. When `pyLongRunningInterruptThreshold` is
omitted, it defaults to 0, which fails the minimum check. The error references
`pyLongRunningInterruptThresholdUI` but that field is server-computed and cannot
be set via API — the actual input field is `pyLongRunningInterruptThreshold`
(in milliseconds).

| Field | Unit | Builder auto-fill |
|-------|------|-------------------|
| `pyLongRunningInterruptThreshold` | milliseconds | `"900000"` (15 min) |

**Fix:** The builder unconditionally auto-fills `pyLongRunningInterruptThreshold`
to `"900000"` if not provided by the agent. No other threshold fields are
required when `pyIsAlertThresholdManuallyEnabled` is unset/`"false"`.
