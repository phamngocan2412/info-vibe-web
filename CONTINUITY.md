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
- **Clean URL**: Removed hash fragments (#) from URL logic. Replaced anchor tags with buttons and `scrollIntoView` for smooth navigation without modifying the browser URL.

## Progress
- [x] Analyze project structure.
- [x] Create Dockerfile.
- [x] Create nginx.conf.
- [x] Implement React Router (react-router-dom) for clean clean URLs (/projects).
- [x] Guide user on Coolify setup and DNS.
