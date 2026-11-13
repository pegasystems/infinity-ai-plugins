---
name: pega-setup
description: Use when the bundled Infinity Authoring Antigravity plugin or manual MCP setup needs configuration, authentication help, or troubleshooting. Confirm the MCP server first, then verify the runtime and skills payload.
---

# Pega Setup

Use this skill when the user needs to configure or troubleshoot Google Antigravity for
`pega-infinity-authoring`.

## Setup Rules

1. Treat the active MCP configuration (plugin `mcp_config.json` or global `~/.gemini/config/mcp_config.json`) as the source of truth for how the server starts.
2. Prefer checking Antigravity's installed plugin (`agy plugin list` or `/plugin`) and MCP server status (`/mcp` in CLI, or **Customizations > Installed > MCP Servers** in the App) before suggesting manual edits.
3. If using the plugin, confirm it starts the pinned npm launcher (`@pega/infinity-authoring-plugin`), which downloads and verifies the runtime and skills on first use. If using the manual Java-only setup, confirm `java -jar` and `PEGA_SKILLS_PATH` point to the downloaded release assets.
4. Use OAuth for authentication with the standard client ID `34233104330833666523` unless the user explicitly states their environment requires a custom override.
5. If the runtime exposes setup or auth helper tools, use them before suggesting manual env changes.
6. Treat `pega_base_url` / `PEGA_BASE_URL` as the Pega environment root URL only; do not include `/prweb` or any other path segment.
7. Let the plugin supply `PEGA_SKILLS_PATH` when using the `npx` launcher; only set `PEGA_SKILLS_PATH` explicitly in manual Java-only setups (pointing to the parent directory containing `24-2`, `25-1`, and `26-1`).
8. Set `pega_infinity_version` explicitly (`24-2`, `25-1`, or `26-1`).
9. Separate local runtime validation from remote Pega validation: `list-skills` confirms bundled skills availability, while `list-available-applications` or `get-application` confirms remote connectivity.
10. Treat non-empty values in `~/.infinity-rules-mcp/config.json` (Windows: `%USERPROFILE%\.infinity-rules-mcp\config.json`) as higher priority than `PEGA_*` environment variables.
11. **Do not attempt remote Pega calls (`list-available-applications` or `get-application`) until all required configuration keys are verified as present in Step 1 or confirmed with the user in Step 2.**

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`

## Step 1: Check Existing Configuration

First, call `list-skills` to confirm the local MCP runtime and bundled skills are available. Do not
treat `list-skills` as proof that the remote Pega environment is configured or reachable.

Next, run a presence-only check on `~/.infinity-rules-mcp/config.json` (Windows:
`%USERPROFILE%\.infinity-rules-mcp\config.json`). **Never print the contents of `config.json` into
the session transcript.**

On macOS or Linux:

```bash
config="$HOME/.infinity-rules-mcp/config.json"
if [ -f "$config" ]; then
    printf 'config.json: present\n'
    grep -qE '"pega_base_url"[[:space:]]*:' "$config" && printf 'pega_base_url: [set]\n' || printf 'pega_base_url: [missing]\n'
    grep -qE '"pega_oauth_client_id"[[:space:]]*:' "$config" && printf 'pega_oauth_client_id: [set]\n' || printf 'pega_oauth_client_id: [missing]\n'
    grep -qE '"pega_infinity_version"[[:space:]]*:' "$config" && printf 'pega_infinity_version: [set]\n' || printf 'pega_infinity_version: [missing]\n'
    [ "$(stat -c '%a' "$config" 2>/dev/null)" = "600" ] && printf 'permissions: restricted\n' || printf 'permissions: check chmod 600\n'
else
    printf 'config.json: missing\n'
