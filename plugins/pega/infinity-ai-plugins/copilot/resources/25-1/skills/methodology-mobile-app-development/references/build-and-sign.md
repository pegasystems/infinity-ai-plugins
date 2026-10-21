---
name: build-and-sign-mobile-app
description: Load when preparing a signed mobile app package for a Mobile channel in Pega Infinity versions earlier than 26. Covers preview limits, build prerequisites, and signing identity.
---

## Preview, build, and sign

Use the available Pega mobile preview capability for development only. A preview does
not prove signing, installation, push, offline, upgrade, or production authentication.

### Pre-build gate: configure signing before requesting a build

Complete the following in order. A Pega administrator owns server-level settings; an
Apple Developer account holder or signing owner creates Apple assets. Do not proceed to
package generation until the checks at the end of each phase pass.

#### 1. Freeze the application identity and release target

1. Record the Pega application and version, Mobile channel, display name, unique
	package/bundle identifier, target Pega host, authentication redirect, target OS,
	distribution purpose, and named owners for build, signing, and release.
2. Decide whether the iOS artifact is for development on registered test devices,
	limited/ad hoc distribution, or a store/organization-managed release. The profile
	type and eligible devices depend on this choice; do not create a development profile
	for a production release.
3. Freeze the identifier before creating Apple signing assets. The identifier in
	Apple's App ID, the Pega channel/build configuration, and the final app must match.

#### 2. Configure and verify Mobile Build Service

1. Confirm that you have access to **Admin Studio**. If you do not have Mobile Build
	Service credentials, ask your Pega client representative to request the account name
	and API key through My Support Portal; do not substitute personal or unrelated
	credentials.
2. In Admin Studio's navigation pane, select **Mobile > Settings**.
3. In **Mobile app build server**, enter the Mobile Build Service account name and API
	key supplied for this environment.
4. Leave **Require login for mobile app download** selected unless the application
	security owner explicitly approves downloads without login.
5. Select **Save**. Pega stores the account and encrypted API key in the
	`pega/mobilebuild/server/account` and `pega/mobilebuild/server/encrypted_key`
	dynamic system settings. Do not edit these values directly to bypass Admin Studio.
6. Confirm the setting is saved in the intended environment. For Pega Cloud, outbound
	access to the build server is available. For client-managed deployments, every Pega
	node used to generate apps needs outbound connectivity to the Pega Mobile Build
	Service; the service does not need inbound access to your network. If builds fail
	to connect, ask the platform/network administrator to check outbound access and
	required firewall exceptions before continuing.

#### 3. Set and approve default mobile app security

Pega's documented defaults are **Pega Platform account authentication** and **native
biometrics/device lock after 30 minutes of inactivity**. Before generating the app,
review these defaults with the application security owner. Pega allows changing the
authentication and app-lock settings before generation; for example, a team might
temporarily disable the lock for a test build and re-enable it before deployment.
Record approved changes and do not ship a test-only relaxation to production.

#### 4. Create the iOS provisioning profile

An iOS provisioning profile authorizes an app identifier to run or distribute under a
particular Apple team and signing certificate. It is not itself the signing certificate.
Before creating it, have the Apple account holder confirm access to the Apple Developer
Portal, the App ID, and a signing certificate whose type matches the profile type.

##### Create or locate the App ID

1. Sign in to the Apple Developer Portal and open **Certificates, Identifiers &
	Profiles > Identifiers**.
2. Select **+**, choose **App IDs**, and continue to register one.
3. Enter an identifying description. Choose **Explicit** for a single app, then enter
	the unique reverse-domain bundle ID frozen in step 1. Apple also offers wildcard
	IDs for multiple apps, but wildcard IDs do not support every capability (including
	push notifications); use one only if it is appropriate for the app.
4. Select only the capabilities the app requires and the organization approves. If
	providing deployment details, choose the applicable volume, distribution method,
	security mechanism, and audience, confirm their accuracy, then continue.
5. Review the App ID and select **Register**. Confirm it appears under Identifiers.

##### Create or locate the signing certificate

1. On a Mac, open **Keychain Access**. Choose **Keychain Access > Certificate
	Assistant > Request a Certificate from a Certificate Authority**.
2. Enter the requested email address and common name, choose **Saved to disk**, then
	continue and save the certificate signing request (CSR).
3. In the Apple Developer Portal, open **Certificates**, select **+**, and choose the
	certificate type matching the purpose: **Apple Development** for development;
	**iOS Distribution (App Store and Ad Hoc)** for distribution through the Apple
	Developer Program; or **In-House and Ad Hoc** for the Apple Developer Enterprise
	Program.
4. Continue, upload the CSR, generate the certificate, and download the resulting
	`.cer` file. Double-click the `.cer` file to add it to Keychain Access.
5. In Keychain Access, locate the certificate together with its private key, right-
	click it, and export it as **Personal Information Exchange (.p12)**. Protect the
	export with a strong password and store both file and password using approved
	secret storage. Pega's certificate-set upload expects the `.p12` file.
