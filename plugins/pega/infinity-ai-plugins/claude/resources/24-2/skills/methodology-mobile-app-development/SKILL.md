---
name: methodology-mobile-app-development
description: Load when someone wants to make an existing Pega application available on mobile devices in Pega Infinity versions earlier than 26. Provides self-contained, read-only guidance for planning, configuring, previewing, building, securing, distributing, and maintaining an installable app.
---

## Scope and boundaries

This runtime covers Pega Infinity versions earlier than 26. The user configures the
application in Pega App Studio; this skill is advisory only.

- Answer mobile-app questions only. For unrelated requests, state this scope and stop.
- Never create, update, copy, or delete a Pega rule or application artifact. Never
  call a mutating MCP tool, emit a rule payload, or redirect to a rule-authoring skill.
- Use this bundled content as the primary source. Do not open a browser or search
  external documentation unless the user asks for current documentation or a
  time-sensitive operating-system, app-store, or support fact must be verified.
- Never expose credentials, tokens, API keys, private keys, certificate passwords,
  or other secrets found in Pega rules or logs.
- Establish the Pega platform release with read-only MCP discovery when available.
  An application version such as `01.01.01` is not the platform release. If the
  release cannot be established, ask the user before giving version-specific steps.
  For Pega Infinity 26.1 or later, use the matching release runtime.
- Say **Mobile channel** and **mobile app** to the user. Do not make them choose an
  internal architecture label. Assume they want an installable app unless they ask
  specifically for browser-only access.

## Start with the existing application

Use read-only MCP tools to identify the active application and inspect its Case Types,
personas, and existing Mobile channels. Prefer reusing a suitable channel; do not
recommend a duplicate before checking. Clearly distinguish observed configuration
from assumptions.

If this is the user's first Pega application, load
`methodology-blueprint-delivered/references/authoring-foundation`. Confirm that the
imported application matches its Blueprint Preview, its import branch is merged into
an approved baseline, and one Case works end to end in the web channel. Fix baseline
gaps before diagnosing them through mobile.

Then load
`methodology-mobile-app-development/references/planning-and-prerequisites`.
For a first app, load
`methodology-mobile-app-development/references/first-mobile-app` and walk the user
through one device Preview journey. Load specialist references as each lifecycle phase
is reached.

## Mobile app model

A Mobile channel packages the application for installation on supported iOS or Android
devices. It can support device features, push notifications, and explicitly configured
offline work. It requires application configuration, security decisions, stable package
identity, signing, physical-device testing, and a managed distribution process.

| Concern | Mobile app guidance |
|---|---|
| Delivery | Signed iOS or Android package |
| UI | Mobile channel content backed by the application's Cases and Views |
| Installation | Direct enterprise delivery, EMM, or approved app store |
| Access | Channel assignment and normal Pega authorization both apply |
| Offline | Enable only supported Cases and data; never assume parity |
| Updates | Rebuild and distribute with stable package and signing identity |

## Answering workflow

1. Establish the platform release and application UI architecture. Never infer the
   Pega release from the application rule version.
2. Inspect the active application, Case Types, personas, and existing Mobile channel
   with read-only MCP calls when available. Clearly label assumptions.
3. Start with one persona and one end-to-end Case journey; identify target devices,
   connectivity, accessibility, security, ownership, and delivery needs.
4. Give click-by-click actions in Pega App Studio and let the user make every change.
5. Preview on a physical device before adding optional offline, push, custom branding,
   or extension features.
6. Explain requirements, defaults, limitations, and verification evidence at each
   phase. Verify changing store and OS requirements with the release owner.

## Lifecycle

| Phase | Completion evidence |
|---|---|
| Plan | One journey, persona, device matrix, delivery owner, and acceptance checks are recorded |
| Configure | Intended users can reach supported work in the Mobile channel |
| Preview | A real device completes the selected journey in Pega Mobile Preview |
| Secure | Authentication, authorization, app lock, and token policies pass review |
| Build | Signed package installs on a representative physical device |
| Distribute | Pilot approval, rollout owner, support, and rollback are ready |
| Maintain | Upgrade and regression checks pass with stable package identity |
| Troubleshoot | Root cause, corrective action, and regression evidence are recorded |

## References

| Skill | Label | When to load |
|---|---|---|
| `methodology-mobile-app-development/references/planning-and-prerequisites` | mobile-app-planning-and-prerequisites | Plan the first mobile journey, devices, ownership, and readiness |
| `methodology-mobile-app-development/references/first-mobile-app` | create-first-mobile-app | Walk through the first Mobile channel and device Preview |
| `methodology-mobile-app-development/references/configure-and-preview` | configure-and-preview-mobile-app | Configure content, navigation, presentation, and Preview |
| `methodology-mobile-app-development/references/offline-support` | mobile-app-offline-support | Configure and test offline Case work and synchronization |
| `methodology-mobile-app-development/references/security` | secure-mobile-app | Select authentication, access, locks, and token policy |
| `methodology-mobile-app-development/references/build-and-sign` | build-and-sign-mobile-app | Prepare certificates and generate signed iOS or Android packages |
| `methodology-mobile-app-development/references/distribution` | distribute-mobile-app | Distribute packages directly, through stores, or through EMM |
| `methodology-mobile-app-development/references/updates-and-maintenance` | update-and-maintain-mobile-app | Update, upgrade, and maintain an installed mobile app |
| `methodology-mobile-app-development/references/troubleshooting` | troubleshoot-mobile-app | Diagnose access, TLS, device, build, and synchronization failures |

## Completion checks

A complete answer follows the correct release guidance, stays advisory-only, covers
the requested lifecycle phase, names material limitations, and includes a
representative physical-device check. Do not require external documentation for
routine guidance already present in these references.