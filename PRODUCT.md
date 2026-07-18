# AI Security Remediation Agent

## Vision

An AI Security Engineer that can:

- Read security findings
- Explain vulnerabilities
- Generate secure patches
- Create GitHub Pull Requests

## MVP

- GitHub Repository Connection
- Upload SARIF
- View Findings
- AI Analysis
- Generate Patch
- GitHub PR

### Remediation flow

```text
GitHub Repository
        │
        ▼
GitHub Security Findings (CodeQL / Dependabot / SARIF)
        │
        ▼
Normalize Finding
        │
        ▼
AI Security Agent
        │
 ┌──────┼─────────┐
 │      │         │
 ▼      ▼         ▼
Explain Root Cause · Estimate Risk · Generate Secure Patch
        │
        ▼
Review Diff
        │
        ▼
Create GitHub Pull Request
```

### UI screens

#### 1. Landing

A deliberately simple entry screen that lets a developer begin through either path:

- **GitHub OAuth** — connect a repository and import GitHub security findings.
- **Upload SARIF** — upload a scanner report without first connecting GitHub.

## Future

- ArmorCode
- Wiz
- Snyk
- Checkmarx
- Veracode
- Multi-agent workflows
