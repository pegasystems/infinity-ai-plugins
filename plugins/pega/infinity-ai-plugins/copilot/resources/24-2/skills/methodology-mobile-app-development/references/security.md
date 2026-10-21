---
name: secure-mobile-app
description: Load when defining authentication, app locks, token lifetimes, or privacy controls for a Mobile channel in Pega Infinity versions earlier than 26.
---

## Security and privacy

- Use only an approved authentication service and HTTPS with a trusted certificate
  chain.
- Assign the channel to approved personas and test both allowed and denied access.
- Choose app lock, biometric/PIN behavior, token lifetimes, remote revocation, and
  lost-device response before release.
- Minimize offline data, notification text, logs, cached attachments, and device
  permissions according to data classification.
- Keep signing keys, provisioning profiles, API keys, push credentials, and passwords
  with named owners in approved secret storage; never place them in prompts.
- Verify timeout, lock, unlock, sign-out, token expiry, password reset, access removal,
  device loss, and local-data cleanup on physical devices.
