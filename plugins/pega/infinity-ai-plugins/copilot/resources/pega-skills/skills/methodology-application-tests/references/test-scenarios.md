---
name: scenario-design
description: Load when generating Cucumber test scenarios. Covers scenario categories, step title conventions, persona switching, stage/status assertions, child case orchestration, and coverage checklist.
---

# Test Scenarios

Domain knowledge for designing Cucumber/Gherkin test scenarios from Pega case type
lifecycle data. Scenarios are lightweight — each step maps to an assignment/action with assertions for case status and stage transitions without field-level data tables.

> **Usage context:** Loaded by `methodology-application-tests` (Phase 4) before generating Gherkin scenarios. Can also be loaded standalone. When loaded standalone, use the Example Reference Skills table in `skills/methodology-application-tests/SKILL.md` to choose scenario example skills.

### Feature Headers

```gherkin
Feature: {CaseType} - Test Scenarios
  As a delivery team
  I want to manage {CaseType} cases through their lifecycle
  So that {business purpose}
```

```gherkin
@app_e2e
Feature: {AppName} - Application E2E Test Scenarios
  As a delivery team
  I want to verify cross-case-type lifecycles
  So that parent-child and orchestration flows work end-to-end
```

---

## Scenario Structure

Each scenario has a **description** (1-2 line summary) and **descriptive steps**.

**Description rules:** placed as comments after `Scenario:` line; summarize the decision path and expected outcome; mention key data conditions that make this scenario distinct.

---

## Scenario Categories

| Category | What to cover |
|----------|--------------|
| **E2E Lifecycle** | Happy path (all decisions pass) + one per divergent decision branch + one per alternate terminal stage (Rejected, Withdrawn). Every scenario starts from case creation (first stage) and progresses through ALL stages to a terminal state — never starts mid-flow or stops before reaching a terminal/alternate terminal stage. Decision variant scenarios diverge at the decision point but still continue to their terminal outcome. |
| **Validation** | One per validation rule on flow actions that can block progression + one per stage entry validation. Every scenario starts from case creation and progresses to the exact step where validation triggers, then asserts the error. Case does NOT advance past the failure point — no further progression steps after the assertion. |
| **Case-Wide Actions** | One per case-wide action from Phase 3. Standard: Edit details, Change stage, Withdraw, Reopen. Custom actions must also be covered. Each scenario creates a new case from start to the prerequisite state, then performs the action. Every `pyCaseWideLocalActions` entry gets its own scenario — never skip operator-specific or role-specific actions. |

---

## Step Titles

Step title = assignment/action name + key data context. Include data that drives a decision point or makes this scenario unique. Omit routine field values that don't affect the test path. No field-level data tables.

---

## Persona Switching

### Persona Discovery

Before generating scenarios, retrieve configured personas:

```
run-data-page(
  dataPage="D_pzGlobalTestPersonaList",
  dataPageType="list",
  dataViewParameters={ "AppName": "{AppName}", "AppVersion": "{AppVersion}" }
)
```

Use returned `pyPersonaName` in steps. If a required role is absent, add the persona using the role implied by assignment routing.

### Rules

| Situation | Pattern |
|-----------|---------|
| First persona (no routing) | `Given I am an authorized user for {CaseType} actions` |
| First persona (specific role) | `Given a user with "{Role}" role is logged in` |
| Role change (same case) | Logoff → login as new role → access case again |
| First step | NO `When I log off` (no prior session) |
| Same role as previous | Skip persona steps entirely |
| After `switch back to parent` + role change | Logoff → login → access parent |

---

## Stage and Status Assertions

**CRITICAL** — MANDATORY after EVERY stage transition.

1. Only assert values explicitly present in rule output (entry status, resolution status, set-status automations)
2. Do NOT infer intermediate statuses not in the data
3. Include stage/status assertions whenever case stage or status is updated
4. **Skip status assertion if `pyStageEntryStatus` is empty for that stage**
5. No assertions between screen flow steps (assert after flow completes)
6. Automatic transitions (decision fires after child resolves): `Then` directly, no `When` step
7. **After a ScreenFlow in an automatic-transition stage, assert the NEXT stage — not the ScreenFlow's stage.** Check `pyStageTransition` — `automatic` means immediate forward movement.

---

## Child Case Orchestration Patterns

| Pattern | Key rules |
|---------|-----------|
| **Single Child** | Persona switch → access child (not parent); step title includes decision-driving data; decision math comment; actual status values (never invented); status assertion after EVERY transition; parent continues after switch back |
| **Sequential Children + Wait** | Both children asserted as created together; complete sequentially in creation order; ALL children done BEFORE Wait unblocks; parent continues after Wait |
| **Skipped Create (Start Condition: Never)** | No `When user creates...` step — process never executes when child is instantiated by parent; assert first active stage directly after switch |
| **Cross-Case Rejection** | Multiple `@CaseType_*` tags; description explains decision failure; data chosen to FAIL decision (boundary math in comment); automatic transition → `Then` directly |

---

### Scenario Naming

| Category | Pattern |
|----------|---------|
| E2E Lifecycle | `Scenario: Complete {CaseType} Lifecycle - {Path/Outcome}` |
| Alternate Stage | `Scenario: {Description} - {trigger condition}` |
| Validation | `Scenario: {Action} - Validation Blocks {Transition}` |
| Optional Action | `Scenario: {Action} {CaseType} During {Stage}` |

---

## Scenario Classification

- **Case type scenarios** — all steps within one case type. No child case creation or cross-case assertions. Examples: validation failures, early rejections, edit/withdraw actions.
- **Application level scenarios** — crosses case type boundaries. Parent creates child cases, child navigation/assignments, return to parent. Examples: happy path with orchestration, rejection after child creation.

> Field mapping for classification defined in `rules-rule-test-application-case` skill.

---

## Coverage Checklist

### Case Type Scenarios
- [ ] Decision path variations resolving **before** child case creation
- [ ] Early eligibility/qualification rejections
- [ ] Validation — one per flow action validation rule
- [ ] Case-wide actions — one per action from Phase 3 (count must match)
- [ ] Alternate terminal stages reachable without child cases

### Application Level Scenarios
- [ ] Happy path — parent + all children resolved → terminal success
- [ ] Decision path variations + each rejection **after** child creation
- [ ] Data propagation — child data flows to parent decisions

### Child Case Orchestration
- [ ] Every create-case shape has creation assertion
- [ ] Each child completed inline (switch → assignments → resolution → switch back)
- [ ] Parent Wait steps preceded by ALL dependent child completions

### Structural Integrity
- [ ] Every scenario creates a new case — no shortcuts
- [ ] Stage + status assertions after EACH transition; E2E goes creation → terminal
- [ ] Step titles include key data context for decision-driving data
- [ ] No automation/decision steps as `When` steps (decision → create scenario per branch)
- [ ] Decision-gated bypass: if Decision bypasses a User Action, omit that action
- [ ] No internal system logic: WorkQueue names, routing expressions, CaseStatus IDs
