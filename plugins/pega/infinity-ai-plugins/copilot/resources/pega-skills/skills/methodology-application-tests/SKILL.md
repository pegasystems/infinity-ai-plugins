---
name: methodology-application-tests
description: Load this skill when the user asks to generate end-to-end Pega application tests. It orchestrates the full test creation lifecycle, including scope definition, lifecycle extraction, scenario generation, and the creation of Business Action and Application Test rules.
---

## Skills This Methodology Orchestrates

| Skill | Purpose |
|-------|---------|
| `scenario-design` | Gherkin scenario design, coverage rules, step conventions |
| `rules-rule-test-application-businessaction` | How to create or update Business Action rules |
| `rules-rule-test-application-case` | Application Test rule creation using Business Actions |
| `methodology-rule-authoring` | Write API selection and ChangeRequest lifecycle |
| `rules-rule-obj-flow` | Flow shape interpretation — CRITICAL for Decision shapes and ScreenFlow detection |
| `rules-rule-obj-flowaction` | Flow action schema — CRITICAL for validation extraction (`pyValidateActivity`) |

## Phase 1: Define Scope

Determine what to test based on the user's intent — do NOT ask upfront.

- **Application-level tests requested** (or no specific case type mentioned):
  explore the entire application — all case types, their relationships, child cases.
- **Specific case type requested**: limit to that case type, but also explore
  child cases, related case types (parent/sibling), and any case type reachable
  through create-case or wait shapes in its flows.

1. Call `get-application` → case types, data objects, relationships.

## Phase 2: Discover Existing Tests

For each in-scope case type:

1. `list-rules(ruleType="Rule-Test-Application-Case", className={CaseTypeClass or Work- for app level tests})`
   → existing test cases.
2. `list-rules(ruleType="Rule-Test-Application-BusinessAction", className={CaseTypeClass or Work- for app level tests})`
   → existing Business Actions.
3. Summarise coverage: which scenarios and assignments are already covered,
   which gaps exist.

## Phase 3: Extract Case Lifecycle

**Exhaustive extraction.** Collect the COMPLETE lifecycle for every in-scope case type.
### Step 3-1: Extract (per case type)

Run steps 1–8 for each in-scope case type. Track progress using the checklist
in Step 3-2 — mark each item done only after the tool call returns data.

1. **Case type structure** — Call `list-rules` with `ruleType="Rule-Obj-CaseType"` to get the appropriate case type and then call `get-rule(detail="full")` → stages, processes(flows),
   entry/exit criteria, resolution statuses, child case creation points,
   case-wide actions. Record `pyStageEntryStatus` for each stage.
2. **Flows and decision paths** — Call `list-rules` with `ruleType="Rule-Obj-Flow"` to get the appropriate flows and then call `get-rule(detail="full")` on each flow.
   Follow `rules-rule-obj-flow` skill for shape interpretation. Decision paths
   MUST come from actual Decision shape connectors.
3. **ScreenFlow detection** — check `pyCategory` on every flow.
   Follow `rules-rule-obj-flow` skill for ScreenFlow shape conventions
   (`AssignmentSF*` naming, per-shape differences). Enumerate ALL
   `AssignmentSF*` shapes and record each shape's `pyFlowAction` and `pyMOName`.
   Never skip initialization-stage flows.
4. **Validations** — for EVERY flow action, call
   `get-rule(detail="full")` on the `Rule-Obj-FlowAction` and check
   `pyValidateActivity`. If present, fetch the validate rule to extract
   conditions and error messages. See `rules-rule-obj-flowaction` for
   field details.
5. **Record view names** — note each assignment's `pyFlowAction` from the
   flow rule (never assume — always trace from the flow shape's
   `pyFlowAction` field). No need to get full view rule extraction yet for test scenario generation.
6. **Map child case creation to parent assignments** — for each `pzCreateCase`
   utility shape, identify which parent assignment is the last user action
   before that child case is created.
7. **Extract child case lifecycles** — for EVERY child case type, repeat
   steps 1–5 on the child case type class. Child cases have their own
   assignments that require Business Actions and test coverage.
