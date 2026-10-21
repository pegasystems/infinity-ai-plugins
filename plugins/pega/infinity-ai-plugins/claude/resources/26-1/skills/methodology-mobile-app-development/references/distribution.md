---
name: distribute-mobile-app
description: Load when choosing how to deliver a signed Pega Infinity 26.1+ iOS or Android app to testers or users. Covers direct links, app stores, EMM, rollout, and update identity.
---

## Choose a distribution route

Agree on the audience, ownership, privacy policy, rollout, support, and rollback before
creating the release build.

| Route | Use when | Checks |
|---|---|---|
| Direct package/link | A small internal test or controlled pilot | Keep login required; distribute platform-specific packages only to approved testers |
| EMM/MAM | The organization manages employee devices/apps | Confirm enrollment, assignment groups, required/optional install, update/removal, and access restrictions with the device administrator |
| Google Play or Apple App Store | Public or organization-approved store delivery | The store owner handles current developer enrollment, listing, privacy, review, signing, and target-OS requirements |

The build result provides an OS-specific QR code or share link. Verify the chosen
artifact, recipient, environment, and authentication before sharing. Do not treat the
development Preview QR code as an installation package or production distribution
route.

## Release checks

- Use the approved production Mobile channel and target host; confirm HTTPS and trusted
  certificates.
- Assign the channel to the intended role. In Infinity Studio, open **Users >
  Personas**, select the intended persona, and assign the channel. Test with
  representative user accounts. Menu visibility does not replace Case authorization.
- Confirm the package/bundle identifier, app display name, version, signing identity,
  certificate validity, authentication redirect, and distribution profile match the
  release plan.
- For Play distribution, deliver the Android App Bundle artifact. For iOS, use the
  distribution profile and signing method approved for the chosen audience.
- Include app purpose, privacy details, support contact, screenshots, and accessibility
  evidence required by the organization's store/EMM process.
- Complete a physical-device pilot, upgrade check, security review, and support/rollback
  handoff before broad rollout.
- Verify current store rules, OS minimums, and review policies with the release owner;
  these change over time and must not be hard-coded into a release plan.

## Preserve upgrade continuity

Keep the same Android package name and signing key and the same iOS bundle ID and
compatible signing/provisioning identity for future releases. A changed app identity
can prevent an in-place upgrade. Rebuild after Mobile channel changes, test an upgrade
over the previous package, and retain the last known-good signed artifact for rollback.

For a package built in one environment and hosted by another, confirm the target has
the same application alias, Mobile channel, authentication service, and OAuth client
registration. In Infinity Studio, open **Channels > Configure > Current Channels >
[Mobile channel] > Configuration > Hosting**, set the approved target host/port, and
test sign-in on the installed app before distribution. If the Hosting control is not
available, ask the platform administrator to confirm the target release and access.