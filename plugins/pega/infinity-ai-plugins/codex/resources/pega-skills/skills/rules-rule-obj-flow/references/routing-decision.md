---
name: routing-decision
description: "Load when a flow's Decision shape has multiple outgoing branches. Covers how branch ordering works, how pyFromTasks mirrors connector fields, and how to key connectors when a Decision has more than two destinations."
---

## Decision Shape Branch Ordering

Decision shape connectors are evaluated in order; at runtime the first branch whose
condition matches wins and the ELSE branch is taken when nothing else fires.

> **Multi-branch Decisions: WHEN/ELSE likelihoods follow a configured-vs-default
> split.** On a two-branch Decision the **default** likelihoods are
> WHEN=`"100"` and ELSE=`"0.0"` (decimal-string, NOT `"0"`). When the author
> configures **balanced** likelihoods (e.g., 50/50), the server preserves the
> format split verbatim: WHEN=`"50"` (no decimal) and ELSE=`"50.0"` (decimal).
> The same paired format appears in the matching `pyFromTasks` rows. Treat
> non-default likelihoods as opaque strings to be preserved verbatim.

### Per-branch field encoding

| Branch type | `pyConditionType` | `pyExpression` | `pyMOName` | `pyLikelihood` | `pyIsFork` |
|---|---|---|---|---|---|
| WHEN (multi-branch) | `When` | when-rule name (e.g. `"pzApproved"`) | display label `"Yes"` (NOT the when-rule name) | default `"100"`; balanced varies | `"true"` |
| ACTION (flow-action from Assignment) | `Action` | flow-action rule name | flow-action display label | `"100"` | typically `"false"`; `"true"` only if the source Assignment has multiple outbound action connectors |
| STATUS (Decision/SubProcess result) | `Status` | result value (e.g. `"Complete"`, `"Approve"`) | result display label | `"100"` | `"true"` on multi-branch Decisions |
| ALWAYS (linear) | `Always` | `""` | `"[Always]"` | `"100"` | absent |
| ELSE (multi-branch default) | `Else` | **`""` (empty, NOT `"Else"`)** — applies regardless of whether the target is an End shape or a non-End shape (e.g. Utility) | **Three observed forms:** (1) unbracketed `"Else"` (most common — 37 instances); (2) bracketed `"[Else]"` (platform-library flows like `pxCascadingApproval`); (3) custom display label (e.g. `"No"`, `"No Approvers"`) with `pyMONameOrig: "[Result]"`. | default `"0.0"`; balanced varies | `"true"` |

> **Decision-out connectors propagate `pyUseCaseWorkType` from the case-type
> narrowing.** Both the WHEN and the ELSE outgoing connectors carry the
> case-type's narrowed work-type token in `pyUseCaseWorkType` (e.g.
> `"ChangeRequest"`) — this is **case-type-scoped**, not action-derived, and
> applies to **both** branches even when neither carries an Action transition.
> `pyUseCaseApplication` and `pyUseCaseName` on these connectors are typically
> `""` (only Action-typed connectors inherit those from a flow action).

### `pyFromTasks` row mirroring

Decision branches show distinct mirror rules in their `pyFromTasks` rows:

| Branch | `pyTaskStatusOrWhen` | `pyTaskStatus` | `pyTaskWhen` |
|---|---|---|---|
| WHEN — named when-rule | `"WHEN"` | **mirrors** `pyTaskWhen` — when-rule name (e.g. `"pzAllTestsPassed"`) | when-rule name |
| WHEN — inline expression (no named rule) | `"WHEN"` | **mirrors** `pyTaskWhen` — **FULL expression string** (e.g. `"@equals(param.StepApprovalType,\"Simple\")"`, `"@(Pega-RULES:String).equals(.pyApprovalResult, Approved)"`) — NOT the connector's `pyMOName` label | same full expression string |
| ELSE | `"ELSE"` | `""` (empty — **NOT** `"Else"`) | `""` (empty — **NOT** `"Else"`) |
| STATUS (flow-action) | `"STATUS"` | **mirrors** `pyTaskWhen` — status value / flow-action name (e.g. `"Approve"`, `"Reject"`, `pyCaptureChangeRequest`) | same status value / flow-action name (mirrored) |
| ALWAYS | `"ALWAYS"` | absent / `""` | absent / `""` |

> **Unified mirror rule for WHEN and STATUS.** Server populates **both**
> `pyTaskStatus` and `pyTaskWhen` with the same value on WHEN-typed **and**
> STATUS-typed `pyFromTasks` rows:
>
> - **WHEN — named when-rule**: both fields = when-rule name (e.g. `"pzApproved"`).
> - **WHEN — inline expression**: both fields = full expression string
> (e.g. `"@equals(param.StepApprovalType,\"Simple\")"`).
> - **STATUS (flow-action Action transition)**: both fields = the status
> value (e.g. `"Approve"`, `"Reject"`) or flow-action rule name, depending
> on how the Action was authored.
> - **ELSE / ALWAYS**: both fields are blank (`""`) or absent.
>
> The single-field-populated form is incomplete. Do **not** substitute the
> connector's display label (`pyMOName`) in these fields.

