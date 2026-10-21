---
name: create-first-mobile-app
description: Load after importing a first Blueprint into Pega Infinity versions earlier than 26. Explains the generated application artifacts and gives a beginner-safe path from a working Case to a Mobile channel and first device Preview.
---

## Goal

Produce a working development Preview of one Blueprint-generated mobile journey. This
is the shortest safe path through App Studio; it is not a production release.

## Understand what the Blueprint created

| Imported artifact | How it is used for mobile |
|---|---|
| Application and version | Own the Mobile channel and all generated Case/data rules |
| Persona | Defines who receives the channel and what work they may access |
| Case Type, Stages, and Steps | Provide the mobile journey and Assignments |
| Views and fields | Provide the forms rendered by the Mobile Client on the device |
| Landing pages | Become candidate items in primary mobile navigation |
| Data objects and integrations | Determine which screens require connectivity or offline packaging |
| Theme and branding | Supply the starting visual identity; native icon and launch screen are configured separately |
| User stories | Track unfinished behavior; an imported shell is not production-ready |

Refine these generated artifacts instead of rebuilding them only for mobile. A Mobile
channel is another way to deliver the same application and business logic.

## Before opening Channels

- [ ] The architecture, Blueprint-to-mobile map, target platform baseline, ruleset,
  named owners, physical-device coverage, and first-journey acceptance tests are
  recorded in the approved planning output.
- [ ] The active application is the imported Constellation application and the correct
  application version is selected.
- [ ] The Blueprint import was compared with its Preview and merged into the approved
  baseline; mobile work uses an approved branch or the unlocked application ruleset.
- [ ] At least one Case Type can be created and completed in the web channel with a
  named test operator.
- [ ] The first mobile persona, Case Type, landing page, and online/offline expectation
  are identified.
- [ ] The user has permission to configure Channels. A platform or application
  administrator owns unavailable menus, authentication services, certificates, and
  production deployment.

Stop and repair the application baseline if a generated Case, View, role, or data
dependency does not work in the web channel. Mobile packaging does not repair it.

## Create the first development channel

1. In the left navigation of App Studio, select **Channels**.
2. Open the **Channels landing page**. Under **Create new Channel**, select **Mobile**.
   If a default Mobile channel already exists, open it and verify its application,
   version, roles, navigation, security, host, and package identity before reusing it.
3. Enter a unique, purpose-based **Name**, add a useful **Description**, select
   **Submit**, and then **Save**.
4. Keep the internal web portal rule that Pega creates with the channel. It is not
   visible in App Studio and is required for webview content.
5. On **Content > Navigation**, add the generated landing page to **Primary
   navigation**. Add the generated Case Type to the **Create** menu only for personas
   allowed to create it. Put the most frequent four or five items first; additional
   items move under **More** on smaller screens.
6. Keep notifications, recents, and global search enabled for the first Preview unless
   the approved design explicitly disables them. Do not enable push, offline, custom
   branding packages, or native extensions in the first pass.
7. On **Layout > Theme**, start with the application logo and an existing
   Constellation theme. Add meaningful logo alternative text. Defer native icon and
   launch-screen polishing until the journey works.
8. On **Configuration > Security**, select the approved development authentication
   service. Assign the channel to the intended persona under **Users > Personas** and
   use a separate test operator for each persona.
9. Save the channel.

## Preview on a device

1. Install **Pega Mobile Preview** from the device's application store. Preview is a
   development tool and requires no signing certificate.
2. In App Studio, open **Channels**, select the Mobile channel, and select the
   **Pega Mobile Preview** icon in the upper-right corner.
3. In Pega Mobile Preview, select **Start configuring**, scan the displayed QR code,
   and open the channel from the **Active** list. If scanning is unavailable, use
   **Email me instructions** in Studio and **Enter URL manually** on the device.
4. Sign in as the first persona. Create the selected Case, complete its mobile
   Assignment, return to the landing page, search for the Case, and reopen it.
5. After a Studio change, swipe down to refresh the current screen. To reload all
   channel configuration, return to the **Active** list and open the channel again.
6. Repeat with every persona and target form factor. Preview channels expire after
   30 days and Preview does not provide push notifications or all native branding.

## If something goes wrong on the first try

| Symptom | Likely cause on a first attempt | Fix |
|---|---|---|
| QR code will not scan or link fails | Device not on an approved network, or Preview channel expired | Use **Email me instructions** / **Enter URL manually**, or recreate the Preview link |
| Stuck at login or repeated sign-in prompt | Authentication service not yet approved for development, or wrong persona/operator | Recheck **Configuration > Security** and the persona/operator mapping |
| Signed in but no landing page or Create option | Persona not assigned, or navigation not saved | Recheck **Users > Personas** and **Content > Navigation**, then save again |
| Case created but layout is broken on the device | A generated View still uses a legacy Section/harness instead of a Constellation View | Fix the View in App Studio; do not patch it with channel configuration |
| A Studio change does not appear after swipe-to-refresh | Stale full channel configuration | Return to the **Active** list and reopen the channel |

For any other symptom, or once the app moves toward a signed build, load
`methodology-mobile-app-development/references/troubleshooting` for the full
diagnostic table.

## First-preview acceptance

- [ ] The intended persona can open the channel and no unintended persona can use it.
- [ ] The intended landing page, Worklist, search, and Create option are reachable.
- [ ] One Case can be created, advanced, saved, found, and reopened without error.
- [ ] Labels, required fields, validation, attachments, and navigation fit the device
  in portrait and landscape without hidden controls.
- [ ] Any unsupported Case action, online-only dependency, or unfinished imported user
  story is recorded before offline support or a native build begins.

Record the channel name, application/version, persona/operator, Case ID, device/OS,
timestamp, screenshots, pass/fail result, and unresolved gaps in the evidence register.
