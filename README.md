# Infinity AI Plugins

This repository packages Pega Infinity AI plugins for multiple AI clients. It contains the client-specific plugin payloads, marketplace layouts, and checked-in bootstrap metadata for producing installable artifacts.

## Prerequisites

- Java 17 or later is required to run the bundled bootstrap launcher and MCP server.

## Supported Pega Infinity Versions

- Pega Infinity 26.1+
- Pega Infinity 25.1.3+ (consult Pega)
- Pega Infinity 24.2.5+ (consult Pega)

## Install From This Repository

For clients that support installing a marketplace from a git path, use this repository as the marketplace source.

| Agent | CLI command |
| --- | --- |
| Claude Code | `claude plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `claude plugin install pega-infinity-authoring@Pega` |
| GitHub Copilot CLI | `copilot plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `copilot plugin install pega-infinity-authoring@Pega`  <br> * Restart Copilot CLI for the plugin changes to take effect |
| Codex | `codex plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `codex plugin add pega-infinity-authoring@Pega`<br> Alternatively, launch `codex`, type `/plugins`, navigate to `Pega`, and install `Pega Infinity Authoring` |
| opencode | Clone this repository, then merge the `mcp` block from `plugins/pega/infinity-ai-plugins/opencode/opencode.json` into your `opencode.json` (setting `cwd` to the absolute path of the `opencode/` directory). Copy `plugins/pega/infinity-ai-plugins/opencode/skills/` into `.opencode/skills/` in your project. See `plugins/pega/infinity-ai-plugins/opencode/README.md` for full setup instructions. |

Alternatively, you can use SSH git URLs such as `git@github.com:pegasystems/infinity-ai-plugins.git`.

## Update An Existing Install

When this repository publishes a newer plugin build, refresh the installed plugin from the same marketplace source.

| Agent | Update steps |
| --- | --- |
| Claude Code | Run `claude plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `claude plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Run `/reload-plugins` or start a new Claude session afterward. |
| GitHub Copilot CLI | Run `copilot plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `copilot plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Quit and reopen Copilot CLI afterward. |
| Codex | Run `codex plugin marketplace upgrade Pega` to refresh the marketplace catalog.<br>Then run `codex plugin add pega-infinity-authoring@Pega` to refresh the installed plugin, or use the `/plugins` browser to reinstall it from `Pega`.<br>Start a new Codex session afterward. |
| opencode | Run `git pull` in the cloned repository to get the latest files. Restart opencode afterward. |

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

- checks whether the plugin runtime is available and whether a remote Pega Infinity connection is configured
- guides the user through setting up Pega Infinity base URL, optional OAuth client ID, and write-access
- verifies the connection after configuration

When setting `pega_base_url`, use the environment root URL only. Do not include `/prweb` or any other path segment.

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
