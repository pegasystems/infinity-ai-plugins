---
description: "Pega standard library for case status changes, resolve/reopen, SLA management, and urgency settings"
---
# Status and Lifecycle

Reusable Pega assets for managing case status, resolution, SLAs, and lifecycle
transitions.

## Category Scope

- Changing case status
- Resolving and reopening cases
- Setting and reading urgency
- SLA management (starting, pausing, restarting)
- Case lifecycle transitions (stage changes)
- Pending states and wait conditions
- Status tracking (timestamps, previous values, display formatting)
- Urgency calculation and adjustment
- Resolve summary capture

## Bootstrap Hints

To populate this file during bootstrap:
- Search for activities like `pxResolve`, `pxReopen`, `pxChangeStatus`
- Look for standard status values on `Work-` classes (`Open`, `Pending-`,
  `Resolved-`)
- Inspect standard flow actions for status transitions
- Search for SLA-related activities and rules
- Look for urgency-related properties and methods (`pxUrgencyWork`,
  `pxUrgencyAssign`)
- Inspect standard case type flows for lifecycle patterns
- Search for `pyStatusWork` and related properties

---

## Status Value Reference

Standard `pyStatusWork` values defined as `Rule-Obj-FieldValue` entries on `Work-`:

| Value | Description |
|---|---|
| `Open` | The case is open (processing is not complete), and users can work to advance it toward resolution |
| `Pending` | The case is waiting (generic pending) |
| `Pending-Approval` | Awaiting approval |
| `Pending-External` | Awaiting external input |
| `Pending-Fulfillment` | Awaiting fulfillment |
| `Pending-Investigation` | Under investigation |
| `Pending-PolicyOverride` | Awaiting policy override |
| `Pending-Qualification` | Awaiting qualification |
| `Resolved-Completed` | Case resolved -- completed successfully |
| `Resolved-Cancelled` | Case resolved -- cancelled |
| `Resolved-Duplicate` | Case resolved -- duplicate of another case |
| `Resolved-Rejected` | Case resolved -- rejected |
| `Resolved-Revoked` | Case resolved -- revoked |
| `Resolved-Unspecified` | Case resolved -- unspecified reason |
| `Resolved-Withdrawn` | Case resolved -- withdrawn |
| `Sync-Failed` | Synchronization failed |

**Conventions:** Open/active statuses use a single word (`Open`) or a `Pending-` prefix.
Terminal statuses use a `Resolved-` prefix. Custom applications may add field values but
should follow these prefix conventions for compatibility with OOTB reporting and SLA
rules.

---

## Urgency Property Reference

Case urgency is calculated by Declare Expressions on `Work-` and `Assign-`. The total
urgency is clamped to the range 0--100 (higher = more urgent).

**Case urgency (`Work-` class):**

| Property | Type | Description |
|---|---|---|
| `pxUrgencyWork` | Decimal | **Total case urgency** -- computed by Declare Expression: `@min(100, @max(0, .pxUrgencyWorkClass + .pyUrgencyWorkAdjust + .pxUrgencyWorkSLA + .pxUrgencyPartyTotal + .pxUrgencyWorkStageSLA + .pxUrgencyWorkStepSLA))` |
| `pxUrgencyWorkClass` | Decimal | Urgency set by the class model (base urgency for the case type) |
| `pyUrgencyWorkAdjust` | Decimal | Manual urgency adjustment by user (editable, label "Adjust urgency by") |
| `pxUrgencyWorkSLA` | Decimal | Urgency added by case-level Service Level rules |
| `pxUrgencyWorkStageSLA` | Decimal | Urgency added by stage-level SLA |
| `pxUrgencyWorkStepSLA` | Decimal | Urgency added by step-level SLA |
| `pxUrgencyPartyTotal` | Decimal | Urgency from party/participant rules |

**Assignment urgency (`Assign-` class):**

