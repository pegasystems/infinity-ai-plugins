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
3. Confirm the bundled runtime uses `resources/infinity-rules-mcp.jar` and bundled
   skills under `resources/pega-skills/`.
4. Use OAuth for authentication.
5. If the runtime exposes setup or auth helper tools, use them before suggesting manual env
   changes.
6. Treat `pega_base_url` / `PEGA_BASE_URL` as the Pega environment root URL only; do not include `/prweb` or any other path segment.
7. Separate local plugin validation from remote Pega validation: `list-skills` confirms bundled skills availability, while `list-available-applications` or `get-application` confirms remote connectivity.

## Troubleshooting Focus

- confirm the plugin MCP server is installed and enabled
- confirm bundled skills are discoverable through `list-skills`
- confirm remote Pega connectivity through `list-available-applications` or `get-application`
- confirm `pega_base_url` / `PEGA_BASE_URL` uses the environment root URL without `/prweb`
- confirm `java` is available on the machine running Codex
- confirm the bundled Codex skills are visible in `/skills` or plugin invocation