fi
```

On Windows (PowerShell):

```powershell
$config = Join-Path $HOME ".infinity-rules-mcp\config.json"
if (Test-Path $config) {
    Write-Output "config.json: present"
    if (Select-String -Path $config -Pattern '"pega_base_url"\s*:' -Quiet) { Write-Output "pega_base_url: [set]" } else { Write-Output "pega_base_url: [missing]" }
    if (Select-String -Path $config -Pattern '"pega_oauth_client_id"\s*:' -Quiet) { Write-Output "pega_oauth_client_id: [set]" } else { Write-Output "pega_oauth_client_id: [missing]" }
    if (Select-String -Path $config -Pattern '"pega_infinity_version"\s*:' -Quiet) { Write-Output "pega_infinity_version: [set]" } else { Write-Output "pega_infinity_version: [missing]" }
} else {
    Write-Output "config.json: missing"
}
```

**Gate before remote validation:**
- If `config.json` is `missing`, **or** any of `pega_base_url`, `pega_oauth_client_id`, or
  `pega_infinity_version` is `[missing]`, **or** the user asks to update connection settings:
  **STOP here and do NOT call `list-available-applications` or `get-application` yet.** Proceed to
  Step 2 and ask the user for the missing or updated inputs first.
- Only if all three keys are `[set]` (with a valid environment root URL without `/prweb` and a
  supported version `24-2`, `25-1`, or `26-1`) and the user does not want to change settings,
  proceed to Step 3 to verify remote connectivity.

## Step 2: Confirm Setup Inputs & Configure The Connection

Ask the user to confirm:

1. **`pega_base_url`**: The Pega environment root URL (for example `https://example.pega.net`),
   without `/prweb` or any other path segment.
2. **`pega_infinity_version`**: Which Infinity version their environment runs — `24-2` (24.2),
   `25-1` (25.1), or `26-1` (26.1).
3. **`pega_oauth_client_id`**: Whether to use the standard client ID `34233104330833666523` or a
   custom OAuth client ID override required by their environment.

Do not invent or assume these values without asking the user first.

Once confirmed, guide the user to create or edit `~/.infinity-rules-mcp/config.json` (Windows:
`%USERPROFILE%\.infinity-rules-mcp\config.json`):

```json
{
  "pega_base_url": "<paste-your-pega-url-here>",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Keep this file private because it is stored in plaintext (and never commit it to version control):

```bash
chmod 600 ~/.infinity-rules-mcp/config.json
```

## Step 3: Reload & Verify Connection

### 3.1 Restart the MCP Server

After creating or updating `~/.infinity-rules-mcp/config.json`, restart the MCP server for changes
to take effect:

- **Antigravity CLI**: Run `/mcp` and restart `pega-infinity-authoring`, or start a new `agy` session.
- **Antigravity App**: Go to **Customizations > Installed > MCP Servers > Restart**, or start a new session.
- **Antigravity IDE**: Open **... > MCP Servers > Manage MCP Servers** and restart/reload, or start a new window.

### 3.2 Verify Local & Remote Connectivity

Verify two things separately:

1. Call `list-skills` to confirm the runtime and bundled skills for the configured version are loaded.
2. Call `list-available-applications` or `get-application` to trigger browser OAuth sign-in (if not
   already authenticated) and confirm the remote Pega environment is reachable.

## Troubleshooting Focus

- confirm the plugin is installed and enabled (`agy plugin list` or `/plugin`), or that the manual server is listed (`agy mcp list`)
- confirm the `pega-infinity-authoring` MCP server is active (`/mcp` in CLI, **Customizations > Installed > MCP Servers** in App, or **... > MCP Servers** in IDE)
- confirm bundled skills are discoverable through `list-skills`
- confirm remote Pega connectivity through `list-available-applications` or `get-application`
- confirm `pega_base_url` / `PEGA_BASE_URL` uses the environment root URL without `/prweb`
- confirm `pega_infinity_version` is a supported version, and that Node.js 22.14+ and GitHub access are available for the first-start download (when using the `npx` plugin)
- confirm `java` 17+ is available on the machine running Antigravity
- confirm the skills are visible in `/skills` or via `/pega-setup` and `/pega-assistant`
- confirm stale `PEGA_*` environment variables are not being mistaken for the effective values; the config file wins
