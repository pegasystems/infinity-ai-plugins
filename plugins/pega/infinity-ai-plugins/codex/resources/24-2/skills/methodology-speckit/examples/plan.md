---
name: speckit-plan-output
description: Example of a development plan produced by the plan step of SpecKit. Shows sequenced steps across multiple rule types for a generic Pega feature.
---

# Development Plan — Submit Fraud Claim

**Application:** MyCo | **Case Type:** FraudReview  
**Release:** 26.1 | **Iteration:** Sprint 2 | **Effort:** Medium

## Implementation Steps

| # | Step | Rule Type | Rule Name | Depends On | Iteration | Release |
|---|------|-----------|-----------|------------|-----------|---------|
| 1 | Create transaction ID property | `Rule-Obj-Property` | `pyTransactionID` | — | Sprint 2 | 26.1 |
| 2 | Create fraud description property | `Rule-Obj-Property` | `pyFraudDescription` | — | Sprint 2 | 26.1 |
| 3 | Create claim status data page | `Rule-Declare-Pages` | `D_FraudClaimStatus` | 1, 2 | Sprint 2 | 26.1 |
| 4 | Create field validation rule | `Rule-Obj-Validate` | `ValidateFraudClaim` | 1, 2 | Sprint 2 | 26.1 |
| 5 | Create submit fraud claim flow action | `Rule-Obj-FlowAction` | `SubmitFraudClaim` | 1, 2 | Sprint 2 | 26.1 |
| 6 | Create submit claim view | `Rule-UI-View` | `SubmitFraudClaimView` | 5 | Sprint 2 | 26.1 |
| 7 | Create fraud review flow | `Rule-Obj-Flow` | `FraudReviewFlow` | 4, 5 | Sprint 2 | 26.1 |
| 8 | Create SLA for fraud review | `Rule-Obj-ServiceLevel` | `FraudReviewSLA` | 7 | Sprint 2 | 26.1 |
| 9 | Create confirmation notification | `Rule-Notification` | `FraudClaimConfirmation` | 7 | Sprint 2 | 26.1 |

## Blockers

None.

## Reuse Opportunities

- Existing `D_CustomerProfile` data page can be referenced for customer details — no new data page needed.
