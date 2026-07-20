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

### Intake parameters (passed to `initiate-authoring-change` in Step 1)

These values are passed directly as parameters to `initiate-authoring-change` rather than
submitted as a separate form action.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pyLabel` | Text | Short title for the change request (max 64 characters) |
| `pyChangeDescription` | Text | Summary of the change being authored (max 200 characters) |
| `pyToDos` | Text | Step-by-step plan / to-do list for the changes |
| `pyBranchID` | Text | Optional branch name for the changes. Provide this only when the user explicitly supplied a branch name or explicitly referenced a work item ID (for example, "work on US-162", "pick up T-45", or "fix I-4009"). Branch names may contain letters, numbers, underscores (`_`), and hyphens (`-`), but must not start with `_` or `-`. When provided, it must be 3-16 characters and must **not** start with `px`, `py`, or `pz` (case-insensitive). Pega reserves these prefixes for non-Pega rulesets and rejects branch names that use them. **Verbatim relay:** Once chosen, this exact value must be returned to the parent and passed unchanged into all subsequent subtask delegations. Do not add suffixes (e.g., `br`, `branch`), do not abbreviate, and do not rephrase. The branch name, ruleset name, and ruleset version must all use this identical value. |

**Note:** `pyPriority` and `pyTargetClass` are not valid properties on this case type.
Do not include them — they cause undefined property errors.

#### Branch ID Selection Rules

The `pyBranchID` value is optional and is only passed to `initiate-authoring-change`
when the user explicitly provided a branch name or the request explicitly references
a work item ID. In all other cases, omit `pyBranchID` and let the tool derive the
branch name from `pyLabel`. Apply the following priority order:

| Priority | Condition | Action |
|----------|-----------|--------|
| 1 | User explicitly provides a Branch ID | Pass the user-provided value exactly as given (respecting the 3-16 character and prefix constraints). |
| 2 | User's request references a work item ID (User Story, Task, Feedback, or Issue — e.g., "work on US-162", "pick up T-45", "fix I-4009") | Pass that work item ID as the Branch ID (strip any characters that violate constraints if necessary). |
| 3 | None of the above apply | Omit `pyBranchID` and let `initiate-authoring-change` derive the branch name from `pyLabel`. |

**Key rules:**
- **Never override a user-supplied Branch ID.** If the user said it, that value wins
  unconditionally.
- **`_` and `-` are valid Branch ID characters, but not as the first character.** Preserve them exactly when provided in non-leading positions.
- **Work item IDs take precedence over agent-generated names.** If the user says
  "work on US-162," pass `US-162` — do not invent a different name.
- **Omit `pyBranchID` when neither condition applies.** The tool will derive a branch
  name from `pyLabel`.

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
   as **no match** and follow Path 2. Otherwise, record the workflow label; follow
   **Path 1** after Step 1.
3. **No match OR limitations exceeded** → follow **Path 2** after Step 1.

This matching is done once, upfront. Follow-up requests made while in `Open-Authoring`
are handled separately via the MID-AUTHORING DECISION (see below).

### Step 1: Initiate the Authoring Change

**Tool:** `initiate-authoring-change`

This single call always creates the ChangeRequest case, submits the Intake stage
(`pyCaptureChangeRequest`), and advances the case to Stage 2 (Authoring). It replaces
the previous multi-step sequence of creating the case, fetching the intake assignment,
and submitting the intake form.

**Before calling this tool**, determine whether to pass `pyBranchID` at all using the
Branch ID Selection Rules above.

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `pyLabel` | Yes | Short title for the change (max 64 characters) |
| `pyBranchID` | No | Optional branch name. Pass only when the user explicitly supplied the branch name or referenced a work item ID. Omit in all other cases so the tool can derive a branch name from `pyLabel`. |
| `pyChangeDescription` | Yes | Summary of what will change and why (max 200 characters) |
| `pyToDos` | Yes | Step-by-step plan for the changes |
| `workFlowNames` | No | List of matched workflow labels from `list-available-authoring-workflows` (Path 1 only). Omit for skills-based authoring. |

**Example call:**

```
initiate-authoring-change(
  pyLabel: "Add PhoneNumber property to Customer",
  pyBranchID: null,
  pyChangeDescription: "Add a Text property with Phone format to the Customer data class for contact tracking.",
  pyToDos: "1. Create PhoneNumber property on Customer class\n2. Add to CustomerDetail view",
  workFlowNames: []
)
```

**Response fields:**

| Field | Description |
|-------|-------------|
| `changeRequestID` | The ChangeRequest case ID (e.g., `PEGAACCEL PXC-11`). Pass to all subsequent `create-rule`, `update-rule`, and `copy-rule` calls. |
| `branchName` | The effective branch ID used (may differ from the derived or supplied `pyBranchID` if the developer branch toggle overrides it). |
| `nextAssignmentID` | The assignment ID for Stage 2 (Authoring). Use this in Step 2. |
| `workflowNames` | Resolved workflow names (when `workFlowNames` was provided). |
| `branchPrecedenceNote` | Present when the branch was overridden by the developer branch toggle. |

Record `changeRequestID`, `branchName`, and `nextAssignmentID` — you will need all three
for subsequent steps.

**Automatic branch record creation:** If you passed `pyBranchID`, that value is used
to create the branch and add it to the application. If you omitted `pyBranchID`, the
tool derives the branch name from `pyLabel`. All subsequent rule authoring is scoped
to the branch based on `branchName`.

### Step 2: Get the Authoring Assignment

**Tool:** `get-assignment`
**Parameters:** `assignmentID="{nextAssignmentID}"` (from Step 1 response)

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
     content: { "pyChangeRequestID": "PEGAACCEL PXC-19" }
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
4. After completing the additional changes, proceed to Step 4 and Step 5.

### Step 3: Perform the Actual Rule Authoring (Skills-Based)

This step covers the **Path 2 fallback** when no workflow matched. Create and update
rules using the write API selected for the target rule type.

**The case must be in `Open-Authoring` status** (`pyStatusWork = "Open-Authoring"`)
during this step. If the case is not in this status, the authoring stage has not been
reached or has already been submitted.

#### Branch-scoped authoring (MANDATORY)

Since an effective branch is always established during Intake (either from supplied
`pyBranchID` or from a branch derived from `pyLabel`), all rules created or updated in
this stage **must use the branch ruleset and version**, not the base ruleset. The branch
ruleset is derived internally from the effective branch (`branchName` in Step 1 response).
All rule write calls must pass the `changeRequestID` to scope changes to the correct branch.

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

### Step 4: Create PegaUnit Test Cases (MANDATORY — Before Submitting Authoring)

**⚠️ THIS STEP IS MANDATORY AND MUST NEVER BE SKIPPED when testable rules exist.**

**After all application rules are authored and before submitting the Authoring stage**,
create PegaUnit test cases for every testable authored rule.

#### Step 4a: Capture Eligible Test Rulesets (MANDATORY PRE-CHECK)

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

3. Record the same in `pyAuthoringNotes`, then proceed to Step 5.

Do not attempt test case creation when no eligible rulesets exist — it will fail.

**If eligible test rulesets exist**, proceed to Step 4b.

#### Step 4b: Create Test Cases for Testable Rules

1. Review the **complete** list of rules authored in Step 3.
2. For **every single rule** whose `pxObjClass` matches a testable type (see
   **Testing Strategy** above), you **MUST** create a `Rule-Test-Unit-Case` using
   the `pyBranchID` and one of the eligible test rulesets identified in Step 4a.
   Do not skip any testable rule — each one requires its own test case.
3. **Only if zero authored rules match a testable type** (e.g., the entire authoring
   consisted solely of `Rule-Obj-Property` rules), then no PegaUnit tests are
   required. Document this explicitly in `pyAuthoringNotes` (e.g., "No testable
   rule types authored — PegaUnit tests not applicable").

**Do NOT proceed to Step 5 (Submit Authoring) until all required test cases have
been created.** Submitting the Authoring stage without creating test cases for
testable rules is a workflow violation.

All test cases MUST be created using the `pyBranchID`, not the base ruleset.

### Step 5: Submit Authoring (Stage 2 -> Stage 3)

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

### Step 6: Get the Review Assignment

**Tool:** `get-assignment`
**Parameters:** `assignmentID="{reviewAssignmentID}"`

Confirm `pyReviewAndApprove` is available as an action.

### Step 7: Prepare the Change Summary (DO NOT CALL perform-action HERE)

Before presenting the review to the user, **compose** the `pyChangeSummary` text
locally. Do **NOT** call `perform-action` in this step — any call to
`pyReviewAndApprove` without `pyApprovalDecision` causes the system to default to
"Keep working" and loops the case back to the Authoring stage unnecessarily.

**Format: Plain text only.** Do not use markdown, bullet points with `*` or `-`,
headers with `#`, or any other markup. Use simple line breaks and indentation
for structure.

