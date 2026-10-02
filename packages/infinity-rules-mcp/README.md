# @pega/infinity-rules-mcp

Launcher for the Pega Infinity Rules MCP server. The package bundles the `infinity-rules-mcp` runtime JAR and the Pega skills for Pega Infinity `24-2`, `25-1`, and `26-1`. It starts the server over stdio, so any MCP client can run it with `npx`:

```json
{
  "mcpServers": {
    "pega-infinity-authoring": {
      "command": "npx",
      "args": ["-y", "@pega/infinity-rules-mcp@0.1.6"]
    }
  }
}
```

Always pin an exact version. Don't use `latest` or a version range; otherwise a new session can silently pick up a new runtime.

## Requirements

- Node.js 18 or later, for `npx`
- Java 17 or later

## What the launcher does

1. Finds Java in this order: `PEGA_JAVA`, then `$JAVA_HOME/bin/java`, then `java` on `PATH`. It checks that the version is 17 or later and exits with code 1 and a message on stderr if it isn't.
2. Sets `PEGA_SKILLS_PATH` to the bundled `resources/` directory, unless you already set it.
3. Runs `java [PEGA_JAVA_OPTS | JAVA_OPTS] -jar resources/infinity-rules-mcp.jar --spring.profiles.active=stdio [extra args]`. stdin, stdout, and stderr are inherited by Java.
4. Forwards SIGINT, SIGTERM, and SIGHUP to Java, and exits with Java's exit code or signal.

The launcher never writes to stdout, which carries MCP JSON-RPC. All diagnostics go to stderr. The launcher has no dependencies and no install scripts, so it works under `--ignore-scripts` policies. It doesn't read or log `~/.infinity-rules-mcp/config.json`, OAuth tokens, or `PEGA_*` values.

| Variable | Purpose |
| --- | --- |
| `PEGA_JAVA` | Path to the `java` executable to use. |
| `PEGA_JAVA_OPTS` | JVM options, for example `-Xmx1g` or a truststore. Takes precedence over `JAVA_OPTS`. Quote values that contain spaces. |
| `JAVA_OPTS` | JVM options, used when `PEGA_JAVA_OPTS` isn't set. |
| `PEGA_SKILLS_PATH` | Overrides the bundled skills directory. It must point to the parent of the version directories. |

The Pega connection is configured the same way as for the other Pega Infinity Authoring plugins. Non-empty values in `~/.infinity-rules-mcp/config.json` take precedence over `PEGA_BASE_URL`, `PEGA_OAUTH_CLIENT_ID`, and `PEGA_INFINITY_VERSION`.

## Offline and mirrored registries

- Corporate mirrors work through the standard `.npmrc` `registry=` or `@pega:registry=` settings.
- To pre-warm the npm cache, for example in a Devin Cloud blueprint or before going offline, run `npx -y @pega/infinity-rules-mcp@<version> </dev/null`. The server exits after it reads end of input, and the package stays in the npm cache.

## Maintainers

The JAR and `resources/` aren't stored in git under this directory. Stage them from the repository before you pack:

```bash
node packages/infinity-rules-mcp/scripts/stage.mjs          # copy the JAR, skills, and LICENSE into the package
node packages/infinity-rules-mcp/scripts/check-release.mjs  # check that versions and the Devin plugin are aligned
node --test packages/infinity-rules-mcp/test/launcher.test.js
cd packages/infinity-rules-mcp && npm pack
node scripts/smoke.mjs --expect-tools 29 ./pega-infinity-rules-mcp-<version>.tgz
```

The package version must match the version pinned in `plugins/pega/infinity-ai-plugins/devin/.mcp.json` and the Devin plugin manifests. `check-release.mjs` enforces this. Publishing runs from GitHub Actions when a `v*` tag is pushed. To roll back, pin the previous version in the plugin and release it. Never run `npm unpublish`; run `npm deprecate` instead.
