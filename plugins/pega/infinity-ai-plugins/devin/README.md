# Pega Infinity Authoring for Devin CLI

Devin supports the Pega Infinity Authoring MCP server through manual MCP and skill setup. It reuses the bundled MCP runtime and skills from the `claude/` directory in this repository.

## Prerequisites

- Java 17 or later must be installed and available as `java` in the environment where Devin runs the MCP server.
- Clone this repository where Devin can access it.
- Configure the target Pega Infinity environment URL and version.

## 1. Add the MCP server

Add the following server to Devin's MCP metadata file. Use a project-level `.devin/mcp_config.json` to share non-sensitive configuration with a project, or a user-level file to make the server available to all projects:

- macOS and Linux: `~/.config/devin/mcp_config.json`
- Windows: `%APPDATA%\devin\mcp_config.json` (open the Run dialog with Windows + R and enter `%appdata%`)

Use absolute paths and replace the placeholder values:

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/claude/resources/infinity-rules-mcp.jar",
        "--spring.profiles.active=stdio"
      ],
      "env": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/claude/resources"
      }
    }
  }
}
```

`PEGA_SKILLS_PATH` must point to the `resources/` directory, not a version-specific subdirectory. The MCP runtime uses the configured Infinity version to select the bundled skills.

## 2. Configure the Pega connection

Create or update the MCP runtime configuration file:

- macOS and Linux: `~/.infinity-rules-mcp/config.json`
- Windows: `%USERPROFILE%\.infinity-rules-mcp\config.json`

```json
{
  "pega_base_url": "https://your-pega-environment.example.com",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Set `pega_infinity_version` to the directory name that matches the target environment:

- Pega Infinity 24.2: `24-2`
- Pega Infinity 25.1: `25-1`
- Pega Infinity 26.1: `26-1`
- Pega Infinity 27.1: `27-1`

The MCP runtime reads the Pega connection settings from this file. Set `pega_base_url` to the Pega environment root URL only; do not include `/prweb` or another path segment. Use a different `pega_oauth_client_id` only when the Pega environment requires a custom client ID.

## 3. Install the Devin skills

Copy the shared Pega setup and assistant skills into a Devin skill discovery path. For a project, use `.devin/skills/`; to make the skills available globally, use `~/.config/devin/skills/` on macOS or Linux, or `%APPDATA%\devin\skills\` on Windows. If `skills` directory does not exist already, please create a new directory. 

From the repository root, copy the following directories:

```text
plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-setup
plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-assistant
```

For example, for project-level skills on macOS or Linux:

```bash
mkdir -p .devin/skills
cp -r plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-setup .devin/skills/
cp -r plugins/pega/infinity-ai-plugins/claude/claude-skills/pega-assistant .devin/skills/
```

The MCP server also exposes version-specific Pega authoring skills through its `list-skills` and `get-skill` tools. The copied Devin skills guide initial configuration and general Pega assistance.

## 4. Verify the setup

Start a new Devin session after changing MCP metadata or skills. Confirm that the `pega-infinity-authoring` MCP server is enabled, then ask Devin to use the `pega-setup` skill. Verify the local runtime and remote Pega connection separately:

1. Use `list-skills` to confirm the bundled Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Devin can connect to the configured Pega environment.

If the server does not start, run `java -version` to confirm that Java 17 or later is available. Also confirm that the JAR path exists and that `PEGA_SKILLS_PATH` points to the repository's `claude/resources/` directory.

## Updating

Run `git pull` in the cloned repository, keep the MCP JAR and skills paths pointed at that clone, and start a new Devin session. Recopy the two shared skill directories if they changed.

For Devin MCP metadata locations and configuration details, see the [Devin MCP configuration documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration.md). For Devin skill discovery paths, see the [Devin Skills documentation](https://docs.devin.ai/product-guides/skills.md).
