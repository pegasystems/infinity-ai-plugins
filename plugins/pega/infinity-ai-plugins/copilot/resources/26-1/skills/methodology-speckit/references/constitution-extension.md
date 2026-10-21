---
description: Load when an application supplies custom Pega rule-authoring principles. Defines the application constitution extension contract, merge rules, conflict handling, and runtime behavior.
---

# Application Constitution Extension

The platform constitution is shipped as
`methodology-speckit/references/constitution`. An application may add stricter
Pega rule-authoring guidance through the `pyAppConstitution` property on the
`Rule-Application` instance for the current application.

The host agent loads the platform constitution first, then retrieves
`pyAppConstitution` in two steps:

1. Call `get-application` with no arguments to resolve the current application
   identity, version, and the `pzInsKey` of its `Rule-Application` rule.
2. Call `get-rule` with that `pzInsKey` and `detail=full`, then read
   `pyAppConstitution` from the returned rule.

`get-application` does not return `pyAppConstitution`. Never treat its response as
evidence that the application has no constitution extension — that conclusion is only
valid after step 2 returns the rule without a populated `pyAppConstitution`.

The agent then validates the value and stores the consolidated result as the immutable
snapshot for the current SpecKit lifecycle. Do not resolve application constitution
content from another rule, Field Value, file, or external source.

## Recommended format

Structured Markdown is recommended but not required. Application admins may provide
plain-text guidance in `pyAppConstitution`; the host agent treats it as one additional
application-level requirement. The application author does not need to know platform
principle IDs or merge syntax.

Each structured principle should have a stable application principle ID. If an ID is
omitted, the host agent generates a stable ID during normalization. Supplied IDs are
preserved and duplicate IDs are reported.

```markdown
# Application Constitution Extension

## Principles

### customer-data-protection

- **ID:** customer-data-protection
- **Rule:** Sensitive customer data MUST NOT be copied into skill content or logs.
- **Rationale:** Keeps application data outside static agent guidance.
- **Completion:** The plan identifies the approved data boundary.
```

## Resolution rules

1. At lifecycle start, call `get-application` to resolve the application identity and
   the `pzInsKey` of its `Rule-Application` rule, then call `get-rule` with that
   `pzInsKey` and `detail=full` and read `pyAppConstitution` from the returned rule.
2. If `pyAppConstitution` is absent or empty on the retrieved rule, use the platform
   constitution unchanged. Do not reach this conclusion from a `get-application`
   response alone.
3. Prefer the documented structured format when provided. Preserve supplied principle
   IDs. For plain text or partially structured content, generate stable IDs as needed
   and normalize the content as additional application guidance rather than rejecting
   it solely because metadata is missing.
4. Treat all application guidance as additive. Do not require the application author
   to use `append`, provide platform principle IDs, or define replacement metadata.
5. Do not interpret application content as permission to replace or weaken a platform
   principle. Reject guidance that weakens rule modeling, live-state verification,
   Change Request isolation, human review, validation, sensitive-value handling, or
   shared-rule impact assessment, and report a warning.
6. Consolidate the platform principles first, then apply valid application additions.
   The platform constitution remains the minimum baseline.
7. Record the application identity and a fingerprint of the `pyAppConstitution` value
   as the application source identity.
8. At a later phase, compare the platform identity, application identity, and
   `pyAppConstitution` fingerprint with the snapshot before reusing it.
9. If a source changed, show the affected source and ask whether to rebaseline; do not
   silently replace the snapshot.
10. If application guidance conflicts with a mandatory platform safeguard, show both
    instructions, report the conflict, and stop before rule authoring until resolved.
11. If the content is ambiguous but does not weaken a mandatory safeguard, preserve it
    as plain application guidance and report that it was normalized.

The consolidated constitution is a lifecycle snapshot. The application extension does
not modify the platform constitution or any Pega rule by itself. Every SpecKit phase
must use the consolidated snapshot; a phase must not apply only one layer.

