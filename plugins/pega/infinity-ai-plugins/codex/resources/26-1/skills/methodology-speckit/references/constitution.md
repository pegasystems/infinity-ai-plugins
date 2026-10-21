---
description: Load before any SpecKit stage that plans or authors Pega rules. Defines the platform constitution for safe rule authoring, application customization, lifecycle enforcement, and human review.
---

# Pega Rule Authoring Constitution

This constitution governs SpecKit work that results in Pega rule changes. It is not a
constitution for the `infinity-skills` repository and does not govern skill packaging,
Gradle builds, or repository source layout.

## Core Principles

### I. Preserve Pega Intent

The agent MUST translate approved business intent into the smallest Pega rule change
that satisfies the requirement. It MUST preserve unrelated behavior and MUST NOT
introduce speculative rules, fields, flows, or integrations.

**Completion evidence:** The plan and authored changes identify the requested behavior,
preserved behavior, and exact rule scope.

### II. Use the Correct Rule Model

The agent MUST select rule types, classes, and structures based on live Pega
application context and the applicable rule-type skill. It MUST inspect current rule
content before modifying an existing rule and MUST NOT substitute a different rule type
when authoring fails.

Before creating or updating a rule, the agent MUST load the applicable rule-type skill
and use its schema and closest example as the source of truth for the rule payload. It
MUST NOT invent property names, nesting, or payload structures when the rule-type skill
provides the required model.

**Completion evidence:** The selected rule type and payload structure are supported by
the relevant rule skill, schema, and current application context.

### III. Isolate Every Rule Change

All Pega rule creates and updates MUST use the approved branch-scoped authoring
workflow. Changes MUST remain isolated in the active branch and remain subject to
the human review gate. The agent MUST NOT write directly to a base ruleset or treat
a successful API response as approval to merge.

**Completion evidence:** The active branch, authored rule keys, and review status are
recorded.

### IV. Respect Application Conventions

Application-specific naming, ruleset, class, security, integration, and testing
conventions MUST be loaded when available and applied after the platform principles.
Application conventions MAY add stricter requirements but MUST NOT weaken branch
isolation, human approval, or safety constraints.

**Completion evidence:** The plan records the application conventions used and any
conflicts or assumptions.

### V. Verify Against Live Pega State

The agent MUST use live MCP data for application context, rule existence, rule content,
assignments, and workflow state. It MUST NOT treat cached examples, generated skill
files, or prior conversation output as current Pega state.

**Completion evidence:** Dynamic decisions cite the relevant MCP retrieval or
verification result.

### VI. Validate Before Review

The agent MUST verify each authored rule after writing it. Testable rules MUST use the
applicable test strategy, and failures MUST be addressed or reported before the
change reaches review. The agent MUST present the complete change summary and wait for
explicit human approval.

**Completion evidence:** Final rule retrieval, test results when applicable, warnings,
and the pending human review decision are reported.

### VII. Keep Sensitive Values Out of Rule Content

The agent MUST NOT write credentials, passwords, API keys, tokens, connection strings,
or real customer data into an authored rule payload. Secrets and environment-specific
endpoints MUST be referenced indirectly through the mechanism the applicable rule-type
skill defines, such as an authentication profile or an application setting.

If a requirement appears to need a literal secret or production data value, the agent
MUST stop and ask the user for the approved indirect reference instead of inventing a
placeholder or embedding the value.

**Completion evidence:** Authored rules contain no literal secrets or real customer
data, and any sensitive value is recorded as an indirect reference.

### VIII. Assess Impact Before Changing Shared Rules

Before modifying an existing rule, the agent MUST check how that rule is consumed,
including references returned by rule retrieval, inheritance by subclasses, and
availability such as `Final`. A change that alters behavior for consumers beyond the
requested scope MUST be reported to the user before authoring.

The agent MUST NOT expand a change to shared or inherited rules without explicit user
confirmation of that wider impact.

**Completion evidence:** The affected consumers are identified, and any impact beyond
the requested scope is reported and confirmed.

## SpecKit Lifecycle and Snapshot

SpecKit phases may be requested separately, and the consolidated constitution snapshot
is held only in the active agent session. If a phase starts without that session
context, the agent MUST load the current platform constitution and application
constitution extension, resolve them, and create a new session-local snapshot before
continuing. It MUST NOT silently proceed without a snapshot.

At lifecycle start, normally during `specify`, the agent MUST:

1. Load this platform constitution.
2. Load the application constitution extension when one is provided.
3. Resolve additions, replacements, conflicts, and precedence.
4. Create a constitution snapshot associated with `Spec_<FeatureName>`.
5. Record the platform constitution version and the application extension identity,
   rule key/version, or equivalent source fingerprint in the active lifecycle context.