> **When in doubt, omit `pyIsFork`.** Server-observed flows confirm that
> degenerate single-Else Decisions do **not** carry `pyIsFork` at all — their
> connectors look like any other linear transition. Only write `pyIsFork: "true"`
> when the source shape branches into multiple outgoing connectors.

> **ELSE likelihood values.** Common observed values: `"0"` (most frequent),
> `"0.0"`, or balanced values like `"50.0"`, `"70.0"`. Some ELSE connectors
> omit `pyLikelihood` entirely. Preserve whichever value is present verbatim
> on update.

### Multi-destination Decision keying (numeric `_N` suffix)

When N outgoing connectors from the **same Decision** target the **same
destination shape**, the `pyToTasks` map collides on the shape ID. The server
de-duplicates with a numeric suffix convention:

```
pyFromTaskName: Decision2
pyToTasks:
  SubProcess3:    { pyID: Transition11, ... pxSubscript: SubProcess3,   ... }
  SubProcess3_1:  { pyID: Transition12, ... pxSubscript: SubProcess3_1, ... }
  SubProcess3_2:  { pyID: Transition14, ... pxSubscript: SubProcess3_2, ... }   # if N=3
  End1:           { pyID: Transition13, pyTaskStatusOrWhen: ELSE, ... }
```

Rules:

- First entry uses the plain shape ID (`SubProcess3`).
- Subsequent entries use `_1`, `_2`, `_3`, … numeric suffixes — **never**
  synthetic semantic suffixes like `_Approve` / `_Reject` derived from branch
  labels. The suffix is position-based, not meaning-based.
- `pxSubscript` **mirrors** the synthetic key (`SubProcess3_1`), **not** the
  real shape ID. Matching `pyToTasks` key and `pxSubscript` verbatim is
  mandatory.
- In `pyConnectors`, both connectors still carry `pyTo: SubProcess3` (the
  real ID) — the synthetic suffix appears **only** in `pyFromTasks` keying,
  never in `pyConnectors`. Look up destination via `pyID` → connector → `pyTo`.
- The distinguishing WHEN clause lives in the connector's `pyExpression` and
  in the matching `pyFromTasks` entry's `pyTaskStatus`/`pyTaskWhen` (often
  inline expressions — see above).

### Connector `pyMOName` vs `pyMONameOrig` on relabelled branches

When a connector's display label has been edited, the server records **both**
the current label and the original:

| Field | Value |
|---|---|
| `pyMOName` | current author-visible label (e.g. `"No Approvers"` on a relabelled ELSE, `"Simple"` / `"Complex"` on custom WHEN labels) |
| `pyMONameOrig` | original/default label — `"[Result]"` on edited ELSE branches, the original string on edited WHEN/Action branches |

`pyMONameOrig` appears on any connector whose label has been overridden by
the author. Include it verbatim on recreation; omit only when the server
did not write it (unedited default labels like `"[Always]"`, `"Yes"`, `"No"`
for multi-branch defaults).

> **`pyMONameOrig` is also written on recently-renamed-in-place
> connectors**, not only on relabelled branches. Platform flows such as
> `pxCascadingApproval` carry `pyMONameOrig: "[Always]"` on a fresh ALWAYS
> connector that was recently edited, or `pyMONameOrig: "Approve"` on a
> STATUS-typed transition that was retargeted. Preserve verbatim on
> recreation; fresh (never-edited) connectors omit the field.

### Recently-edited connector legacy fields

On connectors that were edited in a recent session, the server rehydrates a
block of legacy bookkeeping fields beyond the usual `pxCreateDateTime` /
`pyMONameOrig` pair. Preserve verbatim on recreation of edited connectors;
omit on fresh connectors.

| Field | Value | Meaning |
|---|---|---|
| `pyLabel` | `"Step Name"` (literal default) | Legacy display-label holder; rarely edited, defaults to `"Step Name"` on edited connectors. |
| `pyLastExpression` | e.g. `"ActionStub"`, `"When"`, or a flow-action name | Last condition the connector evaluated; used by the connector-editor palette for diff. |
| `pyFlowType` | `"FlowStandard"` (or `"ScreenFlowStandard"` inside screen flows) | Shape-level flow-type companion — independent of the rule-level flow type. |
| `pyShapeType` | `"Data-MO-Connector-Transition"` (equal to the connector's `pxObjClass`) | Legacy type-mirror written on edited connectors. |

### Sparse pre-2013-era legacy connector variant

First-generation connectors (pre-2013, recognizable by uppercase all-caps
IDs such as `TRANSITION53`) are very sparse — they lack most of the modern
connector envelope. On these, the following fields are **absent**:
`pxCreateDateTime`, `pyCategory`, `pyConnectorType`, `pyIsFork`,
`pyFromClass`, `pyUseCaseApplication`, `pyMONameOrig`,
`pyPropertiesOrModel`, and the `pyModifierRefs` block is not emitted.
Preserve the sparse field set verbatim on recreation; do **not** backfill
modern companions on these legacy rows.

