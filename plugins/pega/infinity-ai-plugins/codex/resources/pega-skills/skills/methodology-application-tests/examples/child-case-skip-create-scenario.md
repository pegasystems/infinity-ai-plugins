---
name: scenario-child-skip-create
description: "Load when a child case has Start Condition: Never. Shows child skipping directly to first active stage without a create step."
---

```gherkin
    When I switch to the "{ChildCaseType}" child case
    # Create process has Start Condition: Never — child skips to first active stage
    Then the {ChildCaseType} should move to "{FirstActiveStage}" stage
    And the case status should be "{FirstActiveStageStatus}"
```
