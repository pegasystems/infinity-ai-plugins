---
description: "Pega standard library for work routing, assignment transfer, queue management, and flow navigation"
---
# Navigation and Routing

Reusable Pega assets for routing work, transferring assignments, and controlling
flow execution.

## Category Scope

- Routing work to a work queue (workbasket)
- Routing work to a specific operator (worklist)
- Routing by skill or availability
- Transferring assignments between operators
- Getting the next work item
- Work queue management
- Reassigning and delegating work
- Escalation patterns

## Bootstrap Hints

To populate this file during bootstrap:
- Search for standard flow actions related to routing and assignment
- Look for activities like `GetNextWork`, `pxTransferAssignment`, `ToWorklist`
- Search for `Work-` class activities with `pyActivityType: ROUTE`
- Search for `Routing` utility functions for skill-based routing
- Look for `Assign-WorkBasket` and `Assign-Worklist` class rules
- Search for SLA-related activities for escalation routing
- Search for `D_pyAllWorkBasket` data page

---

## Routing Activity Reference

The following OOTP routing activities all live on the `Work-` class and share a
common contract: the flow engine calls them from an Assignment shape's routing
configuration. They set `param.AssignTo` to the target operator or workbasket ID,
which the engine reads after the activity returns.

| Activity | Interface | Target | RuleSet |
|---|---|---|---|
| `ToWorklist` | Process Routing | Specific operator's worklist | Pega-ProCom 08-01-01 |
| `ToWorkbasket` | Process Routing | Specific workbasket | Pega-ProCom 08-01-01 |
| `ToCurrentOperator` | Process Routing | Current operator processing the case | Pega-ProcessEngine 08-01-01 |
| `ToSkilledGroup` | Process Routing | Skilled operator in a workgroup (with manager fallback) | Pega-ProCom 08-03-01 |

All four have `pyActivityType: ROUTE` and `pyMethodStatus: API`.

---

## Known Items

### Route an assignment to a specific operator's worklist

- **How:** `ToWorklist` activity on `Work-`. Takes a required parameter
  `Operator` (STRING) -- the operator ID to route to -- and an optional
  `CheckAvailability` (BOOLEAN) parameter. Steps: (1) `Property-Set` sets
  `param.AssignTo` to the operator value, (2) if `CheckAvailability` is true,
  calls `@checkForSubstitute()` from the `Routing` utility library to handle
  substitute/delegate operators.
- **Where:** Flow assignment shape routing configuration (select "Worklist" and
  specify operator), or call directly from an activity step.
- **Example:** In a flow assignment shape, set routing to use `ToWorklist` with
  `Operator = .pyAssignedOperator`. Or in an activity step:
  `Call ToWorklist(Operator: "MyOperator")`.
- **Notes:** RuleSet: Pega-ProCom 08-01-01. Availability: Yes. Interface:
  "Process Routing". Label: "BPM Routing API: Assign to specific operator's
  worklist". Both parameters are formal (`pyParameters`): `Operator` at
  index 1 (required), `CheckAvailability` at index 2 (optional).
- **Status:** *(validated)*

### Route an assignment to a workbasket

- **How:** `ToWorkbasket` activity on `Work-`. Takes a single required parameter
  `Workbasket` (STRING) -- the ID of the workbasket to route to. Smart-prompted
  against `Data-Admin-WorkBasket`. Internally sets `param.AssignTo` to the
  workbasket value via `Property-Set`.
- **Where:** Flow assignment shape routing configuration (select "Workbasket"
  and specify queue), or call directly from an activity step.
- **Example:** In a flow assignment shape, set routing to use `ToWorkbasket`
  with `Workbasket = "MyOrg:CustomerService"`.
- **Notes:** RuleSet: Pega-ProCom 08-01-01. Availability: Yes. Interface:
  "Process Routing". Label: "BPM Routing API:Assign to specific workbasket".
  `pyUsage`: "Use in routing shapes of a flow."
- **Status:** *(validated)*

### Route an assignment to the current operator

- **How:** `ToCurrentOperator` activity on `Work-`. Has one optional parameter:
  `CheckAvailability` (BOOLEAN). Steps: (1) `Property-Set` sets
  `param.AssignTo` to `pxRequestor.pyUserIdentifier` (the current operator),
  (2) if `CheckAvailability` is true, calls `@checkForSubstitute()` to handle
  substitute/delegate operators, (3) if `AssignTo == "System"`, calls
  `pyToAlternateOperator` to find a real operator.
- **Where:** Flow assignment shape routing configuration (select
  "Current operator").
