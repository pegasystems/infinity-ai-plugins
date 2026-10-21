---
name: speckit-clarify
description: Instruction for the clarify step of SpecKit. Reads the existing Spec_<FeatureName> Rule-Application-UseCase instance, identifies ambiguities and gaps, asks targeted questions, and updates the rule instance in place.
---

# Clarify Instruction

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). `$ARGUMENTS` may contain a feature name, additional clarification focus areas, extra instructions, or any combination. Parse the full content — extract the feature name if present to locate the `Spec_<FeatureName>` rule instance, and treat any remaining content as guidance on which gaps or areas to prioritise during clarification.

Before proceeding, load and execute `methodology-speckit/references/constitution`.
Validate the canonical snapshot in active agent memory and perform the source-identity
freshness check. If the in-memory snapshot is missing or invalid, load the current
platform constitution and application constitution extension, resolve them, and create
a new session-local snapshot before continuing. If an existing source changed, pause
for explicit rebaseline approval, do not silently replace it.

Then compile the resolved guidance into the constraint list and bind each constraint to
its tool parameter or payload field. Apply every in-scope constraint to the
`update-rule` call made on the spec rule in this phase. Freshness alone is not
compliance.

## Goal

Read the `Spec_<FeatureName>` rule instance, identify gaps and ambiguities, resolve them through targeted questions, and update the rule instance with the refined content.

## Procedure

### 1. Resolve the spec rule instance

Parse `$ARGUMENTS` to extract the feature name if present — it may also contain additional clarification focus areas or instructions. If no feature name is found in `$ARGUMENTS`, infer it from the current conversation context.

Use the resolved feature name to locate the `Spec_<FeatureName>` rule instance via `get-rule` or `list-rules`.

If the `Spec_<FeatureName>` rule instance cannot be found, stop and instruct the user to run `/speckit.specify <FeatureName>` first — do not create a new spec here.

### 2. Review the spec

Read the fetched rule in full — `pyDescription`, `pyAcceptanceCriteriaList` — and identify every element that is:

- Missing or blank
- Vague or too broad to derive concrete implementation steps
- Potentially conflicting with another element
- Based on an unstated assumption
- Marked as "Unknown / Clarification needed"

### 3. Categorise gaps

Group identified gaps into:

| Category | Examples |
|----------|---------|
| Missing context | Application name or case type not confirmed |
| Unclear goal | Business problem or outcome is ambiguous |
| Weak acceptance criteria | Criteria are not testable, or fewer than 2 exist |
| Unknown constraints | No technical or business constraints captured |
| Unresolved unknowns | Items marked as "Unknown / Clarification needed" in the spec |

### 4. Ask targeted questions — strictly one per turn

**This step is mandatory when gaps exist.** Do not skip it or combine questions.

Pick the **single highest-priority gap** from step 3. Output **only** that one question as plain text — nothing else in the message. Then **stop outputting and wait for the user's reply before doing anything further**.

**Rules for this loop:**

- Output exactly one question per message. No preamble, no list, no numbering, no follow-up text.
- Do not use any tool in the same message as the question — the question must be the entire message.
- Do not proceed to the next gap until the user has replied to the current question.
- After the user replies, record the answer, pick the next unresolved gap, and output only that next question. Repeat.
- Stop the loop when all gaps are resolved or explicitly accepted as known assumptions by the user.
- Do not call `update-rule` during this loop — collect all answers first, then proceed to step 5.

### 5. Update the rule instance — once, after all gaps are resolved

Before updating the rule instance:
1. Load `methodology-rule-authoring` — follow its update workflow.
2. Load `rules-rule-application-usecase` — read its schema as the source of truth for valid field values.

After **all** gaps from step 4 have been resolved or accepted as known assumptions, make a **single `update-rule` call** incorporating all collected answers:

- Update `pyDescription` with the refined current/expected state and resolved constraints
- Update `pyAcceptanceCriteriaList` with any new or revised criteria
- Update `pyAcceptanceCriteriaList` if new information was gathered
- Remove or resolve items previously marked as "Unknown / Clarification needed"
- Set `pyCategory` to `Pending-Plan`

Updating the rule instance is **mandatory** — do not skip it.

Present the updated `pzInsKey` and a summary of what changed to the user.

### 6. Confirm readiness

The spec is ready for planning when all of the following are true:

- Application name is confirmed
- Feature goal is clear and actionable
- At least one actor and one trigger are defined (behavioral features only)
- At least two testable acceptance criteria exist
- No items remain marked as "Unknown / Clarification needed" (or are explicitly accepted as assumptions)

## Phase complete — mandatory stop

After presenting the summary, output exactly this and nothing more:

> **Clarify complete.** The spec `<pyLabel>` has been updated.

Do not ask follow-up questions. Do not invoke plan, tasks, or implementation. Wait for the user to explicitly invoke the next command.

## Rules

- Do not proceed without first fetching the `Spec_<FeatureName>` rule instance.
- **One question per message — no exceptions.** Output the question as plain text only. No preamble, no list, no numbering. Do not include any tool call in the same message as a question.
- **Mandatory pause after every question.** Do not ask the next question, do not call any tool, and do not proceed to step 5 until the user has replied.
- **Update the rule instance once — never per gap.** Accumulate all answers during the step 4 loop, then make a single `update-rule` call in step 5 after all gaps are resolved.
- Do not invent values for missing fields — always ask the user.
- Do not introduce implementation details (rule names, rule types) at this step.
- If a gap cannot be resolved, document it explicitly as a known assumption in `pyDescription`.
- Updating the rule instance is mandatory — do not skip it.
- Stop after the rule instance is updated — do not proceed to the next lifecycle stage.
- Report constitution-gate evidence: the in-memory snapshot was verified and source identities are unchanged, or report the rebaseline or gate failure and stop. Also state each in-scope constraint and the value applied to this phase's rule write.

