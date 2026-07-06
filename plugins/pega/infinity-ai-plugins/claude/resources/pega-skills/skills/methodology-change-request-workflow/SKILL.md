---
name: methodology-change-request-workflow
description: "Load before creating or updating any Pega rules. Covers the ChangeRequest 4-stage lifecycle (intake, authoring, review, complete), branch isolation, case properties, and resuming cases."
---

Wrap rule authoring work inside a `PegaAccel-GenAI-ChangeRequest` case to provide
traceability, human approval gates, and audit summaries for all rule changes made
by the agent.

## Purpose: Branch Isolation for Human Review

**The entire purpose of this workflow is to ensure that every change made by the agent
is isolated in a branch ruleset so a human can review it before it takes effect.**
Without this isolation, agent-authored changes would land directly in the base ruleset
and be immediately visible to all users — with no opportunity for human review.

Branch isolation guarantees:
- **No unreviewed changes reach production.** Every create, update, withdraw, and block happens
  in a branch ruleset that is invisible to end users until explicitly merged.
- **A human always approves.** The mandatory Review stage (Stage 3) requires explicit
  user approval before the case can complete. The agent must never auto-approve.
- **Changes are auditable.** The ChangeRequest case tracks what changed, why, and
  who approved — creating a permanent audit trail.

## Goal

Every batch of rule changes (creates, updates, withdraws, blocks) flows through a structured
4-stage lifecycle:

1. **Intake & Analysis** -- capture what will change and why
2. **Authoring** -- create/update rules, track each change incrementally
3. **Review** -- pause for human approval before completion
4. **Complete** -- once approved, the case resolves as `Resolved-Complete`

After completing this recipe: all rule changes are recorded on a ChangeRequest case
with full traceability and an approval decision.

## Prerequisites

- **Case type class:** `PegaAccel-GenAI-ChangeRequest`
- **Operator:** The current operator must have permission to create ChangeRequest cases.
- **Authoring plan:** The parent agent must have a validated authoring plan (from
  pre-authoring research) describing what rules to create or update. The ChangeRequest
  workflow itself enforces human approval at the Review stage (Stage 3) before any
  changes take effect — a separate upfront user approval step is not required.
- **Pre-flight workflow discovery:** Before creating the ChangeRequest, call
  `list-available-authoring-workflows` to determine whether a deterministic authoring
  workflow matches the user's intent. If a match is found, also check the workflow's
  stated **Limitation:** — if the user's request exceeds those limitations, treat it as
  no match and use the skills path. See **Pre-flight Step** below.

## Key Concepts

### One Case Per User Session

Create one ChangeRequest case per user session, not per individual rule change. If the
user asks "add 5 properties to Customer," that is one case covering all 5 properties.
If the user makes a separate request later, continue with that case.

### Incremental Tracking

Update the case tracking properties (`pyAuthoringNotes`) **as you work**, not just at
the end. Each rule write call (`create-rule`, `update-rule`, or `copy-rule`) should be 
followed by updating these fields on the case.

### Mandatory Review Gate

**Always pause for user approval at the Review stage (Stage 3).** Present a summary
of all changes made and wait for explicit "approved" from the user before advancing
past review. Never auto-approve.

### Testing Strategy

**Create PegaUnit test cases for every testable authored rule.** Only rules whose
`pxObjClass` is one of the following types support PegaUnit testing:

- `Rule-Obj-Activity`
- `Rule-Obj-Model` (Data Transform)
- `Rule-Obj-When`
- `Rule-Obj-MapValue`
- `Rule-Obj-Report-Definition`
- `Rule-Declare-Pages`
- `Rule-Declare-Collection`
- `Rule-Declare-DecisionTree`
- `Rule-Declare-DecisionTable`
- `Rule-Declare-Expressions`
- `Rule-Decision-Strategy`

PegaUnit test cases are created **after all application rules are authored** and
**before submitting the Authoring stage** (`pyAuthorRuleChanges`). This ensures test
cases exist alongside the authored rules when the Authoring stage is submitted.

When the Authoring stage is submitted, the post-processing of the Author assignment
automatically triggers PegaUnit test execution via API using the `pyBranchID`. This
API returns a **test execution ID** that can be used to track and retrieve test results.

