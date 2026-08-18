---
name: pega-setup
description: Use when the bundled Pega Infinity Authoring Codex plugin needs setup, authentication help, or troubleshooting. Confirm the plugin MCP server first, then verify the bundled runtime and skills payload.
---

# Pega Setup

Use this skill when the user needs to configure or troubleshoot the Codex plugin for
`pega-infinity-authoring`.

## Setup Rules

1. Treat the plugin-bundled MCP server as the source of truth for how the bundled server starts.
2. Prefer checking Codex MCP configuration first before suggesting manual edits.
3. Confirm the bundled runtime uses `resources/infinity-rules-mcp.jar` and bundled skills under
   `resources/<infinity-version>/`.
4. Use OAuth for authentication with the standard client ID `34233104330833666523`.
5. If the runtime exposes setup or auth helper tools, use them before suggesting manual env
   changes.
6. Treat `pega_base_url` / `PEGA_BASE_URL` as the Pega environment root URL only; do not include `/prweb` or any other path segment.
7. Let the plugin supply `PEGA_SKILLS_PATH` for the bundled skills parent directory; do not ask users to set `pega_skills_path` for normal bundled use.
8. Set `pega_infinity_version` explicitly to `26-1` for a 26.1 environment. Use the version mapping above and the exact bundled directory name.
9. Separate local plugin validation from remote Pega validation: `list-skills` confirms bundled skills availability, while `list-available-applications` or `get-application` confirms remote connectivity.
10. Treat non-empty values in `~/.infinity-rules-mcp/config.json` as higher priority than `PEGA_*` environment variables.

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`
- Infinity 27.1 -> `27-1`

## Check Existing Configuration

Call `list-skills` first to confirm the plugin runtime and bundled skills are available. Then use this
presence-only check; never print the config contents into the session transcript:

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

Treat the base URL as configured only when it is a real environment root URL without `/prweb` or
another path segment. Treat the version as configured only when it exactly matches a bundled version.

## Config File

Create or edit `~/.infinity-rules-mcp/config.json`:

```json
{
  "pega_base_url": "<paste-your-pega-url-here>",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

The plugin supplies the bundled skills parent directory. `26-1` selects `resources/26-1/`.
The runtime defaults to `26-1` when the version is omitted, but keep the key explicit for a deterministic
setup.

Keep this file private because it is stored in plaintext:

```bash
chmod 600 ~/.infinity-rules-mcp/config.json
```

Restart Codex after changing the file. If `PEGA_*` variables are also set, the non-empty config-file
values take precedence.

## Troubleshooting Focus

- confirm the plugin MCP server is installed and enabled
- confirm bundled skills are discoverable through `list-skills`
- confirm remote Pega connectivity through `list-available-applications` or `get-application`
- confirm `pega_base_url` / `PEGA_BASE_URL` uses the environment root URL without `/prweb`
- confirm the bundled plugin resources contain the manifest for the configured version
- confirm `java` is available on the machine running Codex
- confirm the bundled Codex skills are visible in `/skills` or plugin invocation
- confirm stale `PEGA_*` environment variables are not being mistaken for the effective values; the config file wins
