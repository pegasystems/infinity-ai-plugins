---
name: Activity Preconditions
description: Load when authoring steps that should only run conditionally (before the step executes). Covers the pyStepsPreCondParams fields, all valid action codes, combining multiple condition rows, and feature-toggle gating.
---

# Activity Preconditions

Preconditions are the rows shown as **"When"** conditions in the Activity
step UI — they execute **before** the step body runs and decide whether
the step should execute, be skipped, jump elsewhere, exit the activity,
or fall through to the next condition row.

> **UI vs metadata mapping.** The Activity step UI presents two condition
> sections:
>
> | UI label | Lifecycle | Step-level flag | Row array | Row `$def` |
> |----------|-----------|-----------------|-----------|------------|
> | **When** (preconditions) | Before step body | `pyStepsPreCondition: "true"` | `pyStepsPreCondParams[]` | `ActivityPreCondition` |
> | **Jump** (transitions) | After step body | `pyStepsTransition: "true"` | `pyStepsTransParams[]` | `ActivityTransition` |
>
> Both sections share the **same row metadata shape** (a When expression
> plus WhenTrue/WhenFalse action codes plus `*Prms` block-name targets)
> and accept the same 7-value action-code set. The only UI-level
> difference is that code `"4"` Exit Iteration is exposed in the
> precondition prompt list (UI dropdown) but not in the transition
> dropdown — Exit-Iteration semantics are typically expressed before-step
> inside a loop body. The runtime accepts `"4"` on transitions too.

For decisions that depend on the **outcome** of the step (status
good/fail, messages present), use transitions instead — see
`activity-transitions.md`.

## Enabling preconditions on a step

A conditional step requires **both** of the following on the step:

| Field | Required value |
|-------|----------------|
| `pyStepsPreCondition` | `"true"` |
| `pyStepsPreCondParams` | One or more rows (see below) |

Setting `pyStepsPreCondition: "true"` without populated rows makes the
step look conditional in readback but the step still runs unconditionally
at runtime. Populating rows without `pyStepsPreCondition: "true"` also
disables them.

## `pyStepsPreCondParams` row fields (Embed-ActivityPreConditions)

Each row holds five fields:

| Field | Meaning |
|-------|---------|
| `pyStepsPreCondParamsWhen` | When rule name OR inline expression evaluated to `true`/`false` |
| `pyStepsPreCondParamsWhenTrue` | Action code when the expression is **true** (see enum below) |
| `pyStepsPreCondParamsWhenTruePrms` | Target **block name** when the action is `"1"` (Jump to Later Step); blank otherwise |
| `pyStepsPreCondParamsWhenFalse` | Action code when the expression is **false** |
| `pyStepsPreCondParamsWhenFalsePrms` | Target **block name** when the action is `"1"`; blank otherwise |

## Action-code enum (canonical)

Source: `Rule-Obj-Property Embed-ActivityPreConditions pyStepsPreCondParamsWhenTrue`
prompt list (Pega-RULES 08-01-01). The same 7 values apply to
`pyStepsPreCondParamsWhenFalse`.

