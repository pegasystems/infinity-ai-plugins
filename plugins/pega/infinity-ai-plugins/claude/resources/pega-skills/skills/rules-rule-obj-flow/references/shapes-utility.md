---
name: shapes-utility
description: "Load when authoring a Utility shape in a flow — covers smart-shape variants (data transform, notification, change-to-stage), plain-activity wiring, and field differences between variants."
---

## Utility Shapes

`pxObjClass: Data-MO-Activity-Utility` — run an activity.

### Data Transform vs Activity — when to use each

| Use a Data Transform | Use an Activity |
|---|---|
| Read or write clipboard properties | Multi-step procedural logic |
| Conditional SET / looping over page lists | Calling platform methods (Property-Set, Log-Message, etc.) |
| Mapping or transforming data | Complex branching or external calls |
| Simpler, declarative operations | Richer imperative control flow |

Data Transforms are preferred for straightforward property manipulation. Activities
are used when you need to call platform APIs or execute steps that have no DT equivalent.

| Field | Description |
|-------|-------------|
| `pyActivityType` | `"ACTIVITY"` (server-verified current value), `"AUTOMATION"` (automation), or `"ROUTE"` (routing activity). `"UTILITY"` appears in some legacy samples. |
| `pyActivityTypeSelector` | `"ACTIVITY"` or `"AUTOMATION"` |
| `pyImplementation` | Activity name called by the shape (e.g., `pzRunDataTransform`, `pxChangeToNextStage`) |
| `pyAutomationAppliesTo` | For `AUTOMATION` shapes: target class |
| `pyRuleParamsStreamName` | Smart-shape UI stream name (see `SKILL.md` table) |
| `pzRuleParamsHolder` | Parameter holder for the smart-shape UI |
| `pzRuleParameters` | Declared parameter entries (list — replaced wholesale on update) |
| `pyCallParams` | Runtime parameter values passed to the activity |
| `pzIsAPI` | `"true"` on platform smart-shape Utilities (`pzRunDataTransform`, `pzNotifyWrapper`) and GenerativeAI shapes. Auto-set by Process Modeler; include when recreating for parity. |

### Server-written Utility empty placeholders

Every Utility shape also carries these empty placeholder fields. The
`pyRouterProp` stub is the surprising one — Utility shapes carry a minimal router
page even though they do not route work. Include all for byte-level parity:

| Field | Value |
|---|---|
| `pyAutomationAppliesTo` | `""` (for non-automation Utilities) |
| `pyUseCaseApplication` | `""` |
| `pyUseCaseName` | `""` |
| `pyRuleCallParamsClass` | `""` (blank on notify-wrapper Utility shapes — always emit, even when empty) |
| `pyPageAliases` | `[]` (empty list — schema is an array; report data shows server may serialize as `{}` empty page in some contexts, but `[]` is the schema-valid representation) |
| `pzRuleParameters` | `[]` (when no parameters declared) |
| `pyContextRefs` | `[]` |
| `pyRouterProp` | `{ "pxObjClass": "Data-MO-Activity-Router" }` (minimal stub — same shape as Start, End, degenerate-Decision) |

### Common platform activities called by Utility shapes

| Activity | Purpose |
|----------|---------|
| `pzRunDataTransform` | Run a named Data Transform |
| `pzNotifyWrapper` | Send a notification — see `examples/notify-smart-shape.md` for the full field wiring (`pyNotificationName`, `pzRuleParamsHolder.pyName`, `pzRuleParameters`, `pyCallParams.NotificationName`) |
| `pxConnectToGenerativeAI` | Invoke a GenAI connector |
| `pxChangeToSpecifiedStage` | Change the case to a specific stage — **fourth smart-shape variant**, see subsection below and `examples/utility-change-to-stage.md` |
| `pxChangeToNextStage` / `pxChangeToPreviousStage` | Stage navigation (adjacent) — plain-activity Utility variants |
| `CorrNew` | Send correspondence (email). Plain-activity Utility. Call-param keys: `CorrName` (correspondence rule), **`EmailSubject`** (NOT `Subject`), `PartyRole`, `Broadcast`, `SendAllAttachments`, `SendNow` (all string-typed). |
| `WorkList` / `WorkBasket` | Routing (when used as a Utility rather than on an Assignment) |

