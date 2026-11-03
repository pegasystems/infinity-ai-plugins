---
name: pega-setup
description: >-
  Use this skill when the user wants to configure, verify, update, or troubleshoot the Pega Infinity
  Authoring plugin connection in Google Antigravity, check Node.js and Java 17+ prerequisites,
  prefetch the Pega MCP runtime cache, or resolve OAuth and connection issues.
---

# Pega Setup (Google Antigravity)

Guide the user interactively through setting up and verifying the **Pega Infinity Authoring** (`pega-infinity-authoring`) plugin across Windows, macOS, and Linux.

## Key Guardrails

1. **Zero secret exposure**: Never read, `cat`, `Get-Content`, or print `~/.infinity-rules-mcp/config.json`, `oauth-session.json`, or `~/.pega-env` into the transcript. Always use [pega-doctor.mjs](./scripts/pega-doctor.mjs) for redacted presence-only diagnostics.
2. **Host root URL only**: `pega_base_url` must be the Pega environment root origin (e.g., `https://myorg.pega.net`) — **never** include `/prweb` or any path, query, or credentials.
3. **Standard OAuth 2.0 flow**: Default `pega_oauth_client_id` to `34233104330833666523`. Do not ask the user to invent a client ID; only override it if their Pega administrator explicitly mandates a custom OAuth client registration.
4. **Explicit Infinity version mapping**: Always set `pega_infinity_version` explicitly to match the target platform:
   - Pega Infinity 24.2.5+ -> `24-2`
   - Pega Infinity 25.1.3+ -> `25-1`
   - Pega Infinity 26.1+ -> `26-1`
5. **Managed skills path**: Let `@pega/infinity-authoring-plugin` manage `PEGA_SKILLS_PATH` automatically. Never ask the user to export `PEGA_SKILLS_PATH` in their shell.

---

## Step 1: Run Cross-Platform Preflight Diagnostics

Run the bundled Node.js diagnostic utility (resolving the path relative to this skill folder):

```bash
node "<path-to-this-skill>/scripts/pega-doctor.mjs" check --json
```

Also attempt calling the MCP tool `list-skills` if the `pega-infinity-authoring` MCP server is already active in this session:
- `list-skills` succeeding proves the local Java MCP server and cached Pega skills are running.
- `list-skills` succeeding does **not** prove remote Pega connectivity — still inspect the `pega-doctor.mjs` report!

---

## Step 2: Resolve Missing Prerequisites & Prefetch Runtime

Based on the `pega-doctor.mjs` JSON report:

1. **Node.js (`>= 22.14.0`)**: Must be `ok: true`.
2. **Java (`>= 17`)**:
   - If `java.ok` is `false` and `java.candidates` lists a discovered JDK 17+ on the machine, instruct the user to either add that JDK's `bin` directory to `PATH` or set `INFINITY_JAVA_BIN` to that `java` / `java.exe` binary.
   - If no JDK 17+ is installed, provide the OS-specific install command from `java.remediation` (e.g., `winget install --id EclipseAdoptium.Temurin.21.JDK -e` on Windows or `brew install --cask temurin@21` on macOS).
3. **Pre-download Runtime Cache (`~40 MB`)**:
   - If `config.cacheReady` is `false`, run:
     ```bash
     node "<path-to-this-skill>/scripts/pega-doctor.mjs" prefetch
     ```
   - This downloads and SHA-256-verifies `infinity-rules-mcp` and `infinity-skills` ahead of time so Antigravity's MCP startup never times out on first launch.

---

## Step 3: Configure Target Pega Environment

Confirm two non-secret inputs with the user if not already configured:
- **Pega root URL** (e.g., `https://example.pega.net`, without `/prweb`)
- **Pega Infinity version** (`24-2`, `25-1`, or `26-1`)

### Option A: Shared Config File (Recommended)

Instruct the user to run `pega-doctor.mjs configure` in their terminal (or run it on their behalf with their explicit confirmation):

```bash
node "<path-to-this-skill>/scripts/pega-doctor.mjs" configure --url "https://your-pega-host.example.com" --version "26-1"
```

Alternatively, the user may create/edit `~/.infinity-rules-mcp/config.json` (`%USERPROFILE%\.infinity-rules-mcp\config.json` on Windows) directly:

```json
{
  "pega_base_url": "https://your-pega-host.example.com",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Then lock file permissions with:

```bash
node "<path-to-this-skill>/scripts/pega-doctor.mjs" harden-permissions
```

### Option B: Environment Variables (CI or Ephemeral Sessions)

Non-empty values in `~/.infinity-rules-mcp/config.json` always take priority over `PEGA_*` environment variables. When no config file is used, the user can set:
- `PEGA_BASE_URL`
- `PEGA_OAUTH_CLIENT_ID` (`34233104330833666523`)
- `PEGA_INFINITY_VERSION` (`24-2`, `25-1`, or `26-1`)

---

## Step 4: Restart Session & Verify Two-Stage Connectivity

1. **Restart / Reload**: After installing the plugin, installing Java, or updating `~/.infinity-rules-mcp/config.json`, ask the user to restart their Antigravity session so the `pega-infinity-authoring` MCP process launches with the updated configuration.
2. **Stage A — Local Runtime Check**: Call `list-skills` to verify the MCP server started and loaded the configured version's Pega runtime skills.
3. **Stage B — Remote Pega Check**: Call `list-available-applications` or `get-application` to trigger OAuth authentication (if needed) and confirm live connectivity to the target Pega Infinity environment.
4. **Operator Write-Access Check (For Rule Authoring)**: Remind the user that to create or update rules in branches (`create-rule`, `update-rule`, `copy-rule`), their Pega Operator ID must have **Allow rule check out** enabled on the **Security** tab in Dev Studio (along with an unlocked branch or permission to create branches).

If any step fails, consult [troubleshooting.md](./references/troubleshooting.md) for targeted diagnostics.
