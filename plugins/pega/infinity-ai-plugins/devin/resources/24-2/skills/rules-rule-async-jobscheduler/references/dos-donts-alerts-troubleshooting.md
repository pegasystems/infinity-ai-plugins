---
name: jobscheduler-alerts
title: Job Scheduler Alerts
description: Alert IDs raised by Pega for Job Scheduler rules, with conditions and recommended actions.
---

| Alert ID | Condition | Action |
|----------|-----------|--------|
| PEGA0118 | JS activity execution time exceeded long-running threshold | Refactor for smaller loops; consider JS+QP hybrid. Threshold is configurable per JS rule via `pyAlertsConfiguration[].pyThreshold` (ms) — default 10 000 ms |
| PEGA0099 | JS failed to execute | Check activity, access group, and ruleset resolution |
| PEGA0165 | JS execution count dropping | Activity failing silently; enable tracer |
| PEGA0166 | JS failure count rising | Fix root cause; review activity error handling |

