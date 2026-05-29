---
name: scenario-single-child-orchestration
description: Load when writing a scenario with a single child case. Shows inline child completion with persona switch, child assignments, and switch back to parent.
---

```gherkin
    # {ParentStage}: {ChildCaseType} child case
    Then a "{ChildCaseType}" child case should be created
    When I switch to the "{ChildCaseType}" child case
    Then the {ChildCaseType} should move to "{ChildStage1}" stage
    And the case status should be "{ChildStage1EntryStatus}"
    When I log off
    Given a user with "{ChildPersona}" role is logged in
    When I access the {ChildCaseType} case
    When user submits "{ChildAssignment}" with {decision-driving data}
    Then the {ChildCaseType} should move to "Resolved-Completed" stage
    And the case status should be "Resolved-Completed"
    When I switch back to the parent "{ParentCaseType}" case
    # {Decision outcome explanation based on child data}
```
