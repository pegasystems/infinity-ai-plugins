---
name: Branch Validation Snapshot
description: Checklist for verifying a branched Rule-UI-Theme class after update-rule.
---

After branching the theme class via `update-rule`, confirm the resolved branch rule
still matches the expected anchor fields before making any further edits.

```text
Expected stable fields after copy:
- pxObjClass = Rule-Obj-Class
- pyClassName = Rule-UI-Theme
- pyLabel = Theme
- pyDescription = View Definition Class
- pyDerivesFrom = Rule-UI-
- pyClassType = Concrete
- pyClassGroup = Rule-UI-Theme
- pyClassGroupIndicator = NOCLASSGROUP
- pyClassInheritance = true
- pyPatternInheritance = true
- pyCreateDedicatedTable = true
- pyExcludeFromFTIndex = false
- pyEncryptBLOB = false
- pyFormType = Harness
- pyDisplayMode = clone
- pyPreventSubClassing = false
- pyUsage = View Definition Class
- pyRuleAvailable = Yes

Expected branch-safe checks:
- The theme class resolves in the active branch ruleset after update-rule.
- Any dependent screen/layout work was moved to rules-rule-ui-view.
- No lookalike theme rule was edited by mistake.
```
