---
name: rules-rule-test-application-case
description: Load when creating or updating Pega Application Test Case rules. Contains how to combine Business Actions into test steps, wire inputs and outputs, and add stage or status checks.
---

# Application Test Case

**Prerequisite:** Load `methodology-rule-authoring` first. Load
`rules-rule-test-application-businessaction` for Business Action structure.

## Purpose

Author a `Rule-Test-Application-Case` rule — the cucumber scenario is represented as a sequence of **existing** Business Actions.

## Inputs

1. A Gherkin scenario with clear Given/When/Then steps.
2. **Business Actions must already exist** — verify via `list-rules` and `get-rule` in Step 2.

## Procedure

### Step 1 — Determine Test Ruleset

1. Call `get-application` and read `pyRuleSetList`.
2. Call `get-rule(detail="full")` on each `Rule-RuleSet-Name` rule key and identify the one with `pyIsTestRuleSet: "true"`.

Pass the identified test ruleset as `ruleSet` parameter when creating the rule.

### Step 2 — Build Business Action Inventory

1. Identify which Business Actions are needed from the Gherkin scenario steps:
   - Foundation Business Actions (Login, GetCase, AssertCaseStage, AssertCaseStatus, etc.) live on `Work-`.
   - Case-specific Business Actions (assignments, actions, approvals) live on the case type work class.
   - For application-level scenarios involving child cases, include child case work classes too.
2. Fetch only the needed Business Actions via `list-rules` on each relevant class (`Work-`, parent work class, child work classes).
3. For each Business Action returned, call `get-rule(key="{insKey}", detail="full")` to fetch `pyInputParameters` and `pyOutputParameters`.
4. Build inventory table from the fetched details:

   | `pyPurpose` | `pyLabel` | `pyClassName` | Step Type | Input Parameters | Output Parameters |
   |-------------|-----------|---------------|-----------|------------------|-------------------|

5. **Map Gherkin steps to Business Actions.** A single Gherkin step may require multiple
   keywords — use the inventory to compose the sequence that achieves each step's intent:
   - `Given` → `GIVEN`, `When` → `WHEN`, `Then` → `THEN`, `And` → same type as preceding step.
   - Assertion steps often expand: "case should be in X stage with Y status"
     → `AssertCaseStage` + `AssertCaseStatus`.
   - When the scenario comes from the methodology with detailed steps,
     mapping is mostly 1:1. When the user provides a high-level intent or
     their own scenario, decompose each step into the Business Action sequence needed
     for a working automation (correct login, case access, actions, assertions).
   - Missing Business Action → Map to `NotFound` out of the box business action. Proceed to create via `rules-rule-test-application-businessaction` if all inputs needed for this Business Action are available.
   - Set `pyKeywordDescription` = Gherkin step text for each mapped keyword.
6. **Get configured test personas for Login step data:**

   Use the following data page to retrieve the list of personas configured for testing in the application. Refer `pyPersonaName` in Login keywords to ensure valid test execution.
   ```
   run-data-page(
     dataPage="D_pzGlobalTestPersonaList",
     dataPageType="list",
     dataViewParameters={ "AppName": "{AppName}", "AppVersion": "{AppVersion}" }
   )
   ```

### Step 3 — Build Test Case Rule

Refer to schema at `schema/rule-test-application-case.json` for full field definitions.

#### 3a. Set identity fields

| Field | Value |
|-------|-------|
| `pyPurpose` | Descriptive ID (e.g., `TC_HomeLoan_HappyPath`) |
| `pyLabel` | From Gherkin scenario name |
| `pyDescription` | High-level scenario description |
| `pyClassName` | Case work class (Case-level) or `Work-` (Application-level) |
| `pyTestType` | `Case` (single case type) or `Application` (crosses child case boundary) |
| `pyTestContext` | `Case Type: {name}` or `Application: {name}` |
| `pyAutomationStatus` | Always `"Pending-Review"` for agent-authored test cases |

**Classification rule:** If scenario creates/interacts with child cases → `Application` + `Work-`. Otherwise → `Case` + applies-to class.

#### 3b. Build `pyTestKeywords` array

For each mapped keyword from Step 2, create an entry with:
- `pxObjClass`: `"Rule-Test-Application-BusinessAction"`
- `pyPurpose`: the Business Action's purpose from inventory
- `pyClassName`: the Business Action's class from inventory
- `pyKeywordType`: `GIVEN`, `WHEN`, or `THEN`
- `pyKeywordDescription`: Gherkin step text

#### 3c. Wire parameters

Use `pyInputParameters` and `pyOutputParameters` from the inventory (fetched via `get-rule` in Step 2) to wire each keyword.

**Input parameter wiring (`pyInputParameters`):**

| `pyMapTestInputFrom` | When to use |
|----------------------|-------------|
| `Constant` | Literal value in `pyParameterValue` |
| `Keyword Output` | Reference a previous keyword's output via `pyParameterUniqueName` |
| `Global Test Data` | From global test data configuration |

