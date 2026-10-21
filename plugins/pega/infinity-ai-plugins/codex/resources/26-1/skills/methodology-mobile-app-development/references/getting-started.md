---
name: create-first-mobile-app
description: Load when a user is starting their first installable Pega mobile app from an existing application. Gives a beginner-safe path from a working Case to a Mobile channel and device Preview.
---

## Goal

Get one existing Case journey working in a Pega Mobile Preview on a physical device.
This proves the experience before certificates, signing, or production distribution.

## Use the application that already exists

| Existing application artifact | Mobile use |
|---|---|
| Application and version | Own the Mobile channel and generated Case/data rules |
| Persona and role | Determine who can open the app and which work they can access |
| Case Types, Stages, and Steps | Define the journey and Assignments |
| Views and fields | Render the forms on mobile |
| Landing pages | Provide destinations in the app's navigation |
| Data objects and integrations | Determine online dependencies and offline readiness |
| Theme and branding | Provide the starting appearance |
| User stories | Show unfinished behavior; an imported shell is not production-ready |

Refine the generated application instead of rebuilding its business logic for mobile.
Mobile does not repair a broken Case, View, integration, validation, or access role.

## If this is the user's first Pega application

Explain the handoff before giving Mobile channel instructions:

- A **Blueprint** is the application design. Importing it creates the Pega application
  foundation, including Case Types, stages and steps, initial Views, data objects,
  personas, and user stories.
- A **Case Type** defines a kind of work; an individual Case is one instance moving
  through its stages and Assignments.
- A **Mobile channel** exposes supported parts of the existing application on iOS or
  Android. It does not create the application's Case logic, data, or authorization.

If the Blueprint has not been imported, pause the mobile setup and use the Blueprint
Delivered authoring-foundation workflow first. Its import entry points are the **New
Application wizard** for a new app and **Extend Application** for an existing app. For
a simple Blueprint choose **Build Now**; for a complex Blueprint with multiple
containers, use **Customize Build** to select what to import. The exact navigation to
these controls is not specified in this mobile guide; use the labels shown in the
target release and do not invent a click path if they are not visible.

After import, guide the user through these gates before opening **Channels**:

1. Review the generated Case Types, stages, steps, Views, data objects, personas, and
   user stories. The import is a starting foundation; complex logic and integrations
   can still need authoring.
2. Compare the running application with the approved Blueprint Preview. Use generated
   sample data to create and advance a Case through every stage. If the result differs
   from the Blueprint, refine the Blueprint and re-import rather than patching the
   mismatch directly in the application.
3. Have the delivery team configure CI/CD in Deployment Manager and merge the initial
   import branch with the **Exception Merge Pipeline**. If the user lacks access, stop
   and involve the application or deployment administrator; do not skip the baseline
   gate.
4. Sign in to the standard web experience as the intended test persona and create,
   advance, save, find, reopen, and complete one Case. Repair any baseline failure
   before continuing.

Once these gates pass, resume below at **Before opening Channels**. For exact Blueprint
authoring details, use the Blueprint workflow selected by the parent mobile skill; this
reference stays focused on the mobile handoff.

## Before opening Channels

- [ ] The exact Pega platform release and application version are known.
- [ ] The active application and intended branch/ruleset are selected.
- [ ] A Blueprint import matches its approved Preview and is merged into the approved
  baseline.
- [ ] A named test operator can create and complete the selected Case in the standard
  web experience.
- [ ] One persona, one Case Type, one landing page, and the first success outcome are
  selected.
- [ ] The selected Mobile channel is intended for this application version. Reuse a
  suitable existing channel instead of creating another one.
- [ ] The user can configure Channels; an administrator owns unavailable menus,
  authentication, build-service settings, signing, and production deployment.

Stop and repair the application baseline if its Case, View, role, or data dependency
fails in the web experience.

## Create or open the Mobile channel

1. In Infinity Studio, open **Channels** to reach the **Channels landing page**.
2. Under **Create new Channel**, select **Mobile**. To open an existing channel, use
   **Channels > Configure > Current Channels > [Mobile channel]**.
   If a default Mobile channel already exists, open it and verify its application,
   version, navigation, access, security, and package identity before reusing it.
3. If creating a channel, enter a unique, purpose-based **Name**, add a useful
   **Description**, select **Submit**, and then **Save**.
4. Keep the internal Portal rule that Pega creates for the channel. It is not visible
   in Infinity Studio and is needed to display web-view content correctly.
5. Open **Content > Navigation**. Add the landing page to **Primary navigation**.
   Add the selected Case Type to **Create** only for personas allowed to create it.
   Put the most-used four or five destinations first; additional items appear under
   **More** on smaller screens.
6. Keep standard search and work navigation enabled for the first Preview. Defer
   offline, push notifications, custom branding packages, and native extensions.
7. Choose the existing Constellation theme and application logo. Add meaningful
   alternative text; defer icon and splash-screen polishing until the journey works.
8. Save the channel. Ask an administrator to approve the development authentication
   service and assign the Mobile channel to the intended role under **Users >
   Personas**. Use a separate test operator for each persona.

Control labels can vary by release and access level. If a menu is missing, identify
the required outcome and ask the Pega administrator to enable access; do not invent a
replacement rule.

## Preview the app on a device

1. Install **Pega Mobile Preview** from the device's app store. Preview is for
   development, not production, and needs no signing certificate.
2. In Infinity Studio, open **Channels**, select the Mobile channel, and use the
   **Pega Mobile Preview** icon in the upper-right corner.
3. In Pega Mobile Preview, select **Start configuring**, scan the QR code, and open
   the channel from **Active**. If scanning is unavailable, use **Email me
   instructions** in Studio and **Enter URL manually** on the device.
4. Sign in as the first persona. Create the selected Case, complete its Assignment,
   return to the landing page, find the Case, and reopen it.
5. After a Studio change, swipe down to refresh the current screen. To load all saved
   channel configuration, return to **Active** and reopen the channel.
6. Repeat with every intended persona and target phone/tablet size and orientation.

Preview channels expire after 30 days. Preview does not provide push notifications or
all custom branding. A successful Preview does not prove offline behavior, signing,
installation, upgrade, or production authentication.

## If something goes wrong on the first try

| Symptom | First check |
|---|---|
| QR scan or link fails | Device network, trusted HTTPS endpoint, Preview expiry; try emailed instructions and manual URL |
| Login repeats or fails | Approved authentication service, application access, persona/role assignment, and test operator |
| Signed in but no landing page or Create option | **Users > Personas** channel assignment and saved **Content > Navigation** |
| Case form is broken | Fix the source View; a legacy UI component needs a separate compatibility assessment |
| Change is missing | Return to **Active**, reopen the channel, and confirm Studio saved the change |
| Preview works but installed app does not | Continue with build/sign troubleshooting; Preview does not test package configuration |

For other symptoms, load
`methodology-mobile-app-development/references/troubleshooting`.

## First-run acceptance

- [ ] The intended persona opens the channel and an unintended persona is denied.
- [ ] The selected landing page, Worklist, search, and allowed Create option work.
- [ ] One Case is created, advanced, saved, found, reopened, and completed.
- [ ] Labels, required fields, validation, attachments, and navigation fit on target
  devices in portrait and landscape without hidden or clipped controls.
- [ ] Online dependencies and unfinished behavior are recorded before adding offline
  support or building a signed package.

Record the channel name, application/platform versions, persona and test operator,
Case ID, device/OS, timestamp, screenshots, result, and unresolved gaps. Load
`methodology-mobile-app-development/references/build-and-sign` only after this gate
passes.