---
name: pega-setup
description: Use when the GitHub Copilot CLI plugin needs connection setup help, environment configuration, or troubleshooting. Guides first-time setup, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for use with GitHub Copilot CLI.

## Overview

The Pega MCP server requires a connection to a Pega Infinity environment.

This Copilot setup flow is OAuth-only:

1. **OAuth** (Recommended): Token-based authentication
   - No password management required
   - No client ID setup required in the normal path

This is an interactive step-by-step guide. The agent detects the user's current configuration and provides tailored instructions, but **never asks for or handles credentials directly** - users add connection values to the config file or environment variables themselves. Make this clear to the user whenever credentials come up.

## Step 1: Check Existing Configuration

Check whether a connection is already configured.

First, try calling `list-skills`. If it succeeds, the connection is working - confirm this to the user and skip to Step 4.

If `list-skills` fails or is unavailable, check for existing configuration:

```bash
cat ~/.infinity-rules-mcp/config.json 2>/dev/null | grep -E 'pega_(base_url|oauth_client_id)'
```

Also check for environment variables:

```bash
[ -n "${PEGA_BASE_URL:-}" ] && printf 'PEGA_BASE_URL=[set]\n'
[ -n "${PEGA_OAUTH_CLIENT_ID:-}" ] && printf 'PEGA_OAUTH_CLIENT_ID=[set]\n'
```

**Interpretation:**

- Treat `pega_base_url` / `PEGA_BASE_URL` as configured only if the value is non-empty and not a placeholder such as `<paste-your-pega-url-here>`
- If `pega_oauth_client_id` / `PEGA_OAUTH_CLIENT_ID` is present, treat it as an advanced override rather than a required setup field

**Partial Configuration Handling:**

- User wants to update the base URL or other connection settings -> skip to Step 3
- Everything is configured and working -> skip to Step 4

## Step 2: Confirm Setup Inputs

If no valid configuration exists, confirm the user has:

- the Pega base URL, for example `https://example.pega.net`

Do not ask the user to set an OAuth client ID in the normal flow. The MCP server provides the default client ID automatically.

Only surface `pega_oauth_client_id` / `PEGA_OAUTH_CLIENT_ID` if the user explicitly says their environment requires a custom override.

## Step 3: Configure Connection

**Do not ask for or handle credentials** - provide exact instructions so the user can add connection values directly.

### Option A: Config File (recommended, persistent, shared across all Infinity Rules MCP clients)

First ensure the config directory exists:

```bash
mkdir -p ~/.infinity-rules-mcp
```

Instruct the user to create or edit `~/.infinity-rules-mcp/config.json` directly with:

```json
{
  "pega_base_url": "<paste-your-pega-url-here>"
}
```

After creating the file, instruct the user to restrict permissions:

```bash
chmod 600 ~/.infinity-rules-mcp/config.json
```

⚠️ `~/.infinity-rules-mcp/config.json` is stored in plaintext. Do not commit it to version control.

### Option B: Environment Variables (for temporary or CI sessions)

Instruct the user to export variables in their shell profile. Store values in a dedicated file, not directly in the shell profile:

**For the connection (`~/.pega-env`):**

```bash
export PEGA_BASE_URL="<paste-your-pega-url-here>"
```

After creating the file:

```bash
chmod 600 ~/.pega-env
```

Detect the user's shell and profile file by running `echo $SHELL`, then instruct them to add `source ~/.pega-env` to their profile (e.g. `~/.zshrc`, `~/.bashrc`).

⚠️ `~/.pega-env` is stored in plaintext. Do not commit it to version control.

**Priority order:** Environment variables override config file values.

Proceed to Step 4 (Verify and Next Steps).

## Step 4: Verify and Next Steps

### 4.1: Restart the Session

The user must fully restart the Copilot CLI session for changes to take effect:

- **If using config file**: Quit and reopen Copilot CLI
- **If using env vars**: Reload the shell profile first (`source ~/.zshrc` or equivalent), then restart Copilot CLI from that same terminal

### 4.2: Verify Connection

After restart, call `list-skills` to confirm the connection works.

**Expected result:** A list of available Pega runtime skills is returned.

**If verification fails**, check:

- Is the base URL correct and reachable from this machine?
- If the environment requires a non-default OAuth client ID, was that override configured?
- Is Java 17+ installed and on the PATH? (`java -version`)

### 4.3: Verify Configuration Is Loaded

```bash
[ -n "${PEGA_BASE_URL:-}" ] && printf 'PEGA_BASE_URL=[set]\n'
[ -n "${PEGA_OAUTH_CLIENT_ID:-}" ] && printf 'PEGA_OAUTH_CLIENT_ID=[set]\n'
```

Expected output shows the configured keys with values redacted to `[set]`. If nothing appears, check that credentials were saved and the profile was reloaded.

### 4.4: Next Steps

1. **Explore the environment**: Call `list-available-applications` to see available applications
2. **Load runtime skills**: Call `list-skills` then `get-skill` to load Pega-specific guidance
3. **For authoring changes**: Use `get-skill("recipes/change-request-workflow")` to learn the authoring workflow

## Troubleshooting

- **Server won't start**: Check that Java is installed (`java -version`). The bundled server requires Java 17+.
- **Connection refused**: Verify the base URL is correct, does not include extra path segments such as `/prweb`, and the Pega environment is accessible from this machine.
- **Authentication failed**: The default OAuth client ID should work in the normal flow. If the environment requires a custom client ID, set `pega_oauth_client_id` or `PEGA_OAUTH_CLIENT_ID` as an override.
- **Tools not appearing after config change**: Fully restart the Copilot CLI session (quit and reopen). If still missing, confirm `PEGA_CLIENT_MODE=copilot-plugin` is set and `resources/pega-skills/manifest.json` exists in the installed plugin directory.
- **Config file not loading**: Ensure `~/.infinity-rules-mcp/config.json` is valid JSON. Check for trailing commas or missing quotes.
- **Variables not appearing after `source`**: Check the profile file path and confirm the file was saved.
- **Env vars vs config file**: Environment variables (`PEGA_*`) take priority over `~/.infinity-rules-mcp/config.json`. If both are set, env vars win.
- **Permission denied on config file**: Run `chmod 600 ~/.infinity-rules-mcp/config.json` and ensure the file is owned by your user.
- **fish/PowerShell**: Syntax differs - use `set -x` (fish) or `$env:` (PowerShell) instead of `export`.
