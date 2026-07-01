---
name: connectors-and-mo-id-naming
description: "Load when wiring connectors between flow shapes — setting condition types, expressions, likelihoods, or naming connector IDs. Also covers server-written boilerplate and constraint points."
---

## Connector Structure (`pyConnectors`)

Each connector is a transition/arrow between two shapes. `pxObjClass` is always
`Data-MO-Connector-Transition`.

| Field | Description |
|-------|-------------|
| `pyFrom` / `pyTo` | Source and target shape IDs |
| `pyFromClass` | Source shape's `pxObjClass` (required for Decision-originated connectors) |
| `pyConditionType` | `Always` / `Action` / `When` / `Status` / `Else` |
| `pyExpression` | When rule name (for `When`), FlowAction name (for `Action`), **`""` (empty) on modern multi-branch `Else` connectors** — both Else-to-End and Else-to-non-End observed empty. Some legacy single-out/degenerate Decisions carry the literal `"Else"`; preserve verbatim on recreation. See D-4 note in `canvas-structure.md` and `references/routing-decision.md` → Decision Shape Branch Ordering. |
| `pyModel` | Data Transform applied on this transition |
| `pyPropertiesOrModel` | `"Set Properties"` or `"Apply Data Transform"` |
| `pyIsFork` | Set `"true"` only on connectors from **multi-branch** Decision/Fork/SplitForEach source shapes. Omit on linear connectors **and on degenerate single-out Decisions** (server does not write it there). `"false"` is the implicit default — when in doubt, omit. |
| `pyLikelihood` | `"100"` on ALWAYS / STATUS / WHEN branches. On multi-branch Decision ELSE branches, **three server-observed variants** coexist — preserve whichever is present on recreation: (1) **modern** `"0.0"` (decimal string — default on Process-Modeler-authored flows; see `references/routing-decision.md` → Decision Shape Branch Ordering); (2) **middle-legacy** `"0.0"` (equivalent to the modern form — and the **negated** `"-100.0"` variant observed on some platform flows when the ELSE target is a terminal End); (3) **very-legacy** negative values like `"-300"` / `"-200"` on older flows. Negative legacy values are historical and not written by modern Process Modeler; preserve them verbatim on update — do not normalize. |
| `pyAuditNote` | History text logged when the transition fires |
| `pyConnectorPoints` | Waypoints (list — replaced wholesale on update). See "Numeric formatting on waypoints" note below. |
| `pyPropertyAssigns` | Property-set operations on this transition (list) |
| `pyConnectorType` | Always `"Transition"` |

### Condition types

| `pyConditionType` | Used when |
|-------------------|-----------|
| `Always` | Unconditional transition (from Start shapes, from Utility/SubProcess to next step) |
| `Action` | Triggered when a user completes a Flow Action on an assignment |
| `When` | Based on a when rule or inline expression |
| `Status` | Matches a named status/outcome from a completed SubProcess sub-flow (e.g. `pyExpression: "Approve"`, `"Reject"`) |
| `Else` | Default branch from a Decision shape |

### Server-written connector boilerplate

In addition to the primary fields above, every server-authored connector carries
a consistent block of identity and placeholder fields. Include them when
recreating existing flows for byte-level parity.

