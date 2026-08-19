---
name: pega-setup
description: Use when the GitHub Copilot CLI plugin needs connection setup help, environment configuration, or troubleshooting. Guides first-time setup, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for use with GitHub Copilot CLI.

## Overview

The Pega MCP server requires a connection to a Pega Infinity environment.

The plugin supplies the bundled skills parent directory through `PEGA_SKILLS_PATH`. The shared
config should explicitly set `pega_infinity_version` to `26-1` for a 26.1 environment, even though
the runtime defaults to that version when the key is omitted.
Do not ask users to set `pega_skills_path` for normal bundled use.

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`
- Infinity 27.1 -> `27-1`

This Copilot setup flow is OAuth-only:

1. **OAuth** (Recommended): Token-based authentication
   - No password management required
   - Use `34233104330833666523` as the standard client ID

This is an interactive step-by-step guide. The agent detects the user's current configuration and provides tailored instructions, but **never asks for or handles secrets directly** - users add connection values to the config file or environment variables themselves. Make this clear to the user whenever secrets come up.

## Step 1: Check Existing Configuration

Check whether a connection is already configured.

First, try calling `list-skills`. If it succeeds, the bundled plugin runtime and local skills are available.
Do not treat this as proof that the remote Pega environment is reachable or configured. Check the
configuration separately even when `list-skills` succeeds.

Use a presence-only check. Never print the contents of the config file into the session transcript:

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

**Interpretation:**

- Treat `pega_base_url` / `PEGA_BASE_URL` as configured only if the value is non-empty, not a placeholder such as `<paste-your-pega-url-here>`, and uses the environment root URL without `/prweb`
- Treat `pega_oauth_client_id` / `PEGA_OAUTH_CLIENT_ID` as configured when it is the standard value `34233104330833666523` or an explicitly required custom value
- Treat `pega_infinity_version` as configured only if it exactly matches `24-2`, `25-1`, `26-1`, or `27-1`.
- Values in `~/.infinity-rules-mcp/config.json` take precedence over `PEGA_*` environment variables.

**Partial Configuration Handling:**

- User wants to update the base URL or other connection settings -> skip to Step 3
- Everything is configured -> continue to Step 4 to verify the remote connection

## Step 2: Confirm Setup Inputs

If no valid configuration exists, confirm the user has:

- the Pega base URL, for example `https://example.pega.net` or `https://example.pega.example.com`
- use the environment root URL only; do not include `/prweb` or any other path segment
- the Infinity version to use: 24.2 (`24-2`), 25.1 (`25-1`), 26.1 (`26-1`), or 27.1 (`27-1`)

Use the standard OAuth client ID shown in the template. Only use a different client ID if the user
explicitly says their environment requires a custom override.

## Step 3: Configure Connection

**Do not ask for or handle secrets** - provide exact instructions so the user can add connection values directly.

### Option A: Config File (recommended, persistent, shared across all Infinity Rules MCP clients)

First ensure the config directory exists:

```bash
mkdir -p ~/.infinity-rules-mcp
```

Instruct the user to create or edit `~/.infinity-rules-mcp/config.json` directly with:

```json
{
  "pega_base_url": "<paste-your-pega-url-here>",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

The plugin supplies the bundled skills parent directory automatically. `26-1` selects the bundled
`resources/26-1/` directory. The runtime defaults to `26-1` when the key is omitted, but keep it
explicit for a deterministic setup.

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
export PEGA_OAUTH_CLIENT_ID="34233104330833666523"
export PEGA_INFINITY_VERSION="26-1"
```

After creating the file:

```bash
chmod 600 ~/.pega-env
```

Detect the user's shell and profile file by running `echo $SHELL`, then instruct them to add `source ~/.pega-env` to their profile (e.g. `~/.zshrc`, `~/.bashrc`).

⚠️ `~/.pega-env` is stored in plaintext. Do not commit it to version control.

**Priority order:** Non-empty values in `~/.infinity-rules-mcp/config.json` override environment
variables. Use the environment-variable path when no conflicting config-file value is present.

Proceed to Step 4 (Verify and Next Steps).

## Step 4: Verify and Next Steps

### 4.1: Restart the Session

The user must fully restart the Copilot CLI session for changes to take effect:

- **If using config file**: Quit and reopen Copilot CLI
- **If using env vars**: Reload the shell profile first (`source ~/.zshrc` or equivalent), then restart Copilot CLI from that same terminal

### 4.2: Verify Connection

After restart, verify two things separately:

1. Call `list-skills` to confirm the bundled plugin runtime and local skills are available.
2. Call `list-available-applications` or `get-application` to confirm the remote Pega environment is reachable with the configured base URL.

**Expected results:**

- `list-skills` returns available bundled Pega runtime skills.
- `list-available-applications` or `get-application` returns application data from the target Pega environment.

**If verification fails**, check:

- Is the base URL correct, reachable from this machine, and set to the environment root URL without `/prweb`?
- If the environment requires a non-default OAuth client ID, was that override configured in the config file?
- Is Java 17+ installed and on the PATH? (`java -version`)

### 4.3: Verify Configuration Is Loaded

The presence-only check in Step 1 shows whether each key is set, never its value. If a config-file
value is present, it is the value the runtime uses even when an environment variable is also set.

### 4.4: Next Steps

1. **Confirm remote app context**: Call `list-available-applications` to see available applications
2. **Load runtime skills**: Call `list-skills` then `get-skill` to load Pega-specific guidance
3. **For authoring changes**: Use `get-skill("recipes/change-request-workflow")` to learn the authoring workflow

## Troubleshooting

- **Server won't start**: Check that Java is installed (`java -version`). The bundled server requires Java 17+.
- **Connection refused**: Verify the base URL is correct, uses the environment root URL without `/prweb` or other path segments, and the Pega environment is accessible from this machine.
- **Authentication failed**: Confirm the base URL and standard OAuth client ID. If the environment requires a custom client ID, set `pega_oauth_client_id` in the config file or the environment when no conflicting config value exists.
- **Tools not appearing after config change**: Fully restart the Copilot CLI session (quit and reopen). If still missing, confirm `PEGA_CLIENT_MODE=copilot-plugin` is set and the installed plugin contains the manifest for the configured version.
- **Config file not loading**: Ensure `~/.infinity-rules-mcp/config.json` is valid JSON. Check for trailing commas or missing quotes.
- **Variables not appearing after `source`**: Check the profile file path and confirm the file was saved.
- **Env vars vs config file**: Non-empty config-file values take priority over `PEGA_*` environment variables. Remove stale config values or update the file when changing the effective connection.
- **Permission denied on config file**: Run `chmod 600 ~/.infinity-rules-mcp/config.json` and ensure the file is owned by your user.
- **fish/PowerShell**: Syntax differs - use `set -x` (fish) or `$env:` (PowerShell) instead of `export`.
