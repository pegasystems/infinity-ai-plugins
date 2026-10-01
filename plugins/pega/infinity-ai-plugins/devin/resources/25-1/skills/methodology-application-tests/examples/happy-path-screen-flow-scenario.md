---
name: scenario-happy-path
description: Load when writing an E2E lifecycle scenario. Shows full case lifecycle from creation to terminal stage — screen flow steps, persona switch, and stage/status assertions.
---

```gherkin
Feature: {CaseType} - Test Scenarios
  As a delivery team
  I want to manage {CaseType} cases through their lifecycle
  So that {business purpose}

  @CaseType_{CaseType} @happy_path
  Scenario: Complete {CaseType} Lifecycle - {Path/Outcome}
    # {Summary of decision path taken and expected outcome}
    # {Key data conditions that make this scenario distinct}
    Given user is logged in as "{Persona1}"
    When user creates a new {CaseType} case with {key application details}
    Then the {CaseType} should move to "{Stage1}" stage
    And the case status should be "{Stage1EntryStatus}"

    # Screen flow — no assertions between steps
    When user submits "{ScreenFlowStep1}" with {key data context}
    When user submits "{ScreenFlowStep2}" with {decision-driving data}
    When user submits "{ScreenFlowStep3}" with {completion criteria}
    Then the {CaseType} should move to "{Stage2}" stage
    And the case status should be "{Stage2EntryStatus}"

    When user submits "{Assignment1}" with {relevant conditions}
    Then the {CaseType} should move to "{Stage3}" stage
    And the case status should be "{Stage3EntryStatus}"

    # Persona switch — different role for next assignment
    When I log off
    Given a user with "{Persona2}" role is logged in
    When I access the {CaseType} case
    When user submits "{Assignment2}" with {decision data}
    Then the {CaseType} should move to "{Stage4}" stage
    And the case status should be "{Stage4EntryStatus}"

    When user submits "{FinalAssignment}" with {completion data}
    Then the {CaseType} should move to "{TerminalStage}" stage
    And the case status should be "{ResolvedStatus}"
```
