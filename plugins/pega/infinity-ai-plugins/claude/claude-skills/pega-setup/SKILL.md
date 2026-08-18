---
description: Use when the user needs to configure, reconfigure, or troubleshoot the Pega Infinity Authoring plugin connection. Guides first-time setup, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for use with Claude Code.

## Overview

The Claude plugin uses an OAuth-based connection flow. The shared configuration should contain:

1. `pega_base_url` - the Pega environment root URL
2. `pega_oauth_client_id` - use `34233104330833666523` unless the environment requires a custom override
3. `pega_infinity_version` - use the exact bundled version, normally `26-1`

The plugin sets `PEGA_SKILLS_PATH` to its bundled `resources` directory. Do not ask users to set
`pega_skills_path` for normal bundled use.

The MCP server defaults `pega_oauth_client_id` to `34233104330833666523`, but keep that value in the
config file so the setup is explicit and portable. Do not ask the user to invent or provide a client
ID. Only replace the standard value if the user explicitly says their environment requires a custom
override.

The runtime defaults to `26-1` when no version is set, but this skill should still guide users to set
`pega_infinity_version` explicitly so the selected skills are unambiguous.

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`
- Infinity 27.1 -> `27-1`

This is an interactive step-by-step guide. The agent detects the user's current configuration and provides tailored instructions.

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

- Treat `pega_base_url` as configured only if it is non-empty, not a placeholder such as `<paste-your-pega-url-here>`, and uses the environment root URL without `/prweb`.
- Treat `pega_oauth_client_id` as configured when it is the standard value `34233104330833666523` or an explicitly required custom value.
- Treat `pega_infinity_version` as configured only if it exactly matches one of the bundled directory names: `24-2`, `25-1`, `26-1`, or `27-1`.
- Values in `~/.infinity-rules-mcp/config.json` take precedence over `PEGA_*` environment variables, including values supplied by Claude plugin configuration.

**Partial Configuration Handling:**

- User wants to update the base URL or other connection settings: skip to Step 2
- Everything is configured: continue to Step 3 to verify the remote connection

## Step 2: Configure The Connection

Confirm the user has:

- the Pega base URL, for example `https://example.pega.net` or `https://example.pega.example.com`
- use the environment root URL only; do not include `/prweb` or any other path segment
- the Infinity version to use: 24.2 (`24-2`), 25.1 (`25-1`), 26.1 (`26-1`), or 27.1 (`27-1`)

Use the standard OAuth client ID shown in the template. Only use a different
`pega_oauth_client_id` if the user explicitly says their environment requires a custom override.

### Option A: Config File

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

`~/.infinity-rules-mcp/config.json` is stored in plaintext. Do not commit it to version control.

### Option B: Claude `/plugin` UI

Alternatively, the user can set the connection URL through the Claude `/plugin` management UI:

1. Run `/plugin` in Claude
2. Select the Pega Infinity Authoring plugin
3. Fill in `pega_base_url` and leave the OAuth client ID at its standard default

The plugin passes these UI values as `PEGA_BASE_URL` and `PEGA_OAUTH_CLIENT_ID`.
If `~/.infinity-rules-mcp/config.json` contains non-empty values, those config-file values win.

Set `pega_infinity_version` in the config file; it is not a Claude `/plugin` UI field. Reload the
plugin after changing either source.

## Step 3: Verify And Next Steps

### 3.1 Reload The Plugin

The user must reload for changes to take effect:

- Run `/reload-plugins` in Claude

### 3.2 Verify Connection

After reload, verify two things separately:

1. Call `list-skills` to confirm the bundled plugin runtime and local skills are available.
2. Call `list-available-applications` or `get-application` to confirm the remote Pega environment is reachable with the configured base URL.

Expected results:

- `list-skills` returns available bundled Pega runtime skills.
- `list-available-applications` or `get-application` returns application data from the target Pega environment.
- The selected version's bundled manifest is available under the plugin's `resources/<version>/manifest.json` directory.

If verification fails, check:

- Is the base URL correct, reachable from this machine, and set to the environment root URL without `/prweb`?
- If the environment requires a non-default OAuth client ID, was that override configured in the config file?
- Is Java 17+ installed and on the PATH? (`java -version`)

### 3.3 Next Steps

1. Call `list-available-applications` to see available applications
2. Call `list-skills` then `get-skill` to load Pega-specific guidance
3. If the user plans to author changes, use `get-skill("recipes/change-request-workflow")` to learn the authoring workflow

## Troubleshooting

- **Server won't start**: Check that Java is installed (`java -version`). The bundled server requires Java 17+.
- **Connection refused**: Verify the base URL is correct, uses the environment root URL without `/prweb` or other path segments, and the Pega environment is accessible from this machine.
- **Authentication failed**: Confirm the base URL and standard OAuth client ID. If the environment requires a custom client ID, set `pega_oauth_client_id` in the config file.
- **Tools not appearing after config change**: Run `/reload-plugins`. If still missing, check that the installed plugin contains `resources/26-1/manifest.json` or the manifest for the configured version.
- **Config file not loading**: Ensure `~/.infinity-rules-mcp/config.json` is valid JSON. Check for trailing commas or missing quotes.
- **Both config file and `/plugin` UI set**: Non-empty values in `~/.infinity-rules-mcp/config.json` take priority over the UI values, which are passed as `PEGA_*` environment variables.
- **Permission denied on config file**: Run `chmod 600 ~/.infinity-rules-mcp/config.json` and ensure the file is owned by your user.
