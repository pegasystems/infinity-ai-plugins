---
name: mobile-app-planning-and-prerequisites
description: Load before configuring a Pega Infinity 26.1+ Mobile channel. Covers application readiness, journey scope, device support, build prerequisites, security ownership, and delivery decisions.
---

## Confirm the starting point

- Confirm the Pega platform release is 26.1 or later. The application rule's version
  is not the platform release.
- Identify the active application, its UI architecture, target branch/ruleset, and
  any existing Mobile channel. Reuse a suitable channel instead of creating a
  duplicate.
- Prefer Constellation for new or reworked applications. An existing Traditional UI
  or UI Kit app requires a compatibility assessment, not automatic migration; do not
  apply Constellation-only features to it.
- Prove one selected Case can be created and completed in the standard web experience
  before diagnosing that journey through mobile.

## Readiness checklist

Record one first journey and these decisions before opening the Mobile channel:

| Area | Required decision |
|---|---|
| Journey | Persona, Case Type, landing page, Assignment, create/update/read-only behavior, and success outcome |
| Devices | iOS/Android, phone/tablet, orientation, physical test devices, and supported OS/client baseline |
| Connectivity | Online-only dependencies, offline use cases, expected network loss, retry, and recovery behavior |
| Experience | Navigation, responsive Views, accessibility, localization, attachments, and permission-denied behavior |
| Security | Authentication service, authorization, app lock, token/session policy, and data sensitivity |
| Delivery | Preview, internal pilot, EMM, direct package, Google Play, or Apple App Store |
| Ownership | App Studio author, platform/build administrator, signing owner, store/EMM owner, support, and rollback owner |
| Environment | Trusted HTTPS endpoint, build-service readiness, firewall ownership, branch/ruleset, and target host |

Use current release-owner guidance for OS, Mobile Client, and store target requirements;
these change more often than the application workflow.

## Prepare the application and authoring environment

- Compare a Blueprint-imported app with its agreed Preview and merge the import branch
  into the approved baseline before mobile work.
- Use one unlocked application ruleset for mobile changes. Use branches when work
  spans rulesets; keep shared rulesets locked. A Mobile channel is bound to the
  application version in which it was created, so do not place it in a shared
  ruleset.
- Confirm the unlocked application ruleset is at the top of the application stack.
- Confirm an administrator can configure Mobile Build Service and an approved owner
  can provide Android/iOS signing assets. Never request credentials, keys, certificate
  passwords, or provisioning files in chat.
- Set up Apple/Google developer accounts only when the selected distribution path
  requires them. Set up Firebase only when Android push notifications are in scope.

## Keep the first milestone small

For the first working device app, choose one persona, one landing page, and one Case
Type; keep it online-only; defer push, custom native modules, and custom branding until
the core journey works. Add offline support only after checking supported Actions,
fields, data, and conflict behavior in
`methodology-mobile-app-development/references/offline-support`.