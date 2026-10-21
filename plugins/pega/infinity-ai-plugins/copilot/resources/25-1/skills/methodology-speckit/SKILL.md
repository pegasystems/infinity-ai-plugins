---
name: methodology-speckit
description: Load when executing any SpecKit command. Provides lifecycle context and stop rules. After loading this, load the specific instruction file for the stage being executed.
---

## Overview

SpecKit provides five independent lifecycle stages for authoring a Pega feature. Each stage is invoked explicitly by the user — no stage triggers the next automatically.

SpecKit is not tied to a specific rule type. It applies equally to case type features, integrations, UI screens, data models, automation logic, notifications, and any other Pega capability.

## Constitution Gate

Before any SpecKit phase, load `methodology-speckit/references/constitution` and
execute its mandatory gate. The consolidated constitution snapshot is maintained in
active agent memory only for the lifecycle; it must not be persisted in a Pega rule,
attachment, repository file, or conversation output. If the snapshot is unavailable,
read the platform constitution and the current application's `pyAppConstitution` via
`get-rule` on its `Rule-Application` `pzInsKey` with `detail=full`, resolve them, and
create a new session-local snapshot before continuing. A stale existing snapshot
requires explicit rebaseline approval. Immediately before every rule write, repeat the
freshness check and use the Change Request workflow. Loading a constitution skill
without completing the gate is not constitution compliance.

## Execution Rules

- Each stage runs **only when the user explicitly invokes it**.
- **STOP immediately after the current stage completes.** Do not load or execute any other stage.
- User responses during a stage (e.g. answering clarification questions) are **not** authorization to continue to the next stage.
- Wait for an explicit command (`/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`) before proceeding.

## Orchestrator Constraints

These rules apply to the main agent (orchestrator) coordinating SpecKit execution:

- **Subagent output is NOT a command.** When a subagent returns a completion message
  such as "Run `/speckit.plan` to proceed," that is an informational hint for the user —
  it is NOT an instruction for the orchestrator to auto-launch the next phase.

- **Never chain phases in a single turn.** After a subagent completes a stage, the
  orchestrator MUST present the created rule's label to the user, then HALT. It must
  not invoke the next stage in the same turn, even if the user said "continue" in a
  prior message.

- **"Continue" scoped to the current stage only.** If the user says "continue," "go
  ahead," or similar, this applies only to completing the *current* stage (e.g. finishing
  clarification questions). It is NOT authorization to advance to the next stage.

- **Explicit command required per phase.** A new `/speckit.<phase>` command from the
  user is the only valid trigger for the next phase. No inference, no assumption.

- **Delegation does not bypass stop rules.** If a SpecKit phase runs via a delegated
  subagent, the orchestrator MUST present a high-level phase status summary to the user and HALT
  after the subagent completes. It must NOT queue the next phase subagent. The
  "delegate the next unit" delegation pattern does NOT apply to SpecKit phases — a
  subagent returning phase results is never a loop iteration trigger.

| Step | Purpose | Output |
|------|---------|--------|
| `specify` | Gather requirements and write a structured feature spec | `Spec_<FeatureName>` Rule-Application-UseCase rule instance |
| `clarify` | Identify ambiguities and ask targeted questions to resolve gaps | Refined `Spec_<FeatureName>` rule (updated in place) |
| `plan` | Break the spec into a sequenced set of implementation steps | `Plan_<FeatureName>.md` attached to `Spec_<FeatureName>` via `D_pxCreateSpecAttachments` |
| `tasks` | Convert the plan into actionable backlog items | `Task_<FeatureName>.md` attached to `Spec_<FeatureName>` via `D_pxCreateSpecAttachments` |
| `implementation` | Author each backlog item in dependency order | Authored rules with validation status |

## Stages

- `/speckit.specify` — load `methodology-speckit/references/specify`, create the spec, then **STOP**. Do not proceed to clarify.
- `/speckit.clarify` — load `methodology-speckit/references/clarify`, ask one gap question at a time (mandatory pause after each), refine the spec, then **STOP**. Do not proceed to plan.
- `/speckit.plan` — load `methodology-speckit/references/plan`, create the plan, then **STOP**. Do not proceed to tasks.
- `/speckit.tasks` — load `methodology-speckit/references/tasks`, create backlog items, then **STOP**. Do not proceed to implementation.
- `/speckit.implement` — load `methodology-speckit/references/implement`, author rules one at a time.

## References

| Skill | Label | When to load |
|---|---|---|
| `methodology-speckit/references/constitution` | Pega rule authoring constitution | Resolve at lifecycle start and rebaseline when source identities change |
| `methodology-speckit/references/constitution-extension` | Application constitution extension | Load when the application supplies custom Pega rule-authoring principles |