For each authored rule whose type is in the list above, create a
`Rule-Test-Unit-Case`. **This is not optional — every testable rule MUST have a
corresponding test case.** If none of the authored rules match a testable type (e.g.,
only `Rule-Obj-Property` rules were created), no PegaUnit tests are required.

## Case Lifecycle Stages

| Stage | Case Status (`pyStatusWork`) | Flow | Assignment/Action | What happens |
|-------|------------------------------|------|-------------------|-------------|
| 1. Intake & Analysis | | `pzChangeRequestIntake_Flow` | `pyCaptureChangeRequest` flow action | Capture change description, branch ID, to-dos |
| 2. Authoring | `Open-Authoring` | `pzRuleAuthoring_Flow` | `pyAuthorRuleChanges` flow action | Create/update rules in the branch (scoped by `pyBranchID`), track changes incrementally |
| 3. Review | `Open-Review` | `pzChangeReview_Flow` | `pyReviewAndApprove` flow action | Human reviews changes and approves, rejects, or sends back for more work. |
| 4. Complete | `Resolved-Complete` | | | Once the human has reviewed and approved the changes, the case automatically advances to the Complete stage and resolves as `Resolved-Complete`. The branch remains open for review and merge through Pega's branch management — approval does not trigger an automatic merge. |

### Case status requirements for rule authoring

The case's `pyStatusWork` determines which types of rules can be created or updated:

- **`Open-Authoring`** -- Create or update application rules (properties, activities, data
  transforms, flows, views, etc.).

If the case is not in the expected status for the type of rule being authored, check
the troubleshooting section for guidance.

### Resuming work from `Open-Review`

If the user asks to make changes to rules while the case is in `Open-Review`, the agent
must loop the case back to the appropriate stage:

1. **Submit `pyReviewAndApprove` with `pyApprovalDecision: "Keep working"`** -- this
   loops the case back to Stage 2 (Authoring), setting the status to `Open-Authoring`.
   The existing branch and authored rules are preserved.
2. **Once back in `Open-Authoring`**, evaluate the user's request against available
   workflows using the MID-AUTHORING DECISION:
   - Call `list-available-authoring-workflows` and semantically match the request.
   - **Match found AND within limitations** → call `create-case` using the matched workflow `caseTypeID`
      and `content={"pyChangeRequestID":"{changeRequestCaseID}"}`,
      use the returned embedded `nextAssignment`, and work through workflow screens until complete,
      then submit `pyAuthorRuleChanges` to return to Review.
   - **Match found BUT exceeds limitations** → treat as no match, use skills path below.
   - **No match** → author the rules using the relevant rule-type skill and write API,
     then submit `pyAuthorRuleChanges` to return to Review.

## Case Properties Reference

### Intake fields (set in Stage 1)

| Property | Type | Description |
|----------|------|-------------|
| `pyLabel` | Text | Short title for the change request (max 64 characters) |
| `pyChangeDescription` | Text | Detailed description of what will change and why |
| `pyToDos` | Text | Step-by-step plan / to-do list for the changes |
| `pyBranchID` | Text | Branch name for the changes. Must be 3-16 characters; the server rejects values outside this range. Must **not** start with `px`, `py`, or `pz` (case-insensitive) — Pega reserves these prefixes for non-Pega rulesets and rejects branch names that use them. **Verbatim relay:** Once chosen, this exact value must be returned to the parent and passed unchanged into all subsequent subtask delegations. Do not add suffixes (e.g., `br`, `branch`), do not abbreviate, and do not rephrase. The branch name, ruleset name, and ruleset version must all use this identical value. |

**Note:** `pyPriority` and `pyTargetClass` are not valid properties on this case type.
Do not include them in the intake submission — they cause undefined property errors.

#### Branch ID Selection Rules

The `pyBranchID` value is determined **at form-filling time** (Step 3 — Submit Intake),
not before. Do not pre-select or decide on a Branch ID during the Pre-flight step or
case creation. Apply the following priority order when filling the intake form:

| Priority | Condition | Action |
|----------|-----------|--------|
| 1 | User explicitly provides a Branch ID | Use the user-provided value exactly as given (respecting the 3-16 character and prefix constraints). |
| 2 | `pyBranchID` is already populated on the case (e.g., resuming a case) | Keep the existing value — do NOT override or re-select it. |
| 3 | User's request references a work item ID (User Story, Task, Feedback, or Issue — e.g., "work on US-162", "pick up T-45", "fix I-4009") | Use that work item ID as the Branch ID (strip any characters that violate constraints if necessary). |
| 4 | None of the above apply | The agent selects a concise, descriptive Branch ID derived from the change intent (e.g., `AddPhoneNum`, `FixSLALogic`). |