| Property | Type | Description |
|---|---|---|
| `pxUrgencyAssign` | Decimal | **Total assignment urgency** -- computed by Declare Expression: `@min(100, @max(0, .pxUrgencyWork + .pxUrgencyAssignSLA + .pyUrgencyAssignAdjust))` |
| `pxUrgencyAssignSLA` | Decimal | Urgency added by assignment-level SLA |
| `pyUrgencyAssignAdjust` | Decimal | Manual adjustment to assignment urgency |

**Key insight:** `pxUrgencyWork` and `pxUrgencyAssign` are both computed by Declare
Expressions -- do **not** set them directly. Set the component properties
(`pxUrgencyWorkClass`, `pyUrgencyWorkAdjust`, etc.) and the totals will recompute
automatically.

---

## Known Items

### Read or set case status

- **How:** Read or set the `.pyStatusWork` property (Single Value, Text, max 32
  characters)
- **Where:** Data Transforms, Activities, Flow Actions, Declare Expressions, When rules
- **Example:** Set `.pyStatusWork` to `"Open"` or `"Pending-Approval"` in a Data
  Transform Set step; read `.pyStatusWork` in a When rule condition
- **Notes:** `pyStatusWork` is the primary status property on the `Work-` class. It is a
  **Required** column (indexed for reporting). Standard values are defined as
  `Rule-Obj-FieldValue` entries on `Work-` (see Status Value Reference above). There is
  no `pxChangeStatus` activity in Pega -- status changes are performed by directly
  setting this property or indirectly via stage transitions (`pxChangeStage`). The
  property label is "Work status". RuleSet: Pega-ProCom 08-26-01. Availability: Final.
- **Status:** *(validated)*

### Read previous case status

- **How:** Read `.pyStatusWorkOld` property (Single Value, Text, max 32 characters)
- **Where:** Data Transforms, Activities, When rules (read-only in most contexts)
- **Example:** Use `.pyStatusWorkOld` in a When rule to check what status the case had
  before the most recent status change -- e.g., condition
  `.pyStatusWorkOld == "Pending-Approval"` to detect cases returning from approval
- **Notes:** `pyStatusWorkOld` stores the previous value of `pyStatusWork` before the
  most recent status change. It is populated by the
  `Work-.StatusElapsedCalculation` trigger (same trigger that updates
  `pyStatusWorkTimestamp`). Property label is "Work status old". Useful for auditing
  status transitions or implementing "undo" logic. RuleSet: Pega-ProCom 08-26-01.
  Availability: Final.
- **Status:** *(validated)*

### Preserve status before suspend

- **How:** Read `.pyStatusWorkPreSuspend` property (Single Value, Text, max 32
  characters)
- **Where:** Data Transforms, Activities, When rules (read-only in most contexts)
- **Example:** After resuming a suspended case, read `.pyStatusWorkPreSuspend` to
  restore the case to its pre-suspension status:
  set `.pyStatusWork` to `.pyStatusWorkPreSuspend`
- **Notes:** `pyStatusWorkPreSuspend` captures `pyStatusWork` at the moment a case is
  suspended (moved to a waiting/paused state). This allows the system to restore the
  original status when the case resumes. The property is set by the suspend mechanism
  and read by the resume mechanism. Property label is "Work status pre suspend".
  RuleSet: Pega-ProCom 08-26-01. Availability: Final.
- **Status:** *(validated)*

### Read status last-changed timestamp

- **How:** Read `.pyStatusWorkTimestamp` property (Single Value, DateTime)
- **Where:** Data Transforms, Activities, When rules, Report Definitions
- **Example:** Use `.pyStatusWorkTimestamp` in a Report Definition to find cases that
  have been in their current status for more than 24 hours:
  filter where `pyStatusWorkTimestamp < @addToDate(@CurrentDateTime(), "-1", "0", "0", "0")`
