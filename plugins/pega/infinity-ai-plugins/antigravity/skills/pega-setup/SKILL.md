---
name: pega-setup
description: Use when the bundled Infinity Authoring Antigravity plugin needs setup, authentication help, or troubleshooting. Confirm the plugin MCP server first, then verify the bundled runtime and skills payload.
---

# Pega Setup

Use this skill when the user needs to configure or troubleshoot the Antigravity plugin for
`pega-infinity-authoring`.

## Setup Rules

1. Treat the plugin-bundled MCP server as the source of truth for how the bundled server starts.
2. Prefer checking Antigravity MCP configuration (`mcp_config.json`) first before suggesting manual edits.
3. Confirm the plugin starts the pinned npm launcher, which downloads and verifies the runtime and skills on first use.
4. Use OAuth for authentication with the standard client ID `34233104330833666523` (or your registered Pega client ID).
5. If the runtime exposes setup or auth helper tools, use them before suggesting manual env changes.
6. Treat `pega_base_url` / `PEGA_BASE_URL` as the Pega environment root URL only; do not include `/prweb` or any other path segment.
7. Let the plugin supply `PEGA_SKILLS_PATH` for the bundled skills parent directory; do not ask users to set `pega_skills_path` for normal use.
8. Set `pega_infinity_version` explicitly to `26-1`, `25-1`, or `24-2` matching the target Pega Infinity environment.
9. Separate local plugin validation from remote Pega validation: `list-skills` confirms bundled skills availability, while `list-available-applications` or `get-application` confirms remote connectivity.
10. Treat non-empty values in `~/.infinity-rules-mcp/config.json` as higher priority than `PEGA_*` environment variables.

Supported Infinity versions map to bundled directory names as follows:

- Infinity 24.2 -> `24-2`
- Infinity 25.1 -> `25-1`
- Infinity 26.1 -> `26-1`

## Config File

Create or edit `~/.infinity-rules-mcp/config.json`:

```json
{
  "pega_base_url": "<paste-your-pega-url-here>",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "24-2"
}
```
