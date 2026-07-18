# Architecture

The product follows a review-first remediation flow:

`scanner → adapter → normalized finding → AI analysis → patch proposal → developer review → GitHub PR`

Scanner-specific ingestion belongs in API adapters. The normalized finding contract in `@security-agent/shared` isolates the dashboard and AI workflows from individual scanner formats. GitHub and OpenAI integrations will be implemented as dedicated API services; neither is invoked directly from the web application.