- **Notes:** `pyStatusWorkTimestamp` records the DateTime (in Pega format, GMT) when
  `pyStatusWork` was last updated. It is maintained by the
  `Work-.StatusElapsedCalculation` trigger, which fires whenever `pyStatusWork`
  changes. This same trigger also copies the old status value into `pyStatusWorkOld`.
  Property label is "Work status timestamp". RuleSet: Pega-ProCom 08-26-01.
  Availability: Final.
- **Status:** *(validated)*

### Get display-formatted status

- **How:** Read `.pyStatusWorkDisplay` property (Single Value, Text)
- **Where:** UI (Sections, Harnesses), Report Definitions
- **Example:** Display `.pyStatusWorkDisplay` in a case summary section instead of the
  raw `.pyStatusWork` value for user-friendly formatting
- **Notes:** `pyStatusWorkDisplay` provides a display-formatted version of the case
  status. This property is typically used in UI contexts where the raw status value
  (e.g., `Resolved-Completed`) needs to be presented in a more readable format.
  RuleSet: Pega-ProCom 08-26-01. Availability: Final.
- **Status:** *(validated)*

### Configure status for denied approvals

- **How:** Set `.pyStatusWorkIfDenied` property (Single Value, Text, max 32 characters)
- **Where:** Data Transforms, Case Type configuration, Flow rules
- **Example:** Set `.pyStatusWorkIfDenied` to `"Resolved-Rejected"` on a case type so
  that when an approval step is denied, the case automatically transitions to the
  rejected status
- **Notes:** `pyStatusWorkIfDenied` specifies which status value `pyStatusWork` should
  be set to if an approval is denied. This property is read by the approval framework
  to determine the post-denial status transition. If left blank, the approval denial
  handler uses a default behavior (typically keeping the case in its current status).
  RuleSet: Pega-ProCom 08-26-01. Availability: Final.
- **Status:** *(validated)*

### Resolve a case

- **How:** `pxResolve` activity (`Rule-Obj-Activity` on `Work-Channel-Triage`)
- **Where:** Activities, Flow (end shapes), Case Type lifecycle configuration
- **Example:** Call `pxResolve` to move a triage case to its terminal resolved status.
  The activity handles conflict detection, stage transition, save, commit, and page
  unlock in one call.
- **Notes:** Steps (in order): (1) calls `pzShowConflicts` to detect concurrent edits,
  (2) calls `pxChangeStage` with `ChangeToNextStage=true` and
  `CleanUpProcesses=true` to advance to the next (resolved) stage, (3) `Obj-Save` to
  persist, (4) `Commit` to finalize the database transaction, (5) `Page-Unlock` to
  release the case lock. The activity is defined on `Work-Channel-Triage`, not on
  `Work-` itself -- other case types may have their own resolve patterns via stage
  transitions. No general-purpose `pxResolve` exists on `Work-`. RuleSet:
  Pega-ProcessEngine 08-01-01. Availability: Final.
- **Status:** *(validated)*

### Reopen a resolved case

- **How:** `pxReopenItem` flow action (`Rule-Obj-FlowAction` on `PegaTask`)
- **Where:** Flow Actions, UI actions on resolved cases
- **Example:** Attach the `pxReopenItem` flow action to a case type's action menu to
  allow users to reopen completed tasks
- **Notes:** The flow action uses `reopenWorkObject` as a pre-processing activity and
  `pzToggleIsCompleted` as a data transform. Label: "Reopen Item". This is a flow
  action, not a standalone activity -- it is designed to be invoked from the UI or from
  a flow. Defined on the `PegaTask` class (task management), not on `Work-` directly.
  No general `pxReopen` activity exists on `Work-` (the seeded entry was imprecise).
  RuleSet: Pega-Desktop 08-01-01. Availability: Final.
- **Status:** *(validated)*

### Change case stage

- **How:** `pxChangeStage` activity (`Rule-Obj-Activity` on `Work-`)
- **Where:** Activities, Flow rules, Case Type lifecycle configuration
- **Example:** Call `pxChangeStage` with `ChangeToNextStage=true` to advance the case
  to the next stage in its lifecycle. Or call with `ChangeToStage="Review"` to jump
  to a specific named stage.
