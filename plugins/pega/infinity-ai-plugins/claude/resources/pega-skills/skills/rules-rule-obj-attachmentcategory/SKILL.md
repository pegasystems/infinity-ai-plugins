---
name: rules-rule-obj-attachmentcategory
description: Schema and authoring guide for Pega Attachment Category rules (Rule-Obj-AttachmentCategory), including attachment type flags, category naming, and attachment-level security configuration
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|-------|-------------|
| `Stub Attachment Category` | Minimal attachment category — smallest valid create payload with no attachment type flags |
| `File-Only Attachment Category` | File-only attachment category — explicitly disables other default-enabled types |
| `Work Privilege Security` | Attachment category that grants create access with an existing Work- attachment privilege |
| `Always View Security` | Attachment category that uses the broad `Always` when rule to grant view access |

## Authoring Notes

### Identity

`pyCategoryName` is the identity key. `pyRuleName` is auto-derived from it — supply `pyCategoryName`, omit `pyRuleName`.

### Class scoping

`pyClassName` must reference an existing class. Creation fails if the class does not exist.

Define the category at the broadest class that makes semantic sense:

| `pyClassName` | Scope | When to use |
|---------------|-------|-------------|
| `Work-` | All work objects | Shared document types (e.g., `Supporting Document`) used by every case type |
| `MyOrg-MyApp-Work-` | One application's work objects | Application-wide categories not shared across applications |
| `MyOrg-MyApp-Work-MyCase` | One case type | Categories specific to a single case type (e.g., `Claim Photo`) |
| `Data-` | All data objects | Categories scoped to data-class attachments |

Pega resolves attachment categories by class hierarchy — the most specific match wins. Do not define the same category name on both a parent and child class unless intentionally overriding.

### Attachment type flags

Six boolean flags control which attachment kinds the category allows:

`pyAvailableForFile`, `pyAvailableForUrl`, `pyAvailableForNote`, `pyAvailableForCorr`, `pyAvailableForScreenshot`, `pyAvailableForScannedDocument`

The server enables all except `pyAvailableForCorr` by default. Only include flags that differ from the defaults. All are Pega text booleans — use `"true"` / `"false"`, not JSON booleans.

### Attachment-level security

Set `pyEnableAttachmentLevelSecurity` to `"true"` to restrict operations per privilege or when condition. Then configure `pyActionPrivilegeList` and/or `pyActionWhensList`.

**References must already exist.** The rule does not create privileges or when rules on the fly:
- Every `pyActionPrivilegeList[].pyPrivilegeName` must reference an existing `Rule-Access-Privilege`
- Every `pyActionWhensList[].pyWhenName` must reference an existing `Rule-Obj-When` resolvable from the category's `pyClassName` and ruleset prerequisites

Each security entry must grant at least one permission (`pyAllow*` = `"true"`).

**Known safe references:**

| Need | Use |
|------|-----|
| Create privilege | `ActionAddAttachments` (Work-) |
| Edit privilege | `ActionEditAttachment` (Work-) |
| Delete-all privilege | `DeleteAnyAttachment` (Work-) |
| Delete-own privilege | `DeleteOnlyOwnAttachments` (Work-) |
| Unconditional when | `Always` (@baseclass) |

Verify privilege availability in the target application before using. Do not invent when rule names — only use names confirmed to resolve for the target class.

### Update behavior

Scalar fields (`pyCategoryName`, `pyEnableAttachmentLevelSecurity`, attachment type flags) are replaced individually — send only the fields you want to change.

`pyActionPrivilegeList` and `pyActionWhensList` are PageList arrays and are **replaced wholesale** on update. Always `get-rule(detail="full")` first and re-send the complete array including entries you want to keep. A partial array silently drops omitted entries.

Attachment type flags cannot be cleared by omission. To disable a flag, explicitly send `"false"`. Omitting it leaves the current value unchanged.
