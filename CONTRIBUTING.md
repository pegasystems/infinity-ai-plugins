# How to contribute

## Getting Started

- Make sure you have a GitHub account.
- Open an issue before starting substantial work so the change can be discussed.
- Fork the repository on GitHub.

## Making Changes

- Create a topic branch from `main`.
- Keep commits focused and logically grouped.
- Run `git diff --check` before submitting changes.
- Update documentation when behavior, installation, or packaging changes.
- When changing packaging or runtime wiring, verify that the affected plugin metadata and bootstrap files stay aligned.
- When releasing the Devin plugin, bump `packages/infinity-rules-mcp/package.json`, the version pinned in `plugins/pega/infinity-ai-plugins/devin/.mcp.json`, and both `.devin-plugin/plugin.json` manifests together, then run `node packages/infinity-rules-mcp/scripts/check-release.mjs`. Push a `v<version>` tag to publish the npm package.
- If you change user-facing configuration or startup requirements, update `README.md`.

## Submitting Changes

- Push your branch to your fork.
- Open a pull request with a clear description of the change and validation performed.
- Respond to review feedback promptly.

## Additional Resources

- GitHub documentation: https://docs.github.com/
- Pull request documentation: https://docs.github.com/pull-requests