8. **Compile lifecycle summary** — assemble all extracted data into a comprehensive lifecycle map for each case type, including stages, stage entry status , resolution statuses, flows, assignments, actions, validations, and view names. This will be the reference for scenario generation in Phase 4.

### Step 3-2: Extraction completeness checklist

Before proceeding, verify every row is filled for each case type (including children).
```
Per case type:
1. [ ] Case type rule fetched — stages, statuses, case-wide actions recorded
2. [ ] ALL stage flows fetched and decision paths mapped from actual Decision shapes
3. [ ] ScreenFlows identified — all AssignmentSF* shapes enumerated with pyFlowAction + pyMOName
4. [ ] ALL flow actions fetched
5. [ ] For each flow action, Validate rules fetched for every non-empty pyValidateActivity
6. [ ] View names recorded from each flow action
7. [ ] Child case lifecycles extracted (repeat checklist per child)
8. [ ] Decision shapes extracted — conditions from actual Decision rules
```

**Fix all mismatches before proceeding to next phases.**

## Phase 4: Generate Cucumber Scenarios
**Load Scenario References** — Load  `scenario-design` and relevant skills from the **Example Reference Skills** table via `get-skill`.
### Generate Scenarios for each gap identified in Phase 2, following the scenario design rules from the reference. Each scenario should be self-contained, with clear Given/When/Then steps that can be directly mapped to Business Actions and Test Cases in later phases.
1. Analyze existing test coverage (Phase 2) against full lifecycle (Phase 3)
   to identify gaps.
2. **Enumerate case-wide actions:** List ALL case-wide actions
   extracted in Phase 3. For EACH case-wide action (Edit details, Change stage and any custom actions), generate a dedicated scenario.
3. Generate scenarios for remaining gaps (lifecycle paths, validations, alternate
   terminal stages).
4. **Review with user:**
    - **Order scenarios: Application level first, then Case Type level.** 
    - Scenario titles with brief descriptions.
    - Test level (Application or Case Type).
    - Full Gherkin steps (Given/When/Then).
    - Get user confirmation before proceeding to Phase 5.

## Phase 5: Create Business Actions

### Step 5-1: Build the assignment handover table

From the assignments and actions of selected test cases, compile one row per
assignment that needs a Business Action:

| # | Flow Action | Class Name | View Name | Type | Persona |
|---|-------------|------------|-----------|------|---------|
| 1 | Create | {CaseTypeWorkClass} | Create | ScreenFlow (SF1) | Applicant |
| 2 | LivingSituation | {CaseTypeWorkClass} | LivingSituation | ScreenFlow (SF2) | Applicant |

**Type values:**
- `Standalone` — regular flow assignment
- `ScreenFlow (SF1)` — first screen flow assignment (after CreateCase)
- `ScreenFlow (SFN)` — subsequent screen flow assignments
- `PerformAction` — case-wide action
- `PerformApproval` — approval shape

Include ALL child case assignments using the child case's own class name.

### Step 5-2: Create Business Action rules
1. For each row in the handover table, provide the row as input and follow
   `rules-rule-test-application-businessaction` skill's procedure.
2. Track progress — mark each row complete after verification passes.

## Phase 6: Create Application Test rules
Follow the `rules-rule-test-application-case` skill's process and create one ApplicationTest rule per scenario, linking the relevant Business Actions from Phase 5.

---

## Example Reference Skills (Phase 4)

These skills contain example Gherkin scenarios for different Pega lifecycle patterns. Load these when generating scenarios in Phase 4 for illustrative purposes; they are not part of the methodology itself.

| Skill | Load when writing | What it demonstrates |
|---------|-------------------|---------------------|
| `scenario-happy-path` | E2E lifecycle | Multi-step lifecycle, persona switch, decision-driving data |
| `scenario-single-child-orchestration` | Single child case | Parent-child lifecycle, inline child completion, persona switching |
| `scenario-sequential-children-wait` | Multiple children + Wait | Sequential completion, Wait dependency, parent progression |
| `scenario-child-skip-create` | Child with Start Condition: Never | Child skips to first active stage without create step |
| `scenario-cross-case-rejection` | Application E2E rejection | Parent rejected on child outcome, multiple CaseType tags |
| `scenario-case-wide-action` | Case-wide actions | Reopen after resolution, status revert assertion |

---
