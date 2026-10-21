---
name: test-and-release-mobile-app
description: Load when testing or approving an installable Pega Infinity 26.1+ mobile app for a pilot or production release. Covers device acceptance, offline/security checks, and release evidence.
---

## Test the built app

Pega Mobile Preview is for development only. Test the signed installation package on
representative physical devices before approving distribution. Desktop emulators can
help during development but do not replace device checks.

| Test area | Minimum evidence |
|---|---|
| Identity/access | Each intended persona signs in; an unauthorized persona is denied |
| Journey | Create, advance, save, find, reopen, and complete the selected Case |
| Layout | Supported phones/tablets, portrait/landscape, text enlargement, keyboard, attachments, and validation |
| Security | Authentication/MFA, app lock, timeout, sign-out, revocation, and sensitive-data handling |
| Connectivity | Loss/recovery, retry, interrupted submit, duplicate-submit behavior, and reconnect |
| Offline, if enabled | Supported Case Types, fields, Assignments, attachments, Data Pages, sync indicators, and conflict cases |
| Device capabilities | Allow, deny, revoke, and unsupported path for each enabled capability |
| Upgrade | Install over the previous release with the same package identity and signing key |
| Regression | Representative personas, OS versions, integrations, and Case journeys |

Do not approve a release with unresolved data-loss, authorization, signing, or
installation failures. Document unsupported Actions, network-required steps, known
offline conflicts, and untested capabilities.

## Release evidence and pilot

Use the approved pilot path (direct package, EMM, Google Play, or Apple App Store).
Record the application and Pega platform versions, environment/host, channel name,
package identifier, package/build version, signing-certificate owner, OS/device matrix,
test operators, Case IDs, timestamp, results, known limitations, support route, rollout
owner, and rollback package.

Before production, verify current Apple/Google submission and target-OS requirements
with the release owner. Store review, API targets, certificate validity, and supported
OS levels are time-sensitive; do not guess them. Load
`methodology-mobile-app-development/references/distribution` for the selected delivery
path and `methodology-mobile-app-development/references/updates-and-maintenance` for
ongoing updates.