# Infinity Authoring for Devin

The Devin plugin bundles the `pega-infinity-authoring` MCP server and the
`pega-setup` / `pega-assistant` skills. The plugin starts the MCP server with
`npx`; on first use the launcher downloads the server JAR and skills from this
repository's [GitHub releases](https://github.com/pegasystems/infinity-ai-plugins/releases),
verifies their SHA-256 hashes, and caches them in `~/.infinity-rules-mcp/`.

## Prerequisites

- Node.js 22.14 or later and Java 17 or later on the machine running Devin.
- Access to npm and GitHub on first use, and to your Pega Infinity environment.

## Install the plugin

Install the plugin from this repository with the Devin CLI:

```bash
devin plugins install pegasystems/infinity-ai-plugins#plugins/pega/infinity-ai-plugins/devin
```

The skills are then available as `/infinity-authoring:pega-setup` and
`/infinity-authoring:pega-assistant`.

For local development against a checkout of this repository, link the plugin
directory instead:

```bash
devin plugins install --local ./plugins/pega/infinity-ai-plugins/devin
```

## Configure the Pega connection

Start a new Devin session and ask Devin to use the `pega-setup` skill, or create
`~/.infinity-rules-mcp/config.json` (Windows: `%USERPROFILE%\.infinity-rules-mcp\config.json`)
yourself:

```json
{
  "pega_base_url": "https://your-pega-environment.example.com",
  "pega_oauth_client_id": "34233104330833666523",
  "pega_infinity_version": "26-1"
}
```

Set `pega_base_url` to the Pega environment root URL only; do not include `/prweb` or
another path segment. Set `pega_infinity_version` to the directory name that matches
the target environment:

- Pega Infinity 24.2: `24-2`
- Pega Infinity 25.1: `25-1`
- Pega Infinity 26.1: `26-1`

Keep the file private because it is stored in plaintext: `chmod 600 ~/.infinity-rules-mcp/config.json`.
Start a new Devin session after changing it.

## Verify the setup

Start a new Devin session and confirm that the `pega-infinity-authoring` MCP server is
enabled. Verify the local run time and remote Pega connection separately:

1. Use `list-skills` to confirm the bundled Pega skills are available.
2. Use `list-available-applications` or `get-application` to confirm that Devin can connect
   to the configured Pega environment.

The first Pega call opens a browser OAuth sign-in (callback `http://localhost:8888/callback`),
which requires the browser to run on the same machine as the MCP server.

If the server does not start, run `java -version` and `node --version` to confirm the
prerequisites. If the client times out on the first start, download ahead of time:

```bash
npx -y --package=@pega/infinity-authoring-plugin@0.2.1 infinity-authoring-plugin prefetch
```

## Updating

Run `devin plugins update infinity-authoring` and start a new Devin session.

## Manual setup without the plugin

If you cannot use the plugin, register the MCP server and copy the skills manually.

Download `infinity-rules-mcp-<version>.jar` and `infinity-skills-<version>.zip` from the
[releases page](https://github.com/pegasystems/infinity-ai-plugins/releases) and verify the
`.sha256` files. For example, on macOS or Linux:

```bash
TAG=release-0.2.1; MCP=0.7.11; SKILLS=0.1.14
BASE=https://github.com/pegasystems/infinity-ai-plugins/releases/download/$TAG
mkdir -p ~/.infinity-rules-mcp/manual/skills && cd ~/.infinity-rules-mcp/manual
for f in infinity-rules-mcp-$MCP.jar infinity-skills-$SKILLS.zip; do
  curl -fLO $BASE/$f && curl -fLO $BASE/$f.sha256 && shasum -a 256 -c $f.sha256
done
unzip -oq infinity-skills-$SKILLS.zip -d skills
```

Add the server to Devin's MCP metadata file — project-level `.devin/mcp_config.json`, or
user-level `~/.config/devin/mcp_config.json` on macOS and Linux
(`%APPDATA%\devin\mcp_config.json` on Windows):

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/.infinity-rules-mcp/manual/infinity-rules-mcp-<version>.jar",
        "--spring.profiles.active=stdio"
      ],
      "env": {
        "PEGA_SKILLS_PATH": "/absolute/path/to/.infinity-rules-mcp/manual/skills"
      }
    }
  }
}
```

`PEGA_SKILLS_PATH` must point to the extracted `skills` directory that contains `24-2`,
`25-1`, and `26-1`, not to a version-specific subdirectory.

Copy the skills into a Devin skill discovery path — `.devin/skills/` for a project, or
`~/.config/devin/skills/` (`%APPDATA%\devin\skills\` on Windows) globally:

```bash
mkdir -p .devin/skills
cp -r skills/pega-setup skills/pega-assistant .devin/skills/
```

Then create `~/.infinity-rules-mcp/config.json` as described above and start a new session.

For Devin MCP metadata locations and configuration details, see the
[Devin MCP configuration documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration.md).
For Devin skill discovery paths, see the
[Devin Skills documentation](https://docs.devin.ai/product-guides/skills.md).