- **Notes:** Parameters (input): `ChangeToNextStage` (Boolean -- advance to the next
  sequential stage), `ChangeToStage` (String -- stage ID or name to jump to directly),
  `AuditNote` (String -- note for the audit trail), `CleanUpProcesses` (Boolean --
  terminate running processes from the current stage). Output parameters:
  `CurrentStageLabel` (String), `CurrentStage` (String), `AutomationErrors` (String).
  This is a large activity with 44 steps that handles process cleanup, stage validation,
  audit logging, and event firing. It is the primary mechanism for programmatic stage
  transitions. Setting `pyStatusWork` directly does **not** trigger a stage change --
  use `pxChangeStage` when you need the full stage transition lifecycle. RuleSet:
  Pega-ProcessEngine 08-25-01. Availability: Final.
- **Status:** *(validated)*

### Access resolve summary details

- **How:** Read properties on the `.pxResolveSummary` page (Embedded Page of class
  `Embed-ResolveSummary`)
- **Where:** Data Transforms, Activities, Report Definitions, UI sections
- **Example:** After a case is resolved, read `.pxResolveSummary.pxResolvedStatus` to
  get the resolution status, or `.pxResolveSummary.pxResolvedTimestamp` for when it
  was resolved
- **Notes:** `pxResolveSummary` is a Page property on `Work-` containing an embedded
  `Embed-ResolveSummary` page. Available sub-properties include:
  - `pxResolvedStatus` -- the status at resolution time
  - `pxResolvedTimestamp` -- DateTime when resolution occurred
  - `pxResolvedUserID` -- operator ID who resolved
  - `pxResolvedUserName` -- operator name who resolved
  - `pxResolvedNote` -- resolution note text
  - `pxResolvedDivision`, `pxResolvedOrg`, `pxResolvedOrgUnit` -- organizational
    context at resolution
  - `pxResolvedUserDivision`, `pxResolvedUserWorkgroup` -- resolver's org context
  - `pxReopenNote` -- note captured when case was reopened
  - `pxReopenStatus` -- status the case was in when reopened
  - `pxReopenUserID`, `pxReopenUserName` -- operator who reopened
  This page is populated by the resolution process and updated by the reopen process.
  It provides a complete audit trail of resolution and reopen events.
- **Status:** *(validated)*

### Set class-level base urgency

- **How:** Set `.pxUrgencyWorkClass` property (Single Value, Decimal) on `Work-`
- **Where:** Case Type configuration, Data Transforms, Activities
- **Example:** In the case type's `pyDefault` Data Transform, set `.pxUrgencyWorkClass`
  to `10` for low-priority case types or `50` for high-priority case types
- **Notes:** `pxUrgencyWorkClass` is the base urgency assigned to a case type via its
  class model. This is typically set during case creation in the pyDefault Data Transform
  and represents the inherent urgency of the case type itself (not SLA or user
  adjustments). It feeds into the `pxUrgencyWork` Declare Expression calculation. Do
  not set `pxUrgencyWork` directly -- set `pxUrgencyWorkClass` and other component
  properties instead. RuleSet: Pega-ProCom 08-06-01. Availability: Final.
- **Status:** *(validated)*

### Adjust case urgency manually

- **How:** Set `.pyUrgencyWorkAdjust` property (Single Value, Decimal) on `Work-`
- **Where:** Data Transforms, Flow Actions, Activities
- **Example:** In a "Manager Override" flow action, allow the manager to set
  `.pyUrgencyWorkAdjust` to `+20` to bump urgency, or `-10` to lower it. The
  `pxUrgencyWork` Declare Expression will automatically recalculate.
- **Notes:** `pyUrgencyWorkAdjust` is the user-adjustable urgency component. Property
  label is "Adjust urgency by". Unlike `pxUrgencyWorkClass` (set at case creation) and
  `pxUrgencyWorkSLA` (set by SLA rules), this property is designed for manual, ad-hoc
  urgency adjustments. The value is additive -- positive values increase urgency,
  negative values decrease it. The total is clamped to 0--100 by the Declare Expression.
  RuleSet: Pega-ProCom 08-06-01. Availability: Final.
