# Pega Infinity Authoring for Devin

This directory is the Devin plugin for Pega Infinity Authoring. It works in the Devin CLI, Devin Desktop, and Devin Cloud sessions.

The plugin contains:

- the `pega-infinity-authoring` MCP server declaration, which runs the [`@pega/infinity-rules-mcp`](../../../../packages/infinity-rules-mcp/README.md) npm package with `npx`
- the Devin `pega-assistant` and `pega-setup` skills

The plugin doesn't bundle the runtime. The npm package contains the `infinity-rules-mcp` run time JAR and the Pega skills payloads for versions `24-2`, `25-1`, and `26-1`. The plugin pins an exact package version, which always equals the plugin version. npm downloads the package and checks its integrity the first time that version starts, and later starts use the npm cache.

## Prerequisites

- Node.js 18 or later, which provides `npx`, on the machine that runs the Devin session.
- Java 17 or later. The launcher uses `PEGA_JAVA` if it's set, then `$JAVA_HOME/bin/java`, then `java` on the `PATH`.
- Access to the npm registry, or to the mirror configured in `.npmrc`, the first time a plugin version starts. The package is about 33 MB.
- The URL and version of the target Pega Infinity environment.

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

Start a new Devin session, then run `/pega-infinity-authoring:pega-setup`. Verify the local run time and the remote Pega connection separately:

1. Use `list-skills` to confirm that the run time started and its Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Devin can connect to the configured Pega environment.

If the server doesn't start:

1. Run `node --version` and `java -version` to confirm that Node.js 18 or later and Java 17 or later are available.
2. Run `devin plugins info pega-infinity-authoring` to confirm that the plugin and its MCP server are installed.
3. Start the run time directly to see its errors:

   ```bash
   npx -y @pega/infinity-rules-mcp@0.1.6 </dev/null
   ```

   The launcher prints one startup line on stderr. The command exits with code 0 when the run time works. npm errors such as `E404`, `E401`, or `ETIMEDOUT` mean that the package couldn't be downloaded; see [npm registries and mirrors](#npm-registries-and-mirrors).

## Devin Cloud

Devin Cloud sessions need Node.js 18 or later, Java 17 or later, and access to the npm registry or mirror. Devin's base image includes JDK 17. To avoid the download when a session starts, pre-warm the npm cache in the environment blueprint's `initialize` section, which is saved in the snapshot:

```yaml
initialize:
  - name: Install Node.js
    uses: github.com/actions/setup-node@v4
    with:
      node-version: "20"
  - name: Pre-warm Pega MCP runtime
    run: npx -y @pega/infinity-rules-mcp@0.1.6 </dev/null
```

Skip the Node.js step if your image already provides Node.js 18 or later. Update the pinned version in the pre-warm step when you update the plugin; if they differ, the session downloads the new version when it starts.

## npm registries and mirrors

The package is resolved like any other npm package, so corporate mirrors such as Artifactory or Nexus work through the standard `.npmrc` settings:

```ini
@pega:registry=https://your-mirror.example.com/api/npm/npm/
```

For offline or air-gapped machines, populate the npm cache in advance with `npm cache add @pega/infinity-rules-mcp@0.1.6`, or run the pre-warm command above.

## Java options

| Variable | Purpose |
| --- | --- |
| `PEGA_JAVA` | Full path of the `java` executable to use. |
| `PEGA_JAVA_OPTS` | JVM options, for example `-Xmx1g`, proxy settings, or a truststore. Takes precedence over `JAVA_OPTS`. |
| `JAVA_OPTS` | JVM options, used when `PEGA_JAVA_OPTS` isn't set. |

In the Devin CLI and Devin Desktop, set these variables in the environment that launches Devin.

## Windows

On Windows, `npx` is the `npx.cmd` script. If the Devin CLI can't start the server on Windows, use the [manual setup](#manual-setup) with `"command": "cmd"` and `"args": ["/c", "npx", "-y", "@pega/infinity-rules-mcp@0.1.6"]`.

## Updating

Run `devin plugins update`, and then start a new Devin session. Devin Cloud sessions fetch the latest plugin version when they start. A plugin update pins a new run time version, which npm downloads the first time it starts.

If you're upgrading from plugin 0.1.5, which downloaded the run time with `bin/start-mcp.sh`, you can delete `~/.infinity-rules-mcp/runtime/`. The plugin doesn't use it anymore. `~/.infinity-rules-mcp/config.json` is unchanged.

## Manual setup

If your organization disables Devin plugins, configure the MCP server and skills manually.

Add the following server to Devin's MCP configuration file. Use a project-level `.devin/mcp_config.json`, or a user-level file to make the server available to all projects:

- macOS and Linux: `~/.config/devin/mcp_config.json`
- Windows: `%APPDATA%\devin\mcp_config.json`

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "npx",
      "args": ["-y", "@pega/infinity-rules-mcp@0.1.6"],
      "env": {
        "PEGA_CLIENT_MODE": "devin-plugin"
      }
    }
  }
}
```

If you can't use npm at all, download and unpack the package tarball (`npm pack @pega/infinity-rules-mcp@0.1.6`) on a machine with registry access. Then run the JAR directly, using absolute paths. `PEGA_SKILLS_PATH` must point to the `resources/` directory, not to a version-specific subdirectory:

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/package/resources/infinity-rules-mcp.jar",
        "--spring.profiles.active=stdio"
      ],
      "env": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/package/resources"
      }
    }
  }
}
```

Clone this repository and copy the `pega-setup` and `pega-assistant` skills into a Devin skill directory. For a project, use `.devin/skills/`. To make the skills available globally, use `~/.config/devin/skills/` on macOS or Linux, or `%APPDATA%\devin\skills\` on Windows:

```bash
mkdir -p .devin/skills
cp -r plugins/pega/infinity-ai-plugins/devin/skills/pega-setup .devin/skills/
cp -r plugins/pega/infinity-ai-plugins/devin/skills/pega-assistant .devin/skills/
```

Configure the Pega connection as described in step 2, start a new Devin session, and run `/pega-setup`. To update a manual setup, change the pinned package version in the MCP configuration, run `git pull`, copy the skills again if they changed, and start a new Devin session.

For more information, see the [Devin plugins documentation](https://docs.devin.ai/cli/extensibility/plugins/overview.md), the [Devin MCP configuration documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration.md), and the [Devin skills documentation](https://docs.devin.ai/product-guides/skills.md).