| Field | Value |
|---|---|
| `pyConnectorType` | `"Transition"` |
| `pyMOId` | The connector key (e.g., `"Transition3"`) — matches the map key in `pyConnectors` |
| `pxSubscript` | Same as `pyMOId` |
| `pyFromMODefName` | `"Transition"` |
| `pyMOName` | Label: `"[Always]"` for ALWAYS, the flow-action name for Action, the when-rule name for When. For ELSE connectors, both `"Else"` (unbracketed, majority pattern) and `"[Else]"` (bracketed, platform-library flows) are observed. Author-overridden labels are preserved verbatim with `pyMONameOrig` carrying the original. |
| `pyFAProcessOnJump` | `"false"` |
| `pyAuditNote` | `""` |
| `pyDisplayLink` | `"false"` |
| `pyShapeDisplayName` | `""` |
| `pyCoordX` | `""` (blank — connectors carry no layout coordinates) |
| `pyCoordY` | `""` |
| `pyWidth` | `""` |
| `pyHeight` | `""` |
| `pyLane` | `""` |
| `pyContainerRef` | `""` — **always empty on connectors**, even on intra-container connectors physically inside a SplitJoin. Container membership is one-way: the parent SplitJoin records its child connectors via `pyConnectorRefs`, but the connectors do **not** back-reference the container. Do **not** set this to the container's shape ID. (Child **shapes** inside a SplitJoin DO carry `pyContainerRef: "<SplitJoinN>"` — see SplitJoin section — but connectors never do.) |
| `pyDisableLinkWhen` | `""` |
| `pyExpression` | `""` (on ALWAYS connectors; see row in primary table for Action/When/Else handling — ELSE-to-End also uses `""`) |
| `pyUseCaseApplication` | `""` |
| `pyUseCaseName` | `""` |
| `pyUseCaseWorkType` | `""` |
| `pyModifierRefs` | `null` |
| `pyPropertyAssigns` | `[{ "pxObjClass": "Embed-ModelParams", "pyPropertiesName": "", "pyPropertiesValue": "" }]` (single empty-row placeholder, even when no property-sets are configured). **Populated rows** additionally support the optional `pyActionName` discriminator — `"SET"` marks the row as an explicit set-to-literal, in which case `pyPropertiesValue` is a **literal expression with quote marks preserved** (e.g. `"\"Cascading\""` — the inner quote characters are part of the stored value, making it a quoted string literal). Fully-audited populated rows also carry `pyExpanded: "true"` and the author/timestamp audit stamp fields (`pxCreateOperator`, `pxCreateDateTime`, etc.). Preserve the populated shape verbatim on update. |
| `pySourceConstraintPoint` | Era-dependent — see three-variant rule below |
| `pyTargetConstraintPoint` | Era-dependent — see three-variant rule below (omitted on modern connectors; bare on 2013-era; X/Y on 2012-era) |

> **Constraint points follow a three-variant, era-aware rule.** The
> `pySourceConstraintPoint` / `pyTargetConstraintPoint` presence and shape
> depend on the connector's provenance. Match the variant to the connector's
> `pxCreateDateTime` / `pxCreateSystemID` on recreation:
>
> | Connector era | `pySourceConstraintPoint` | `pyTargetConstraintPoint` |
> |---|---|---|
> | **2013-era legacy** (e.g., Start1 seed `Transition1` on FlowStandard) | Bare marker: `{ "pxObjClass": "Embed-MO-Coordinates" }` — no X/Y | Bare marker: `{ "pxObjClass": "Embed-MO-Coordinates" }` — no X/Y |
> | **2012-era legacy** (ScreenFlow `horab`/`sde` provenance) | `{ "pxObjClass": "Embed-MO-Coordinates", "pyPointX": "<x>", "pyPointY": "<y>" }` | `{ "pxObjClass": "Embed-MO-Coordinates", "pyPointX": "<x>", "pyPointY": "<y>" }` |
> | **2026-era modern — Assignment-outbound** (source shape is an Assignment; includes `Action`-type flow-action transitions and `Always` Assignment→next) | `{ "pxObjClass": "Embed-MO-Coordinates", "pyPointX": "1.0", "pyPointY": "0.5" }` | **Omitted entirely** |
> | **2026-era modern — non-Assignment-outbound** (e.g. Utility→End, Decision→next, SubProcess→End, GenAI→End `Always` connectors) | **Omitted entirely** | **Omitted entirely** |
>
> The `(1.0, 0.5)` source-constraint anchor is an Assignment-outbound
> fingerprint only. `Utility`/`Decision`/`SubProcess`/`GenerativeAI` →
> `End` (or other `Always`) connectors authored by the modern Process
> Modeler omit both constraint subobjects entirely. On recreation, copy
> whichever variant the server's connector carries verbatim. Any
> `pyPointX`/`pyPointY` values that are integer-valued use the
> trailing-`.0` decimal format (e.g., `"1.0"`, `"70.0"` — see connector
> numeric-formatting note below).

