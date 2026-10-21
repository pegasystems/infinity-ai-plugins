---
name: speckit-spec-output
description: Example of a completed feature spec produced by the specify step of SpecKit. Pega-aware but implementation-independent — no rule types, rulesets, or tools are mentioned.
---

# Feature Spec — Submit Fraud Claim

**Application:** MyCo  
**Case Type:** FraudReview  
**Feature:** Submit Fraud Claim  
**Existing Artifact:** FraudReview case type

## Requested Change

Allow a customer to submit a fraud claim against a suspicious transaction by providing transaction details and supporting evidence.

## Current State

The FraudReview case type does not provide a mechanism for customers to self-initiate a fraud claim. Claims are currently raised by operators on behalf of customers.

## Expected State

A customer can initiate a fraud claim directly. The system captures the transaction ID and fraud description, assigns the claim to the fraud review queue, and notifies the customer of receipt. Existing operator-initiated claim behavior is preserved.

## Acceptance Criteria

1. Customer can submit a fraud claim with a transaction ID and description.
2. System assigns the claim to the fraud review queue upon submission.
3. Customer receives a confirmation notification after successful submission.
4. Submission is blocked with clear error messages if required fields are empty.
5. Existing operator-initiated claim behavior is unchanged.

## Constraints

- Must reuse the existing MyCo notification infrastructure.
- Transaction ID format is alphanumeric, max 20 characters.
- Customer must be authenticated before reaching the claim screen.
- Existing FraudReview case behavior must be preserved.

## Gaps / Clarification Needed

- Unknown: Whether a transaction ID property already exists on the FraudReview class.

## Project Metadata *(optional)*

| Field | Value |
|-------|-------|
| Release | 26.1 |
| Iteration | Sprint 2 |
