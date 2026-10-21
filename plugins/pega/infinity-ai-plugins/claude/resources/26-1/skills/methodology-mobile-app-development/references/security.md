---
name: secure-mobile-app
description: Load when selecting authentication, authorization, app-lock, token, or privacy settings for an installable Pega Infinity 26.1+ mobile app.
---

## Choose authentication and access

Review security with the application security owner before building. Pega-generated
apps default to Pega Platform account authentication and a native device/biometric
lock after 30 minutes of inactivity. Confirm these defaults meet policy; do not relax
them for production.

Open **Infinity Studio > Channels > Configure > Current Channels > [Mobile channel] >
Configuration > Security** before changing channel security settings.

In that area:

- Choose the approved Pega Platform authentication service or configured SSO service.
  Supported service types include OpenID Connect and SAML 2.0; instance setup belongs
  to the identity/platform administrator.
- Avoid **Login not required** for production unless the security owner explicitly
  approves the anonymous access model and its generated-operator implications.
- Select a native app lock: device biometrics/device lock, app PIN, or biometrics plus
  app PIN. Define inactivity and maximum-login policies with the security owner.
- Review access-token and refresh-token lifetimes on the channel's Security settings.
  Each channel has an OAuth 2.0 client registration. Do not regenerate its client
  secret or expose tokens in chat.
- Assign the Mobile channel to the correct application role. Open **Infinity Studio >
  Users > Personas**, select the intended persona, and assign the channel. Test allowed
  and denied users separately. Case, field, attachment, data, and Action authorization
  remains required; hiding navigation is not access control.

The app lock is especially important for offline use: a user can unlock the app while
disconnected, but server authentication requires connectivity. Decide lost-device,
shared-device, revocation, local-data, and sign-out procedures before rollout.

## External identity providers

Use the configured channel authentication service for the first app. Direct
authentication against an external OIDC provider is an advanced flow: it requires a
client registration, the Mobile authentication service, app configuration, and
pre-created operator IDs. In that mode, the channel's selected authentication service
is ignored. Stop and involve the identity/platform administrator rather than
improvising those settings. This flow is also the basis for authenticating Pega
content embedded in an externally developed app; see
`methodology-mobile-app-development/references/delivery-options` for the other
embedding options and their ownership.

Require HTTPS with a trusted full certificate chain. Check authentication redirects,
MFA, app lock, timeout, token expiry/refresh, sign-out, role access, and revoked-user
behavior on a physical device. Keep credentials, API keys, client secrets, private
keys, and certificate passwords out of chat and logs.