---
name: rules-rule-notification
description: Schema and authoring guide for Pega notification rules (Rule-Notification), including the value-conditional recipient model (CURRENTPAGE / DATAPAGE / PAGELIST), the three delivery channels (Email, Gadget, MobilePush), data-page parameter mapping, message parameters, and side-by-side examples for each recipient context.
---

**Prerequisite:** Load `methodology-rule-authoring` first

## Examples

| Skill | Description |
|------|-------------|
| `Stub Notification` | `Stub Notification` — minimal notification, current-page recipient, gadget channel only. Smallest valid create payload. |
| `Send Status Update` | `Send Status Update` — auto-generated Send Notification step pattern, all three channels, case followers recipient, four linked rules sharing the same base name. |
| `Notify Work Parties` | `Notify Work Parties` — recipients from an embedded page list on the work object, Email and Gadget channels, both operator ID and raw email address mappings, message parameter. |
| `Case Status Details` | `Case Status Details` — all three channels each with their own independent parameter map (message body, email subject, push message), case followers recipient. |

> **Author-minimal examples:** the example payloads in this skill show only the fields the author typically supplies. Auto-filled / auto-derived fields such as `pxObjClass`, `pyCategory`, and channel scaffolding fields are omitted unless they carry author signal.

## Authoring notes

### Required identity fields

`pyPurpose` is the primary key the author must supply (PascalCase or camelCase, no spaces). `pyRuleName` is auto-derived from `pyPurpose` by the server — never set it in payloads.

Every entry in `pzRecipients[]` (or legacy `pzRecipientDataPages[]`) resolves within a recipient context. The fields the author needs to supply on that entry depend on the value:

| `pyRecipientContext` | Meaning | Additional required fields | Optional fields |
|---|---|---|---|
| `CURRENTPAGE` | Use the running page as the recipient page | `pyRecipientProperties` (≥1 entry) | — |
| `DATAPAGE` | Fetch recipients from a data page | `pyRecipientDataPage`, `pyDPClass`, `pyRecipientProperties` (≥1 entry) | `pzRecipientDataPageParameters`, `pzRuleParameters` |
| `PAGELIST` | Iterate an embedded page list / page group | `pyRecipientContextPage`, `pyRecipientProperties` (≥1 entry) | `pyDPClass`, `pzRecipientDataPageParameters` |

The schema enforces this with `if`/`then` branches on the recipient `$def`. When `pyRecipientContext` is omitted on legacy rules, treat the default as `CURRENTPAGE`.

### `pyRecipientProperties` is always required

Every recipient entry — regardless of context — needs at least one `pyRecipientProperties` mapping. Each entry picks an identifier kind and the property reference that holds the value:

| `pyNotificationRecipientType` | Typical `pyNotificationRecipientProperty` | Drives |
|---|---|---|
| `Operator` | `.pyUserIdentifier`, `.pyUser`, `.pyOperatorID` | Gadget (in-app), MobilePush, Email-by-operator |
| `Email` | `.pyEmail`, `.pyEmailAddress` | Email-by-address (no operator lookup) |

Rules that need both in-app and raw-email delivery declare two `pyRecipientProperties` entries.

### Channels are a page group keyed by subscript

`pyChannelsList` is an object with up to three subscripts: `Email`, `Gadget`, `MobilePush`. Each has a different `pxObjClass`:

| Channel | `pxObjClass` | Body source | Content fields to supply |
|---|---|---|---|
| `Email` | `Embed-NotificationChannel-Email` | `pyCorrespondence` (Rule-Obj-Corr) | `pyCorrespondence`, `pySubject` |
| `Gadget` | `Embed-NotificationChannel-Gadget` | `pyDisplayStream` (section rule) | — |
| `MobilePush` | `Embed-NotificationChannel-MobilePush` | `pyPushMessage` (Rule-Obj-FieldValue) | `pyPushMessage` |

