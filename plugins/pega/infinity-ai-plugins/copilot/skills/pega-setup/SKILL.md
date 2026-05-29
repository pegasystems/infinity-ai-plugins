---
name: pega-setup
description: Use when the GitHub Copilot CLI plugin needs connection setup help, environment configuration, or troubleshooting. Guides first-time setup, OAuth configuration, and recovery from connection failures.
---

# Pega Setup

This skill guides users through configuring the Pega Infinity Authoring plugin for use with GitHub Copilot CLI.

## Overview

The Pega MCP server requires a connection to a Pega Infinity environment.

This setup flow is OAuth-oriented and expects the user to supply their own environment-specific values.

## Minimum Required Inputs

- the Pega base URL, including the context path such as `/prweb`
- the OAuth client ID if their environment requires a custom value

The default OAuth client ID is `34233104330833666523`.
