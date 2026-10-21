---
name: mobile-app-delivery-options
description: Load when choosing how Pega reaches a device for a Pega Infinity 26.1+ application — an installable Mobile channel app, mobile-browser access, or Pega surfaced inside a separately developed external app.
---

## Choose the delivery model first

This package assumes an installable app built from a Mobile channel. Confirm that
assumption before configuring anything; the other two delivery models use a different
toolset and a different owner.

| Delivery model | What it is | Owner | Guidance |
|---|---|---|---|
| Installable mobile app | A signed iOS or Android package built from a Mobile channel | App Studio author, signing owner | The rest of this reference package |
| Mobile-browser access | Users open the existing web experience in a mobile browser; no Mobile channel, certificate, or store distribution is involved | App Studio author | Confirm responsive Views and stop; do not build or sign a package for this path |
| Pega inside an external app | A separately developed native or hybrid app surfaces Pega Case forms, fields, or messaging | External/native app development team | The options below |

## Bringing Pega into an externally developed app

Only use these options when the user explicitly wants to extend an already-existing,
separately owned mobile app rather than build a new Pega-generated one. Each option
needs native or web development outside Infinity Studio; this skill does not author
that code and cannot generate it.

| Option | Use when | Notes |
|---|---|---|
| Constellation Mobile SDK | The external app should embed full Case forms and process their Assignments | Supports Jetpack Compose (Android) and SwiftUI (iOS); the external team can use the SDK's own UI or build with SDK components |
| Digital Experience (DX) API | The external app keeps its own UI and only needs selected field data from Pega | Pega defines the available fields; the external team owns all UI and native code |
| Mobile Mashup | The external app embeds a Pega-rendered screen through a webview | Fastest to add, but the external team must still handle authentication and decide when to show and dismiss the webview |
| Mobile Messaging SDK | The external app adds Pega Customer Service chat or agent messaging | Add-on to Pega Customer Service; ships its own native chat UI |

For any of these options, confirm who owns the external app's release process,
authentication, and support before promising a specific integration approach.

## Direct external OIDC authentication

Some embedded and installable scenarios need Pega Mobile Client to authenticate
directly against an external OIDC identity provider instead of the channel's selected
authentication service. Treat this as an advanced flow and load
`methodology-mobile-app-development/references/security` before configuring it; it
requires pre-created operator IDs and a separate client registration, and while active
it makes the channel's own authentication-service setting inactive.

## Traditional UI and UI Kit applications

This package assumes Constellation. If the target application still uses Traditional
UI or UI Kit:

- Build, sign, distribution, and general security guidance in this package still
  applies, because those steps are UI-architecture-agnostic.
- Content, responsive-layout, and offline behavior do not carry over. Traditional UI
  evaluates offline queries during synchronization instead of filtering locally on the
  device at runtime, so a configuration that works offline in one architecture can
  fail silently in the other. Re-verify every offline Data Page and Case Type against
  the running architecture instead of assuming parity.
- For an application on a Pega Platform release earlier than 26, use the matching
  pre-26 runtime instead of this package.
- Recommend a move to Constellation for a reworked or new mobile app, but do not
  require migration before answering a Traditional UI question.
