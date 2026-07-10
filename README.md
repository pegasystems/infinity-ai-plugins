# Infinity AI Plugins

This repository packages Pega Infinity AI plugins for multiple AI clients. It contains the client-specific plugin payloads, marketplace layouts, and checked-in bootstrap metadata for producing installable artifacts.

## Prerequisites

- Java 17 or later is required to run the bundled bootstrap launcher and MCP server.

## Supported Pega Infinity Versions

- Pega Infinity 26.1
- Pega Infinity 25.1.3 (consult Pega)
- Pega Infinity 24.2.5 (consult Pega)

## Install From This Repository

For clients that support installing a marketplace from a git path, use this repository as the marketplace source.

| Agent | CLI command |
| --- | --- |
| Claude Code | `claude plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `claude plugin install pega-infinity-authoring@Pega` |
| GitHub Copilot CLI | `copilot plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `copilot plugin install pega-infinity-authoring@Pega`  <br> * Restart copilot for the plugin changes to take effect |
| Codex | `codex plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br>Launch `codex`<br>Type `/plugins`<br>Navigate to `Pega` and install `Pega Infinity Authoring` plugin |

Alternatively, you can use SSH git URLs such as `git@github.com:pegasystems/infinity-ai-plugins.git`.

> [!TIP]
> Adding the marketplace from this repository can fail with a long-path error saying "Filename too long". If that happens, enable Git long-path support and retry:


```bash
git config --system core.longpaths true
```

## Setup After Install

Claude Code, GitHub Copilot CLI, and Codex plugins ship with a built-in
`pega-setup` skill for first-time configuration and troubleshooting.

After the plugin is installed, start a new session and ask the assistant to run
`pega-setup`.

The skill:

- checks whether a Pega Infinity connection is already configured
- guides the user through setting up Pega Infinity base URL, optional OAuth client ID, and write-access
- verifies the connection after configuration

## Local Skills Override

To test local `infinity-skills` with Claude Code, GitHub Copilot CLI, or Codex, set the `pega_skills_path` entry in `~/.infinity-rules-mcp/config.json` or `%USERPROFILE%\.infinity-rules-mcp\config.json` to the directory that contains `manifest.json` before starting the client.

```json
{
  "pega_base_url": "https://example.pega.example.com",
  "pega_skills_path": "/path/to/infinity-skills"
}
```

Point `pega_skills_path` at the directory that contains `manifest.json`.

If `pega_skills_path` is missing or empty, the plugin uses the normal bundled or cached skills payload.
