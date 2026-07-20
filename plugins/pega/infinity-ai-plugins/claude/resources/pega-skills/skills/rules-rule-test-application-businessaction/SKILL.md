---
name: rules-rule-test-application-businessaction
description: Load when creating Pega Business Action rules for application tests. Contains the steps to read view form fields, map inputs, create DX API automation and browser UI automation.
---

# Business Action

**Prerequisite:** Load `methodology-rule-authoring` first.

## Required Inputs

To create a Business Action, you need these inputs. When orchestrated by
`methodology-application-tests`, these come from the Phase 5 handover table.
When working standalone, gather them before starting.

| Input | Description | How to get (if missing) |
|-------|-------------|------------------------|
| Flow Action | Assignment's `pyFlowAction` from the flow shape | `get-rule` on `Rule-Obj-Flow` → assignment shape `pyFlowAction` |
| Class Name | Case type work class (`pyClassName`) | `get-application` → case type list |
| View Name | View rule name (usually same as Flow Action) | `get-rule` on `Rule-Obj-Flow` → assignment shape `pyFlowAction` |
| Type | `Standalone`, `ScreenFlow (SF1)`, `ScreenFlow (SFN)`, or `PerformAction` | Check `pyCategory` on the flow — `ScreenFlow` = screen flow, else standalone |
| Persona | Actor performing this assignment | `list-rules(ruleType="Rule-Persona")` and from assignment routing |
| ChangeRequest ID | Active change request for saving rules | From `methodology-rule-authoring` |
| Test Data | Scenario-specific default values for input parameters — every interactive field MUST have a meaningful default | From test scenarios or methodology handover |

If all inputs are present, proceed to the Procedure below.

## Critical Rules

1. **One perform step per Business Action.** Exactly one `PerformAssignment` or `PerformAction` (optionally preceded by `CreateCase` or `CaptureChildCase`). Never chain multiple.
2. **One Business Action per unique assignment.** Multiple scenarios = one parameterized Business Action with shared `pyInputParameters`. Never duplicate for different test data.
3. **Approval shapes → two Business Actions.** One for Approve, one for Reject.
4. **ScreenFlow → N Business Actions.** One per shape (`AssignmentSF1`…`AssignmentSFN`), each with its own view.
5. **CreateCase steps carry NO form fields.** `pyForm` belongs exclusively to the PerformAssignment step. The CreateCase step only has `pyActionParameters` and `pyOutputParameters`.
6. **CaptureChildCase steps carry NO form fields.** `pyForm` belongs exclusively to the following PerformAssignment step. The CaptureChildCase step only has `pyActionParameters` (CaseID from Input + ChildCasePrefix from Input) and `pyOutputParameters` (ChildCaseIDAutoMapped).

## Procedure

Follow these steps in order to create one Business Action.

### Step 1: Determine test ruleset

Call `get-application`, inspect `pyRuleSetList`, and call `get-rule(detail="full")` on each `Rule-RuleSet-Name` rule key (for example, `RULE-RULESET-NAME MYAPPTEST`). Pass the ruleset with `pyIsTestRuleSet: "true"` as the `ruleSet` parameter on `create-rule`.

### Step 2 : Determine Business Action type

| Condition | Type |
|-----------|------|
| Case-wide/stage-wide action (Change stage, Reopen, Edit details) | PerformAction |
| Approval shape | PerformApproval (two BAs: Approve + Reject) |
| Assignment that creates a **top-level** case (user clicks Create in portal) | CreateCase + PerformAssignment |
| Assignment on a **child case** auto-created by the app | CaptureChildCase + PerformAssignment |
| Standard assignment | PerformAssignment |

Evaluate top-to-bottom; use the first match. Then continue to Step 3.

### Step 3 : Determine pyPurpose of Business Action

| BA type | Pattern | Example |
|---------|---------|---------|
| Assignment | `{AssignmentNameNoSpaces}Assignment` | `LivingsituationAssignment` |
| Case creation (top-level) | `Create{CaseName}Case` | `CreateHomeloanCase` |
| Child case BA | `{ChildCaseName}ChildCase` | `SavingsAccountChildCase` |
| Case-wide action | `{ActionNameNoSpaces}Action` | `ChangestageAction` |
| Approval (approve) | `Approve{CaseName}Approval` | `ApproveHomeloanApproval` |
| Approval (reject) | `Reject{CaseName}Approval` | `RejectHomeloanApproval` |

#### Error Handling