**Key rules:**
- **Never override a user-supplied or pre-existing Branch ID.** If the user said it or
  the field already has a value, that value wins unconditionally.
- **Work item IDs take precedence over agent-generated names.** If the user says
  "work on US-162," the Branch ID is `US-162` — do not invent a different name.
- **Agent-generated Branch IDs are the last resort.** Only generate one when the user
  has not provided a Branch ID, no existing value is present, and no work item ID is
  referenced in the request.

### Authoring tracking fields (updated incrementally in Stage 2)

| Property | Type | Description |
|----------|------|-------------|
| `pyChangeDescription` | Text | Description of what is being changed (carried forward from intake, can be updated) |
| `pyToDos` | Text | Step-by-step plan / to-do list (carried forward from intake, can be updated) |
| `pyAuthoringNotes` | Text | Running log of authoring decisions and observations |

### Review fields (set in Stage 3)

| Property | Type | Description |
|----------|------|-------------|
| `pyChangeSummary` | Text | Human-readable change summary (plain text, not markdown). |
| `pyApprovalDecision` | Text | Approval decision: "Approved", "Rejected", or "Keep working". "Keep working" loops the case back to the Authoring stage so the agent can make additional changes without rejecting the work done so far. |

## Steps

### Pre-flight: Determine the Authoring Path

Before creating the ChangeRequest case, determine which authoring path to take:

1. Call `list-available-authoring-workflows` and semantically match the user's request
   against the available workflows. Match on the rule type and operation involved,
   not just keywords (e.g., "update the AI prompt" should match a workflow described
   as "create & update GenAI Connect Rules").
2. **Match found** → check the workflow's stated **limitations** (in its description/scope).
   If the user's request requires capabilities that exceed those limitations, treat it
   as **no match** and follow Path 2. Otherwise, record the workflow case type ID; follow
   **Path 1** after intake.
3. **No match OR limitations exceeded** → follow **Path 2** after intake.

This matching is done once, upfront. Follow-up requests made while in `Open-Authoring`
are handled separately via the MID-AUTHORING DECISION (see below).

### Step 1: Create the ChangeRequest Case

**Tool:** `create-case`
**Parameters:** `caseTypeID="PegaAccel-GenAI-ChangeRequest"`

This creates a new case and returns:
- `caseID` -- the work object ID (e.g., `PXC-11`)
- `caseTypeID` -- `PegaAccel-GenAI-ChangeRequest`
- `nextAssignmentID` -- the assignment for Stage 1 (Intake), when one exists
- `nextAssignment` -- the **full assignment payload** for Stage 1 (actions, content, and assignment metadata), when `nextAssignmentID` is present
- `responseClass` -- the response class from the create-case API, when present

Record the `caseID` and `nextAssignmentID`. If `nextAssignment` is present, use it immediately instead of making an extra `get-assignment` call.

### Step 2: Use the Embedded Intake Assignment

After `create-case`, inspect `nextAssignment` from the response.

This should already give you:
- the Stage 1 assignment ID
- available actions (should include `pyCaptureChangeRequest`)
- current case data/content

Confirm `pyCaptureChangeRequest` is available in `nextAssignment.actions`.

### Step 2b: Fallback — Get the Intake Assignment Only If Needed

**Tool:** `get-assignment`
**Parameters:** `assignmentID="{nextAssignmentID}"`

Call this only if one of the following is true:
- `create-case` returned a `nextAssignmentID` but not a usable `nextAssignment`
- you need to re-fetch the intake assignment because the workflow was resumed or the assignment may have changed
- you are troubleshooting an unexpected intake state

This returns:
- Available actions (should include `pyCaptureChangeRequest`)
- Current case data

### Step 3: Submit Intake (Stage 1 -> Stage 2)

**Tool:** `perform-action`
**Parameters:**
- `assignmentID="{nextAssignment.assignmentID}"` (or `{nextAssignmentID}` if you had to use Step 2b)
- `actionID="pyCaptureChangeRequest"`
- `content` -- JSON with intake fields (`pyLabel` must be under 64 characters):

