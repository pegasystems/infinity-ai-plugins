# Pega Infinity Authoring plugins



Pega Infinity Authoring plugins connect development environments to Pega MCP, enabling you to build Pega applications from a development environment of your choice. By making internal assets available to external tools and agents, Pega is evolving its low-code approach to make application development more automated and accessible to users with different tool preferences.

The repository contains client-specific plugin payloads, marketplace layouts, and checked-in run-time artifacts and skills for producing installable packages.

## Contents

- [Prerequisites](#prerequisites)
- [Supported Pega Infinity versions](#supported-pega-infinity-versions)
- [Installing the plugin from the marketplace](#installing-the-plugin-from-the-marketplace)
- [Setting up the plugin manually](#setting-up-the-plugin-manually)
- [Setting up the plugin after installation](#setting-up-the-plugin-after-installation)
- [Updating marketplace installations](#updating-marketplace-installations)
- [Updating manual installations](#updating-manual-installations)
- [Overriding local skills](#overriding-local-skills)
- [Documentation](#documentation)

## Prerequisites

You need Java 17 or newer to run the bundled MCP server.

## Supported Pega Infinity versions

- Pega Infinity 26.1+
- Pega Infinity 25.1.3+ (contact [Pega Support](https://pegasupport.pega.com))
- Pega Infinity 24.2.5+ (contact [Pega Support](https://pegasupport.pega.com))

## Installing the plugin from the marketplace

Use this repository as the source when you install a marketplace from a Git path. The following table lists marketplace plugins and commands:

| Agent | CLI command |
| --- | --- |
| Claude Code | `claude plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `claude plugin install pega-infinity-authoring@Pega` |
| GitHub Copilot CLI | `copilot plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `copilot plugin install pega-infinity-authoring@Pega`  <br> * Restart Copilot CLI for the plugin changes to take effect |
| Codex | `codex plugin marketplace add https://github.com/pegasystems/infinity-ai-plugins.git`<br> `codex plugin add pega-infinity-authoring@Pega`<br> Alternatively, launch `codex`, type `/plugins`, navigate to `Pega`, and install `Pega Infinity Authoring` |

Alternatively, you can use SSH Git URLs such as `git@github.com:pegasystems/infinity-ai-plugins.git`.

## Setting up the plugin manually

Clone the repository, and then configure the MCP server and skills manually. The following table lists setup instructions for clients without a marketplace plugin:

| Agent | Setup instructions |
| --- | --- |
| Devin | Configure the bundled MCP server in Devin's MCP metadata and copy the shared Pega skills into a Devin skill directory. See [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md). |
| opencode | Merge the `mcp` block from `plugins/pega/infinity-ai-plugins/opencode/opencode.json` into `opencode.json`. Set `cwd` to the absolute path of the sibling `claude/` directory. Copy `plugins/pega/infinity-ai-plugins/opencode/skills/` into `.opencode/skills/` in your project. See [opencode setup instructions](plugins/pega/infinity-ai-plugins/opencode/README.md). |

## Setting up the plugin after installation

Claude Code, GitHub Copilot CLI, and Codex plugins include a built-in
`pega-setup` skill for first-time configuration and troubleshooting.

Devin and opencode users can install the same shared skills by following the [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md) and [opencode setup instructions](plugins/pega/infinity-ai-plugins/opencode/README.md).

After installing a marketplace plugin or completing manual setup, start a new session and ask the assistant to run
`pega-setup`.

The `pega-setup` skill:

- Checks whether the plugin run time is available and whether the client can connect to Pega Infinity
- Guides the user through setting up the Pega Infinity base URL, optional OAuth client ID, and write access
- Verifies the connection after configuration

When setting `pega_base_url`, use the environment root URL only. Do not include `/prweb` or any other path segment.

## Updating marketplace installations

When this repository publishes a new plugin build, refresh the installed plugin from the marketplace. The following table lists the update commands:

| Agent | Update steps |
| --- | --- |
| Claude Code | Run `claude plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `claude plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Run `/reload-plugins` or start a new Claude session afterward. |
| GitHub Copilot CLI | Run `copilot plugin marketplace update Pega` to refresh the marketplace catalog.<br>Then run `copilot plugin update pega-infinity-authoring@Pega` to update the installed plugin.<br>Quit and reopen Copilot CLI afterward. |
| Codex | Run `codex plugin marketplace upgrade Pega` to refresh the marketplace catalog.<br>Then run `codex plugin add pega-infinity-authoring@Pega` to refresh the installed plugin, or use the `/plugins` browser to reinstall it from `Pega`.<br>Start a new Codex session afterward. |

## Updating manual installations

To update a manual installation, follow these steps:

| Agent | Update steps |
| --- | --- |
| Devin | Run `git pull` in the cloned repository, then start a new Devin session. Recopy the shared Pega skills if they changed. See [Devin setup instructions](plugins/pega/infinity-ai-plugins/devin/README.md). |
| opencode | Run `git pull` in the cloned repository to get the latest files. Restart opencode afterward. |

> [!TIP]
> If adding the marketplace or cloning this repository fails with a "Filename too long" error, enable Git long-path support:

```bash
git config --system core.longpaths true
```

## Overriding local skills

To test local `infinity-skills` with Claude Code, GitHub Copilot CLI, or Codex, set the `pega_skills_path` entry to the parent directory that contains the version directories. Set the entry in `~/.infinity-rules-mcp/config.json` or `%USERPROFILE%\.infinity-rules-mcp\config.json` before you start the client.

```json
{
  "pega_base_url": "https://example.pega.example.com",
  "pega_skills_path": "/path/to/infinity-skills"
}
```

Point `pega_skills_path` at the parent directory that contains the selected version directory, and set
`pega_infinity_version` to the matching directory name.

If `pega_skills_path` is missing or empty, the plugin uses the bundled or cached skills payload.

## Documentation

For more information, see:

- [Pega Documentation - Developing applications with external agents](https://docs.pega.com/bundle/platform/page/platform/gen-ai/building-pega-through-mcp.html)