- **Example:** In a flow assignment shape, set routing to use
  `ToCurrentOperator` -- the assignment stays with whoever is currently
  processing the case.
- **Notes:** RuleSet: Pega-ProcessEngine 08-01-01. Availability: Yes. Interface:
  "Process Routing". Handles substitute operators via `checkForSubstitute`
  and falls back to an alternate operator if the current session is the
  system user.
- **Status:** *(validated)*

### Route by skill to a workgroup member

- **How:** `ToSkilledGroup` activity on `Work-`. Takes two parameters:
  `workgroup` (STRING, required -- smart-prompted against
  `Data-Admin-WorkGroup`) and `UsesSkills` (STRING, optional -- triggers the
  skills matrix display in the flow editor). Internally calls
  `@pickBalancedOperator()` from the `Routing` utility library to find an
  available operator in the workgroup who has the requisite skills. If no
  skilled operator is available, falls back to the workgroup's `pyManager`.
- **Where:** Flow assignment shape routing configuration (select skill-based
  routing and specify workgroup + skills).
- **Example:** In a flow assignment shape, use `ToSkilledGroup` with
  `workgroup = "MyOrg:Underwriting"` and configure the skills matrix to
  require "CreditAnalysis" at level 3.
- **Notes:** RuleSet: Pega-ProCom 08-03-01. Availability: Yes. Interface:
  "Process Routing". Steps: (1) `Property-Set` calls
  `@pickBalancedOperator(workgroup, Primary, myStepPage, ...)` to find
  skilled operator, (2) if none found (`local.operator==""`) then `Obj-Open`
  the workgroup page, (3) set `local.operator` to `workgroupPage.pyManager`,
  (4) `Page-Remove` the workgroup page, (5) set `param.AssignTo` to the
  resolved operator. See also: `ToSkilledGroup_RoutingSample` for a sample
  that demonstrates `AddSkill` before calling `ToSkilledGroup`.
- **Status:** *(validated)*

### Transfer an assignment to a different worklist or workbasket

- **How:** `pxTransferAssignment` activity on `Work-`. Parameters:
  `AssignmentID` (STRING, required), `DestinationType` (STRING, required --
  "worklist" or "workbasket"), `DestinationName` (STRING, required),
  `AuditNote` (STRING, optional), `UpdateHistory` (BOOLEAN, optional),
  `UpdateSLA` (BOOLEAN, optional), `Commit` (BOOLEAN, optional). Internally
  calls the `Reassign` activity.
- **Where:** Activities, flow actions, UI actions. Typically invoked from a
  "Transfer" flow action.
- **Example:** `Call pxTransferAssignment(AssignmentID: newAssignPage.pzInsKey,
  DestinationType: "workbasket", DestinationName: "MyOrg:Escalations",
  AuditNote: "Escalating per SLA breach")`.
- **Notes:** RuleSet: Pega-ProcessEngine 08-25-01. Availability: Final.
  This is the high-level transfer API -- prefer this over calling `Reassign`
  directly. Updates audit history when `UpdateHistory` is true. Can update
  SLA timers when `UpdateSLA` is true.
- **Status:** *(validated)*

### Reassign an assignment to a different operator

- **How:** `Reassign` activity on `Work-`. Low-level reassignment engine that
  `pxTransferAssignment` delegates to. Parameters: `ReassignOperator` (STRING,
  optional), `ReassignWorkbasket` (STRING, optional), `Note` (STRING, optional
  -- history note), `InstructionNote` (STRING, optional), `UpdateHistory`
  (STRING, optional -- "true"/"false"), `UpdateSLA` (BOOLEAN, optional).
  Validates that exactly one of `ReassignOperator` or `ReassignWorkbasket` is
  specified. If workbasket is specified, delegates to `ReassignToWorkBasket`.
  Otherwise opens `Data-Admin-Operator-ID` to verify the operator, sets
  org/div/unit from the operator record, updates history, and saves the
  assignment. Has 69 rule references.
- **Where:** Called internally by `pxTransferAssignment`. Can also be called
  directly from activity steps for advanced scenarios.
- **Example:** Typically not called directly -- use `pxTransferAssignment`
  instead. If needed: `Call Reassign(ReassignOperator: "MyOperator",
  Note: "Reassigned per manager request")`.
- **Notes:** RuleSet: Pega-ProcessEngine 08-25-01. Availability: Final. 21
  steps. Calls `ReassignDefaults` for default values and `AddWorkHistory`
  on the assign page. This is a complex multi-step activity -- prefer the
  `pxTransferAssignment` wrapper for most use cases.
- **Status:** *(validated)*