All channels also require `pxObjClass`, `pyChannelName`, and `pyEnableChannel`. If a channel entry is present and `pyEnableChannel` is omitted, Infinity defaults it to enabled. For channels you do not want active, include that channel entry and explicitly set `pyEnableChannel: "false"` (see [Auto-filled fields](#auto-filled-fields-omit-from-payloads-unless-overriding)).

At least one channel should be enabled. Auto-generated rules from the App Studio Send Notification step always create all three with `pxChannelRank` Gadget=1, MobilePush=2, Email=3.

### `pzRecipients` vs legacy `pzRecipientDataPages`

Both arrays have **identical item shapes** (the `RecipientDef` `$def`). Pega 8.4+ and App Studio auto-generated rules use `pzRecipients`. Older Pega-shipped notifications (Pega-Social, Pega-ProcessEngine) populate `pzRecipientDataPages`. For new rules, prefer `pzRecipients`. Do not populate both.

### Data page parameter mapping

`pzRecipientDataPageParameters` is a free-form map of *parameter name → source expression*:

```json
"pzRecipientDataPageParameters": {
  "WorkObjectID": ".pzInsKey",
  "PostID": "PostMessage.pzInsKey",
  "ReplyTo": "PostMessage.pyReplyTo"
}
```

The keys must match the parameters declared on the underlying data page (or the named page in `PAGELIST` mode). `pzRuleParameters[]` carries the metadata (name, type, required flag) for those parameters; the recipient model on the form derives the metadata from the data page rule.

### Message parameters

Top-level `pzMessageParameters` maps the parameter tokens used in the message stream / correspondence to source expressions on the running page. `pzOrderedMessageParams` is the value list controlling the binding order. The Email channel has its own subject parameter map (`pzCorrSubjectParameters` + `pzOrderedEmailSubjectParams`) and the MobilePush channel has its own push message map (`pzPushMessageParameters` + `pzOrderedPushMessageParams`) and optional push title map (`pzPushTitleParameters` + `pzOrderedPushTitleParams`).

Each channel's parameter map is **independent**: every parameter declared on the referenced rule (FieldValue body, Email subject, MobilePush push message) MUST appear as a key in that channel's map with a valid source expression, and MUST be listed in the corresponding ordered array in the same order. A parameter shared across channels must be mapped separately in each map. Missing or mis-ordered parameters fail at runtime token resolution.

### Server-validation gotchas

| Field | Constraint |
|---|---|
| `pyCategory` | Default `"Default"`. Observed values: `Default`, `AssignedToMe`, `Mention`. |
| `pyMessage` | Must resolve to an existing Rule-Obj-FieldValue (with `pyFieldName = pyNotificationMessage`) on the applies-to class hierarchy. There is no free-text fallback; any value that does not resolve to an indexed FieldValue causes save failure. Safe OOTB value: `pyAddPulsePost`. |
| `pyRecipientContextPage` (PAGELIST) | Must resolve to a real PageList/PageGroup property on the applies-to class. Safe Work- value: `.pyWorkParty`. Arbitrary names like `.pyParticipantList` are rejected at create time. |
| `pyRuleSet` / `pyRuleSetVersion` | REQUIRED for v1 create. Auto-derived by v2 from ChangeRequest branch context. For branch rulesets, version is always `01-01-01`. |

### Auto-filled fields (omit from payloads unless overriding)

The schema marks auto-derived/auto-defaulted properties with `x-pega-autoFill` / `x-pega-autoDerived`. The examples in this skill omit them unless they carry author signal. `pyEnableChannel` is the main exception: omit it only when you want the channel on by default; set it explicitly to `"false"` to turn a channel off. Common auto-filled fields:
`pyCategory`, `pxChannelRank`, `pxSubscript`, `pyChannelName`, `pyEnableChannel`, `pyDisplayStream` (`"pyShowNotificationDefault"`; grouped/child notifications use `"ShowChildNotificationDefault"`; member-join notifications use `"pyShowNotificationForMemberJoin"`), `pyDefaultUserPreference` blocks, `pyShowInUserPreference`, `pyDoNotShowInPreference`, `pyMuteNotification`, `pyRuleAvailable`, `pyMethodStatus`, `pyBaseRule`, `pySortDateCircumWithinRSMajor`, `pyRuleName` (derived from `pyPurpose` — never set by the author).

### `pyShowInUserPreference` and `pyDoNotShowInPreference`

Auto-generated rules set `pyShowInUserPreference: "false"` and `pyDoNotShowInPreference: "true"` to keep the notification off the user-preference UI. Hand-authored Pega-shipped rules typically leave both unset (so the notification appears in preferences) unless they are workflow-internal.

### `pyAdvancedParameters` for context tokens

Use this name/value list to pass page references into the notification engine that are not mapped through the recipient data page or message parameters. Typical pattern: `PulseKey -> PostMessage.pzInsKey`, `AttachmentKey -> PostMessage.pyAttachmentKeys`. Pair with `pyPagesAndClasses` to declare the named pages.

### MobilePush push title parameters

The MobilePush channel supports a separate title (displayed above the push body) via `pyPushTitle` — a reference to a Rule-Obj-FieldValue rule. When `pyPushTitle` is set, its parameters are mapped independently via `pzPushTitleParameters` and `pzOrderedPushTitleParams`, following the same pattern as `pzPushMessageParameters`. This is observed on Social-style notifications (e.g. `pyAddUserMentionedPost` on `@baseclass`). Most auto-generated notifications do not set `pyPushTitle`.

### Cross-rule dependencies (the four-rule bundle)

Every Notification step in a flow is backed by four rules that must be in sync:

| Rule Type | Naming Convention | Referenced By |
|---|---|---|
| `Rule-Notification` | `{Name}` | Flow Utility shape (`pzNotifyWrapper`) |
| `Rule-Obj-Corr` | `{Name} Email` | `pyChannelsList.Email.pyCorrespondence` (base name only) |
| `Rule-Obj-FieldValue` | `pyNotificationMessage / {Name}` | `pyMessage`, `pyChannelsList.MobilePush.pyPushMessage` |
| Flow Utility shape | N/A | `pyCallParams.NotificationName = {Name}` |

Key invariant: `pyCorrespondence` on the Email channel holds the **base name** (e.g. `"NotifyReviewers_0"`), while the actual Rule-Obj-Corr rule is named `"{Name} Email"`. When a single FieldValue is used for both body and push, `pyPurpose` = `pyMessage` = `pyChannelsList.MobilePush.pyPushMessage` all carry that same base name.

### Common Variations

- **Gadget-only notification:** Infinity treats channels as enabled by default, so explicitly set `pyEnableChannel: "false"` on `MobilePush` and `Email` in `pyChannelsList`. The FieldValue rule is still required. The Corr rule can be omitted if Email is disabled.
- **Additional email recipient:** Add a second entry to `pzRecipients` with `pyRecipientContext: "CURRENTPAGE"`, `pyRecipientTypeInAppStudio: "EmailID"`, and `pyNotificationRecipientProperty: "user@example.com"`.
- **Notifying a specific operator instead of followers:** Change `pyRecipientDataPage` to a data page that returns the target operator, or use `pyRecipientContext: "CURRENTPAGE"` with a property reference to the operator ID.

### Auto-generated Send Notification bundle

App Studio auto-generates all four artifacts aligned on the same base name (e.g. `SendStatusUpdate_0`). For these rules:

- `pyPurpose`, `pyMessage`, `pyChannelsList.MobilePush.pyPushMessage`, `pyChannelsList.Email.pyCorrespondence`, and `pyChannelsList.Email.pySubject` all carry the same base name.
- `pzIsAutoGenerated: "true"` marks the rule as App Studio-generated.
- All three channels are created (see channel rank order in the Channels section above).
- The recipient row uses `pyRecipientContext: "DATAPAGE"` against `D_pxGetCaseFollowers` with `pyRecipientTypeInAppStudio: "Followers"` and one `Operator` property pointing at `.pyUserIdentifier`.
- If the generated FieldValue / Corr backing rules declare parameters, map them via `pzMessageParameters` / `pzOrderedMessageParams` and the channel-specific parameter lists. Simple generated messages with no parameters omit those fields entirely.
