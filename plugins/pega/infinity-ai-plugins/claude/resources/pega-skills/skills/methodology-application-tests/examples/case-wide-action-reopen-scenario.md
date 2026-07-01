---
name: scenario-case-wide-action
description: Load when writing a case-wide action test scenario. Shows Reopen action pattern — case progressed to resolved state, then action performed with status assertion.
---

```gherkin
Feature: {CaseType} - Case-Wide Action Scenarios
  As a delivery team
  I want to exercise case-wide actions on {CaseType} cases
  So that operator actions outside the normal flow are tested

  @CaseType_{CaseType} @case_wide_action
  Scenario: {ActionName} a resolved {CaseType} case
    # Complete the case to resolved state first, then perform the action
    Given user is logged in as "{Persona1}"
    When user creates a new {CaseType} case with {key details}
    Then the {CaseType} should move to "{Stage1}" stage
    And the case status should be "{Stage1EntryStatus}"

    # ... progress through all stages to reach resolved state ...
    # (include all assignments, persona switches, and stage assertions
    #  needed to reach the prerequisite state for the action)

    Then the {CaseType} should move to "{ResolvedStage}" stage
    And the case status should be "{ResolvedStatus}"

    # Case-wide action
    When the user performs the "{ActionName}" case-wide action
    Then the case status should be "{PostActionStatus}"
```
