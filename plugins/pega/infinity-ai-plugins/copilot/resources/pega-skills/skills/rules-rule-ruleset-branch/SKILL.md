---
name: rules-rule-ruleset-branch
description: Schema and reference guide for Pega branch rules (Rule-RuleSet-Branch)
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

### Rule-level

These are **reference examples** showing what branch records look like when inspected
via `get-rule`. They are not create payloads — agents never create `Rule-RuleSet-Branch`
records.

| Skill | Description |
|------|-------------|
| `Stub Branch` | Minimal branch record — bare-minimum required fields |
| `Labeled Branch` | Branch record with a human-readable display label |

## Authoring Notes

### `pyBranchID` is the class key

`pyBranchID` is the sole identity key (from `pyKeyDefList`). `pyRuleName`
is set by the platform on save (lowercase branch name) and can be omitted.

- **Infrastructure rule type.**
- Branch records are typically created automatically by the platform (ChangeRequest
  workflow, Dev Studio wizard, Branch Management API).
