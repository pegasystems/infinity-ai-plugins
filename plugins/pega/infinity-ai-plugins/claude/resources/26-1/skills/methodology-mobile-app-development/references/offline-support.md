---
name: mobile-app-offline-support
description: Load when enabling or evaluating offline Case work for a Pega Infinity 26.1+ Constellation Mobile channel. Covers supported work, setup, synchronization, conflicts, and acceptance tests.
---

## Decide whether offline is required

Keep the first app online-only unless a real work journey must continue without
connectivity. Offline support is configured per Mobile channel and Case Type; it is
not automatic parity with the web app. Confirm the target journey, data sensitivity,
device storage policy, and conflict owner before enabling it. This guide applies to
Constellation mobile apps; check compatibility separately for Traditional UI and UI
Kit apps.

## Enable supported Case Types

1. In Infinity Studio, open **Channels > Configure > Current Channels > [Mobile
   channel]**.
2. Open **Configuration > Offline** and enable offline support.
3. Add only the Case Types required for the approved offline journey.
4. Resolve any Case Type warning. When the platform requires it, enable the **Allow
   multiple users** Case locking strategy. This is optimistic locking, not a guarantee
   against conflicts.
5. Save the channel and Case Type changes, then rebuild and test the app. Confirm the
   configured Case Types and data synchronize to the device before testing disconnection.

Offline work can collect and edit supported Case information, preserve drafts, and
submit supported Assignments for synchronization. Supported attachments and fields
depend on the View and field type. Data Pages are offline read-only data; platform
packaging is inferred from their reports and data sources and has specific constraints.
Do not promise arbitrary data-page refresh or online integrations while disconnected.

## Check Case logic before promising support

Review every Case Type's Stages, Steps, Actions, Views, validation, Data Pages, and
integrations against offline support. Pega supports only a subset of Case processing
offline. Examples of unsupported or network-dependent behavior include:

- Decision, Utility, and Subprocess Assignments.
- Multi-Step Forms and Questionnaire Case Types.
- Actions that require a live server, unsupported validation or data logic, and
  integrations that are not available on the device.
- Constellation mobile Actions such as Assign to robot queue, Form refresh, Persist
  Case, Run in background, Save Data Page, Search duplicate Cases, Send via DocuSign,
  and Wait.

Some field-level validation can run offline, but not every server validation pattern
does. Test required fields, conditional and cross-field validation, and submit errors
with no network. Do not infer offline support from the fact that a form works online.

If a disconnected user reaches a step that requires a server, the local Assignment can
remain pending synchronization and Case progression can pause until the device
reconnects. Show users what work is saved locally and what still requires a connection.

## Supported fields and validation

Offline-enabled optional Actions support these field types: Attachment, Checkbox,
Currency, Date, DateTime, Decimal, Dropdown, Email, Integer, Location, Percentage,
Phone, RadioButtons, RichText, TextInput, TextArea, Time, URL, and UserReference, plus
these complex types: Case reference, Data reference (no many-to-many source), Embedded
Data, Query, and User reference. Confirm every field on the target View is one of
these before promising offline support for it. Custom Constellation DX components can
also work offline once their assets synchronize to the device, but the component's
author is responsible for that behavior; do not assume an arbitrary custom component
works offline without verifying it.

Validate Rules run offline only in limited scenarios. Supported: required-field and
field-value comparisons, AND/OR multi-condition validation, and workflow-level
Validate Rules that use the `[expression evaluates to true]` Function with String
library functions such as `contains`, `startsWith`, `endsWith`,
`pxIsInListOfValues`, and `pxIsNotInListOfValues`. Not supported offline: When Rules,
validation tied to a Page or Page List property, additional Validation rows beyond the
first, the Required checkbox on a Validation Condition, and any other function outside
the supported list — these force the app to try the network and skip validation while
disconnected. Test every configured validation with the device offline before release.

## Data Pages offline

Data Pages are read-only offline data; users never edit them directly while
disconnected. A Data Page qualifies for offline use only when its data is defined as a
Case Type and, if parameterized, its parameters are not required and its source is a
report definition that passes the current parameter page. Report definition filters
must reference parameters as `Param.<name>`, avoid Calculation Builder functions other
than lowercase, avoid column functions and symbolic date/time filters, and avoid
filtering by anything other than a parameter reference or a literal constant.

