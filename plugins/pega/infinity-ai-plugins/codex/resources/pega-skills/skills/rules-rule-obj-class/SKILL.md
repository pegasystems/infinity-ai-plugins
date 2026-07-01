---
name: rules-rule-obj-class
description: Schema and authoring guide for Pega class definition rules (Rule-Obj-Class), including work subclasses, data classes, and inheritance patterns
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|-------|-------------|
| `Stub Class` | Minimal class definition -- smallest valid create payload |
| `Work Subclass` | Work class with class group assignment (HASCLASSGROUP) |
| `Data Class Definition` | Data class (NOCLASSGROUP) |
| `Abstract Class` | Abstract class without a trailing dash |
| `Embed Class` | Concrete embedded class deriving from Embed- |
| `Class Group Root (ISCLASSGROUP)` | Class group root (ISCLASSGROUP) -- subclasses point back to this class |

## Authoring notes

### `pyClassName` is the class key

`pyClassName` is the sole identity key (from `pyKeyDefList`) and the value
the agent must supply. `pyInitialVersion` is auto-derived (always
`01-01-01`) and can be omitted.

### Class must exist before case type

Pega validates `pyClassName` at case type save time. Create the class rule
before any rules that reference the class as an instance (`pxObjClass`) or
as the applies-to class `pyClassName`.

### `pyClassGroupIndicator` values

| Value | Meaning | `pyClassGroup` behavior |
|-------|---------|------------------------|
| `HASCLASSGROUP` | Subclass belonging to a class group | Agent must set `pyClassGroup` to the group root |
| `ISCLASSGROUP` | This class IS the class group root | Auto-set to `pyClassName`. Common parents: `Work-`, `Work-Cover-`, `PegaAccel` |
| `NOCLASSGROUP` | No class group (data, embed, etc.) | Auto-set to `pyClassName` |

### Empty placeholder arrays in full API responses

When comparing a class created via the API with one created through the
Pega UI, the UI-created class will have empty placeholder entries in
embedded arrays that the API-created class will not:

`pyLockDefList`, `pyLinks`, `pyPagesAndClasses`, `pyValidRuleSets`,
`pxClassSQL`, `pyKeyDefList` (when no actual keys are defined).

These are cosmetic differences, not functional.