Example summary text (hold this for Step 9):

```text
Created PhoneNumber property on MyOrg-MyApp-Data-Customer class in branch ruleset.

Rules created:
  PhoneNumber property (RULE-OBJ-PROPERTY MYORG-MYAPP-DATA-CUSTOMER PHONENUMBER)

Notes: Property created as Text/Phone format for contact tracking.
```

**⚠️ CRITICAL: Do NOT call `perform-action` with `pyReviewAndApprove` at this
point.** The summary and approval decision are submitted together in a **single**
`perform-action` call in Step 9 — after the user has provided their decision.
Any intermediate call without `pyApprovalDecision` will loop the case back to
Authoring and require re-submitting through `pyAuthorRuleChanges` to return to
Review.

The user may request changes to `pyChangeSummary` during the review pause (Step 8)
— incorporate those before the final submission in Step 9.

### Step 8: Present Review Summary to User (MANDATORY PAUSE)

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

### Step 9: Submit Review Decision (Stage 3 -> Complete, or back to Stage 2)

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

### Step 10: Verify Completion

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
  +-- [match found AND within limitations]   note workflow label -> PATH 1
  +-- [match found BUT exceeds limitations]  -> PATH 2
  +-- [no match]                             -> PATH 2

Determine pyBranchID (per Branch ID Selection Rules)