| Error | Cause | Recovery |
|-------|-------|----------|
| Duplicate `pyPurpose` | Same purpose+class exists | Use `update-rule` or choose unique `pyPurpose` |
| Truncated `pyLabel`/`pyPurpose` | Exceeds 64 chars | Shorten the name |

### Step 4: Read view rule

> **MANDATORY:** You MUST call `get-rule detail="full"` on the view and parse the
> actual `pxViewMetadata` or `pyContent` from the response. NEVER assume or infer
> which fields a view contains. Missing even one interactive field invalidates the
> entire Business Action. Complete Step 4 fully for each view before proceeding to Step 5.

**Fetch:**
```
list-rules ruleType="Rule-UI-View" className="<Class Name>" ruleName="<View Name>"
get-rule key="<viewInsKey>" detail="full"
```
For case-wide actions: `search-rules searchText="<viewId>" ruleType="Rule-UI-View"`

Load `business-action-view-field-extraction` via `get-skill` and follow its procedure to extract
all interactive fields from the view rule response.

> **Verification gate:** Confirm your field list was derived from the actual `get-rule`
> response. Count the interactive (non-readOnly) fields; if zero, re-check your parsing.
> Then produce the **field extraction checkpoint** table (see `business-action-view-field-extraction` Field extraction checkpoint)

### Step 5: Generate parameters

Load `business-action-parameters` via `get-skill` and follow its generate → verify procedure.
Its default selection order is mandatory: scenario/handover values, referenceList data pages for ObjectReference fields, resolved cases, dropdown options, then realistic sample data.

If the field extraction checkpoint includes `ObjectReference`, `UserReference`, `reference`, or `EmbeddedDataMulti`, load `business-action-reference-field-mapping`; if any reference has `pyDisplayAs` / `config.displayAs` = `advancedSearch`, also load `business-action-advanced-search` before generating Playwright code.

Load a matching example via `get-skill` before creating a Business Action — the example
shows the full JSON structure including `pyTestSteps` and `pyActionParameters`:

| Business Action needed | Skill |
|---|---|
| Create Case (has CreateCase step) Business Action | `business-action-create-case` |
| Child case Business Action (CaptureChildCase + PerformAssignment) | `business-action-child-case` |
| Perform Assignment Business Action | `business-action-perform-assignment` |
| Perform Action Business Action | `business-action-perform-action` |
| Perform Approval Business Action (Approved) | `business-action-approval-approved` |
| Perform Approval Business Action (Rejected) | `business-action-approval-rejected` |
| Form with a single reference field | `business-action-single-reference-field` |
| Form with a reference list (multi) | `business-action-multi-reference-field` |
| Form with a single reference field with display as advancedSearch | `business-action-single-reference-field-advanced-search` |
| Form with a reference list (multi) with display as advancedSearch | `business-action-multi-reference-field-advanced-search` |
| Form with a UserReference search box | `business-action-user-reference-search-box` |
| Form with an embedded data single (sub-view) | `business-action-embedded-data-single` |
| Form with an embedded data list (multi-record table) | `business-action-embedded-data-list` |
| Form with a conditional reference field | `business-action-reference-conditional` |
| Simplest stub | `business-action-stub` |

> **CreateCase — Assignment constant:** The `Assignment` action parameter value must be the actual `pyFlowAction` name from the ScreenFlow shape (e.g., `"Basicdetails"`), not the generic `"Create"`. Get this value from `get-rule` on the flow → assignment shape → `pyFlowAction`.

### Step 6: Generate Playwright script

Load `business-action-ui-automation` via `get-skill` and follow its patterns.
Load `business-action-common-utils-api` via `get-skill` for utility method signatures.

### Step 7: Create or update rule

Assemble all outputs from Steps 2–6 plus metadata referring to schema and call `create-rule` or `update-rule`.

- Pass test ruleset via `ruleSet` parameter on `create-rule` (NOT inside `content` JSON).
- Identity key: `pyPurpose` + `pyClassName`. Both max 64 characters.
- `pyPlaywrightScript` is raw TypeScript — no markdown fences or language tags.

### Step 8: Verify

Immediately call `get-rule(key="{createdKey}", detail="full")` and confirm:

