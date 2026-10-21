---
name: configure-and-preview-mobile-app
description: Load when creating or refining a Mobile channel in Pega Infinity versions earlier than 26. Covers channel setup, navigation, personas, and branding.
---

## Configure the Mobile channel

In App Studio, open **Channels**, create or open the **Mobile** channel, and verify that
it belongs to the intended application and version. Then guide the App Author through:

1. Give the channel a purpose-specific name and description.
2. Add only approved landing pages to primary navigation; keep the most frequent items
   first and place permitted Case Types in the Create menu.
3. Assign the channel to intended personas and verify least privilege with a separate
   test operator for each persona.
4. Select the approved authentication service and app-lock policy.
5. Apply the application theme, accessible logo text, app icon, and launch assets.
6. Enable optional push, offline, camera, or location features only after their design
   and permission behavior are approved.
7. Save, preview, and test one complete journey before requesting a signed build.

Menu labels can vary by patch release and privileges. Describe the configuration goal
when the exact control is not visible; do not invent a replacement path.

### Custom native modules (Traditional UI only)

A custom module adds a native capability that is not part of Pega's built-in mobile
features. This path applies only to a Traditional UI application; do not offer it for
a Constellation application. Confirm the application's UI architecture before
discussing custom modules.

A native iOS or Android developer authors the module with the development kit included
in the current Pega Mobile Client distribution, then the build owner uploads the
compiled module to Pega Platform as part of the `assets.zip` file used for the signed
build. This requires native development proficiency; do not attempt to author, review,
or generate native module code in chat. Treat a custom module as a later milestone
after the core journey passes device Preview, and confirm the module's developer,
source control location, and ongoing maintenance owner before it enters a production
build.
