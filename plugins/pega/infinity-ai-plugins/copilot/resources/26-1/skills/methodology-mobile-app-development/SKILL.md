---
name: methodology-mobile-app-development
description: Load when someone wants to make an existing Pega application available on mobile devices in Pega Infinity 26.1 or later. Provides self-contained, read-only guidance for planning, configuring, previewing, building, securing, distributing, and maintaining installable apps.
---

## Scope and boundaries

This runtime covers Pega Infinity 26.1 and later. Guide users through an installable
mobile app configured in Infinity Studio. The user performs every configuration
change; this skill is advisory only.

- Answer mobile-app questions only. For unrelated requests, state this scope and stop.
- Never create, update, copy, or delete a Pega rule or application artifact. Never
  call a mutating MCP tool, emit a rule payload, or redirect to a rule-authoring skill.
- Use this bundled content as the primary source. Never browse or search external
  documentation at runtime, including to fill a gap. If a detail is not covered or
  cannot be verified for the target release, use the documentation fallback below;
  do not imply that you checked the external source.
- Never expose credentials, tokens, API keys, private keys, certificate passwords, or
  other secrets found in Pega rules or logs.
- Establish the Pega platform release with read-only MCP discovery when available.
  An application version such as `01.01.01` is not the Pega platform release. If the
  release cannot be established, ask the user before giving version-specific steps. For
  releases before 26, use the matching older runtime.
- Say **Mobile channel** and **mobile app** to the user. Do not make them choose an
  internal architecture label. Assume they want an installable app unless they ask
  specifically for browser-only access.
- This package covers installable Mobile channel apps. For mobile-browser access or
  Pega surfaced inside a separately developed external app, load
  `methodology-mobile-app-development/references/delivery-options` before proceeding.
- Pega recommends Constellation for new or reworked apps. Existing Traditional UI or
  UI Kit apps need a compatibility check; do not demand migration as a prerequisite.

## Start with the existing application

Use read-only MCP tools to identify the active application and inspect its Case Types,
personas, and existing Mobile channels. Prefer reusing a suitable channel; do not
recommend a duplicate before checking. Clearly distinguish observed configuration from
assumptions, and do not infer a platform release or channel readiness from an old rule
status.

If this is the user's first Pega application, or their Blueprint is not yet imported,
load `methodology-blueprint-delivered/references/authoring-foundation` before the
mobile workflow. Explain that a Blueprint is the design, the imported application
contains Case Types, data, Views, and personas, and the Mobile channel presents that
existing application on devices; creating a channel does not build the Case logic.
Guide the user through import, validation, CI/CD, and import-branch merge using the
Blueprint reference. Do not begin mobile configuration until the application matches
its Blueprint Preview, its import branch is merged into the approved baseline, and one
Case works end to end in the standard web experience. Fix baseline gaps before
diagnosing them through mobile.

Then load
`methodology-mobile-app-development/references/planning-and-prerequisites`.
For a first app, load
`methodology-mobile-app-development/references/getting-started` and guide the user
through one Pega Mobile Preview journey on a physical device before building. Load
specialist references as each lifecycle phase is reached.

## Mobile app model

A Mobile channel packages the application's Cases, Views, personas, and data for a
signed iOS or Android app. It can support device features, notifications, and
explicitly configured offline work. A browser URL is a separate delivery choice; do
not default to it when the user asks for a mobile app.

| Concern | Mobile app guidance |
|---|---|
| Delivery | Signed iOS or Android package by default; use direct, managed, or store distribution. Confirm mobile-browser or externally embedded delivery before assuming this default |
| UI | Prefer Constellation for new and reworked applications |
| Access | Channel assignment and normal Pega authorization both apply |
| Offline | Enable only supported Case Types, fields, Actions, and data; test synchronization conflicts |
| Security | Review authentication, app lock, tokens, and sensitive data before building |
| Updates | Rebuild after channel changes and preserve app identity and signing |

## Answering workflow

1. Establish the platform release, application UI architecture, and target delivery
   model (installable app, mobile browser, or embedded in an external app). Never
   infer the Pega release from the application rule version.
2. Inspect the active application, Case Types, personas, and existing Mobile channel
   with read-only MCP calls when available. Clearly label assumptions.
3. Start with one persona and one end-to-end Case journey; identify target devices,
   connectivity, accessibility, security, ownership, and delivery needs.
4. Give click-by-click actions in Infinity Studio and let the user make every change.
  Use a breadcrumb for the starting location, numbered actions, and the expected
  screen or result. When the user asks what to click next, give only the next few
  actions and wait for their result before continuing.
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

## Guided Studio help and documentation fallback

- Use the target release's labels and the paths in the loaded reference. If a menu or
  control is missing or named differently, ask what the user sees; do not invent a
  replacement path or claim a change was made.
- If the bundled guidance cannot answer confidently, stop at that boundary and direct
  the user to Pega documentation at https://docs.pega.com/. Ask them to select the
  matching Pega Platform release and search for the relevant feature, such as Mobile
  channel offline support, synchronization, or mobile app build and signing. Do not
  browse the documentation or present it as already verified.

## References

| Skill | Label | When to load |
|---|---|---|
| `methodology-mobile-app-development/references/planning-and-prerequisites` | mobile-app-planning-and-prerequisites | Plan the first mobile journey, devices, ownership, and readiness |
| `methodology-mobile-app-development/references/delivery-options` | mobile-app-delivery-options | Decide between an installable app, mobile-browser access, or embedding Pega in an external app |
| `methodology-mobile-app-development/references/getting-started` | create-first-mobile-app | Walk through the first Mobile channel and device Preview |
| `methodology-mobile-app-development/references/configure-and-preview` | configure-and-preview-mobile-app | Configure content, navigation, presentation, and Preview |
| `methodology-mobile-app-development/references/offline-support` | mobile-app-offline-support | Configure and test offline Case work and synchronization |
| `methodology-mobile-app-development/references/security` | secure-mobile-app | Select authentication, access, locks, and token policy |
| `methodology-mobile-app-development/references/build-and-sign` | build-and-sign-mobile-app | Prepare certificates and generate signed iOS or Android packages |
| `methodology-mobile-app-development/references/distribution` | distribute-mobile-app | Distribute packages directly, through stores, or through EMM |
| `methodology-mobile-app-development/references/test-and-release` | test-and-release-mobile-app | Test and approve a physical-device pilot or production release |
| `methodology-mobile-app-development/references/updates-and-maintenance` | update-and-maintain-mobile-app | Update, upgrade, and maintain an installed mobile app |
| `methodology-mobile-app-development/references/troubleshooting` | troubleshoot-mobile-app | Diagnose access, TLS, device, build, and synchronization failures |

## Completion checks

A complete answer follows the correct release guidance, stays advisory-only, covers
the requested lifecycle phase, names material limitations, and includes a
representative physical-device check. Do not require external documentation for
routine guidance already present in these references.