1. `pyPurpose` and `pyLabel` set, under 64 chars
2. `pyClassName` matches case type work class
3. `pyTestSteps` is non-empty with valid `pxObjClass` values
4. `pyForm` has entries for all non-checkbox, non-readOnly fields
5. `pyInputParameters` includes CaseID (first), ALL interactive form fields, ValidationFails (last)
6. `pyPlaywrightScript` has interaction lines for all interactive fields
7. Reference, multi-reference, embedded single object (Embedded Data), and embedded data list (Embedded List) fields follow `business-action-reference-field-mapping`; verify `pyForm`, `pyInputParameters`, and Playwright mappings against that reference.
8. `pyOutputParameters`: For **CreateCase BAs** — step-level and root-level use the same descriptive name (e.g., `HomeLoanCaseID`); NEVER generic `CaseID`; step-level has `pyParameterValue: "data$caseInfo$ID"`; root-level has `pyMapOutputFrom: "Response"`. For **child case BAs** (CaptureChildCase + PerformAssignment) — both levels use `ChildCaseIDAutoMapped` as the parameter name `pyParameterValue: ""`. Exactly ONE entry at each level.
9. Every `pyInputParameters` entry (except CaseID and embedded reference fields represented only in `pyForm`) has a non-empty `pyParameterValue` with a meaningful test default — never blank, never a placeholder like `"TODO"` or `"value"`.
10. **Approval Business Actions only:** `pyApprovalResult` in `pyForm` has `pyMapRequestFieldFrom: "Constant"` with value exactly `"Approved"` or `"Rejected"`.
11. **Playwright script content verification** — cross-check `pyPlaywrightScript` against the loaded `business-action-ui-automation` and the matching example skill:
Standalone → `clickGo(page, "ASSIGNMENT_NAME")` where `ASSIGNMENT_NAME` = exact `pyMOName` from the flow shape. Approval → `clickGo(page, "Get Approval")`. 

**If ANY check fails:** fix via `update-rule` and re-verify before proceeding.

## PerformApproval

Approval shapes in flows produce **two** Business Actions: one for Approve and one
for Reject. Both use `Embed-APIAutomation-Execution-PerformAssignment` as the step
type but differ in the `pyApprovalResult` constant value and the Playwright submission
method.

**Key differences from standard PerformAssignment:**
- `pyActionParameters` → `Assignment` value = `"pyApproval"` (constant)
- `pyForm` → includes `pyApprovalResult` mapped from `Constant` with value `"Approved"` or `"Rejected"` (in addition to any other view fields)
- Playwright opener = `clickGo(page, "Get Approval")` (always — this is what the UI shows for approval assignments)
- Playwright uses `caseUtils.clickApprove(page)` for approve or `caseUtils.clickReject(page)` for reject instead of `clickSubmit`

**Same as standard PerformAssignment:**
- Fetch the view rule for the approval assignment to discover additional fields
- Additional fields go into `pyInputParameters` and `pyForm` following normal rules

### When to use

Approval shapes are identified in flows by:
- Shape type `SubProcess` with `pyFromMODefName: "pxApproval"` or similar approval sub-process reference
- A Decision shape downstream that checks `.pyApprovalResult` (e.g., `@(Pega-RULES:String).equals(.pyApprovalResult, Approved)`)
- The flow's `pyFlowType` = `"Approval"` on the sub-flow

When you encounter an approval shape in a flow during Phase 3 lifecycle extraction:
1. Record it as needing **two** Business Actions (Approve + Reject)
2. `pyAssignmentName` comes from the flow shape's `pyMOName` (same as standard assignments)
3. The `Assignment` action parameter value is always `"pyApproval"`
4. Playwright opener is always `clickGo(page, "Get Approval")` (UI label differs from `pyAssignmentName`)
5. Fetch the view rule for the approval assignment to get any additional fields
6. Process additional fields normally (add to `pyInputParameters`, `pyForm`, Playwright)
7. Add `pyApprovalResult` to `pyForm` as the last entry — Constant (`"Approved"` or `"Rejected"`)

## References

| Skill | Used in | What it contains |
|-------|---------|------------------|
| `business-action-view-field-extraction` | Step 4 | Field parsing from view rule |
| `business-action-parameters` | Step 5 | Format constraints, field inclusion rules, label rules |
| `business-action-reference-field-mapping` | Steps 5–6 | Identification, DX mapping, Playwright, and input parameterization for reference and embedded-data fields |
| `business-action-advanced-search` | Steps 5–6 | Advanced search reference picker value formats and Playwright handlers |
| `business-action-ui-automation` | Step 6 | Standard field-type-to-locator table, opener logic, CaseID capture |
| `business-action-common-utils-api` | Step 6 | Utility method signatures (exact arg order) |

## Foundation Business Actions (Work- class)

Pre-provisioned on `Work-`. Do NOT create — verify presence:
`list-rules(ruleType="Rule-Test-Application-BusinessAction", className="Work-")`
