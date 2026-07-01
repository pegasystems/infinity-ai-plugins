---
name: scenario-cross-case-rejection
description: Load when writing an application E2E rejection scenario. Shows parent rejected after child case outcome
---

```gherkin
  Scenario: {ParentCaseType} rejected due to {child case outcome}
    # {Description of decision failure triggered by child case data}
    Given user is logged in as "{Persona1}"
    When user creates a new {ParentCaseType} case with {key details}
    ...
    Then a "{ChildCaseType}" child case should be created
    When I switch to the "{ChildCaseType}" child case
    Then the {ChildCaseType} should move to "{ChildStage}" stage
    And the case status should be "{ChildStageEntryStatus}"
    When I log off
    Given a user with "{ChildPersona}" role is logged in
    When I access the {ChildCaseType} case
    When user submits "{ChildAssignment}" with {data that triggers rejection}
    Then the {ChildCaseType} should move to "Resolved-Completed" stage
    And the case status should be "Resolved-Completed"
    When I switch back to the parent "{ParentCaseType}" case
    # {Decision FAILS: math/condition explanation}
    Then the {ParentCaseType} should move to "Rejected" stage
    And the case status should be "Resolved-Rejected"
```
