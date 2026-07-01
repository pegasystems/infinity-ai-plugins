---
description: Use when the user needs to configure, reconfigure, or troubleshoot the Pega Infinity Authoring plugin connection. Guides first-time setup, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for use with Claude Code.

## Overview

The Claude plugin uses an OAuth-based connection flow. Users need:

1. `pega_base_url`

Do not ask the user to set `pega_oauth_client_id` in the normal flow. The MCP server provides the default client ID automatically. Only surface a custom client ID if the user explicitly says their environment requires a non-default override.

This is an interactive step-by-step guide. The agent detects the user's current configuration and provides tailored instructions.

## Step 1: Check Existing Configuration

Check whether a connection is already configured.

First, try calling `list-skills`. If it succeeds, the connection is working. Confirm this to the user and skip to Step 4.

If `list-skills` fails or is unavailable, check for existing configuration:

```bash
cat ~/.infinity-rules-mcp/config.json 2>/dev/null | grep -E 'pega_(base_url|oauth_client_id)'
```

**Interpretation:**

- Treat `pega_base_url` as configured only if the value is non-empty and not a placeholder such as `<paste-your-pega-url-here>`
- If `pega_oauth_client_id` is present, treat it as an advanced override rather than a required setup field

**Partial Configuration Handling:**

- User wants to update the base URL or other connection settings: skip to Step 2
- Everything is configured and working: skip to Step 4

## Step 2: Configure The Connection

Confirm the user has:

- the Pega base URL, for example `https://example.pega.net`

Do not ask the user to set an OAuth client ID in the normal flow. The MCP server provides the default client ID automatically.

Only surface `pega_oauth_client_id` if the user explicitly says their environment requires a custom override.

### Option A: Config File

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

`~/.infinity-rules-mcp/config.json` is stored in plaintext. Do not commit it to version control.

### Option B: Claude `/plugin` UI

Alternatively, the user can configure values through the Claude `/plugin` management UI:

1. Run `/plugin` in Claude
2. Select the Pega Infinity Authoring plugin
3. Fill in `pega_base_url`

Ignore `pega_oauth_client_id` unless the user explicitly needs a non-default override.

Values set via `/plugin` UI take priority over `~/.infinity-rules-mcp/config.json`.

## Step 3: Verify And Next Steps

### 3.1 Reload The Plugin

The user must reload for changes to take effect:

- Run `/reload-plugins` in Claude

### 3.2 Verify Connection

After reload, call `list-skills` to confirm the connection works.

Expected result: a list of available Pega runtime skills is returned.

If verification fails, check:

- Is the base URL correct and reachable from this machine?
- If the environment requires a non-default OAuth client ID, was that override configured?
- Is Java 17+ installed and on the PATH? (`java -version`)

### 3.3 Next Steps

1. Call `list-available-applications` to see available applications
2. Call `list-skills` then `get-skill` to load Pega-specific guidance
3. If the user plans to author changes, use `get-skill("recipes/change-request-workflow")` to learn the authoring workflow

## Troubleshooting

- **Server won't start**: Check that Java is installed (`java -version`). The bundled server requires Java 17+.
- **Connection refused**: Verify the base URL is correct, does not include extra path segments such as `/prweb`, and the Pega environment is accessible from this machine.
- **Authentication failed**: The default OAuth client ID should work in the normal flow. If the environment requires a custom client ID, set `pega_oauth_client_id` as an override.
- **Tools not appearing after config change**: Run `/reload-plugins`. If still missing, check that `resources/pega-skills/manifest.json` exists in the installed plugin directory.
- **Config file not loading**: Ensure `~/.infinity-rules-mcp/config.json` is valid JSON. Check for trailing commas or missing quotes.
- **Both config file and `/plugin` UI set**: Values from `/plugin` UI (passed as `CLAUDE_PLUGIN_OPTION_*` env vars) take priority over `~/.infinity-rules-mcp/config.json`.
- **Permission denied on config file**: Run `chmod 600 ~/.infinity-rules-mcp/config.json` and ensure the file is owned by your user.
