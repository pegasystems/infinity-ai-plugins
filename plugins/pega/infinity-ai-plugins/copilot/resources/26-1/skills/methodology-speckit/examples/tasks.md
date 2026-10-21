---
name: speckit-tasks-output
description: Example of backlog items produced by the tasks step of SpecKit. Shows one item per rule across multiple rule types for a generic Pega feature.
---

# Backlog Items — Submit Fraud Claim

**Application:** MyCo | **Release:** 26.1 | **Iteration:** Sprint 2

---

## Sprint 2

### TASK-01 — Create transaction ID property

- **Type:** `Rule-Obj-Property`
- **Rule Name:** `pyTransactionID`
- **Description:** Text property to capture the transaction ID submitted by the customer. Alphanumeric, max 20 characters.
- **Acceptance criteria:** Property exists on the FraudReview class and accepts alphanumeric values up to 20 characters.
- **Depends on:** —
- **Effort:** Low

---

### TASK-02 — Create fraud description property

- **Type:** `Rule-Obj-Property`
- **Rule Name:** `pyFraudDescription`
- **Description:** Text property to capture the customer's description of the fraudulent activity.
- **Acceptance criteria:** Property exists on the FraudReview class and renders as a multi-line input on the view.
- **Depends on:** —
- **Effort:** Low

---

### TASK-03 — Create claim status data page

- **Type:** `Rule-Declare-Pages`
- **Rule Name:** `D_FraudClaimStatus`
- **Description:** Read-only data page sourcing valid fraud claim status values for use in flows and views.
- **Acceptance criteria:** Data page returns a non-empty list of status values without error.
- **Depends on:** TASK-01, TASK-02
- **Effort:** Low

---

### TASK-04 — Create field validation rule

- **Type:** `Rule-Obj-Validate`
- **Rule Name:** `ValidateFraudClaim`
- **Description:** Validate that transaction ID and fraud description are populated before the claim can be submitted.
- **Acceptance criteria:** Submission is blocked with a field-level error message when either required field is empty.
- **Depends on:** TASK-01, TASK-02
- **Effort:** Low

---

### TASK-05 — Create submit fraud claim flow action

- **Type:** `Rule-Obj-FlowAction`
- **Rule Name:** `SubmitFraudClaim`
- **Description:** Flow action capturing transaction ID, fraud description, and supporting evidence from the customer. Invokes `ValidateFraudClaim` before submission.
- **Acceptance criteria:** Flow action saves successfully with all required fields populated and blocks submission when validation fails.
- **Depends on:** TASK-01, TASK-02
- **Effort:** Medium

---

### TASK-06 — Create submit claim view

- **Type:** `Rule-UI-View`
- **Rule Name:** `SubmitFraudClaimView`
- **Description:** View rendering the submit fraud claim screen with transaction ID, fraud description, and supporting evidence fields.
- **Acceptance criteria:** View displays all required fields and submits correctly when the flow action is invoked.
- **Depends on:** TASK-05
- **Effort:** Medium

---

### TASK-07 — Create fraud review flow

- **Type:** `Rule-Obj-Flow`
- **Rule Name:** `FraudReviewFlow`
- **Description:** Case flow routing the fraud claim through intake, review, and resolution stages. Assigns claim to the fraud review queue on submission.
- **Acceptance criteria:** Case progresses through all stages; claim is visible in the fraud review queue after submission.
- **Depends on:** TASK-04, TASK-05
- **Effort:** Medium

---

### TASK-08 — Create SLA for fraud review

- **Type:** `Rule-Obj-ServiceLevel`
- **Rule Name:** `FraudReviewSLA`
- **Description:** Service level agreement defining goal and deadline intervals for fraud review completion. Escalates if review is not completed within the goal interval.
- **Acceptance criteria:** SLA fires on case creation and escalation occurs when the goal interval is exceeded.
- **Depends on:** TASK-07
- **Effort:** Low

---

### TASK-09 — Create confirmation notification

- **Type:** `Rule-Notification`
- **Rule Name:** `FraudClaimConfirmation`
- **Description:** Notification sent to the customer confirming successful submission of the fraud claim, including a claim reference number.
- **Acceptance criteria:** Customer receives a notification with claim reference immediately after submission.
- **Depends on:** TASK-07
- **Effort:** Low