- **Status:** *(validated)*

### Read SLA-driven urgency components

- **How:** Read `.pxUrgencyWorkSLA`, `.pxUrgencyWorkStageSLA`, and
  `.pxUrgencyWorkStepSLA` properties (Single Value, Decimal) on `Work-`
- **Where:** Report Definitions, When rules, Activities (read-only)
- **Example:** Check `.pxUrgencyWorkSLA > 0` in a When rule to detect cases where the
  case-level SLA has added urgency (indicating the case is approaching or past its
  SLA goal/deadline)
- **Notes:** These three properties represent SLA-contributed urgency at different
  levels: `pxUrgencyWorkSLA` for case-level SLAs, `pxUrgencyWorkStageSLA` for
  stage-level SLAs, and `pxUrgencyWorkStepSLA` for step-level SLAs. They are set by
  `Rule-Obj-ServiceLevel` rules as SLA intervals elapse (goal, deadline, past-deadline).
  These properties are managed by the SLA engine -- do not set them directly. They feed
  into the `pxUrgencyWork` Declare Expression. RuleSet: Pega-ProCom 08-06-01.
  Availability: Final.
- **Status:** *(validated)*

### Read total case urgency

- **How:** Read `.pxUrgencyWork` property (Single Value, Decimal) on `Work-`
- **Where:** Report Definitions, When rules, Assignment rosters, Get Next Work
- **Example:** Use `.pxUrgencyWork` in a Report Definition to sort cases by urgency
  (descending) for a work queue dashboard. Or use in a When rule:
  `.pxUrgencyWork >= 80` to trigger escalation logic.
- **Notes:** `pxUrgencyWork` is a **computed** property maintained by a Declare
  Expression. Formula: `@min(100, @max(0, .pxUrgencyWorkClass +
  .pyUrgencyWorkAdjust + .pxUrgencyWorkSLA + .pxUrgencyPartyTotal +
  .pxUrgencyWorkStageSLA + .pxUrgencyWorkStepSLA))`. Value range: 0 to 100 (Integer
  semantics, Decimal type). Higher values = more urgent. Do **not** set this property
  directly -- it will be overwritten by the Declare Expression. Instead, set the
  component properties (`pxUrgencyWorkClass`, `pyUrgencyWorkAdjust`, etc.). This
  property is used by the Get Next Work algorithm to prioritize assignments. RuleSet:
  Pega-ProCom 08-06-01. Availability: Final.
- **Status:** *(validated)*

### Read total assignment urgency

- **How:** Read `.pxUrgencyAssign` property (Single Value, Decimal) on `Assign-`
- **Where:** Report Definitions, Assignment rosters, Get Next Work, When rules
- **Example:** Use `.pxUrgencyAssign` to sort assignments in a worklist by urgency. The
  Get Next Work algorithm uses this property to determine which assignment to route to
  an operator next.
- **Notes:** `pxUrgencyAssign` is a **computed** property on `Assign-` maintained by a
  Declare Expression. Formula: `@min(100, @max(0, .pxUrgencyWork +
  .pxUrgencyAssignSLA + .pyUrgencyAssignAdjust))`. It inherits the case urgency
  (`pxUrgencyWork`) and adds assignment-specific SLA urgency and manual adjustments.
  Do **not** set this property directly. This is the property that the assignment
  routing and worklist display ultimately use. Value range: 0 to 100. RuleSet:
  Pega-ProCom 08-06-01. Availability: Final.
- **Status:** *(validated)*

### Adjust assignment urgency manually

- **How:** Set `.pyUrgencyAssignAdjust` property (Single Value, Decimal) on `Assign-`
- **Where:** Activities, Flow Actions, Data Transforms operating on assignments
- **Example:** In a "Prioritize Assignment" action, set `.pyUrgencyAssignAdjust` to
  `+15` to bump a specific assignment's priority above others for the same case