> **`pyActivityType` values by Utility sub-variant:**
> - `"AUTOMATION"` — only on `pxChangeToSpecifiedStage` smart-shape Utilities.
> - `"ACTIVITY"` — on plain-activity Utilities, smart-shape Utilities
>   (`pzRunDataTransform`, `pzNotifyWrapper`), and GenerativeAI shapes.
> - `"UTILITY"` — also observed on plain-activity Utilities (12 instances
>   in empirical data, always paired with `pyActivityTypeSelector: "ACTIVITY"`).
>
> Both `"ACTIVITY"` and `"UTILITY"` appear on plain-activity Utilities;
> preserve whichever value the server wrote.

### `pxChangeToSpecifiedStage` smart-shape sub-variant (AUTOMATION)

`pxChangeToSpecifiedStage` is a **fourth smart-shape Utility variant** alongside
`pzRunDataTransform` / `pzNotifyWrapper` / `pxConnectToGenerativeAI`. Unlike
those three it is an **AUTOMATION**, not an ACTIVITY.

| Field | Value on `pxChangeToSpecifiedStage` Utility |
|---|---|
| `pyImplementation` | `"pxChangeToSpecifiedStage"` |
| `pyActivityType` | `"AUTOMATION"` |
| `pyActivityTypeSelector` | `"AUTOMATION"` |
| `pyAutomationAppliesTo` | `"Work-"` |
| `pyRuleCallParamsClass` | `"Work-"` |
| `pyRuleParamsStreamName` | `"pzChangeToSpecifiedStage"` |
| `pyUseCaseName` | `"Changetoaspecificstage"` (use-case label, not the activity name) |
| `pyUseCaseApplication` | stamping application (e.g. `"AgenticAuthoringPegaDevelopment"`) |
| `pyUseCaseWorkType` | case-type class short name (e.g. `"GenAIChangeRequest"`) |
| `pzIsAPI` | `"true"` |

**`pzRuleParamsHolder` shape** — a mini-page with the stage-change selection:

```json
"pzRuleParamsHolder": {
  "pxObjClass": "<work-class>",
  "pyChangeStagesOption": "goto",
  "pyGotoStage": "<stage-id>",
  "pyGotoStageOther": "<stage-id>"
}
```

`pyGotoStage` and `pyGotoStageOther` carry the **same** stage ID (e.g.
`"PRIM1"`). `pyChangeStagesOption` is always the literal `"goto"` for
"change to a specific stage" (other option tokens exist for next/previous
variants but those use different `pyImplementation` activities).

**`pyCallParams` — 6 params (3 IN, 3 OUT), keys sorted case-insensitively:**

```json
"pyCallParams": {
  "CleanUpProcesses": "",
  "Context":          "@Utilities.pxGetStepPageReference()",
  "NewStage":         "",
  "NewStageLabel":    "",
  "pyAutomationErrors": "",
  "TargetStage":      "<stage-id>"
}
```

> **Case-page param is keyed `Context`, not `PageRef`.** The case-page
> parameter on `pxChangeToSpecifiedStage` is `Context`, carrying the
> `@Utilities.pxGetStepPageReference` expression. Do **not** use `PageRef`
> (that is not a server-observed key on this smart shape).

**`pzRuleParameters` declared-parameter rows** (6 rows, full schema with
`pyParametersParamDesc` populated):

