---
name: build-and-sign-mobile-app
description: Load after a Pega Infinity 26.1+ Mobile channel passes device Preview. Covers Mobile Build Service, Android/iOS certificate sets, package generation, and signing safety.
---

## Pre-build gate

Do not generate a production package until the identity, build service, authentication,
signing owner, distribution purpose, target environment, and physical-device test plan
are approved. Preview does not test signing or package installation.

Record the Pega application/platform version, Mobile channel, target Pega host,
platform(s), app display name, unique package/bundle ID, version policy, authentication
redirect, distribution route, and accountable owners. Keep package ID case exactly
consistent across Studio, certificates, identity registration, and app updates.

Never request or display credentials, API keys, private keys, certificate passwords,
provisioning files, or tokens in chat. An administrator or signing owner enters them
directly into the approved system.

## Configure Mobile Build Service

1. Open **Admin Studio > Mobile > Settings**. Have the platform administrator configure
   the Pega Mobile Build Service account and API key provided through the approved Pega
   support channel.
2. Keep **Require login for mobile app download** enabled unless the security owner
   explicitly approves another setting.
3. Save and confirm the service is configured in the environment where the package
   will be built. Pega Cloud has outbound build-service access; client-managed Pega
   nodes need outbound network access. Ask the platform/network administrator to
   diagnose firewall issues.
4. Confirm HTTPS to the Pega host uses a trusted, complete TLS chain. Do not build a
   production app against an untrusted or self-signed server certificate.

## Prepare the platform certificate set

In Infinity Studio, an authorized administrator opens **Configure > Mobile >
Certificates > Add certificate set**, then chooses Android or iOS. Certificate-set
and upload-name fields may reject underscores, hyphens, or periods; use the exact
validation shown in Studio.

### Android

- Enter a unique, case-sensitive package name with at least two dot-separated segments.
  Each segment starts with a letter; use letters, digits, and underscores in segments.
- Add the approved signing certificate as a `.p12` file with its private key and one
  signing certificate. The signing owner enters the encryption password directly in
  Studio.
- Keep the same package name and signing key for the life of the app so installed
  users can receive updates.
- For Google Play distribution, choose the Android App Bundle option when building.
- Push is optional and needs separate Firebase Cloud Messaging server-key and Google
  Services configuration. Do not add it to a first build without a push owner.

### iOS

- Use a unique, case-sensitive bundle ID with at least two dot-separated segments.
- A signed certificate set uses a provisioning profile and a signing certificate
  exported as `.p12`; the profile, App ID, team, certificate, and distribution purpose
  must match.
- A provisioning profile must support push notifications before Studio permits a push
  certificate to be added. Push is optional and should be handled by the iOS/security
  owner.
- If policy prohibits uploading signing material to the build service, an authorized
  owner can create an unsigned iOS archive and sign it locally on macOS with Xcode.
  This is a specialist workflow, not the default first build.
- Apply the organization's approved secure-crypto conversion process if its Pega
  environment requires a particular PKCS#12 format.

The same app identifier and signing identity are essential for upgrades. Never create
a new package ID or signing key merely to fix an update or installation failure.

## Generate a package

1. In Infinity Studio, open **Channels > Configure > Current Channels > [Mobile
   channel]**.
2. Select **Build iOS app** or **Build Android app** from the channel's build area.
3. Choose the certificate set matching the platform, package identity, and intended
   distribution. Choose the approved build logging level; do not enable debug logging
   for production.
4. For Google Play, select **Build Android App Bundle (Google Play)**. Preserve the
   Android debug-signing selection used by an existing app when building an update.
5. Set an explicit build version only when required by release policy. Otherwise, Pega
   starts at `0.0.1` and increments the final version component on subsequent builds.
6. Select **Build app** and wait for a successful current build status. A stale or
   failed status is not a releasable artifact.
7. Use the resulting QR code or share link to download the package, then install that
   exact artifact on the intended physical test devices.

Rebuild after channel configuration changes. A successful build alone does not prove
the app installs, authenticates, upgrades, or behaves correctly; run the test matrix in
`methodology-mobile-app-development/references/test-and-release`.

## Build failures

| Symptom | First check |
|---|---|
| Build service unavailable | Admin Studio settings, account status with administrator, target environment, and outbound firewall access |
| Android package rejected | Package-name syntax/case, `.p12` contents/password through signing owner, and package/signature continuity |
| iOS profile rejected | Bundle ID, App ID/team, certificate match, profile purpose/expiry, and device registration when required |
| Install fails after build | Device/OS compatibility, signing identity, provisioning, and package type |
| Sign-in fails only in installed package | Target host, authentication service, OAuth registration, redirect scheme, and HTTPS trust |
| Configuration change is missing | Save the Mobile channel and generate a fresh package |

Keep logs and build artifacts within approved access controls. Redact secrets and
personal data before sharing diagnostic evidence.