---
name: rules-rule-classmetadata
description: Schema and authoring guide for Pega class metadata rules (Rule-ClassMetadata) — primary fields lists for work classes and data-page bindings (list / lookup / savable) for data-object classes
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|-------|-------------|
| `Stub ClassMetadata` | Minimal class metadata record — smallest valid create payload |
| `With Primary Fields` | Work-class metadata with an ordered `pyPrimaryFields` list |
| `Data Class Metadata` | Data-object metadata with `pyListDataPage` / `pyLookUpDataPage` / `pySavableDataPage`, embedded `Rule-Declare-Pages` snapshots, and `pyDataTypeLocalActions` |
| `UpdateDetails Action` | Single `Embed-Pega-DataTypeAction-UpdateDetails` entry — the OOTB Edit action |
| `Add Action` | OOTB Add action (`Embed-Pega-DataTypeAction-Add`) |
| `Delete Action` | OOTB Delete action (`Embed-Pega-DataTypeAction-Delete`) |
| `Custom Action` | Custom data-type action (`Embed-Pega-DataTypeAction-Custom`) |

## References

| Skill | Description |
|-------|-------------|
| `Primary Fields reference` | What `pyPrimaryFields` is — design-time metadata that drives Case Designer, default views, and agent reliability. |

## Authoring notes

### `pyClassName` is the only identity input

`pyClassName` is the sole field the agent must supply for identity. The
builder auto-derives `pyRuleName` and `pyLabel` from `pyClassName`, so
omit them.

### Adding a property to primary fields

Perform all five steps:

#### 1. Ensure the property exists on the class. Create it first if needed.

#### 2. Find the ClassMetadata rule using list-rules

```
list-rules(ruleType="Rule-ClassMetadata", className="MyOrg-MyApp-Work-MyCase")
```

#### 3. Read current primary fields using get-rule

```
get-rule(key="{ClassMetadata key}", detail="full")
```

Extract the `pyPrimaryFields` array.

#### 4. Append new property and send the complete array:

Load skill `With Primary Fields` for the example payload.

**IMPORTANT:** Include ALL existing entries — arrays are replaced wholesale by
deep merge, not appended to.

#### 5. Update the `pyPrimaryFields` view:

See `view-update-workflow` for detailed instructions.

### `pyPrimaryFields` ordering

For `Work-` subclasses the conventional first four entries are `pyID`,
`pyLabel`, `pxUrgencyWork`, `pyStatusWork`; case-specific properties follow.
For `Data-` subclasses there is no fixed prefix — inspect a sibling
data class to see the project's convention.

### Data-class shape — three coupled blocks

For `Data-` subclasses the three data-page bindings travel together:

| String binding | Embedded snapshot | Notes |
|----------------|-------------------|-------|
| `pyListDataPage` | `pyListDataPageInfo` | List page; no `pyDOParamList`, no `pyIsAlternateKeyStorage` |
| `pyLookUpDataPage` | `pyLookUpDataPageInfo` | Sets `pyIsAlternateKeyStorage="true"`; carries `pyDOParamList` (typically a single `pyGUID` STRING IN parameter) |
| `pySavableDataPage` | `pySavableDataPageInfo` | Same shape as the lookup info page; usually points to the same data page name as `pyLookUpDataPage` |

If you set the string binding, also send the corresponding `*Info` snapshot
— Pega's data-object tooling expects both halves. Ensure the named data
pages already exist in the application; bindings to missing pages save via
the API but fail when the data-object UI tries to open them.

### `pyDataTypeLocalActions[].pxObjClass` is action-specific

Each entry in `pyDataTypeLocalActions` uses an action-specific embed class
(e.g., `Embed-Pega-DataTypeAction-UpdateDetails` for the OOTB Edit action).
Unlike most embed classes, this is not a single auto-fill default — pick the
subclass that matches the action type. Inspect a sibling data class with
`get-rule` to see what actions and subclasses the application uses.

## See also

- `Primary Fields reference` — what `pyPrimaryFields` is and what it drives.
- `view-update-workflow` — how to update the `pyPrimaryFields` view after
  changing class metadata.
