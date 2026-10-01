---
name: methodology-generate-tests
description: "Load when the user asks to generate tests for an existing rule or case behavior. Produces a risk-based test plan, discovers existing linked PegaUnit tests first, then creates or updates PegaUnit artifacts through the ChangeRequest-safe authoring path after explicit user confirmation."
---

# Recipe: Generate Tests for a Rule or Case Behavior

Use this skill when the user asks for `/generate-tests`, test coverage, test cases, or test generation.

> **🚨 MANDATORY — ALWAYS FETCH LATEST DATA**
> Every time this skill is invoked, you MUST fetch the current state of the target rule or case using `get-rule(detail="full")` or equivalent.
> Do not rely on cached, previously fetched, or user-supplied data. Always analyze against the live target state from the server.

## Goal

Given a target behavior, generate high-value tests that cover:

1. Happy path behavior
2. Alternate branches and decision outcomes
3. Boundary and negative conditions
4. Validation and error handling

## Trigger Phrases

| Trigger pattern | Example |
|-----------------|---------|
| `/generate-tests` | "/generate-tests ValidatePortfolio" |
| `generate tests for [rule]` | "generate tests for pyDefault" |
| `create test cases` | "create test cases for onboarding eligibility" |
| `add coverage` | "add coverage for rejection path" |

## Skills This Methodology Orchestrates

| Skill | Purpose |
|-------|---------|
| `methodology-change-request-workflow` | Mandatory safe authoring lifecycle |
| `methodology-rule-authoring` | Create and update rule calls when workflow fallback is needed |
| `rules-rule-test-unit-case` | PegaUnit rule authoring guidance |

Application Test and Business Action authoring are available only in release 25.1+
runtime bundles. In the base runtime, stop after coverage planning for end-to-end
requests or narrow the authoring scope to PegaUnit.

## Inputs Needed

- Preferred: exact target `pzInsKey`
- Fallback: rule name/type/class or case type name
- Optional scope constraints:
  - max number of tests
  - unit only vs end-to-end
  - specific branch or validation focus
- If `pzInsKey` is not available, ask the user for rule context before proceeding.

## Workflow

### Phase 1: Clarify and classify scope

1. Identify whether the ask is **rule-level** or **application/case-level**.
2. If the user target is ambiguous, ask one focused clarification question.
3. Resolve one exact target before generating concrete tests.

Decision guide:

- Rule-level logic validation -> prefer `Rule-Test-Unit-Case`
- End-to-end case lifecycle validation -> explain that application-test authoring is
  unavailable in this runtime, then offer a PegaUnit-focused coverage plan instead

### Phase 2: Analyze behavior before authoring

1. Fetch target artifact using `get-rule(detail="full")`.
2. **For rule-level asks that include PegaUnit generation, fetch existing linked PegaUnit tests first** using `run-data-page` on `D_pxGetRuleTestCases` with `dataPageType="list"` and payload:
   - `RecordsUnderTest` = rule `pxInsName` in uppercase
   - `RecordsUnderTestType` = rule type class (for example `Rule-Obj-When`, `Rule-Obj-Activity`)
3. Parse `pxResults` from `D_pxGetRuleTestCases` and extract covered scenarios from each test (`pyPurpose`, `pyLabel`, latest run status if present).
4. Extract branches, conditions, validations, dependencies, and status outcomes from the target rule.
5. Build a coverage matrix with positive, negative, and boundary cases, then mark which are already covered by existing tests.
6. Propose only missing scenarios for new tests. If scenario intent is still ambiguous, ask the user which scenario(s) should be covered next.
7. Present existing coverage + proposed gaps and ask for user confirmation of test scope.

Do not create test rules before scope confirmation.

### Phase 3: Mandatory authoring pre-flight (serial)

Right before any rule create or update, run both steps in order:

1. Load `methodology-change-request-workflow`.
2. Run `list-available-authoring-workflows` and follow the `Pre-flight: Determine the Authoring Path` guidance.

If a deterministic workflow matches, use it. Otherwise continue with `methodology-rule-authoring`.

### Phase 4: Create or update test artifacts

1. Load rule-type skill based on selected test type.
2. Create the smallest useful set first (smoke/happy path), then add branch and negative tests.
3. Use sparse payloads for updates and keep changes within approved scope.
4. Verify each created/updated rule with `get-rule(detail="full")`.

### Phase 5: Return execution-ready output

Return:

- Test strategy summary
- Test matrix (scenario, inputs, expected result)
- Rules created or updated (`pzInsKey`)
- Coverage map (which rule branch each test covers)
- Remaining gaps and recommended next tests

## Output Contract

| Field | Required | Notes |
|-------|----------|-------|
| `target` | Yes | Canonical target identity |
| `testType` | Yes | `PegaUnit` |
| `testMatrix` | Yes | One row per test case |
| `authoredRules` | Conditional | Include only if create/update occurred |
| `coverageMap` | Yes | Map tests to branches/conditions |
| `assumptions` | Yes | Explicit assumptions and unknowns |
| `nextGaps` | Yes | Uncovered branches and why |

When authored rules exist, include their `pzInsKey` values for client callback rendering.

## Call Discipline

| Rule | Agent behavior |
|------|----------------|
| Analyze before write | Always derive coverage from actual rule data |
| Confirm scope | Require user confirmation before authoring tests |
| ChangeRequest-safe | Use mandatory pre-flight before create/update |
| Approved scope only | Do not add unrelated tests without user approval |
| One increment at a time | Prefer small validated batches over large speculative generation |
| Discover existing tests first | For rule-level PegaUnit generation, call `D_pxGetRuleTestCases` before proposing new tests |
| Gap-first planning | Recommend new tests only for uncovered scenarios; do not duplicate existing coverage without user request |

## Anti-Patterns

- Generating tests without fetching the target rule or case artifacts
- Creating test rules before user confirms matrix/scope
- Skipping `methodology-change-request-workflow` pre-flight
- Attempting broad app-wide coverage when user asked for one specific rule
- Claiming full coverage while known branches remain untested
- Generating new PegaUnit tests without first checking `D_pxGetRuleTestCases.pxResults`
- Proposing duplicate test scenarios already covered by existing linked tests unless the user asks for variants/rewrite