| Code | UI label | Effect |
|------|----------|--------|
| `""` | (blank) | No action — leave routing to the next row or to the step's natural execution |
| `"1"` | Jump to Later Step | Jump to the block named in the `*Prms` companion field (target must match some step's `pyStepsBlockName`) |
| `"2"` | Continue Whens | Evaluate the next precondition row in array order |
| `"3"` | Skip Step | Skip the current step (continue to the step after it) |
| `"4"` | Exit Iteration | Exit the current loop iteration (also valid in transitions at the metadata level, but absent from the transition UI dropdown — see `activity-transitions.md`) |
| `"5"` | Skip Whens | Skip the remaining precondition rows on this step and execute the step |
| `"6"` | Exit Activity | Exit the activity entirely |

## When-expression conventions

`pyStepsPreCondParamsWhen` accepts:

- A **When rule name** (`pyMyCondition`, `IsCustomerPlatinum`).
- An **inline expression** prefixed with `=` (e.g. `=Lib(Pega-RULES:Default).hasMessages(myStepPage)`).
- Function-style expressions resolved by the activity engine (`@isPrimaryPageNull(tools)`, `@isOrInheritsFrom(tools, primary, "Work-")`).
- The literal `"Always"` or `"true"` for unconditional rows (rare in
  preconditions; more common in transitions).
- A **feature-toggle marker** of the form `pzToggle_<FeatureName>` —
  Pega generates a synthetic When that returns true if the named feature
  toggle is enabled. Use this to gate steps behind feature flags.

## Multi-row patterns

`pyStepsPreCondParams` can hold **multiple rows**. Rows are evaluated in
array order; each row's action code decides whether the chain continues,
the step executes, the step is skipped, the activity exits, etc.

### Pattern A — AND-gate (short-circuit)

Execute the step only if **all** conditions hold; otherwise skip.

```
Row 1:  When = @isPrimaryPageNull(tools)         WhenTrue=2  WhenFalse=3
Row 2:  When = @isOrInheritsFrom(tools,primary,"Work-")  WhenTrue=2  WhenFalse=3
```

- Row 1 true → `"2"` Continue Whens → evaluate Row 2.
- Row 1 false → `"3"` Skip Step (short-circuit; Row 2 not evaluated).
- Row 2 true → `"2"` Continue Whens → no more rows → execute the step.
- Row 2 false → `"3"` Skip Step.

Observed in `pxStartCase` (2 rows), `pyApplyForLoan` (2 rows),
`Data-MO-Connector-Transition.pzSetFinalLabelDM` (4 rows).

### Pattern B — Switch-case dispatch

Each row routes to a **different block** based on its own true outcome.

```
Row 1:  When = .pyStatusWork=="Open"     WhenTrue=1  WhenTruePrms="1"
Row 2:  When = .pyStatusWork=="Pending"  WhenTrue=1  WhenTruePrms="op"
Row 3:  When = .pyStatusWork=="Closed"   WhenTrue=1  WhenTruePrms="wb"
```

- Each row true → `"1"` Jump to Later Step into a different block (1 / op / wb).
- Each row false → typically `"2"` Continue Whens (evaluate next case).
- If no row matches, control falls through to the step's natural body.

Observed in `Work-.ToInitialAssignee` step 4 (3 rows, each jumping to a
different block).

### Pattern C — Loop guard with Exit Iteration

Inside a step (or wrapper step) whose `pyStepsRepeatDef.pyStepsRepeatDefHasRepeat`
is one of the iterating loop types (`PAGE`, `EMBEDDED`, `PROPERTYLIST`,
`PROPERTYGROUP`, or `REPEAT`):

```
Row 1:  When = .pySkipMe                   WhenTrue=4   WhenFalse=2
```

- Row 1 true → `"4"` Exit Iteration (skip this iteration; continue the loop).
- Row 1 false → `"2"` Continue Whens → execute the step body for this iteration.

`"4"` only makes sense on a step that participates in an iteration;
outside a loop it is treated as exiting the (non-existent) iteration.

## Preconditions vs transitions

| Mechanism | When evaluated | Field family | Decision scope |
|-----------|----------------|--------------|----------------|
| **Precondition** | **Before** the step body runs | `pyStepsPreCondition`, `pyStepsPreCondParams` | Should this step execute at all? Where to go if not? |
| **Transition** | **After** the step body runs | `pyStepsTransParamsWhen`, `pyStepsTransParamsWhen{True,False}[Prms]` | Where to go next based on the step's outcome |

For simple "execute only if X" gating, **prefer a single precondition row
with `WhenTrue="2"`/`WhenFalse="3"`** (or `WhenFalse="6"` Exit Activity).
This is explicit, easy to verify, and avoids unintended fall-through.

For "the body produced an error / good status — now route" decisions,
**use transitions** keyed off `StepStatusFail`/`StepStatusGood`/`hasMessages`.

## `pyOnException`

`pyOnException` is a **block name** (matching some step's
`pyStepsBlockName`) — not a step number, not an activity name. When the
step throws an exception, control jumps to the named block. Common
targets: `ERR`, `END`, `PR`, `RESP`, `ODF`. Use on risky steps (data
page loads, connector calls, RDB calls) to route to a fallback block.

**Requires `pyStepsTransition: "true"`** on the same step. Without it,
the `pyOnException` value is ignored at runtime. Always set both together:

## Mandatory fields on every precondition row

Both `pyStepsPreCondParamsWhenTrue` and `pyStepsPreCondParamsWhenFalse`
are **required** on every row in `pyStepsPreCondParams` — even if the
value is `""` (blank / no action). Omitting either field causes the
server to reject the activity or silently drop the precondition row.

The JSON schema enforces this via `required` on the `ActivityPreCondition`
definition. Always include both fields explicitly:

```json
{
  "pyStepsPreCondParamsWhen": "Param.Age<60",
  "pyStepsPreCondParamsWhenTrue": "2",
  "pyStepsPreCondParamsWhenTruePrms": "",
  "pyStepsPreCondParamsWhenFalse": "3",
  "pyStepsPreCondParamsWhenFalsePrms": ""
}
```

## Verification checklist

After authoring or updating conditional steps, verify with
`get-rule(detail="full")`:

- Each conditional step has both `pyStepsPreCondition: "true"` and
  non-empty `pyStepsPreCondParams`.
- Each row's `WhenTrue`/`WhenFalse` is one of `""`, `"1"`, `"2"`, `"3"`,
  `"4"`, `"5"`, `"6"`.
- Where the action is `"1"`, the `*Prms` field holds the target block
  name and that block name exists as some step's `pyStepsBlockName`.
- Multi-row chains are in the intended order; AND-gates short-circuit on
  `"3"` Skip Step (or `"6"` Exit Activity).
- `pyOnException` (if set) targets a real block name in the activity.