Pega Platform — not the application author — decides the resulting offline packaging
(Class Level, Data Page Level, or a parameter-specific snapshot) during
synchronization, based on how well the Data Page and its report definition meet these
requirements. A Data Page that does not qualify still appears in the app but generates
a server error while offline. Parameterized Data Pages that depended on custom
JavaScript populators in an older Traditional UI app are the most common redesign
candidates; do not assume they carry over to Constellation unchanged.

## Control data volume before enabling offline

1. In Infinity Studio, open **Channels > Configure > Current Channels > [Mobile
   channel] > Configuration > Offline** and confirm which Case Types are enabled.
2. For each enabled Case Type, list the Data Pages used by its offline Views, Actions,
   and supported processing. Keep only data needed to complete the approved journey.
3. Open each Data Page from the application's data-object or rule explorer and review
   its source, report definition, parameters, and expected result size. If the relevant
   rule is not available in the current Studio view, ask an authorized application
   author to inspect it; do not guess a different editor path.
4. Avoid packaging broad, unused, or sensitive reference data. For a Data Page whose
   size makes synchronization impractical, check the target release's supported
   large-data and incremental-sync behavior with the platform owner before changing
   its configuration. Do not carry over size thresholds or packaging assumptions from
   pre-26 guidance.
5. Build and install the app, complete the first synchronization, then repeat on
   representative data volumes and a reconnect. Record sync status and elapsed time;
   investigate errors or unexpectedly large payloads before enabling more Case Types.

Use **Channels > Configure > Current Channels > [Mobile channel] > Configuration >
Offline** to verify the saved channel setting. Data Page rules and their sources are reviewed separately;
the Mobile channel screen does not itself prove that a Data Page is eligible or small
enough to package. If the Data Page editor or large-data options are unclear in the
target release, use the official documentation fallback in the parent skill instead
of guessing the path or setting.

## Custom offline JavaScript

Use platform-provided offline JavaScript APIs only when a specific requirement cannot
be met by supported Case, View, Action, validation, and Data Page configuration. Do not
assume a server-side API or a Traditional UI offline API is available to a Constellation
component. Confirm API availability for the target release and component type before
designing around it. The component author owns asset synchronization and offline
behavior; test the component after a fresh sync, with the device disconnected, and
after reconnecting. For API names, signatures, or limits not stated here, use the
official documentation fallback in the parent skill rather than guessing.

## Synchronization and conflicts

Data synchronizes when connectivity returns, when the app starts or comes to the
foreground, when a user performs an online-only action, when a landing page is pulled
to refresh, and periodically (about every five minutes). The app shows current,
waiting, synchronizing, completed, or error status. A login can complete while initial
synchronization continues. If the server takes about five minutes or more to prepare
data for a device, synchronization times out; this is expected behavior, not a defect,
and the app retries. A sync failure raises a native OS notification (sound,
vibration, or a pop-up, depending on device settings); the failure notification clears
automatically once synchronization completes.

Design so that only one user edits a specific Assignment at a time. Parent/child Case
design can reduce overlapping work, but does not resolve simultaneous edits to the same
Case. When online and offline users both edit a Case, online/server data takes
priority, even if the offline edit happened later. There is no timestamp-based or
field-level merge; offline edits can be overwritten or rejected without a clear notice
to the offline user.

Test at least these cases before release:

1. Start online, synchronize, disconnect, edit and submit a supported Assignment,
   reconnect, and confirm Case data and Assignment progress on both device and server.
2. Disconnect during data entry, close/reopen the app, and confirm the local draft and
   sync status.
3. While the device is offline, edit the same Case in the web app; reconnect and verify
   the documented server-wins outcome and user recovery path.
4. Repeat with parent/child Cases, attachment changes, unavailable integrations, and
   interrupted synchronization where relevant.
5. Confirm a sync error can be diagnosed and recovered without duplicating a Case or
   silently losing user work.

After a platform update, complete a full synchronization and regression test. Never
claim conflict-free offline editing or automatic field merging.