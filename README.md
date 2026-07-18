# AI Security Remediation Agent

An AI Security Engineer workflow for importing findings, explaining root causes, proposing secure patches, and creating developer-approved GitHub pull requests.

## Structure

- `apps/server`: Express API
- `apps/client`: React and Material UI application
- `packages/shared`: shared schemas, types, and constants
- `packages/ui`: shared UI theme primitives
- `packages/prompts`: versioned AI prompt builders

## Getting started

1. Install [pnpm](https://pnpm.io/).
2. Run `pnpm install`.
3. Copy `apps/server/.env.example` to `apps/server/.env` and fill in values as integrations are implemented.
4. Run `pnpm dev`.

The API health endpoint is available at `GET /api/health`.
