---
name: update-and-maintain-mobile-app
description: Load when rebuilding or upgrading a Mobile channel in Pega Infinity versions earlier than 26. Covers compatibility, identity preservation, and regression checks.
---

## Maintenance

For every update:

1. Review platform/mobile-client compatibility and supported device policy.
2. Preserve package, signing, authentication, and environment identity.
3. Require pending offline work to synchronize before a risky upgrade.
4. Rebuild after relevant channel configuration changes.
5. Repeat authentication, navigation, Case, offline, push, attachment, device
   permission, upgrade, and distribution regression checks.
6. Retain the previous approved package and rollback procedure.