**Determine `pyBranchID` now** using the Branch ID Selection Rules (see Intake fields
section above). Do not pre-select the Branch ID before this step.

```json
{
  "pyLabel": "Add PhoneNumber property to Customer",
  "pyChangeDescription": "Add a Text property with Phone format to the Customer data class for contact tracking.",
  "pyToDos": "1. Create PhoneNumber property on Customer class\n2. Add to CustomerDetail view",
  "pyBranchID": "AddPhoneNumber"
}
```

The response returns a new `nextAssignmentID` for Stage 2 (Authoring).

**Automatic branch record creation:** When `pyBranchID` is provided in the intake
fields, submitting `pyCaptureChangeRequest` automatically creates the branch and
adds it to the application. All subsequent rule authoring is scoped to the branch
based on `pyBranchID`.

### Step 4: Get the Authoring Assignment

**Tool:** `get-assignment`
**Parameters:** `assignmentID="{nextAssignmentID}"`

Confirm `pyAuthorRuleChanges` is available as an action.

### Path 1 — Workflow-Driven Authoring (match found at pre-flight)

When a workflow was matched in the pre-flight step, start it by creating the workflow case:

1. Call `create-case` with:
   - `caseTypeID="{matchedWorkflowCaseTypeID}"`
   - `content={"pyChangeRequestID":"{changeRequestCaseID}"}`

   **Example structure:**
   ```
   create-case(
     caseTypeID: "PegaAccel-AI-Work-Update-Toggle",
     content: { "pyChangeRequestID": "PEGAACCEL PXCR-19" }
   )
   ```

2. `pyChangeRequestID` is mandatory and must be set to the current ChangeRequest `caseID`.
3. Use the embedded `nextAssignment` returned by `create-case` as the first workflow assignment.
   Do not call `get-assignment` immediately unless that embedded assignment is missing or unusable.
4. Work through workflow assignment screens by submitting actions and using returned assignment IDs
   until the workflow completes.
5. Continue with the main authoring case flow.


### Path 2 — Skills-Based Authoring (no match at pre-flight)

When no workflow was matched, load the relevant rule-type skill (`rules-<type>`) and
author the rules using the appropriate write API. Track every change in
`pyAuthoringNotes`.

### MID-AUTHORING DECISION

Applies whenever the user makes a new authoring request while the case is in
`Open-Authoring`.

1. Call `list-available-authoring-workflows` and semantically match the new request.
2. **Match found** → check the workflow's stated **limitations**. If the request exceeds
   those limitations, treat as no match and go to step 3. Otherwise, call `create-case`
   with the matched workflow `caseTypeID` and `content={"pyChangeRequestID":"{changeRequestCaseID}"}`,
   then work through workflow screens using returned assignment IDs until complete.

3. **No match OR limitations exceeded** → load the relevant rule-type skill and author
   the rules using the write API. Track changes in `pyAuthoringNotes`.
4. After completing the additional changes, proceed to Step 6 and Step 7.

### Step 5: Perform the Actual Rule Authoring (Skills-Based)

This step covers the **Path 2 fallback** when no workflow matched. Create and update
rules using the write API selected for the target rule type.

**The case must be in `Open-Authoring` status** (`pyStatusWork = "Open-Authoring"`)
during this step. If the case is not in this status, the authoring stage has not been
reached or has already been submitted.

#### Branch-scoped authoring (MANDATORY)

Since `pyBranchID` is always set during Intake, all rules created or updated in this
stage **must use the branch ruleset and version**, not the base ruleset. The branch
ruleset is derived internally from `pyBranchID`. All rule write calls must pass the
`changeRequestID` to scope changes to the correct branch.

**Never create or update rules in the base ruleset during a branched ChangeRequest.**
The whole point of branching is to isolate changes for human review. Rules created or
updated in the base ruleset bypass the branch and are immediately visible to all
users — with no opportunity for review.

For detailed information on branched development, see `pega-branched-development`.

If you need to modify an existing rule that is not already in the branch ruleset, use
`copy-rule` to create a branch copy first.

#### Tracking incrementally

**After each rule change**, note the changes to include in the authoring submission.

**Track:**
- Append to `pyAuthoringNotes`: decisions, observations, warnings encountered,
  and which rules were created or updated with their instance keys

