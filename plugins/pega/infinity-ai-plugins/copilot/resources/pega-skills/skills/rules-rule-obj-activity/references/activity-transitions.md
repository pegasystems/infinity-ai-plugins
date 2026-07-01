---
name: Activity Transitions
description: Load when authoring steps that route to different blocks based on outcome (after the step executes). Covers the pyStepsTransParams fields, all valid action codes, jumping to named blocks, and status-based routing patterns.
---

# Activity Transitions

Transitions are the rows shown as **"Jump"** conditions in the Activity
step UI — they execute **after** the step body runs and decide where
control goes next (continue, jump to a named block, skip remaining
jumps, or exit the activity).

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
> precondition dropdown but omitted from the transition dropdown — the
> runtime still accepts `"4"` on transitions.

For "should this step run at all?" gating, use preconditions — see
`activity-preconditions.md`.

## `pyStepsTransParams` row fields (Embed-ActivityTransitions)

Each transition row holds five fields:

| Field | Meaning |
|-------|---------|
| `pyStepsTransParamsWhen` | When rule name OR inline expression evaluated **after** the step runs |
| `pyStepsTransParamsWhenTrue` | Action code when the expression is **true** (see enum below) |
| `pyStepsTransParamsWhenTruePrms` | Target **block name** when the action is `"1"` (Jump to Later Step); blank otherwise |
| `pyStepsTransParamsWhenFalse` | Action code when the expression is **false** |
| `pyStepsTransParamsWhenFalsePrms` | Target **block name** when the action is `"1"`; blank otherwise |

The step-level `pyStepsTransition` flag indicates that transitions are
present. Observed values are `""`, `"true"`, `"false"`, `"0"`, `"-1"` —
most commonly blank or `"true"`.

## Action-code enum (canonical)

Source: `Rule-Obj-Property Embed-ActivityTransitions pyStepsTransParamsWhenTrue`
prompt list (Pega-RULES 08-01-01) plus the shared row-metadata shape with
preconditions. The same enum applies to `pyStepsTransParamsWhenFalse`.