6. Compile the resolved guidance into an explicit constraint list as described in
   **Constraint Binding and Compliance** below.

When `clarify`, `plan`, `tasks`, or `implement` starts later, the agent MUST:

1. Locate the lifecycle snapshot associated with the feature in the active agent
   session.
2. Perform a lightweight freshness check against the platform constitution and
   application extension source identities.
3. Reuse the snapshot when the source identities are unchanged.
4. If no snapshot exists in the active agent session, load the current platform
   constitution and application constitution extension, resolve them, and create a new
   session-local snapshot before continuing. Do not persist the replacement snapshot.
5. If a source changed, show the affected constitution source and pause for an explicit
   rebaseline decision. Do not silently switch governance mid-lifecycle.

Immediately before every rule write, the agent MUST perform the freshness check even
when the phase gate already passed. If the user approves a rebaseline, resolve and
record a new snapshot in the active lifecycle context before authoring. If the user
does not approve, stop without changing rules.

The freshness check alone is NOT compliance. It only establishes that the constitution
sources are unchanged. The agent MUST also perform the compliance check defined below
before every rule write.

## Constraint Binding and Compliance

Constitution guidance is prose. Prose does not constrain a tool call. The agent MUST
compile the resolved guidance into an explicit constraint list, and MUST bind each
constraint to the concrete tool parameter or payload field that enforces it.

For each constraint, record at minimum:

| Element | Meaning |
|---|---|
| Constraint | The obligation expressed in the constitution |
| Scope | Which writes it applies to, such as all rules, new rules only, or one rule type |
| Binding | The exact tool parameter or payload field that enforces it |
| Value | The required value for this lifecycle |

Constraints are open-ended. The constitution may constrain any aspect of a rule write,
including where a rule is stored, how it is named, which class or rule type is used,
its availability, the payload structure, or the verification required before review.
Derive the constraint list from the resolved guidance itself. Do not restrict it to a
fixed set of categories, and do not treat a constraint as optional because it has no
obvious tool parameter — bind it to the payload field or authoring step that enforces
it.

Worked example, for illustration only: guidance stating that all rules must be created
in a named ruleset compiles to a constraint whose binding is the `ruleSet` parameter on
`create-rule` and `copy-rule`, whose value is the named ruleset, and whose scope is
every rule authored in the lifecycle. Other guidance compiles to different bindings.

Immediately before every `create-rule`, `update-rule`, or `copy-rule` call, the agent
MUST:

1. Re-read the constraint list from the active lifecycle context.
2. Identify every constraint whose scope covers this write.
3. Set the bound parameter or payload field explicitly to the required value.
4. Confirm the outgoing payload satisfies every in-scope constraint before calling.

The agent MUST NOT rely on a tool default to satisfy a constraint. Where a constraint
binds to an optional parameter, omitting that parameter is a violation even when the
call succeeds, because the tool substitutes its own default silently.

This applies to every rule write in every phase, including writes to the
`Spec_<FeatureName>` rule itself in `specify`, `clarify`, `plan`, and `tasks`. The spec
rule is a Pega rule and is subject to the same constraints as authored backlog rules.

If a constraint cannot be satisfied, because the required target is unavailable or
because it conflicts with a mandatory platform safeguard, the agent MUST stop and ask
the user. It MUST NOT fall back to a default, choose a substitute, or defer the problem
to review.

Every phase completion report MUST state which constraints were in scope and the actual
values used, not only that the sources were unchanged.

The constitution does not create or update Pega rules by itself. Each stage remains
independent and MUST stop after its own output. A later stage requires its own explicit
user command.

## Application Extension

An application MAY provide constitution-specific guidance through the contract in
`methodology-speckit/references/constitution-extension`. The extension is evaluated
at runtime and is not a platform rule or repository artifact.

Application guidance MAY add principles or tighten platform guidance. It MUST NOT
remove or weaken requirements for correct rule modeling, live-state verification,
branch isolation, human review, validation, sensitive-value handling, or
shared-rule impact assessment.

If application guidance conflicts with this constitution, the agent MUST identify both
principles and ask the user which interpretation applies. The agent MUST pause before
rule authoring until the conflict is resolved.

## Governance

Changes to this constitution require review as part of the SpecKit skill update. The
application extension is maintained by the application developer and is resolved when
a lifecycle snapshot is created or rebaselined; it does not modify this platform
constitution.

**Version**: 1.1.0 | **Ratified**: 2026-09-14 | **Last Amended**: 2026-09-22

