# Pega Infinity Authoring for Devin

This directory is the Devin plugin for Pega Infinity Authoring. It works in the Devin CLI, Devin Desktop, and Devin Cloud sessions.

The plugin bundles:

- the `infinity-rules-mcp` run time JAR, started as the `pega-infinity-authoring` MCP server
- the Pega skills payloads for versions `24-2`, `25-1`, and `26-1`
- the Devin `pega-assistant` and `pega-setup` skills

## Prerequisites

- Install Java 17 or later and make it available as `java` on the machine that runs the Devin session. For Devin Cloud, add Java 17 or later to the environment blueprint.
- Have the target Pega Infinity environment URL and version ready.

## 1. Install the plugin

Install the plugin at the repository root. It requires `pega-infinity-authoring`, so Devin installs both:

```bash
devin plugins install pegasystems/infinity-ai-plugins
```

To install only this directory:

```bash
devin plugins install pegasystems/infinity-ai-plugins#plugins/pega/infinity-ai-plugins/devin
```

In the Devin web app, open **Customize > Plugins > Add plugin > From repository**, enter `pegasystems/infinity-ai-plugins`, and set the subdirectory to `plugins/pega/infinity-ai-plugins/devin`.

Installed plugins sync to your Devin CLI, Devin Desktop, and Devin Cloud sessions. Use `--local` to install on the current machine only, for example to test a local clone:

```bash
devin plugins install --local ./plugins/pega/infinity-ai-plugins/devin
```

## 2. Configure the Pega connection

For the Devin CLI and Devin Desktop, create or update the MCP run-time configuration file:

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

Set `pega_base_url` to the Pega environment root URL only; do not include `/prweb` or another path segment. Use a different `pega_oauth_client_id` only when the Pega environment requires a custom client ID.

The plugin also passes `PEGA_BASE_URL` and `PEGA_INFINITY_VERSION` to the MCP server:

- In the Devin CLI and Devin Desktop, these values come from the environment that launched Devin.
- In Devin Cloud, where the configuration file is not available, open **Customize > MCPs**, select `pega-infinity-authoring`, choose **Connect**, and enter the values there.

`PEGA_OAUTH_CLIENT_ID` is inherited from the environment when it is set; otherwise the standard client ID is used. Non-empty values in `~/.infinity-rules-mcp/config.json` take precedence over all of these variables.

The OAuth sign-in opens a browser on the machine that runs the MCP server. In a Devin Cloud session, complete the sign-in in the session browser.

## 3. Verify the setup

Start a new Devin session, then run `/pega-infinity-authoring:pega-setup`. Verify the local run time and remote Pega connection separately:

1. Use `list-skills` to confirm the bundled Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Devin can connect to the configured Pega environment.

If the server does not start, run `java -version` to confirm that Java 17 or later is available, and run `devin plugins info pega-infinity-authoring` to confirm that the plugin and its MCP server are installed.

## Updating

Run `devin plugins update`, and then start a new Devin session. Devin Cloud sessions fetch the latest plugin version when they start.

## Manual setup

If your organization disables Devin plugins, clone this repository and configure the MCP server and skills manually.

Add the following server to Devin's MCP configuration file. Use a project-level `.devin/mcp_config.json`, or a user-level file to make the server available to all projects:

- macOS and Linux: `~/.config/devin/mcp_config.json`
- Windows: `%APPDATA%\devin\mcp_config.json`

Use absolute paths:

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/devin/resources/infinity-rules-mcp.jar",
        "--spring.profiles.active=stdio"
      ],
      "env": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/infinity-ai-plugins/plugins/pega/infinity-ai-plugins/devin/resources"
      }
    }
  }
}
```

`PEGA_SKILLS_PATH` must point to the `resources/` directory, not a version-specific subdirectory.

Copy the `pega-setup` and `pega-assistant` skills into a Devin skill directory. For a project, use `.devin/skills/`. To make the skills available globally, use `~/.config/devin/skills/` on macOS or Linux, or `%APPDATA%\devin\skills\` on Windows:

```bash
mkdir -p .devin/skills
cp -r plugins/pega/infinity-ai-plugins/devin/skills/pega-setup .devin/skills/
cp -r plugins/pega/infinity-ai-plugins/devin/skills/pega-assistant .devin/skills/
```

Configure the Pega connection as described in step 2, start a new Devin session, and run `/pega-setup`. To update a manual setup, run `git pull`, copy the skills again if they changed, and start a new Devin session.

For more information, see the [Devin plugins documentation](https://docs.devin.ai/cli/extensibility/plugins/overview.md), the [Devin MCP configuration documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration.md), and the [Devin skills documentation](https://docs.devin.ai/product-guides/skills.md).