| # | `pyParametersParamName` | `pyParametersParamType` | `pyParametersParamInOut` | `pyParametersParamDesc` |
|---|---|---|---|---|
| 1 | `Context` | `Page` | `IN` | case-page description text |
| 2 | `TargetStage` | `String` | `IN` | destination-stage description |
| 3 | `CleanUpProcesses` | `Boolean` | `IN` | cleanup-processes description |
| 4 | `NewStage` | `String` | `OUT` | new-stage-id description |
| 5 | `NewStageLabel` | `String` | `OUT` | new-stage-label description |
| 6 | `pyAutomationErrors` | `Page` | `OUT` | automation-errors page description |

`pyParametersParamType` uses proper token values (`Page`, `String`, `Boolean`)
— **not** the all-`STRING` shortcut used on the plain-activity placeholder
row. The `pyParametersParamIntelliBaseClass` field is **not** written on
these rows (the plain-activity generic placeholder carries it, but this
smart-shape does not).

See `examples/utility-change-to-stage.md` for the fully-populated worked shape.

#### Two observed variants of `pxChangeToSpecifiedStage`

The smart shape has **two configuration modes** that produce distinctly
different field fingerprints. Pick the variant that matches the authored
configuration; do not mix fields between them.

**Variant A — "Configured stage-change" (populated holder, full param set):**
The configuration above (populated `pzRuleParamsHolder` triplet, 6-row
`pzRuleParameters` declared-param table, 6-key `pyCallParams`) describes
the **goto-a-specific-stage** configuration, where the author has picked a
target stage from the dropdown.

- `pzRuleParamsHolder`: populated with `pyChangeStagesOption: "goto"`,
  `pyGotoStage`, `pyGotoStageOther` (matching stage IDs)
- `pzRuleParameters`: 6 rows (3 IN: Context/TargetStage/CleanUpProcesses;
  3 OUT: NewStage/NewStageLabel/pyAutomationErrors) with proper type tokens
- `pyCallParams`: 6 keys (CleanUpProcesses, Context, NewStage, NewStageLabel,
  pyAutomationErrors, TargetStage)

**Variant B — "Flag-mode change-to-next" (minimal holder, empty param set):**
When the author picks the **change-to-next-stage** flag option (no specific
target stage) the shape collapses to a near-empty fingerprint:

- `pzRuleParamsHolder`: minimal — `{ "pxObjClass": "<work-class>" }` only,
  no `pyChangeStagesOption` / `pyGotoStage` / `pyGotoStageOther` keys
- `pzRuleParameters`: empty array `[]` (no declared rows)
- `pyCallParams`: 2 keys only — `ChangeToNextStage: "true"` and
  `Context: "@pxGetStepPageReference"` (note: bare `pxGetStepPageReference`,
  not the fully-qualified `@Utilities.pxGetStepPageReference` form used
  in Variant A)

All other shape-level fields (`pyImplementation`, `pyActivityType`,
`pyActivityTypeSelector`, `pyAutomationAppliesTo`, `pyRuleCallParamsClass`,
`pyRuleParamsStreamName`, `pyUseCaseName`, `pzIsAPI`) carry the same values
as Variant A. The variant is determined entirely by the author's stage-
change-mode choice in the smart-shape configuration.

### `pzNotifyWrapper` smart-shape sub-variant — `pzRuleParameters` row schema

Notify-wrapper `pzRuleParameters` rows use a **10-field shape** that
**replaces `pyParametersParamSize`** (carried by approval-bundle rows — see
`shapes-subprocess.md` → `pxApproval`-wrapper SubProcess) **with
`pyParametersParamDefaultValue`**. Per row:

`pxObjClass`, `pyParametersParamName`, `pyParametersParamDesc`,
`pyParametersParamInOut` (= `"IN"` — **not** blank like approval-bundle rows),
`pyParametersParamType`, `pyParametersParamReq`,
`pyParametersParamDefaultValue`, `pyParametersParamIntelliRule`,
`pyParametersParamIntelliBaseClass` (= `"PageClass"`),
`pyParametersParamIntelliValidateAs`.

**`pzRuleParamsHolder.pyReferExisting` modes**:

