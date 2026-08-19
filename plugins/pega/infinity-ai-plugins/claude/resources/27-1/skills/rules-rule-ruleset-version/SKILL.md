---
name: rules-rule-ruleset-version
description: Schema and authoring guide for Pega ruleset version records (Rule-RuleSet-Version), including version identity, dependency declarations, and branch-version constraints.
---

**Prerequisite:** Load `methodology-rule-authoring` first.

## Authoring Notes

### Identity fields

- `pyRuleSetName` names the parent ruleset.
- `pyRuleSetVersionID` is the true version identifier in `MM-mm-pp` format.
- `pyRuleSet` is auto-derived from `pyRuleSetName`.
- `pyRuleSetVersion` is always empty on `Rule-RuleSet-Version`.

### Standard versus branch versions

| Type | Key fields |
|------|------------|
| Standard version | `pyRuleSetName`, `pyRuleSetVersionID`, `pyLabel`, `pyDescription` |
| Branch version | `pyRuleSetName`, `pyRuleSetVersionID`, `pyLabel`, `pyBranchRuleSet: "true"`, `pyBranchID`, `pyBranchOrigin` |

### Dependency declarations

- Populate `pyRequiresRuleSetVersion` with `{RuleSetName}:{Version}` strings when prerequisites are required.
- Let the server mirror those values into `pyRequiresRuleSetVersionPageList`.

### Schema

Load `rules-rule-ruleset-version/schema/rule-ruleset-version` before creating or updating this rule type.
