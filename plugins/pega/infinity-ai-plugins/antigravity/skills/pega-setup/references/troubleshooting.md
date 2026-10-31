# Pega Infinity Authoring — Deep-Dive Troubleshooting Reference

## 1. MCP Server Fails to Start

### Java 17+ Not Found on `PATH`
- **Symptom**: MCP server exits immediately on startup or `pega-doctor.mjs check` reports `java.ok: false`.
- **Cause**: `infinity-rules-mcp` is a Spring Boot JAR requiring Java 17 or newer. GUI apps (Antigravity App / IDE) or fresh shells may not inherit a newly installed JDK `PATH`.
- **Resolution**:
  - Windows: Install Eclipse Temurin 21 (`winget install --id EclipseAdoptium.Temurin.21.JDK -e`), then fully close and reopen Antigravity.
  - macOS: `brew install --cask temurin@21`.
  - Custom binary path without editing system `PATH`: Set `INFINITY_JAVA_BIN` to the full path of `java` / `java.exe` in your user environment variables or plugin `mcp_config.json` `env` block.

### First-Launch Timeout Downloading Artifacts (~40 MB)
- **Symptom**: MCP server times out during its very first startup on slow corporate networks.
- **Cause**: `@pega/infinity-authoring-plugin@0.2.1` downloads `infinity-rules-mcp` and `infinity-skills` from GitHub Releases on first launch and verifies their SHA-256 digests.
- **Resolution**: Pre-populate the cache outside the MCP timeout window:
  ```bash
  node "<plugin-root>/skills/pega-setup/scripts/pega-doctor.mjs" prefetch
  ```

### Stale Dependency Lock in `~/.infinity-rules-mcp/locks/`
- **Symptom**: Launcher reports `Timed out waiting for dependency lock` or `ambiguous ownership`.
- **Cause**: An interrupted first-time download left a stale directory under `~/.infinity-rules-mcp/locks/<hash>/`.
- **Resolution**: Confirm no `node` / `java` `infinity-rules-mcp` process is actively downloading, remove `~/.infinity-rules-mcp/locks/`, and re-run `prefetch`.

### `PEGA_SKILLS_PATH conflicts with the verified managed skills path`
- **Symptom**: Launcher aborts before starting Java with a `PEGA_SKILLS_PATH` conflict error.
- **Cause**: A shell or system environment variable `PEGA_SKILLS_PATH` is set from an older manual JAR setup.
- **Resolution**: Remove `PEGA_SKILLS_PATH` from your shell profile / Windows Environment Variables. If you intentionally need to test custom local Pega skills, set `"pega_skills_path"` inside `~/.infinity-rules-mcp/config.json` instead.

---

## 2. Remote Pega Connection & OAuth Failures

### `/prweb` Included in `pega_base_url`
- **Symptom**: Connection fails with `404`, redirect loops, or OAuth metadata discovery errors.
- **Cause**: `pega_base_url` contains `/prweb`, `/prweb/app/...`, or trailing path segments.
- **Resolution**: Set `pega_base_url` strictly to the scheme + host (and optional port), e.g., `https://myorg-dev.pega.net`. Re-validate with `pega-doctor.mjs check`.

### OAuth Browser Flow / Redirect Port Conflicts
- **Symptom**: Browser OAuth login fails to redirect back to localhost, or port is already bound.
- **Resolution**:
  - Verify `pega_oauth_client_id` is `34233104330833666523` (or your Pega admin's custom OAuth 2.0 client registration ID).
  - Ensure your Pega Infinity version meets minimum MCP support (`26.1+`, `25.1.3+`, or `24.2.5+`).
  - If the local OAuth callback port collides with another local service, set `PEGA_OAUTH_REDIRECT_PORT` to an open local port registered on the OAuth client record.

### Corporate TLS Inspection / Self-Signed Certificates
- **Symptom**: `prefetch` fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` (Node) or remote Pega calls fail with `PKIX path building failed` (Java).
- **Resolution**:
  - For Node.js (`prefetch`): Set `NODE_EXTRA_CA_CERTS` to your corporate root CA PEM bundle.
  - For Java (`infinity-rules-mcp`): Import your corporate root CA into the JDK `cacerts` truststore via `keytool -importcert -cacerts`.

---

## 3. Rule Write & Configuration Precedence Issues

### `Ruleset requires checkout, but user is not allowed to checkout` on Rule Writes
- **Symptom**: Read tools (`get-application`, `list-rules`, `get-rule`) succeed, but `create-rule`, `update-rule`, or `copy-rule` fails with `Ruleset requires checkout, but user is not allowed to checkout`.
- **Cause**: The authenticated Pega Operator ID does not have rule check-out enabled in Pega Platform.
- **Resolution**: In Pega Dev Studio, open your **Operator ID** record -> **Security** tab -> enable **Allow rule check out**, save the Operator record, and retry the branch rule write.

### Configuration Precedence Confusion
- **Symptom**: Updating `PEGA_BASE_URL` in your terminal has no effect.
- **Cause**: Any non-empty key in `~/.infinity-rules-mcp/config.json` (`%USERPROFILE%\.infinity-rules-mcp\config.json`) overrides `PEGA_*` environment variables.
- **Resolution**: Update `~/.infinity-rules-mcp/config.json` via `pega-doctor.mjs configure`, then restart your Antigravity session.
