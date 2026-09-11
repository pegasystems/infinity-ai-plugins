# Infinity AI Plugins

This repository packages Pega Infinity AI plugins for multiple AI clients. It contains the client-specific plugin payloads, marketplace layouts, and checked-in runtime and skills artifacts for producing installable artifacts.

## Prerequisites

- Java 17 or later is required to run the bundled MCP server.

## Supported Pega Infinity Versions

[Pega Documentation - Developing applications with external agents](https://docs.pega.com/bundle/platform/page/platform/gen-ai/building-pega-through-mcp.html)

- Pega Infinity 26.1+
- Pega Infinity 25.1.3+ (please contact [Pega Support](https://pegasupport.pega.com))
- Pega Infinity 24.2.5+ (please contact [Pega Support](https://pegasupport.pega.com))

## Install From Marketplace

For clients that support installing a marketplace from a git path, use this repository as source.

| Agent | CLI command |
| --- | --- |
| Claude Code | `claude plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `claude plugin install pega-infinity-authoring@Pega` |
| GitHub Copilot CLI | `copilot plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `copilot plugin install pega-infinity-authoring@Pega`  <br> * Restart Copilot CLI for the plugin changes to take effect |
| Codex | `codex plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `codex plugin add pega-infinity-authoring@Pega`<br> Alternatively, launch `codex`, type `/plugins`, navigate to `Pega`, and install `Pega Infinity Authoring` |

Alternatively, you can use SSH git URLs such as `git@github.com:pegasystems/infinity-ai-plugins.git`.

## Manual Setup

For the following clients, we do not currently provide a marketplace plugin in this repository. Clone the repository and configure the MCP server and skills manually.

| Agent | Setup instructions |
| --- | --- |
| Devin | Configure the bundled MCP server in Devin's MCP metadata and copy the shared Pega skills into a Devin skill directory. See [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md). |
| opencode | Merge the `mcp` block from `plugins/pega/infinity-ai-plugins/opencode/opencode.json` into your `opencode.json`, setting `cwd` to the absolute path of the sibling `claude/` directory. Copy `plugins/pega/infinity-ai-plugins/opencode/skills/` into `.opencode/skills/` in your project. See [opencode setup instructions](plugins/pega/infinity-ai-plugins/opencode/README.md). |


## Update Marketplace Install

When this repository publishes a newer plugin build, refresh the installed plugin from the same marketplace source.

| Agent | Update steps |
| --- | --- |
| Claude Code | Run `claude plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `claude plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Run `/reload-plugins` or start a new Claude session afterward. |
| GitHub Copilot CLI | Run `copilot plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `copilot plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Quit and reopen Copilot CLI afterward. |
| Codex | Run `codex plugin marketplace upgrade Pega` to refresh the marketplace catalog.<br>Then run `codex plugin add pega-infinity-authoring@Pega` to refresh the installed plugin, or use the `/plugins` browser to reinstall it from `Pega`.<br>Start a new Codex session afterward. |

## Update Manual Setup

| Agent | Update steps |
| --- | --- |
| Devin | Run `git pull` in the cloned repository, then start a new Devin session. Recopy the shared Pega skills if they changed. See [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md). |
| opencode | Run `git pull` in the cloned repository to get the latest files. Restart opencode afterward. |

> [!TIP]
> Adding the marketplace from this repository or cloning this repository can fail with a long-path error saying "Filename too long". If that happens, enable Git long-path support and retry:

```bash
git config --system core.longpaths true
```

## Setup After Install

Claude Code, GitHub Copilot CLI, and Codex plugins ship with a built-in
`pega-setup` skill for first-time configuration and troubleshooting. Devin and OpenCode users
can install the same shared skills using the [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md)
and [OpenCode setup instructions](plugins/pega/infinity-ai-plugins/opencode/README.md).

After installing a marketplace plugin or completing manual setup, start a new session and ask the assistant to run
`pega-setup`.

The skill:

- checks whether the plugin runtime is available and whether a remote Pega Infinity connection is configured
- guides the user through setting up Pega Infinity base URL, optional OAuth client ID, and write-access
- verifies the connection after configuration

When setting `pega_base_url`, use the environment root URL only. Do not include `/prweb` or any other path segment.

## Local Skills Override

To test local `infinity-skills` with Claude Code, GitHub Copilot CLI, or Codex, set the `pega_skills_path` entry in `~/.infinity-rules-mcp/config.json` or `%USERPROFILE%\.infinity-rules-mcp\config.json` to the parent directory containing the version directories before starting the client.

```json
{
  "pega_base_url": "https://example.pega.example.com",
  "pega_skills_path": "/path/to/infinity-skills"
}
```

Point `pega_skills_path` at the parent directory containing the selected version directory, and set
`pega_infinity_version` to the matching directory name.

If `pega_skills_path` is missing or empty, the plugin uses the normal bundled or cached skills payload.