- **Inline-new notification** (Utility shape authored alongside a fresh
  `Rule-Notification` rule): `pyReferExisting: "New"`.
- **Referenced existing notification**: `pyReferExisting: ""` (blank).

See `examples/notify-smart-shape.md` for the full worked shape.

### Plain-activity Utility sub-variant (non-smart-shape)

#### Activity classification — three runtime types

The `Rule-Obj-Activity` invoked by a Utility shape can have one of
three runtime classifications, signalled by `pyActivityType` on the
Activity rule itself (not on the Utility shape):

| Activity classification | `pyActivityType` on Activity | Behaviour |
|---|---|---|
| **Standard Utility** | `"UTILITY"` (or blank) | Directly executes the Activity's `pySteps` |
| **Automation** | `"AUTOMATION"` | Delegates to `pyAutomationImplActivity` + `pyAutomationMappings` (smart-shape pattern) |
| **Route** | `"ROUTE"` | Routing activity with `pySystemParameters` and `pyUsage: "FLOW"` |

The Utility shape itself sets `pyActivityType: "ACTIVITY"` (smart-shape
variants only) or omits the field (plain-activity variant). The
Activity-rule classification above is a separate dimension visible
when inspecting the called rule.

When a Utility shape invokes a plain `Rule-Obj-Activity` (i.e. **not** one
of the smart-shape implementations — not `pzRunDataTransform`, not
`pzNotifyWrapper`, not `pxConnectToGenerativeAI`, not a doc-gen wrapper),
the shape has a distinct fingerprint. Use this sub-variant for utilities
that call application-authored activities such as `pzCreateBranchForGenAI`,
stage-navigation helpers, or any custom `Rule-Obj-Activity`.

| Field | Value on plain-activity Utility |
|---|---|
| `pyImplementation` | activity rule name (e.g. `"pzCreateBranchForGenAI"`) |
| `pyActivityType` | `"ACTIVITY"` or `"UTILITY"` (both observed; preserve whichever the server wrote) |
| `pyActivityTypeSelector` | `"ACTIVITY"` |
| `pyUseCaseName` | the activity's authored **use-case label** (e.g. `"RunallPegaUnitsinBranch"` for `pzRunAllTestCasesInRuleset`, `"CreateBranchForChangeRequest"` for `pzCreateBranchForGenAI`) — same convention as smart-shape Utilities. **Not** the literal `"Utility"`, and **not** the implementation activity name. |
| `pyBaseClass` | the flow's work class |
| `pzIsAPI` | `"false"` (contrast with smart-shape Utilities which use `"true"`) |
| `pyRuleParamsStreamName` | **absent** (no smart-shape UI stream) |
| `pzRuleParamsHolder` | **absent** or minimal — no smart-shape holder |
| `pzRuleParameters` | single generic empty `Embed-MethodParams` row (see below) |

**Generic empty `pzRuleParameters[1]` row shape** — on both plain-activity
Utility shapes and on Assignment `pyRouterProp.pzRuleParameters`
placeholder rows, the single row carries this empty 5-field shape:

```json
{
  "pxObjClass": "Embed-MethodParams",
  "pyParametersParamInOut": "IN",
  "pyParametersParamIntelliBaseClass": "PageClass",
  "pyParametersParamSize": "0",
  "pyParametersParamType": "STRING"
}
```

Note: `pyParametersParamSize` is `"0"` (not `""`) on this generic empty
placeholder — distinct from approval-bundle rows (which use `""`). All
other fields are blank or absent.

**Additional inert fields on plain-activity Utility**:
`pyOnlyGoingBack: "false"`, `pyShouldReload: "No"`,
`pyTypeMismatch: "false"`, `pyTemplateInputBox: ""`,
`pzRuleParametersShowSkills: "false"`, `pyWorkStatus: ""`,
`pxWarningsToDisplay[0]` index-position placeholder.

See `examples/utility-plain-activity.md` for the full worked shape.

