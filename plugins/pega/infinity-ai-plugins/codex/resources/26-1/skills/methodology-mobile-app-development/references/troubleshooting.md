---
name: troubleshoot-mobile-app
description: Load when diagnosing access, authentication, TLS, installation, build, device, or synchronization failures in Pega Infinity 26.1+ mobile apps.
---

## Gather evidence safely

Record the Pega platform/application versions, environment, channel name, package
version, device/OS, persona, network state, timestamp, exact steps, and sanitized error
text. Never request passwords, access tokens, API keys, private keys, certificate
passwords, or unredacted personal data. Reproduce the smallest failing step and change
one layer at a time.

| Symptom | First checks |
|---|---|
| No Mobile channel or build controls | Application/version context, Channels access, Mobile Build Service setup, and administrator permissions |
| Preview QR/link fails | Device network, trusted HTTPS host, Preview expiry; retry emailed instructions/manual URL |
| Install fails | Package ID, OS compatibility, signature/provisioning, device registration, and certificate expiry |
| Login loop or invalid redirect | Selected authentication service, OAuth client registration, redirect URI, grant type, operator access, and server logs |
| Secure connection error | HTTPS, trusted certificate authority, full intermediate chain, host, and device date/time; Android rejects self-signed certificates |
| Signed in but work is missing | Persona channel assignment, Case authorization, saved navigation, and data availability |
| Case View or Action fails | Source View, supported Action/Step type, validation, and whether the step needs a live connection |
| Offline data or Assignment missing | Case Type enabled for offline, supported fields/steps/Data Pages, sync indicator, and device network/storage |
| Offline changes do not match server | Check for online edits to the same Case. Server data can win; there is no field-level merge for offline changes |
| Android push missing | Approved FCM configuration, matching certificate-set data, OS permission, and notification state |
| iOS push missing | Provisioning profile capability, push certificate, APNs configuration, and OS permission |
| Device-specific behavior | Reproduce on another supported physical device and inspect sanitized client/server logs |

For a channel login misconfiguration, open **Infinity Studio > Channels > Configure >
Current Channels > [Mobile channel] > Configuration > Security**. Verify that the
authentication service still exists, its OAuth client registration is valid, its
redirect URI uses the app's package ID, and the authorization-code grant is enabled.
Saving a channel can generate its registration, but does not repair an invalid existing
registration.

For secure-connection errors, the server must present a trusted full TLS certificate
chain. Android requires a CA-issued certificate; a browser connection succeeding does
not prove the mobile client accepts the chain.

If more evidence is needed, have the administrator open **Infinity Studio > Channels >
Configure > Current Channels > [Mobile channel] > Manage** and retrieve device logs.
Ask the user to restart the app. Use the narrowest log level and date range; silent
logging yields no device logs. Treat client traces and server logs as sensitive.