### Reassign an assignment to a workbasket

- **How:** `ReassignToWorkBasket` activity on `Work-`. Specialized variant of
  `Reassign` for workbasket transfers. Has 61 rule references.
- **Where:** Called internally by `Reassign` when destination is a workbasket.
  Can be called directly if you specifically need workbasket reassignment
  without the full `pxTransferAssignment` envelope.
- **Example:** Typically called through `pxTransferAssignment` with
  `DestinationType: "workbasket"`.
- **Notes:** RuleSet: Pega-ProcessEngine 08-25-01. Availability: Final.
  Related SLA activity:
  `TransferAssignmentToWorkbasket` on `Work-` (Pega-ProCom 08-01-01) --
  used by SLA escalation actions to transfer to workbasket on deadline.
- **Status:** *(validated)*

### Get the next work item for an operator

- **How:** `GetNextWork` activity on `Work-` (note: NOT `pxGetNextWork` -- the
  actual activity name is `GetNextWork`). Returns the next assignment for the
  operator to work on, from either their worklist or accessible workbaskets.
  Parameters: `TargetFrame` (STRING, optional), `currentWorkPool` (BOOLEAN,
  optional -- limit to current work pool), `WorkBasket` (STRING, optional --
  limit to specific workbasket), `AccessGroupName` (STRING, OUT -- access
  group to switch to if needed).
- **Where:** Portal UI ("Get Next Work" button), Flow Confirm harness. Invoked
  by the `pxGetNextWork` UIComponent action (Action rule).
- **Example:** Called from the "Get Next Work" button on the Find Work gadget.
  Internally delegates to `getNextWorkObject` for the actual assignment
  retrieval, then calls `Perform` to open the assignment.
- **Notes:** RuleSet: Pega-ProcessEngine 08-04-01. Availability: Yes.
  Interface: "Process GUI". `pyInputMayStart: true`. Label: "BPM GUI API:
  Get next assignment to work on". Steps: (1) call `getNextWorkObject` to
  find the assignment, (2) if none found, display `NoAssignmentsAvailable`
  harness, (3) if found in different access group, redirect via
  `RedirectAndRun`, (4) call `Perform` to open the assignment. Configurable
  via Application Settings: `GetNextWork_SkipSkillCheck`,
  `GetNextWork_SkipSkillCount`, `GetNextWork_SkipUnskilledAssignments`,
  `GetNextWork_MoveAssignmentToWorklist`,
  `GetNextWork_WorkBasketUrgencyThreshold`.
- **Status:** *(validated)*

### List all workbaskets

- **How:** `D_pyAllWorkBasket` data page. Returns assignments across all
  workbaskets for the current application. Class: `Assign-WorkBasket`.
  Structure: list. Scope: thread. Backed by the `pyAllWorkBasket` report
  definition on `Assign-WorkBasket`.
- **Where:** Explorer Data views, reporting, custom UIs that need to show
  workbasket contents.
- **Example:** Reference `D_pyAllWorkBasket` in a section or report to display
  all workbasket assignments. Accepts optional parameters `UserId` (Text)
  and `WorkGroup` (Text) to filter results.
- **Notes:** RuleSet: Pega-Desktop 08-08-01. Availability: Yes. Async: true.
  Refresh strategy: "never" (refreshes once per interaction). Editable: true.
  Label: "All Work Basket". This is designed for Explore Data -- apply
  filters on the backing report to limit the result set.
- **Status:** *(validated)*

### Add a skill to an assignment for routing

- **How:** `AddSkill` activity on `Assign-`. Adds a skill requirement to an
  assignment page so that skill-based routing can match operators.
- **Where:** Used before calling `ToSkilledGroup` to set up required skills.
  Typically called in a custom routing activity.
- **Example:** See `ToSkilledGroup_RoutingSample` on `Work-` which calls
  `AddSkill(SkillName: "Product", SkillLevel: 3)` on the assign page,
  then calls `ToSkilledGroup`.
- **Notes:** Also exists on `Data-Admin-Operator-ID` for adding skills to
  operator records. The `Assign-` version adds skills to the assignment's
  skill requirements; the `Data-Admin-Operator-ID` version adds skills to
  the operator's profile.
- **Status:** *(validated)*

### Check routing utility functions for skill matching

- **How:** The `Routing` utility library (`Rule-Utility-Library`) provides
  Java functions for skill-based routing:
  - `getAvailableSkilledOperatorsList` -- list operators with matching skills
  - `hasDesiredSkills` -- check if an operator has the desired skills
  - `hasRequisiteSkills` -- check if an operator has the required skills
  - `pickAvailableSkilledInWorkGroup` -- pick a skilled operator from a group
  - `pickBalancedOperator` -- pick a balanced (load-distributed) skilled operator
  - `ProcessSkilledOperators` -- process the list of skilled operators
