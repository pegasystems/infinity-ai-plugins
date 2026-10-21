---
name: update-and-maintain-mobile-app
description: Load when updating an installed Pega Infinity 26.1+ mobile app or its platform version. Covers rebuilds, package identity, offline model changes, and regression planning.
---

## Maintain the installed app

For every Mobile channel configuration change, rebuild the affected platform package.
The Mobile Build Service uses the latest Pega Mobile Client release, so check current
platform and OS support before scheduling a production upgrade.

1. Keep the app's package/bundle ID and signing identity stable for its lifetime.
   Android updates must use the same signing information; iOS provisioning and
   certificates must remain valid for the distribution method.
2. Preserve the channel's generated OAuth client registration and client secret. Avoid
   custom authentication services that conflict with out-of-the-box services after a
   platform upgrade.
3. Keep navigation and branding in the Mobile channel. Avoid hand-built navigation
   overrides, JavaScript customizations, iframes, and custom modules unless a supported
   requirement and native owner justify them.
4. Recheck the supported device/OS baseline, identity provider, roles, token and lock
   policy, push settings, app host, and environment routing.
5. Retest Case Views, supported Actions, attachments, integrations, localization,
   permissions, accessibility, and online reconnect behavior on physical devices.
6. For a Pega platform upgrade with offline-enabled Case Types, perform a full data
   synchronization after updating. Re-test Case model changes and conflicts; online
   changes can take precedence over unsynchronized offline edits.
7. Test the upgrade over the previous signed package before broad rollout. Keep a
   tested rollback package and support owner.

For environment-specific hosts, ensure the target environment has the same application
and alias, Mobile channel, OAuth client registrations, and selected authentication
service. In Infinity Studio, open **Channels > Configure > Current Channels > [Mobile
channel] > Configuration > Hosting**, configure the approved alternate host, and verify
HTTPS and login on the installed package. If the Hosting control is not available, ask
the platform administrator to confirm the target release and access.