initiate-authoring-change (ChangeRequest)
  -> creates PegaAccel-GenAI-ChangeRequest case
  -> submits intake (pyCaptureChangeRequest) internally
  -> returns changeRequestID, branchName, nextAssignmentID (Authoring)
  -> get-assignment (Authoring / Open-Authoring) to confirm pyAuthorRuleChanges

PATH 1 — Workflow-Driven
  -> create-case (caseTypeID = matched workflow case type)
       content: { pyChangeRequestID: <changeRequestCaseID> }
  -> inspect embedded nextAssignment (workflow first assignment)
  -> [fallback only if needed: get-assignment for that assignmentID]
  -> workflow assignment screens (perform-action loop until complete)
  -> continue with main authoring case flow
  -> [user makes additional request? -> MID-AUTHORING DECISION]
  -> Step 4: create PegaUnit test cases for testable rules
        [Step 4a: if no eligible test rulesets -> emit user-visible warning before Step 5]
  -> Step 5: perform-action pyAuthorRuleChanges -> advances to Open-Review

PATH 2 — Skills-Based
  -> load rule-type skill -> author rules via write API
  -> pyAuthoringNotes tracked incrementally
  -> [user makes additional request? -> MID-AUTHORING DECISION]
  -> Step 4: create PegaUnit test cases for testable rules
        [Step 4a: if no eligible test rulesets -> emit user-visible warning before Step 5]
  -> Step 5: perform-action pyAuthorRuleChanges -> advances to Open-Review

MID-AUTHORING DECISION (any time user makes a new request while in Open-Authoring)
  list-available-authoring-workflows -> semantic match
  +-- [match found AND within limitations]
  |                      -> create-case (matched workflow case type)
  |                           content: { pyChangeRequestID: <changeRequestCaseID> }
  |                      -> use embedded nextAssignment, then workflow screens until complete
  +-- [match found BUT exceeds limitations] -> treat as no match, use skills path
  +-- [no match]      -> load rule-type skill -> author rules via write API
  -> after changes complete: proceed to Step 4 and Step 5

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
`initiate-authoring-change` or `perform-action` response. You must construct the assignment ID manually using the case ID (from
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

1. **Before authoring:** Call `initiate-authoring-change` (Step 1) — this creates the
   ChangeRequest case and completes Intake in one call, returning `changeRequestID`,
   `branchName`, and `nextAssignmentID` for the Authoring stage.
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
- **Branch-scoped changes (always required):** An effective branch is always established
  during intake (from supplied `pyBranchID` or from a derived value). ALL rules must be
  created or updated in the branch ruleset, not the base ruleset. The branch ruleset is
  derived internally from that effective branch (`branchName`). Never create or update
  rules directly in the base ruleset.

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `pyCaptureChangeRequest` action not available | Case not in Intake stage | Check `pyStatusWork`; case must not yet be in `Open-Authoring`. May need to create a new case |
| `pyAuthorRuleChanges` action not available | Case not in Authoring stage (`Open-Authoring`) | Verify intake was submitted; check `nextAssignmentID` from `initiate-authoring-change` and confirm `pyStatusWork` is `Open-Authoring` |
| Review assignment not appearing | Authoring stage didn't complete | Check that `pyAuthorRuleChanges` was submitted successfully |
| A rule write call fails with "changeRequestID is required" | `changeRequestID` parameter was not passed to the selected write API | All rule authoring must pass the ChangeRequest case ID returned by `initiate-authoring-change`. |
| `get-assignment` returns error for a known case | Assignment ID is incorrectly constructed | Use the format `ASSIGN-WORKBASKET PEGAACCEL {CASE_ID}!{FLOW_NAME}` — no space before `!`, no numbered suffixes, no shape IDs. See "Resuming a Case from a Previous Session" section. |
| Case loops back to Authoring after submitting review | `pyApprovalDecision` was omitted from the `perform-action` call | Always include `pyApprovalDecision` together with `pyChangeSummary` in the final review submission. Omitting it defaults to "Keep working" behavior. |
| Test case creation silently skipped with no user notification | Step 4a's user-facing warning was omitted | When no eligible test rulesets exist, emit the "⚠️ PegaUnit test case creation skipped" message (see Step 4a) in your reply before submitting Authoring. `pyAuthoringNotes` alone is not sufficient. |
