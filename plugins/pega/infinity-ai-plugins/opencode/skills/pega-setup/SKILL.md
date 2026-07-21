---
name: pega-setup
description: Use when the Pega Infinity Authoring opencode MCP server needs setup, authentication help, or troubleshooting. Confirm the MCP server is running first, then verify the bundled runtime and skills payload.
---

# Pega Setup

Use this skill when the user needs to configure or troubleshoot the opencode MCP server for
`pega-infinity-authoring`.

## Setup Rules

1. Treat `opencode.json` as the source of truth for how the MCP server starts.
2. The MCP server uses `resources/infinity-rules-mcp.jar` and bundled skills under `resources/pega-skills/`.
3. Use OAuth for authentication.
4. If the runtime exposes setup or auth helper tools, use them before suggesting manual env changes.
5. Treat `PEGA_BASE_URL` as the Pega environment root URL only; do not include `/prweb` or any other path segment.
6. Separate local plugin validation from remote Pega validation: `list-skills` confirms bundled skills availability, while `list-available-applications` or `get-application` confirms remote connectivity.

## Configuration

The MCP server is configured via the `mcp` section of the project's `opencode.json` or the global `~/.config/opencode/opencode.json`.

### Minimum required fields

```json
{
  "mcp": {
    "pega-infinity-authoring": {
      "type": "local",
      "command": ["java", "-jar", "./resources/infinity-rules-mcp.jar", "--spring.profiles.active=stdio"],
      "cwd": "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/opencode",
      "environment": {
        "PEGA_SKILLS_PATH": "./resources/pega-skills",
        "PEGA_CLIENT_MODE": "opencode-plugin",
        "PEGA_BASE_URL": "https://your-pega-environment.example.com"
      },
      "enabled": true
    }
  }
}
```

Set `cwd` to the absolute path of the `opencode/` plugin directory. Set `PEGA_BASE_URL` to the environment root URL only — do not include `/prweb` or any other path segment.

### Applying configuration changes

Restart opencode after editing `opencode.json` for changes to take effect. There is no hot-reload for MCP server configuration.

## Troubleshooting Focus

- Confirm the MCP server is listed and enabled in opencode.
- Confirm `cwd` points to the correct absolute path of the `opencode/` plugin directory.
- Confirm `PEGA_BASE_URL` uses the environment root URL without `/prweb`.
- Confirm bundled skills are discoverable through `list-skills`.
- Confirm remote Pega connectivity through `list-available-applications` or `get-application`.
- Confirm `java` is available on the machine running opencode (`java -version`; requires Java 17+).

## Troubleshooting Common Issues

- **MCP server not appearing**: Check that `cwd` is set to the correct absolute path and the JAR exists at `<cwd>/resources/infinity-rules-mcp.jar`. Restart opencode.
- **Connection refused**: Verify `PEGA_BASE_URL` is correct, uses the environment root URL without `/prweb`, and the Pega environment is accessible from this machine.
- **Authentication failed**: The default OAuth client ID is provided automatically. If your environment requires a non-default client ID, set `PEGA_OAUTH_CLIENT_ID` in the `environment` block.
- **Java not found**: Install Java 17+ and ensure `java` is on the `PATH` used by opencode.
- **Skills not loading**: Confirm `PEGA_SKILLS_PATH` resolves to a directory containing `manifest.json`. With `cwd` set correctly, `./resources/pega-skills` should work without changes.
