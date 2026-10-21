---
name: troubleshoot-mobile-app
description: Load when a mobile app fails to build, connect, authenticate, synchronize, or behave correctly on a device in Pega Infinity versions earlier than 26.
---

## Troubleshooting

Collect the application/version, mobile client version, channel, device/OS, network,
operator/persona, package identity, timestamp, reproduction steps, and sanitized logs.
Then isolate the failing layer:

| Symptom | First checks |
|---|---|
| Cannot connect | HTTPS host, DNS, certificate chain, environment routing |
| Cannot sign in | Authentication service, redirect URI, token policy, persona access |
| Missing work | Channel navigation, Case permissions, persona assignment, data access |
| Offline failure | Eligibility, packaged data, pending sync, unsupported action, conflict |
| Push failure | User/device registration, consent, provider credentials, event targeting |
| Build failure | Build-service connectivity, certificate validity, package inputs |
| Upgrade failure | Package/signing identity, version policy, pending offline work |
| Device feature failure | OS permission, denied-permission path, supported capability |

Change one layer at a time and rerun the smallest failing scenario. Escalate with the
sanitized evidence packet; do not expose credentials or personal data.