> **Numeric formatting on waypoints and constraint-point coordinates.**
> `pyConnectorPoints[].pyPointX` / `pyPointY` and the constraint-point X/Y
> values are stringified decimals. When the server's value would otherwise be
> integer-valued, it carries an explicit trailing `.0` — e.g., `"70.0"`,
> `"140.0"`, `"1.0"`, `"0.5"`, `"42.0"`. Do **not** strip the trailing `.0` on
> recreation (`"70"` is a byte-level diff). This mirrors the decision-likelihood
> `"100.0"` formatting on single-Else branches.

> **Legacy connector markers are era-specific, not universal.** Do not assume
> "legacy" = `pyIsFork`/`pyCategory`. Match the markers to the server's
> `pxCreateDateTime` / `pxCreateSystemID` / `pxCreateOperator` on the connector:
>
> - **2013-era Start1-lineage connectors** (RaniR migration seed; `pxCreateSystemID`
> pre-dating the modern Process Modeler, typically the Start1→Utility1
> transition on FlowStandard flows created from the Start1 template) carry
> BOTH `pyIsFork: "false"` AND `pyCategory: "FlowStandard"` at the connector
> level.
> - **2012-era ScreenFlow connectors** (operator `horab`, system `sde`,
> `pxCreateDateTime` before 2013) carry NEITHER marker. Instead they carry
> populated `pyConnectorPoints` waypoint lists and populated
> `pyTargetConstraintPoint.pyPointX`/`pyPointY` coordinates — those are the
> 2012-era fingerprint.
> - **Modern (post-2020) connectors** carry none of these markers; waypoints
> and constraint-point coordinates are empty stubs.
>
> On recreation, preserve whichever era-specific set the server actually has;
> when authoring fresh connectors, omit all of these markers.

## MO ID Naming Conventions

- Start shape: `Start1`, `Start62`, `Start51` (mixed case)
- Other shapes: `Assignment1`, `Utility3`, `Decision2`, `End1` (mixed case)
- Legacy Visio-era shapes: `ASSIGNMENT63`, `END52`, `START2` (all-caps + number)
- Connectors from Start: `Transition1` (mixed case)
- Connectors between other shapes: `Transition2` or `TRANSITION54` — both patterns valid

Uniqueness within the flow is the only hard requirement.

## Connector IDs and Authoring Order

> **Connector-row fields vs pyToTasks-row fields.** Fields like
> `pyDisplayLink`, `pyFAProcessOnJump`, `pyIsFork`, and `pyPropertiesOrModel`
> live on the connector row (inside `pyConnectors[<id>]`). Don't confuse them
> with `pyToTasks` row fields (`pyTaskStatusOrWhen`, `pyTaskStatus`, etc.)
> which live in `pyFromTasks`.

### Connector IDs are authoring-order, not traversal-order

Connector IDs (`Transition1`, `Transition2`, `Transition3`,...) reflect
the order in which the connectors were **authored** in Process Modeler,
not the order in which they execute. Deleting an older connector and
adding a new one bumps the global counter without renumbering existing
connectors — so a flow with `Start → Spinoff → End` may have the
`Spinoff → End` connector as `Transition2` and the `Start → Spinoff`
connector as `Transition3` if `Spinoff → End` was authored first.

Observed on `pyRemoteProblem`:

| Flow position | Connector ID | `pyFrom` → `pyTo` |
|---|---|---|
| 1st in flow | `Transition3` | `START18` → `SPINOFF28` |
| 2nd in flow | `Transition2` | `SPINOFF28` → `END24` |

Consequences for recreation:

1. **Do NOT renumber connector IDs by traversal order.** If the spec or
   server payload names specific IDs (e.g. `Transition2: SPINOFF28→END24`),
   preserve the exact ID-to-path mapping verbatim. A naïve "first
   connector = Transition1" renumbering produces diffs on both the
   `pyConnectors` keys and the `pyFromTasks[*].pyToTasks[*].pyID` values.
2. **Non-contiguous IDs are normal.** A flow may have `Transition1` and
   `Transition3` with no `Transition2`, or vice versa. The counter
   skips deleted connectors; do not back-fill.
3. **When the spec lists IDs but not directions**, inspect the spec's
   from/to text carefully. Do not assume lower-numbered = earlier in
   flow.

