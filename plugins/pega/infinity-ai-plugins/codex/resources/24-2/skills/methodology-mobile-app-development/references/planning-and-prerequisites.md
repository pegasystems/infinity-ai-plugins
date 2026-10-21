---
name: mobile-app-planning-and-prerequisites
description: Load before configuring a Mobile channel in Pega Infinity versions earlier than 26. Covers the readiness checklist and the online/offline boundary.
---

## Readiness checklist

Record these decisions before configuration:

| Area | Required decision |
|---|---|
| Journeys | Persona, Case Type, Assignment, create/update/read-only behavior |
| Devices | iOS/Android scope, form factors, supported OS matrix, physical test devices |
| Connectivity | Online-only and offline journeys, expected network conditions |
| Capabilities | Camera, location, attachments, push, biometrics, and denied-permission behavior |
| Security | Authentication service, authorization, app lock, token policy, data sensitivity |
| Delivery | Development preview, direct install, EMM, Apple App Store, or Google Play |
| Ownership | Certificates, credentials, release, security, monitoring, and user support |
| Network | Trusted HTTPS endpoint and required build-service connectivity |

## Prove the web journey first

Prove one selected Case journey in the web channel before diagnosing it through the
Native client. A mobile channel reuses application behavior; packaging does not repair
a broken Case, View, validation, integration, or access role.
