---
name: distribute-mobile-app
description: Load when delivering a signed mobile app package for a Mobile channel in Pega Infinity versions earlier than 26, through direct install, EMM, or an app store.
---

## Distribution and release

Choose one approved path: direct enterprise installation, EMM, Apple App Store, or
Google Play. Store policies and target OS/API requirements are time-sensitive; the
release owner must verify them at release time.

Release only the artifact that passed testing. Record its application version, mobile
client version, package identifier, signing identity, target host, build timestamp,
checksum, rollout owner, rollback package, and support route. Use a pilot group before
broad rollout and verify installation, first login, upgrade, revocation, and rollback.
