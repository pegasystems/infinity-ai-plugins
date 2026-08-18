---
name: servicelevel-timing-and-urgency
title: SLA Timing and Urgency
description: How SLA timing works across tiers, urgency accumulation, and business day vs calendar day behavior.
---

## Timing is Cumulative from Start

All three tiers (Goal, Deadline, Late) measure their intervals **from the same start
time** (e.g., assignment creation), not sequentially from each other.

**Example:** If Goal = 1 day and Deadline = 2 days, the deadline fires 2 days after
start — not 2 days after the goal fired.

## `pyCalculateTimesFrom` — Calculate Service Levels

| Value | UI label | Behavior |
|-------|----------|-----------|
| `ASSIGNSTART` | Interval from when assignment is ready | Fixed interval (Days/Hours/Mins/Secs) measured from assignment creation (most common) |
| `PROPERTY` | Set to the value of a property | Goal/Deadline/Late times come from DateTime properties — set `pyGoalTimeProperty`, `pyDeadlineTimeProperty`, etc. |

> **Note:** Earlier Pega versions listed `CASECREATE` and `STEPCREATE`. These values
> are **not accepted** by current Infinity releases and must not be used.

## `pyNextActionSetting` — Assignment Ready

Controls when the assignment becomes ready for work.

| Value | UI label | Additional fields |
|-------|----------|-------------------|
| `Immediate` | Immediately | *(none — ready as soon as created)* |
| `Calculate` | Timed delay | `pyNextActionDays`, `pyNextActionHours`, `pyNextActionMinutes`, `pyNextActionSeconds` |
| `Property` | Dynamically defined on a property | `pyNextActionProperty` — a DateTime property reference (e.g. `.pxCreateDateTime`) |

## Urgency Accumulation

Each tier adds its `pyEscalationUrgency` to the work item's current urgency:

1. **SLA starts** → urgency = `pyUrgencySLA` (initial, typically `"0"`)
2. **Goal fires** → urgency += `pyEscalations.Goal.pyEscalationUrgency`
3. **Deadline fires** → urgency += `pyEscalations.Deadline.pyEscalationUrgency`
4. **Each Late event** → urgency += `pyEscalations.Late.pyEscalationUrgency`

Higher urgency causes work items to sort higher in worklists and Get Next routing.

## Business Days vs Calendar Days

| Configuration | Behavior |
|--------------|----------|
| `pyGoalInBusinessDays: ""` (or absent) | Calendar days — 24/7, includes weekends/holidays |
| `pyGoalInBusinessDays: "true"` | Business days — uses the calendar rule named in `pyCalendar` |

The same pattern applies to `pyDeadlineInBusinessDays`, `pyLateInBusinessDays`,
and `pyEscalations.{tier}.pyInBusinessDays`.

If `pyCalendar` is blank and business days are enabled, Pega uses the default
system calendar.

## Passed Deadline Repetition

The Late tier fires repeatedly up to `pyMaxLateEvents` times:
- Set `pyMaxLateEvents: "0"` to disable late events entirely
- The Late interval controls time **between** repeated late events
- Each firing adds `pyEscalations.Late.pyEscalationUrgency` to urgency
