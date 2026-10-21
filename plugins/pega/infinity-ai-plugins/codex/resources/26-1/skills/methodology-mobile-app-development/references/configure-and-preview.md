---
name: configure-and-preview-mobile-app
description: Load when configuring a Pega Infinity 26.1+ Mobile channel or refining its content, navigation, branding, responsive Views, and device Preview.
---

## Configure the Mobile channel

In Infinity Studio, open **Channels > Configure > Current Channels > [Mobile
channel]**. Verify the application and version context before editing. Reuse the
suitable default channel if one exists.

1. Give the channel a unique, purpose-based name and description.
2. Under **Content > Navigation**, add approved landing pages to **Primary
   navigation**. Order the most-used four or five first; the rest move under **More**
   on smaller devices.
3. Add Case Types to **Create** only for personas authorized to create them. A hidden
   menu item is not an authorization control.
4. Use **+ Add group** for related pages when grouping helps the persona. Set visibility
   conditions only when the associated access is enforced separately by Pega security.
5. Assign the channel to the intended role under **Users > Personas**. Test with a
   distinct operator for each persona.
6. Select the approved authentication service and review app-lock settings before
   generating a package.
7. Start with an existing Constellation theme and application logo. Add accessible
   alternative text and defer custom themes, push, and modules until the core journey
   passes.
8. Save, then Preview on a real device before expanding content.

The standard header includes global search. Notifications, recents, and search can be
hidden in Navigation **Features**; keep them enabled for the first pass unless the
approved experience requires otherwise. Do not delete the internal Portal rule created
for the Mobile channel.

## Content and responsive experience

- For Constellation, use supported Views, templates, and Actions. Pega recommends
  Constellation for new and reworked mobile apps. Assess Traditional UI or UI Kit apps
  against their existing rules and supported features; do not apply Constellation-only
  behavior to them or force a migration the user did not request.
- Keep phone tasks focused, use concise labels, and test long text, required fields,
  validation, tables, lists, attachments, dialogs, sticky actions, and the on-screen
  keyboard.
- Check portrait and landscape, phone and tablet, text enlargement, contrast, focus,
  screen-reader labels, touch targets, and reachable controls.
- Review each Case Stage's Actions before promising they will work. Constellation
  mobile supports common actions such as Attach content, Change Stage, Create Case,
  Create PDF, Generate document, Send email/notification, and Update a Case.
  Unsupported examples include Assign to robot queue, Form refresh, Persist Case, Run
  in background, Save Data Page, Search duplicate Cases, Send via DocuSign, and Wait.
  Confirm exact Action support in the target release before redesigning a process.
- Define allow, deny, and unavailable behavior for camera, location, attachments, and
  notifications. Device capability does not bypass OS permission or policy.

## Theme, branding, and optional capabilities

Set the theme and branding in the Mobile channel. Verify app icon, splash screen, logo,
accessible names, light/dark appearance, and localization on the built app; Preview
does not display all custom branding assets. Defer store-facing branding until the app
identity and release owner are approved.

Treat push notifications and custom native modules as later milestones. Push requires
platform-specific provider setup, certificate/configuration, user consent, and
foreground/background testing. Custom native modules require mobile development skills
and a separately managed release process. Never request provider keys, signing
material, or tokens in chat.

Push notifications carry plain text only; if the app formats its own message, send
plain text from the server. Pega delivers a push notification to whichever user last
signed in on that device, so a shared device can notify the wrong person if users do
not sign out. Case-related notifications can let a user approve or reject work, and
Pulse notifications can accept a reply, directly from the notification without opening
the app; confirm which interactions the release owner has enabled before promising them.

To localize the app's built-in UI text, translate the Android `strings.xml` and iOS
`localizable.strings`/`localizable.stringsdict` template files for each target
language, package the translated files into a single archive, and upload that archive
as an Advanced Branding file on the Mobile channel. The device's locale controls which
translated file loads; the operator's locale still controls the remaining web-based
labels.

## Preview after meaningful changes

Install Pega Mobile Preview on the test device. In Studio, open the Mobile channel and
select the Preview icon. On the device, choose **Start configuring**, scan the QR code,
and open the channel from **Active**. If scanning is unavailable, use **Email me
instructions** in Studio and **Enter URL manually** in Preview.

Sign in as the intended persona and complete the selected journey. After a change,
swipe down to refresh the current screen; return to **Active** and reopen the channel
to reload all configuration. Preview is development-only, expires after 30 days, and
does not prove push, offline, signing, installation, upgrade, or production behavior.