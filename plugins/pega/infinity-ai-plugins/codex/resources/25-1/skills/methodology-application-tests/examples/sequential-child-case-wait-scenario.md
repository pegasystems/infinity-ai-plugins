---
name: scenario-sequential-children-wait
description: Load when writing a scenario with multiple child cases and a parent Wait step. Shows sequential child completion before Wait unblocks the parent.
---

```gherkin
    # {ParentStage}: Child cases created
    Then a "{ChildCaseType1}" child case should be created
    And a "{ChildCaseType2}" child case should be created

    # ── Complete {ChildCaseType1} child case ──
    When I switch to the "{ChildCaseType1}" child case
    Then the {ChildCaseType1} should move to "{ChildStage}" stage
    And the case status should be "{ChildStageEntryStatus}"
    When I log off
    Given a user with "{ChildPersona1}" role is logged in
    When user opens the case
    When user submits "{ChildAssignment1}" with {decision data}
    Then the {ChildCaseType1} should move to "Resolved-Completed" stage
    And the case status should be "Resolved-Completed"
    When I switch back to the parent "{ParentCaseType}" case

    # ── Complete {ChildCaseType2} child case ──
    When I switch to the "{ChildCaseType2}" child case
    Then the {ChildCaseType2} should move to "{ChildStage}" stage
    And the case status should be "{ChildStageEntryStatus}"
    When I log off
    Given a user with "{ChildPersona2}" role is logged in
    When user opens the case
    When user submits "{ChildAssignment2}" with {decision data}
    Then the {ChildCaseType2} should move to "Resolved-Completed" stage
    And the case status should be "Resolved-Completed"
    When I switch back to the parent "{ParentCaseType}" case

    # {ParentStage}: Wait step unblocks (all children Resolved-%)
    Then the {ParentCaseType} should move to "{NextParentStage}" stage
    And the case status should be "{NextParentStageEntryStatus}"
```
