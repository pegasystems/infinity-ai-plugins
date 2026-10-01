---
name: scenario-optional-process
description: Load when writing an optional process trigger scenario. Shows how to trigger an optional process and complete the resulting assignment in sequence.
---

```gherkin
Feature: {CaseType} - Optional Process Scenarios
  As a delivery team
  I want to exercise optional processes on {CaseType} cases
  So that operator-triggered ad-hoc flows are tested

  @CaseType_{CaseType}
  Scenario: Trigger {Process Label} During {Stage}
    # Prerequisite: case is in {Stage} where "{Process Label}" optional process is available
    # Triggers the process and completes the resulting assignment
    Given user is logged in as "{Persona}"
    When user creates a new {CaseType} case with {key details}
    Then the {CaseType} should move to "{Stage1}" stage
    And the case status should be "{Stage1EntryStatus}"

    # ... progress to {TargetStage} where the optional process is available ...
    # (include all assignments, persona switches, and stage assertions)

    Then the {CaseType} should be in "{TargetStage}" stage

    # Trigger the optional process from the actions menu
    When the user triggers the "{Process Label}" optional process on the {CaseType} case

    # Complete the resulting assignment created by the optional process
    When the user submits the "{ResultingAssignment}" assignment with {key details}
    And the case status should be "{PostActionStatus}"
```
