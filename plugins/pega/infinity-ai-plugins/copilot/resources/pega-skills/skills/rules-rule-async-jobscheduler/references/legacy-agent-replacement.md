---
name: jobscheduler-legacy-agent-replacement
title: Legacy Agent Replacement Guide
description: Decision rules for replacing a Rule-Async-Agent rule with a Job Scheduler or Queue Processor.
---

When you find a `Rule-Async-Agent` rule, apply the following rules:

- If `pyScheduleMode` is time-based (e.g. runs every N minutes on a schedule):
  - If the agent should run on only one node → replace with **Job Scheduler**, `pyApplicableTo: "Cluster"`
  - If the agent should run on every node independently → replace with **Job Scheduler**, `pyApplicableTo: "Associated node"`
- If the agent responds to a queue, polls for work items, or is invoked by an event:
  - Replace with **Queue Processor**, `pyProcessingMode: "Immediate"`
- If the agent both polls on a schedule AND processes individual items:
  - Split into two rules: JS (CLUSTER scope) handles the scheduled outer dispatch loop; QP handles per-item work via `Queue-For-Processing`