| Code | UI label | Effect |
|------|----------|--------|
| `""` | (blank) | No action — leave routing to the next row or to natural fall-through |
| `"1"` | Jump to Later Step | Jump to the block named in the `*Prms` companion field (target must match some step's `pyStepsBlockName`) |
| `"2"` | Continue Whens | Evaluate the next transition row in array order |
| `"3"` | Skip Step | Skip the next step (continue to the step after it) |
| `"4"` | Exit Iteration | Exit the current loop iteration (also valid here because pre/post share row metadata, though the UI dropdown for transitions omits it) |
| `"5"` | Skip Whens | Skip the remaining transition rows on this step (fall through to natural next step) |
| `"6"` | Exit Activity | Exit the activity entirely |

> The transition prompt list (UI dropdown) shows 6 values and omits `"4"`
> because Exit-Iteration semantics are typically expressed before-step.
> The underlying row metadata is shared with preconditions, so `"4"` is
> accepted at the metadata/runtime level; UI editors will not surface it.

## When-expression conventions

`pyStepsTransParamsWhen` accepts:

- The literal `"Always"` or `"true"` for unconditional rows.
- A **standard step-status When** (use the canonical casing below for
  new authoring — the runtime is case-insensitive but the canonical
  forms match the Pega When rule names):
  - `StepStatusFail` — true when the step set a failure status.
  - `StepStatusGood` — true on success.
  - `hasMessages` — true when the step produced clipboard messages.
  - `Always` — unconditional (equivalent to `"true"`).
- An **inline expression** prefixed with `=` (e.g.
  `=Lib(Pega-RULES:Default).hasMessages(myStepPage)`,
  `=Lib(Pega-RULES:Default).getMessagesAll(myStepPage)`).
- A **custom When rule name**.

## Multi-row patterns

Like preconditions, `pyStepsTransParams` can hold **multiple rows**
evaluated in array order. Each row's action code decides whether the
chain continues, control jumps to a block, the chain is abandoned, or
the activity exits.

### Pattern A — Status fan-out (most common)

After a connector or method step, route based on outcome:

```
Row 1:  When = StepStatusFail   WhenTrue=1  WhenTruePrms=ERR    WhenFalse=2
Row 2:  When = hasMessages      WhenTrue=1  WhenTruePrms=APPERR WhenFalse=2
```

- Row 1 true (the step failed) → jump to block `ERR`.
- Row 1 false → continue to Row 2.
- Row 2 true (messages present) → jump to block `APPERR`.
- Row 2 false → fall through to the next step naturally.

Observed in `Validate_Condition`, `pxCallConnector` family, every
Pega-API service activity.

### Pattern B — Method dispatcher

A single step's transitions route to one of several method-specific
blocks based on a discriminator value. The step itself is usually a
small Property-Set or Java setting up state; the routing happens via a
chain of `"1"` Jump to Later Step transitions:

```
Row 1:  When = .pyConnectType=="REST"   WhenTrue=1  WhenTruePrms=REST    WhenFalse=2
Row 2:  When = .pyConnectType=="SOAP"   WhenTrue=1  WhenTruePrms=SOAP    WhenFalse=2
Row 3:  When = .pyConnectType=="JAVA"   WhenTrue=1  WhenTruePrms=JAVA    WhenFalse=2
...
```

This is the structure used by `@baseclass.pxCallConnector` to dispatch
to EJB/HTTP/JCA/JAVA/REST/SOAP/dotNet blocks.

### Pattern C — Early exit on fatal error

```
Row 1:  When = StepStatusFail   WhenTrue=6   WhenFalse=2
```

- Row 1 true → `"6"` Exit Activity (no recovery).
- Row 1 false → continue normally.

## Block targeting via `pyStepsBlockName`

Action code `"1"` (Jump to Later Step) requires a **block name** in the
`*Prms` companion. Block names are defined by `pyStepsBlockName` on the
target step (or any step that opens that block). Block names must be
unique within the activity — duplicates cause a `DuplicateSteplabel`
validation error.

Common block-naming conventions seen in OOTB:

| Name | Typical use |
|------|-------------|
| `ERR`, `ERROR` | Error handler |
| `END` | Final cleanup before exit |
| `PR` | Property reset / preprocessing |
| `RESP`, `RESPONSE` | Build response payload |
| `APPERROR`, `APPERR` | Application-level error path |
| `PARSE_ERROR`, `JSON` | Parsing-error handlers |
| `ODF`, `ON_DATA_FOUND` | Branch when data was found |
| `1`, `2`, `op`, `wb` | Short labels in switch-case dispatchers |

## Preconditions vs transitions (decision guide)

| Question | Use |
|----------|-----|
| "Should this step execute at all?" | Precondition |
| "If a feature toggle is off, skip this step" | Precondition with `pzToggle_*` |
| "Skip this step if a parameter is blank" | Precondition |
| "After this connector runs, what next?" | Transition |
| "Did the step fail or produce messages? Route accordingly" | Transition (`StepStatusFail`, `hasMessages`) |
| "Pick one of N method-specific blocks" | Transition chain (Pattern B) |

For simple "run only if X" gating, prefer **a single precondition row
with `WhenTrue="2"` / `WhenFalse="3"`** (or `WhenFalse="6"` Exit Activity)
over a transition jump — it's more explicit and avoids unintended
fall-through.

## Mandatory fields on every transition row

Both `pyStepsTransParamsWhenTrue` and `pyStepsTransParamsWhenFalse`
are **required** on every row in `pyStepsTransParams` — even if the
value is `""` (blank / no action). Omitting either field causes the
server to reject the activity or silently drop the transition row.

The JSON schema enforces this via `required` on the `ActivityTransition`
definition. Always include both fields explicitly:

```json
{
  "pyStepsTransParamsWhen": "StepStatusFail",
  "pyStepsTransParamsWhenTrue": "1",
  "pyStepsTransParamsWhenTruePrms": "ERR",
  "pyStepsTransParamsWhenFalse": "2",
  "pyStepsTransParamsWhenFalsePrms": ""
}
```

## Verification checklist

After authoring or updating transitions, verify with
`get-rule(detail="full")`:

- Each `pyStepsTransParamsWhenTrue` / `WhenFalse` value is one of `""`,
  `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`. (`"4"` is rare on transitions
  and absent from the UI dropdown, but accepted at the metadata level.)
- Where the action is `"1"`, the `*Prms` field holds a block name that
  exists as some step's `pyStepsBlockName`.
- Multi-row chains end either with a fall-through (last row's false →
  `"2"` Continue Whens) or with an explicit exit (`"6"`).
- Standard When keywords use canonical casing: `StepStatusGood`,
  `StepStatusFail`, `hasMessages`, `Always`. Older rules may use
  lowercase variants (`stepstatusgood`, `stepStatusFail`) — do not
  rewrite on round-trip, but use canonical forms for new authoring.
