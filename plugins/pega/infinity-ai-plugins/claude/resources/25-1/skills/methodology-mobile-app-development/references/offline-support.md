---
name: mobile-app-offline-support
description: Load when designing or enabling offline behavior for a Mobile channel in Pega Infinity versions earlier than 26.
---

## Offline design

Offline is opt-in. Create an eligibility record for every mobile Assignment and classify
its fields, validations, attachments, data pages, integrations, and automations as
supported offline, online-only, or requiring redesign.

- Enable only eligible Case Types in the channel's offline configuration.
- Package only the reference data required by those journeys and bound its volume.
- Define locking, synchronization order, conflict ownership, and recovery behavior.
- Treat network integrations and unsupported actions as online-only.
- Test install and first sync, disconnect, create/update, validation, attachments,
  reconnect, conflict, failed synchronization, retry, and sign-out with pending work.
- Never claim that a screen rendering offline proves its complete journey works offline.

## Flow processing offline

Only specific flow shapes execute on the device: Assignment shapes, Question shapes,
and Decision shapes evaluated with a Decision Table, Decision Tree, When Rule, or a
simple Boolean expression. A Decision shape can also be the first shape of a screen
flow. Utility shapes are supported only at the very end of a screen flow — they do not
run offline and instead activate after the device reconnects and synchronizes. Flow
processing stops at the first unsupported shape (Split, Router, a Subprocess with
unsupported logic, an integration-calling Utility mid-flow, etc.) and the Assignment
remains pending until the device reconnects. `pyWorkParty` is not available offline —
do not reference it in offline-eligible flow logic.

## Rule support offline

- **Decision Tables / Decision Trees:** supported when referenced from a Decision
  shape or a When Rule; verify every condition value is available on the device
  (cached Data Page or clipboard data), not fetched live.
- **When Rules:** supported for simple property comparisons and Boolean expressions
  backed by data already on the device; do not gate offline logic on a When Rule that
  calls an activity or a remote data source.
- **Validate Rules:** supported for a limited set of edit-validate style checks
  against clipboard data; do not rely on a Validate Rule that performs a lookup or
  connector call for offline-eligible Assignments.
- **Data Transforms:** supported for clipboard-only transforms (copy, set, arithmetic,
  string operations); a Data Transform that calls an activity, connector, or Data Page
  with a network source does not run offline.
- **Function rules:** only functions with a JavaScript equivalent run offline, drawn
  from the String, DateTime, Math, Sort, ExpressionEvaluators, and Utilities function
  libraries. A custom Java-only Function rule silently fails to execute offline — do
  not use one in offline-eligible logic.

## Data synchronization

The device queues user actions (creates, updates, attachments) in an Action Queue and
replays them against the server in order. A **full sync** runs on first launch (no
prepackaged Access Group data) or after local storage is cleared; a **delta sync** runs
after login, after each queued action, and periodically (about every 5 minutes while
online, or every minute if the prior sync could not reach the server). The server
allows roughly 5 minutes to prepare a sync response before timing out — treat a
timeout as expected behavior and retry, not as a defect. Route Case status conflicts
detected during sync to a dedicated reconciliation Work Queue rather than silently
overwriting either side.

## Large Data Pages

Declare a Data Page "large" (and subject to delta-only sync) once its payload exceeds
roughly 1MB as a best practice, and always once it exceeds the 5MB platform minimum.
Prefer a report definition as the source; connector, activity, and Data Transform
sources also work but require a custom JavaScript populator function to shape the data
for the device. Exclude Data Pages that a journey does not need from the offline
package instead of syncing them unconditionally.

## Caching

Caching common rules (and optionally node-scope Data Pages) speeds up first launch,
and can be bundled directly into the installable app package for an even faster first
run. Bundling node-scope Data Pages into the app package can expose their data to
anyone who obtains the installable file — do not bundle sensitive reference data this
way. Avoid enabling caching while actively developing the offline model: every rule or
Data Page change forces a full sync for every device, which is disruptive during
iteration. Circumstanced rules and Data Pages are risky to cache — only the
circumstance in effect when the cache was built is packaged, so other circumstances
can resolve incorrectly on the device.