### Step 6: Create PegaUnit Test Cases (MANDATORY — Before Submitting Authoring)

**⚠️ THIS STEP IS MANDATORY AND MUST NEVER BE SKIPPED when testable rules exist.**

**After all application rules are authored and before submitting the Authoring stage**,
create PegaUnit test cases for every testable authored rule.

#### Step 6a: Capture Eligible Test Rulesets (MANDATORY PRE-CHECK)

Before creating any unit test case, call `get-assignment` on the current Authoring
assignment (`pyAuthorRuleChanges`) and inspect the response for the list of eligible
test rulesets (rulesets that support `Rule-Test-Unit-Case` creation in this branch
context). List them explicitly.

**If NO eligible test rulesets exist**, you MUST emit a user-visible warning before
submitting the Authoring stage — logging only to `pyAuthoringNotes` is insufficient:

1. STOP — do not call `perform-action` for `pyAuthorRuleChanges` yet.
2. Emit this message in your reply (substitute the authored rule list):

   > ⚠️ **PegaUnit test case creation skipped**
   >
   > No eligible test rulesets are available for branch `{pyBranchID}`. Skipping
   > test case creation for the following testable rules:
   >
   > - `{rule instance key 1}`
   > - `{rule instance key 2}`
   >
   > Proceeding to submit the Authoring stage without test cases.

3. Record the same in `pyAuthoringNotes`, then proceed to Step 7.

Do not attempt test case creation when no eligible rulesets exist — it will fail.

**If eligible test rulesets exist**, proceed to Step 6b.

#### Step 6b: Create Test Cases for Testable Rules

1. Review the **complete** list of rules authored in Step 5.
2. For **every single rule** whose `pxObjClass` matches a testable type (see
   **Testing Strategy** above), you **MUST** create a `Rule-Test-Unit-Case` using
   the `pyBranchID` and one of the eligible test rulesets identified in Step 6a.
   Do not skip any testable rule — each one requires its own test case.