- **Notes:** `pyUrgencyAssignAdjust` is the user-adjustable urgency component at the
  assignment level. Similar to `pyUrgencyWorkAdjust` at the case level, this allows
  ad-hoc adjustment of a specific assignment's urgency. The value is additive and feeds
  into the `pxUrgencyAssign` Declare Expression. Use case: when a case has multiple
  assignments and one needs higher priority than others. RuleSet: Pega-ProCom 08-06-01.
  Availability: Final.
- **Status:** *(validated)*

### Adjust SLA timers

- **How:** `pyAdjustSLAPreAction`, `pyAdjustSLAPostAction`, and `pyAdjustSLAWrapper`
  activities (`Rule-Obj-Activity` on `Work-`)
- **Where:** Activities, SLA rule configuration (pre/post actions)
- **Example:** Reference `pyAdjustSLAPreAction` as the pre-action activity in a
  `Rule-Obj-ServiceLevel` to apply custom SLA adjustments before the SLA interval
  begins processing
- **Notes:** These activities provide extension points for customizing SLA behavior:
  - `pyAdjustSLAPreAction` -- runs before an SLA interval action executes
  - `pyAdjustSLAPostAction` -- runs after an SLA interval action executes
  - `pyAdjustSLAWrapper` -- wraps the SLA adjustment process
  They are configured in `Rule-Obj-ServiceLevel` rules. Related properties include
  `pyAdjustSLAGoalTime` and `pyAdjustSLADeadlineTime` for programmatic adjustment of
  SLA goal and deadline durations. These activities are typically overridden in
  application classes to implement custom SLA logic (e.g., extending deadlines for
  VIP customers).
- **Status:** *(validated)*

### Define SLA rules for a case or assignment

- **How:** Create a `Rule-Obj-ServiceLevel` rule on the appropriate work class
- **Where:** Case Type configuration (SLA tab), standalone Service Level rules
- **Example:** Define a Service Level rule on `MyApp-MyCase-Work` with a goal of 4 hours
  and a deadline of 8 hours. Configure urgency increments: +10 at goal, +25 at
  deadline, +10 per hour past deadline.
- **Notes:** `Rule-Obj-ServiceLevel` is the rule type for SLA definitions. SLAs can be
  defined at the case level, stage level, step level, and assignment level. Each SLA
  specifies intervals (goal, deadline, past-deadline) and actions to take at each
  interval (set urgency, run activity, send notification, escalate). SLA urgency
  increments are applied to the appropriate `pxUrgencyWork*` or `pxUrgencyAssign*`
  properties. SLAs respect business calendars when configured. Related SQL queries for
  SLA monitoring: `Assign- SLA DeadlineAssignments`, `GoalAssignments`,
  `LateAssignments`.
- **Status:** *(validated)*

### Pause SLA processing via status

- **How:** SLA rules can be configured with a "When status" condition that pauses the
  timer when the case enters a `Pending-` status
- **Where:** `Rule-Obj-ServiceLevel` configuration
- **Example:** In a Service Level rule, set the "When status" field to `Pending-` so
  that SLA timers pause whenever `pyStatusWork` begins with `Pending-` and resume when
  the status changes to a non-pending value
- **Notes:** This is not a separate activity or function -- it is a built-in capability
  of `Rule-Obj-ServiceLevel` rules. The SLA engine monitors `pyStatusWork` and
  pauses/resumes timers based on the configured status conditions. The
  `pyStatusWorkPreSuspend` property stores the pre-pause status for restoration. No
  `pxPauseSLA` or `pxResumeSLA` activity exists -- the SLA engine handles this
  declaratively based on status values.
- **Status:** *(validated)*

### SLA timeliness function aliases