6. If Pega Platform's Highly Secure Crypto Mode is enabled, follow Pega's documented
	PKCS #12 conversion procedure for AES-256-CBC before uploading; do not assume an
	unconverted `.p12` will be accepted.

##### Generate the provisioning profile

1. In the Apple Developer Portal, open **Certificates, Identifiers & Profiles >
	Profiles**, select **+**, and choose the profile type: **iOS App Development** for
	development, **Ad Hoc** for limited distribution to registered devices, **App
	Store** for App Store distribution, or **In House** for organization distribution
	under the Enterprise program.
2. Continue, select the App ID, and continue to **Select Certificates**. For a
	development profile, select the development certificate(s); for a distribution
	profile, select its distribution certificate.
3. For a development profile, select the registered test devices to include, then
	continue. (Apple's documented device-selection step applies to development
	profiles.)
4. Enter a profile name, select **Generate**, then **Download** and save the
	`.mobileprovision` file. Keep it with the corresponding certificate set inputs in
	approved storage.

For Android, use the organization's approved Android signing key/keystore and
credentials instead; an Apple provisioning profile is not used.

#### 5. Create the iOS certificate set in Pega and verify the gate

Pega requires a certificate set before package generation. For a signed iOS app, the
set contains the bundle ID, signing certificate, and provisioning file; add a push
notification certificate only when push is needed and the profile supports it.

1. In Pega Infinity Studio, open **Configure > Mobile > Certificates**.
2. Select **Add certificate set**, then choose **iOS**.
3. Under **Mobile provisioning file**, select an uploaded `.mobileprovision` file or
	select **New > Choose file** to upload it. Enter a profile name and select **OK**.
	Pega's profile-name field does not allow underscore, hyphen, or period characters.
4. If the profile uses a wildcard App ID, enter the app's unique bundle identifier in
	**App ID (Bundle ID)**.
5. Under **Signing certificate**, select an existing certificate or select **New >
	Choose file** to upload the `.p12`. Enter a certificate name and the `.p12`
	encryption password, then select **OK**. The certificate name also cannot contain
	underscore, hyphen, or period characters.
6. Optional: for push notifications, select or upload the push certificate `.p12` and
	enter its encryption password. Pega only shows this area when the provisioning
	profile supports push notifications.
7. Select **Save**. Confirm the completed certificate set is available for the target
	app and distribution purpose.

For a locally signed iOS package or a policy that prohibits uploading signing material,
use Pega's documented unsigned iOS certificate-set/local signing path instead of
uploading company certificates to a third-party service.

Before building, verify the build-service credentials are saved in the target
environment; mobile security defaults are reviewed; the App ID/bundle ID matches; the
profile type matches the intended distribution; and the selected profile and signing
certificate are compatible and current. Only then continue.

#### 6. Build the signed mobile app

1. In Pega Infinity Studio, select **Channels**, then the **Configure** icon. Under
	**Current Channels**, open the tile for the app's Mobile channel.
2. In the mobile preview, select **Build iOS app** or **Build Android app**.
3. In **Certificate set**, select the completed set. For an unsigned iOS archive that
	will be signed locally, select an unsigned iOS certificate set.
4. Choose the logging level appropriate for the build. Do not enable Android debugging
	for a production app. For Google Play distribution, select **Build Android App
	Bundle (Google Play)**. Preserve compatible debug-signing choices when updating an
	existing Android app.
5. Optionally select **Set explicit build version** and enter the required version/build
	number. Otherwise, Pega starts at `0.0.1` and increments the final number on rebuild.
6. Select **Build app**. Follow the status icon until the build completes; a warning
	icon means the previous build failed. After a successful build, use the displayed
	QR code or shareable app link to download the package.

Rebuild after every Mobile channel configuration change. Test the exact signed package
on representative physical devices before distribution.

If a required control or signing input is unavailable, stop and ask the Pega
administrator or Apple signing owner to complete it. Do not submit a build with
placeholder credentials, a profile for another app, or an unapproved certificate.

#### First-build troubleshooting

| Build result or symptom | Check first |
|---|---|
| Build service cannot be reached | Target environment, configured service endpoint/credentials, network access, and service status with the Pega administrator |
| iOS profile is rejected or app cannot be installed | Bundle identifier, team, profile type/expiry, certificate match, and registered device UDID when the profile requires devices |
| Signing identity is missing or invalid | Certificate validity and presence of its private key; confirm the configured export/password through the signing owner, never in chat |
| App installs but sign-in fails | Target host, redirect, selected authentication service, and saved default/channel security settings |
| Build succeeds but device capability is unavailable | App ID capability, approved channel configuration, OS permission, and denied-permission behavior |

Follow current Pega and Apple documentation for release-specific control labels,
eligible profile types, and submission requirements. Preserve package identity and
signing identity across upgrades. Test the exact signed artifact on representative
physical devices.

Never request or expose private keys, certificate passwords, API keys, or provisioning
secrets in chat.
