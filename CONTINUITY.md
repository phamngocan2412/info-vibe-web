# CONTINUITY.md

## Ledger Snapshot
Goal: Deploy info-vibe-web to Coolify with a custom domain.
Now: Analyzing project structure and creating deployment configuration files.
Next: Create Dockerfile and Nginx configuration.

## Project Context
- **Project**: info-vibe-web
- **Stack**: Vite, React, TypeScript, TailwindCSS.
- **Goal**: Deploy to Coolify with custom domain.

## Decisions
- **Deployment Strategy**: Use Dockerfile with Nginx for serving static files. This ensures robust SPA routing and high performance.
- **Nginx Config**: specific configuration to handle client-side routing (redirect 404 to index.html).

## Progress
- [x] Analyze project structure.
- [x] Create Dockerfile.
- [x] Create nginx.conf.
- [x] Guide user on Coolify setup and DNS.