- `CaseID`: from CreateCase output → all subsequent keywords via `Keyword Output`.
- Multiple cases: unique `pyParameterUniqueName` alias per CreateCase; subsequent steps reference the correct alias.
- **Child case CaseID**: parent assignment captures child CaseID as output; child keywords wire from that alias.
- **GetCase after persona switch**: after any `Login` switching persona, add `GetCase` with target CaseID.
- **Chained children**: child A's assignment captures child B's CaseID as output.
- `StageName`/`Status`: `Constant` values.
- **AssertCaseStatus**: set BOTH `pyStatusValue` on keyword AND `Status` input parameter as `Constant`. Use resolved status from lifecycle summary.
- `ValidationFails`: defaults to `False` as `Constant`. Set true for negative test cases that expect validation errors.
- **Login Persona**: `pyParameterName="Persona"`, `pyMapTestInputFrom="Global Test Data"`, `pyParameterValue` = actual test persona fetched from data page.
- **Business Action form fields**: include ALL `pyInputParameters` from each Business Action (as fetched in Step 2), mapped as `Constant` with default values. This includes single reference fields (case or data) which appear as input parameters with `LABEL:ID` or `LABEL:GUID` format values. Multi-reference, embedded data, and embedded data list fields do NOT appear in `pyInputParameters` — their values are hardcoded in the Business Action's `pyForm`.
- **Approval Business Actions**: wire `CaseID` from `Keyword Output`, others as `Constant`. `pyApprovalResult` is baked into Business Action's `pyForm`.
- **Dropdown/RadioButton**: use only validated default values. **ReadOnly/calculated**: exclude.

**Output capture (`pyOutputParameters`):**

| Field | Description |
|-------|-------------|
| `pyMapOutputFrom` | `Response` (from API response) |
| `pyParameterName` | Standard name (e.g., `CaseID`) |
| `pyParameterUniqueName` | Unique alias for referencing in subsequent keywords (e.g., `MyAppCaseID`) |
-  **pyParameterUniqueName Mapping** When mapping output parameters, ensure the `pyParameterUniqueName` is unique across the test case for unambiguous wiring. pyParameterName is the standard name defined in the Business Action; `pyParameterUniqueName` is your alias for wiring within this test case.

**Stage/status on assertions:** Set `pyStageName` on AssertCaseStage, `pyStatusValue` on AssertCaseStatus. Every `AssertCaseStage` keyword is generally followed by `AssertCaseStatus` using the `pyStageEntryStatus` value for that stage if there is a change from previously asserted status. After an `AssertValidationError`, the test case stops — do not add further progression keywords.

---

## Updating an Existing Test Case

| Change type | Merge approach |
|-------------|----------------|
| Data-only (parameter values) | Positional merge on `pyTestKeywords[n].pyInputParameters` |
| Structural — append | Full array with `{}` placeholders + new entries appended |
| Structural — insert/reorder | Full array replacement |
| Re-classification (gains child cases) | Update `pyTestType`, `pyTestContext`, `pyClassName` |

**Tool:** In your branch → `update-rule`. In base/other branch → `get-rule(detail='full')` → `create-rule`. `copy-rule` does not work for test artifacts.

**Positional merge:** `{}` = skip unchanged; object at N = deep-merge. Shorter array truncates trailing keywords. Minimum placeholder: `{"pxObjClass": "Rule-Test-Application-BusinessAction", "pyPurpose": "<existing>"}`.

## Error Handling

| Error | Recovery |
|-------|----------|
| Case-specific Business Action not found | Create via `rules-rule-test-application-businessaction` |
| `pyParameterUniqueName` reference broken | Verify output keyword precedes consumer |
| Duplicate `pyPurpose` | Must be unique within class |

## Examples — load via `get-skill`

| Skill | Description |
|------|-------------|
| `testcase-stub` | Minimal test case — Login + CreateCase + one assertion |
| `testcase-keyword-login` | URL and Persona from Global Test Data |
| `testcase-keyword-create-case` | Output capture with unique CaseID alias |
| `testcase-keyword-assignment` | CaseID from Keyword Output + input parameters |
| `testcase-keyword-action` | Action without assignment form |
| `testcase-keyword-assert-stage` | Stage transition verification |
| `testcase-keyword-assert-status` | Final status assertion |
| `testcase-keyword-assert-validation` | Error assertion pattern |
| `testcase-multi-case-aliasing` | Multiple CaseID aliases for cross-case wiring |
| `testcase-getcase-persona-switch` | Login→GetCase→Assignment sequence after persona switch |
| `testcase-keyword-child-capture` | Parent assignment capturing child CaseID for downstream wiring |
| `testcase-update-parameter` | Change keyword parameter value |
| `testcase-update-append` | Append new keyword to test case |