- **How:** Function aliases on `Embed-UserFunction` for SLA timeliness calculations:
  `pxElapsedSLAWorkTimeliness`, `pxSLAAgeByClassTimeliness`,
  `pxSLAWorkTimeliness`, and related variants
- **Where:** Expressions, Report Definitions, Declare Expressions
- **Example:** Use `pxSLAWorkTimeliness` in a Report Definition column to display
  whether cases met, missed, or are approaching their SLA goals
- **Notes:** These function aliases are defined on `Embed-UserFunction` (not
  `@baseclass`) and calculate SLA compliance metrics. They are primarily used in
  reporting and dashboards for SLA performance analysis. The "timeliness" functions
  compare actual elapsed time against SLA goal/deadline intervals and return values
  indicating SLA status (e.g., within goal, past goal, past deadline). These are
  specialized reporting functions, not general-purpose utilities.
- **Status:** *(validated)*

---

## Notes

- **No `pxChangeStatus` activity exists.** Status changes in Pega are performed by
  directly setting the `.pyStatusWork` property in a Data Transform, Activity, or Flow
  Action. There is no OOTB activity that wraps status changes. For stage-aware status
  transitions, use `pxChangeStage` instead, which handles process cleanup, audit
  logging, and event firing as part of the stage transition.

- **`pxResolve` is not on `Work-`.** The `pxResolve` activity found in the live
  instance is on `Work-Channel-Triage` (the triage case type), not on `Work-`
  directly. Other case types achieve resolution through stage transitions
  (`pxChangeStage` advancing to a resolved stage) or through custom resolve activities.
  Do not assume `pxResolve` is available on all work classes.

- **`pxReopen` is a flow action, not an activity.** The seeded entry described
  `pxReopen` as an activity, but the live instance has `pxReopenItem` as a
  `Rule-Obj-FlowAction` on `PegaTask`. Reopening a case is done via the flow action
  framework (with pre-processing activity `reopenWorkObject` and data transform
  `pzToggleIsCompleted`), not by directly calling an activity.

- **Urgency is always computed, never set directly.** Both `pxUrgencyWork` (on
  `Work-`) and `pxUrgencyAssign` (on `Assign-`) are maintained by Declare Expressions.
  Setting these properties directly will appear to work temporarily but the values will
  be overwritten when the Declare Expression recalculates. Always set the component
  properties: `pxUrgencyWorkClass` for base urgency, `pyUrgencyWorkAdjust` for manual
  adjustment, or let SLA rules manage `pxUrgencyWorkSLA` / `pxUrgencyWorkStageSLA` /
  `pxUrgencyWorkStepSLA`.

- **Status change triggers `StatusElapsedCalculation`.** When `pyStatusWork` changes,
  the `Work-.StatusElapsedCalculation` trigger fires automatically. This trigger
  copies the old status into `pyStatusWorkOld` and records the change timestamp in
  `pyStatusWorkTimestamp`. This means you get automatic audit-trail-like behavior for
  status changes without writing custom code.

- **Urgency clamping to 0--100.** Both urgency Declare Expressions use
  `@min(100, @max(0, ...))` to clamp the total. Setting component properties to
  extreme values (e.g., `pyUrgencyWorkAdjust = 500`) will not cause the total to
  exceed 100. Negative component values are allowed and will reduce total urgency, but
  the total will not drop below 0.

- **SLA pausing is declarative, not procedural.** There is no `pxPauseSLA` or
  `pxResumeSLA` activity. SLA timers pause and resume based on `pyStatusWork` matching
  the "When status" condition configured in the `Rule-Obj-ServiceLevel` rule. Moving a
  case to a `Pending-*` status is the standard way to pause SLAs; moving it back to
  `Open` resumes them.

- **Stage changes vs. status changes.** Setting `pyStatusWork` directly changes only
  the status property. Calling `pxChangeStage` changes the stage, which may also change
  the status as a side effect. Stage changes handle process cleanup, start new stage
  processes, fire events, and log audit notes. For lifecycle transitions, prefer
  `pxChangeStage` over direct status property manipulation.