- **Where:** Called internally by `ToSkilledGroup` and custom routing activities.
  Use via `@` function syntax in activity expressions.
- **Example:** `@pickBalancedOperator(workgroup, Primary, myStepPage, null, 0,
  0, 0, tools)` -- as used in `ToSkilledGroup` step 1.
- **Notes:** These are Java utility functions, not activities. They operate on
  the assignment's skill requirements (set via `AddSkill`) and the operators'
  skill profiles.
- **Status:** *(validated)*

### Check assignment ownership with Access When rules

- **How:** Standard Access When rules (`Rule-Access-When`) on `Work-` for
  checking assignment ownership:
  - `pxAssignedToMe` -- is the assignment on my worklist?
  - `pxAssignedToMyWorkGroup` -- is it assigned to my workgroup?
  - `pxAssignedToMyStaff` -- is it assigned to someone I manage?
  Also note: `pxAssignedOperatorExists` is a regular When rule
  (`Rule-Obj-When`), NOT an Access When rule. It checks whether the assigned
  operator exists in `Data-Admin-Operator-ID`.
- **Where:** Security policies, visibility conditions, flow actions, UI rules.
- **Example:** Use `pxAssignedToMe` in a When condition to show the "Perform"
  button only when the current operator owns the assignment.
- **Notes:** There are 13+ Access When rules on `Work-` for various ownership
  checks. These are boolean conditions, not routing activities.
  `pxAssignedOperatorExists` is frequently grouped with these but is a
  different rule type (`Rule-Obj-When` vs. `Rule-Access-When`).
- **Status:** *(validated)*

---

## Routing Properties Reference

Key properties involved in assignment routing:

| Property | Class | Description |
|---|---|---|
| `pyAssignedToWorkBasket` | `Work-` | Indicates if work is assigned to a workbasket |
| `pyRouteToWorkbasket` | `@baseclass` | Route target workbasket name (Pega-Survey) |
| `pyWorkBasketToAssign` | `@baseclass` / `Embed-` | Workbasket to assign mapping |
| `pxAssignedOperatorID` | `Assign-` / `Assign-WorkBasket` | Operator ID on the assignment |
| `pyReassignOperator` | `Assign-` / `Data-Reassign` | Target operator for reassignment |
| `pyReassignWorkbasket` | `Assign-` / `Data-Reassign` | Target workbasket for reassignment |
| `pyReassignType` | `Assign-` / `Data-Reassign` | Type of reassignment |

---

## Notes

- **`pxRouteWork` does not exist.** The seed file referenced this activity but
  search returns zero results. Routing is done through the specific activities
  listed above (`ToWorklist`, `ToWorkbasket`, `ToCurrentOperator`,
  `ToSkilledGroup`) rather than a generic `pxRouteWork`.

- **`pxGetNextWork` is a UIComponent action, not an activity.** The UI button
  "Get Next Work" is backed by the `pxGetNextWork` UIComponent Definition
  (Action rule), which invokes the `GetNextWork` activity on `Work-`.

- **`pxRouteToWorkbasket` exists but on `Embed-Triage-Action-RouteTo`**, not on
  `Work-`. It is part of the email triage routing system (Pega-ProcessEngine
  08-25-01, Availability: Final) and is not the general-purpose routing
  activity.

- **Routing architecture:** Flow assignment shapes call routing activities via
  `pyActivityType: ROUTE` interface. The activity sets `param.AssignTo` to the
  target operator or workbasket ID. The flow engine reads this value and
  creates the appropriate `Assign-Worklist` or `Assign-WorkBasket` record.

- **Skill-based routing flow:** (1) Call `AddSkill` on the assignment page to
  set required skills, (2) Call `ToSkilledGroup` with the target workgroup,
  (3) The activity calls `@pickBalancedOperator()` to find a matching
  operator, (4) If none found, falls back to the workgroup manager.

- **Transfer vs. Route:** Routing happens at assignment creation (flow shapes).
  Transfer happens after assignment creation (moving an existing assignment).
  Use `ToWorklist`/`ToWorkbasket` for routing; use `pxTransferAssignment`
  for transfers.

- **GetNextWork configuration:** Multiple Application Settings control
  GetNextWork behavior (skill checking, workbasket urgency threshold,
  whether to move assignment to worklist). These are in the
  `Pega-ProcessEngine` and `Pega-ProCom` rulesets.