3. **Only if zero authored rules match a testable type** (e.g., the entire authoring
   consisted solely of `Rule-Obj-Property` rules), then no PegaUnit tests are
   required. Document this explicitly in `pyAuthoringNotes` (e.g., "No testable
   rule types authored — PegaUnit tests not applicable").

**Do NOT proceed to Step 7 (Submit Authoring) until all required test cases have
been created.** Submitting the Authoring stage without creating test cases for
testable rules is a workflow violation.

All test cases MUST be created using the `pyBranchID`, not the base ruleset.

### Step 7: Submit Authoring (Stage 2 -> Stage 3)

**Tool:** `perform-action`
**Parameters:**
- `assignmentID="{authoringAssignmentID}"`
- `actionID="pyAuthorRuleChanges"`
- `content` -- JSON with accumulated tracking fields:

```json
{
  "pyChangeDescription": "Add a Text property with Phone format to the Customer data class for contact tracking.",
  "pyToDos": "1. Create PhoneNumber property on Customer class\n2. Add to CustomerDetail view",
  "pyAuthoringNotes": "Created PhoneNumber as Text/Phone format in branch ruleset."
}
```

This advances the case to Stage 3 (Review). The response returns a new
`nextAssignmentID` for the Review stage.

**Post-processing — automatic test execution:** When the Authoring stage is submitted,
the post-processing of the Author assignment automatically invokes PegaUnit test
execution via API using the `pyBranchID`. This returns a **test execution ID** that
can be used to track and retrieve test results. Record this test execution ID to
include results in the review summary.

### Step 8: Get the Review Assignment

**Tool:** `get-assignment`
**Parameters:** `assignmentID="{reviewAssignmentID}"`

Confirm `pyReviewAndApprove` is available as an action.

### Step 9: Prepare the Change Summary (DO NOT CALL perform-action HERE)

Before presenting the review to the user, **compose** the `pyChangeSummary` text
locally. Do **NOT** call `perform-action` in this step — any call to
`pyReviewAndApprove` without `pyApprovalDecision` causes the system to default to
"Keep working" and loops the case back to the Authoring stage unnecessarily.

**Format: Plain text only.** Do not use markdown, bullet points with `*` or `-`,
headers with `#`, or any other markup. Use simple line breaks and indentation
for structure.

Example summary text (hold this for Step 11):

```text
Created PhoneNumber property on MyOrg-MyApp-Data-Customer class in branch ruleset.

Rules created:
  PhoneNumber property (RULE-OBJ-PROPERTY MYORG-MYAPP-DATA-CUSTOMER PHONENUMBER)

Notes: Property created as Text/Phone format for contact tracking.
```

**⚠️ CRITICAL: Do NOT call `perform-action` with `pyReviewAndApprove` at this
point.** The summary and approval decision are submitted together in a **single**
`perform-action` call in Step 11 — after the user has provided their decision.
Any intermediate call without `pyApprovalDecision` will loop the case back to
Authoring and require re-submitting through `pyAuthorRuleChanges` to return to
Review.

The user may request changes to `pyChangeSummary` during the review pause (Step 10)
— incorporate those before the final submission in Step 11.

### Step 10: Present Review Summary to User (MANDATORY PAUSE)

**STOP HERE.** Do not auto-approve. Present the following to the user:

1. **Changes made:** List all rules created and updated with instance keys
2. **Authoring notes:** Any observations, warnings, or decisions recorded
3. **Change summary:** The plain text summary
4. **Request approval:** Ask the user to approve, reject, or continue working on the changes

Wait for the user's explicit response before proceeding.

**Decision selection rules:**
- If the user explicitly says "Approved", "Rejected", or "Keep working" (or a clear
  synonym), use that decision.
- If the user asks for additional changes, new requirements, or further work **without
  explicitly mentioning any of the three decision options**, then set
  `pyApprovalDecision` to `"Keep working"` to loop back to the Authoring stage.
- **Do NOT default to any decision on your own.** If the user's response is ambiguous
  and does not clearly map to one of the above scenarios, ask the user to clarify
  their decision before submitting the review.

### Step 11: Submit Review Decision (Stage 3 -> Complete, or back to Stage 2)

**This is the ONLY `perform-action` call for the Review stage.** Do not call
`perform-action` with `pyReviewAndApprove` at any earlier point — doing so without
`pyApprovalDecision` loops the case back to Authoring.

**Tool:** `perform-action`
**Parameters:**
- `assignmentID="{reviewAssignmentID}"`
- `actionID="pyReviewAndApprove"`
- `content` — MUST include **both** `pyChangeSummary` and `pyApprovalDecision`:

```json
{
  "pyChangeSummary": "Created PhoneNumber property on MyOrg-MyApp-Data-Customer class...(full plain text summary)",
  "pyApprovalDecision": "Approved"
}
```

**⚠️ CRITICAL: `pyApprovalDecision` MUST be included in this call.** Omitting it
causes the system to default to "Keep working" and loop back to Authoring. Always
include both fields together in this single submission.

The `pzApproved` when condition evaluates `pyApprovalDecision` to determine the
next step. There are three valid values:

| Decision | Effect |
|----------|--------|
| `"Approved"` | Case resolves as `Resolved-Complete`. The branch is **not** merged — it remains open for review and merge through Pega's branch management process. |
| `"Rejected"` | Case loops back to Stage 2 (Authoring). Behaves identically to "Keep working". |
| `"Keep working"` | Case loops back to Stage 2 (Authoring) so the agent can make additional changes without discarding the work done so far. The existing branch and authored rules are preserved. After further authoring, the case proceeds through Review again. |

Use `"Rejected"` or `"Keep working"` when the reviewer wants modifications or
additions to the current changes — for example, fixing an issue found during
review, adding a missing rule, or refining the implementation. Both options
preserve the branch and authored rules.

### Step 12: Verify Completion

After approval, the case resolves as `Resolved-Complete`. The branch is **not**
automatically merged — all authored changes remain in the branch ruleset, which is
now open for review and merge through Pega's standard branch management process.

Confirm the case resolved successfully by checking the case status.

**Important:** Approval of the ChangeRequest case signals that the agent's authoring
work is complete and ready for branch review. The actual merge into the application's
base ruleset happens separately through Pega's branch review/merge workflow.

## Dependency Graph

```
Analyze intent: create/update rule? -> yes: follow this recipe | no: answer directly

Pre-flight: list-available-authoring-workflows -> semantic match
  +-- [match found AND within limitations]   note workflow case type ID -> PATH 1
  +-- [match found BUT exceeds limitations]  -> PATH 2
  +-- [no match]                             -> PATH 2

create-case (ChangeRequest)
  -> inspect embedded nextAssignment (Intake)
  -> [fallback only if needed: get-assignment (Intake)]
  -> perform-action pyCaptureChangeRequest (pyBranchID required)
     -> get-assignment (Authoring / Open-Authoring)

PATH 1 — Workflow-Driven
  -> create-case (caseTypeID = matched workflow case type)
       content: { pyChangeRequestID: <changeRequestCaseID> }
  -> inspect embedded nextAssignment (workflow first assignment)
  -> [fallback only if needed: get-assignment for that assignmentID]
  -> workflow assignment screens (perform-action loop until complete)
  -> continue with main authoring case flow
  -> [user makes additional request? -> MID-AUTHORING DECISION]
  -> Step 6: create PegaUnit test cases for testable rules
        [Step 6a: if no eligible test rulesets -> emit user-visible warning before Step 7]
  -> Step 7: perform-action pyAuthorRuleChanges -> advances to Open-Review

PATH 2 — Skills-Based
  -> load rule-type skill -> author rules via write API
  -> pyAuthoringNotes tracked incrementally
  -> [user makes additional request? -> MID-AUTHORING DECISION]
  -> Step 6: create PegaUnit test cases for testable rules
        [Step 6a: if no eligible test rulesets -> emit user-visible warning before Step 7]
  -> Step 7: perform-action pyAuthorRuleChanges -> advances to Open-Review

MID-AUTHORING DECISION (any time user makes a new request while in Open-Authoring)
  list-available-authoring-workflows -> semantic match
  +-- [match found AND within limitations]
  |                      -> create-case (matched workflow case type)
  |                           content: { pyChangeRequestID: <changeRequestCaseID> }
  |                      -> use embedded nextAssignment, then workflow screens until complete
  +-- [match found BUT exceeds limitations] -> treat as no match, use skills path
  +-- [no match]      -> load rule-type skill -> author rules via write API
  -> after changes complete: proceed to Step 6 and Step 7

[after Open-Review: post-processing auto-triggers PegaUnit test execution -> test execution ID]
  -> get-assignment (Review)
  -> perform-action: set pyChangeSummary (plain text, include test results)
  -> [MANDATORY PAUSE: present to user, wait for explicit approval decision]
   -> perform-action pyReviewAndApprove with pyChangeSummary + pyApprovalDecision
      +-- "Approved"      -> Resolved-Complete (branch remains open for merge via branch management)
      +-- "Rejected"      -> back to Open-Authoring -> MID-AUTHORING DECISION
      +-- "Keep working"  -> back to Open-Authoring -> MID-AUTHORING DECISION
```

## Resuming a Case from a Previous Session

When resuming a ChangeRequest case that was created in a previous session, you will
not have the `nextAssignmentID` or embedded `nextAssignment` from a prior
`create-case` or `perform-action` response. You must construct the assignment ID manually using the case ID (from
`list-cases`) and the flow name for the current stage.

### Assignment ID format

The Pega assignment ID format for ChangeRequest cases is:

```
ASSIGN-WORKBASKET {CASE_CLASS_PREFIX} {CASE_ID}!{UPPERCASE_FLOW_NAME}
```

Where:
- `{CASE_CLASS_PREFIX}` is derived from the case type class. For
  `PegaAccel-GenAI-ChangeRequest`, the prefix is `PEGAACCEL`.
- `{CASE_ID}` is the work object ID (e.g., `PXC-11`).
- `!` separates the case ID from the flow name with **no spaces**.
- `{UPPERCASE_FLOW_NAME}` is the flow name in uppercase.

### Flow names by stage

| Stage | Case Status | Flow Name (uppercase) |
|-------|-------------|----------------------|
| 1. Intake | | `PZCHANGEREQUESTINTAKE_FLOW` |
| 2. Authoring | `Open-Authoring` | `PZRULEAUTHORING_FLOW` |
| 3. Review | `Open-Review` | `PZCHANGEREVIEW_FLOW` |

### Example: Resuming a case in the Review stage

If `list-cases` shows case `PXC-11` with status `Open-Review`, the assignment ID is:

```
ASSIGN-WORKBASKET PEGAACCEL PXC-11!PZCHANGEREVIEW_FLOW
```

### Common mistakes to avoid when constructing assignment IDs

- **Do NOT add numbered suffixes** like `_1`, `_2`, `_3` to the flow name. The flow
  name is used as-is (e.g., `PZCHANGEREVIEW_FLOW`, not `PZCHANGEREVIEW_FLOW_1`).
- **Do NOT add a space before the `!`**. The format is `{CASE_ID}!{FLOW_NAME}`,
  not `{CASE_ID} !{FLOW_NAME}`.
- **Do NOT omit the case class prefix**. The format requires `PEGAACCEL` before the
  case ID, not just the bare case ID.
- **Do NOT use assignment shape IDs** (like `ASSIGNMENT63`) in the assignment ID.
  Shape IDs are internal flow identifiers, not part of the assignment key.

### Step-by-step: Resume a ChangeRequest case

1. Use `list-cases` with `objClass="PegaAccel-GenAI-ChangeRequest"` to find the case.
   Note the case ID (e.g., `PXC-11`) and status (e.g., `Open-Review`).
2. Map the case status to the flow name using the table above.
3. Construct the assignment ID: `ASSIGN-WORKBASKET PEGAACCEL {CASE_ID}!{FLOW_NAME}`.
4. Call `get-assignment` with the constructed assignment ID to verify it is valid and
   discover available actions.

## Integration with Parent Agent

The parent agent wraps its existing authoring delegation inside this workflow:

1. **Before authoring:** Create the ChangeRequest case (Steps 1-3)
   and use the embedded intake assignment returned by `create-case` when present.
2. **During authoring:** Pass the `changeRequestID` to every write call. Track authoring notes on the case.
3. **After authoring:** Create PegaUnit test cases for testable authored rules
   (using `pyBranchID`), submit authoring (`pyAuthorRuleChanges`) which triggers
   automatic test execution via API returning a test execution ID, retrieve test
   results, update change summary as plain text, present review (mandatory pause),
   and complete (`pyReviewAndApprove`)

The parent maintains the `caseId` and current `assignmentID` across subtask
delegations. Each subtask receives the assignment ID and returns updated tracking
data.

## Common Variations

- **Multiple rule types in one request:** A single ChangeRequest can cover
  properties, views, flows, activities, etc. Track all of them in `pyAuthoringNotes`.
- **Rejected / Keep working:** Both `"Rejected"` and `"Keep working"` loop the case
  back to the Authoring stage (Stage 2), preserving the branch and all existing rules.
  The agent makes additional changes, then resubmits through Review again.
- **Branch-scoped changes (always required):** `pyBranchID` must always be set during
  intake. ALL rules must be created or updated in the branch ruleset, not the base
  ruleset. The branch ruleset is derived internally from `pyBranchID`. Never create
  or update rules directly in the base ruleset.

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `pyCaptureChangeRequest` action not available | Case not in Intake stage | Check `pyStatusWork`; case must not yet be in `Open-Authoring`. May need to create a new case |
| `pyAuthorRuleChanges` action not available | Case not in Authoring stage (`Open-Authoring`) | Verify intake was submitted; check `nextAssignmentID` and confirm `pyStatusWork` is `Open-Authoring` |
| Review assignment not appearing | Authoring stage didn't complete | Check that `pyAuthorRuleChanges` was submitted successfully |
| A rule write call fails with "changeRequestID is required" | `changeRequestID` parameter was not passed to the selected write API | All rule authoring must pass the ChangeRequest case ID. Create a ChangeRequest case first using `create-case` with `caseTypeID='PegaAccel-GenAI-ChangeRequest'`. |
| `get-assignment` returns error for a known case | Assignment ID is incorrectly constructed | Use the format `ASSIGN-WORKBASKET PEGAACCEL {CASE_ID}!{FLOW_NAME}` — no space before `!`, no numbered suffixes, no shape IDs. See "Resuming a Case from a Previous Session" section. |
| Case loops back to Authoring after submitting review | `pyApprovalDecision` was omitted from the `perform-action` call | Always include `pyApprovalDecision` together with `pyChangeSummary` in the final review submission. Omitting it defaults to "Keep working" behavior. |
| Test case creation silently skipped with no user notification | Step 6a's user-facing warning was omitted | When no eligible test rulesets exist, emit the "⚠️ PegaUnit test case creation skipped" message (see Step 6a) in your reply before submitting Authoring. `pyAuthoringNotes` alone is not sufficient. |
