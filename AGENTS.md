# AGENTS.md

## AI Security Remediation Agent

This repository contains an AI-powered Security Remediation Agent that analyzes security findings, explains vulnerabilities, generates secure code fixes, and creates GitHub Pull Requests.

You are an AI software engineer working on this project.

Your responsibility is to build production-quality software while following the project architecture and engineering principles defined below.

---

# Project Vision

Build an AI Security Engineer, not just another chatbot.

The product should allow developers to:

1. Import security findings from different scanners.
2. Understand the vulnerability.
3. Explain the root cause.
4. Generate a secure fix.
5. Review the generated patch.
6. Create a GitHub Pull Request.

The AI should behave like an experienced Application Security Engineer.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Redux Toolkit (only when global state is required)

## Backend

- Node.js
- Express
- TypeScript
- Zod
- Axios

## AI

- OpenAI Responses API

## Source Control

- GitHub API
- Octokit

---

# Core Principles

Always prefer:

- Readability
- Maintainability
- Simplicity
- Type safety
- Reusability

Avoid clever code.

Avoid unnecessary abstraction.

If a solution is simple, prefer the simple solution.

---

# Coding Rules

Use TypeScript everywhere.

Never use:

- any
- eval
- new Function

Always use:

- async/await
- ES modules
- strict typing
- early returns

Functions should have a single responsibility.

Keep functions small.

Avoid nested logic.

---

# Folder Structure

```
apps/
    client/
    server/

packages/
    shared/
    ui/
    prompts/

docs/

AGENTS.md
README.md
```

---

# Backend Structure

```
src/

config/

constants/

controllers/

middleware/

models/

adapters/

routes/

services/

types/

utils/

server.ts
```

Business logic belongs in services.

Routes should be thin.

Controllers should only orchestrate requests.

---

# Frontend Structure

```
src/

pages/

components/

layouts/

features/

hooks/

services/

types/

utils/

assets/
```

Do not place business logic inside components.

Extract reusable logic into hooks or services.

---

# Architecture

The application follows this flow:

```
Security Scanner

↓

Normalize Finding

↓

AI Analysis

↓

Patch Generation

↓

Review

↓

GitHub Pull Request
```

Every module should be independent.

---

# Scanner Adapter Pattern

Every scanner must implement:

```
interface ScannerAdapter {

getFindings()

normalize()

metadata()

}
```

Supported scanners today:

- GitHub Code Scanning
- Dependabot
- SARIF Upload

Future integrations:

- ArmorCode
- Wiz
- Snyk
- Checkmarx
- Veracode
- Semgrep
- Trivy
- Gitleaks

Never hardcode scanner-specific logic outside adapters.

---

# AI Layer

The AI should provide:

- Root Cause Analysis
- Vulnerability Explanation
- Business Impact
- Attack Scenario
- Secure Recommendation
- Code Patch
- Confidence Score

AI prompts must be stored separately.

Never hardcode prompts inside services.

---

# Prompt Engineering Rules

Use structured outputs whenever possible.

Ask the model to return JSON.

Example:

```
{
  "summary": "",
  "rootCause": "",
  "risk": "",
  "recommendation": "",
  "confidence": 95
}
```

Validate every response.

Never trust model output blindly.

---

# GitHub Integration

Support:

- Repository selection
- Branch creation
- Commit creation
- Pull Request creation

Never push directly to the default branch.

Always create a feature branch.

---

# UI Guidelines

Use Material UI.

Design principles:

- clean
- modern
- minimal

Avoid unnecessary animations.

Spacing should be consistent.

Every page should include:

- loading state
- empty state
- error state
- success state

---

# Dashboard

Dashboard should display:

- Repository
- Total Findings
- Critical
- High
- Medium
- Low
- Auto Fix Available
- Manual Review Required

Recent findings should be easy to scan.

---

# Finding Details

Every finding should include:

- Title
- Description
- Severity
- CWE
- CVE
- File
- Scanner
- References
- AI Summary

---

# AI Analysis

Show:

- Root Cause
- Why it is vulnerable
- Attack Example
- Business Impact
- Recommendation
- Confidence Score

Use plain English.

Avoid unnecessary security jargon.

---

# Patch Review

Display GitHub-style diff.

Allow users to:

- regenerate
- explain
- approve

Never automatically merge changes.

---

# Pull Requests

Generated PR should include:

- clear title
- explanation
- affected files
- reasoning
- testing recommendations

---

# API Design

REST API only.

Use:

GET

POST

PATCH

DELETE

Return consistent responses.

Example:

```
{
    "success": true,
    "data": {},
    "message": ""
}
```

Errors:

```
{
    "success": false,
    "error": {
        "code": "",
        "message": ""
    }
}
```

---

# Error Handling

Never swallow errors.

Always:

- log
- return useful messages
- avoid exposing internal details

---

# Logging

Use structured logs.

Include:

- request id
- repository
- scanner
- finding id

Do not log secrets.

---

# Security

Never expose:

- GitHub tokens
- OpenAI keys
- Secrets
- Passwords

Use environment variables.

Validate all input.

Sanitize all output.

---

# Performance

Prefer pagination.

Avoid loading thousands of findings.

Lazy load heavy pages.

Cache AI responses when appropriate.

---

# Dependencies

Before adding a dependency:

Check if the existing stack already solves the problem.

Prefer fewer dependencies.

Avoid abandoned packages.

---

# Testing

Generate:

- unit tests
- integration tests

Prefer Vitest for frontend and backend where practical.

Mock external APIs.

---

# Accessibility

Use semantic HTML.

Keyboard accessible.

Proper labels.

Good contrast.

---

# Git Workflow

One feature per commit.

Suggested format:

```
feat: add github repository selector

fix: improve finding normalization

refactor: simplify ai analysis service
```

---

# Definition of Done

A task is complete only if:

- code compiles
- lint passes
- types pass
- feature works
- loading state exists
- error state exists
- empty state exists
- code is documented where necessary

---

# Before Writing Code

Always:

1. Understand the requirement.
2. Explain your implementation plan.
3. List files to be modified.
4. Identify risks.
5. Wait for approval before making large changes.

---

# While Implementing

Prefer incremental commits.

Never rewrite unrelated files.

Avoid introducing breaking changes.

Keep changes focused on the requested task.

---

# If Requirements Are Unclear

Do not guess.

Ask for clarification before implementing.

---

# Product Goal

The product should feel like hiring an AI Security Engineer.

A developer should be able to go from:

Security Finding

↓

AI Explanation

↓

Secure Patch

↓

GitHub Pull Request

within a few clicks.

Every implementation decision should support this goal.
