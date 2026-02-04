# CONTINUITY.md

## Ledger Snapshot
Goal: Deploy info-vibe-web to Coolify with a custom domain.
Now: Completed UI/UX improvements (Contact Form, Skeletons, Fonts) and prepared deployment guide.
Next: Deploy to Coolify and configure DNS.

## Project Context
- **Project**: info-vibe-web
- **Stack**: Vite, React, TypeScript, TailwindCSS.
- **Goal**: Deploy to Coolify with custom domain.

## Decisions
- **Deployment Strategy**: Use Dockerfile with Nginx for serving static files. This ensures robust SPA routing and high performance.
- **Nginx Config**: specific configuration to handle client-side routing (redirects 404 to index.html).
- **Clean URL**: Removed hash fragments (#) from URL logic. Replaced anchor tags with buttons and `scrollIntoView` for smooth navigation without modifying the browser URL.
- **Optimization**: Replaced heavy `load-profile.gif` (1.1MB) with lightweight CSS spinner (0KB) and Skeleton loaders. Enabled chunk splitting in Vite.
- **UI/UX**:
    - **Contact**: Integrated Web3Forms for direct email sending without opening mail app.
    - **Typography**: Added 'Outfit' font for headings to give a premium feel.
    - **Loading**: Implemented Skeleton loaders for Hero, Skills, and Projects sections.

## Progress
- [x] Analyze project structure.
- [x] Create Dockerfile.
- [x] Create nginx.conf.
- [x] Implement React Router (react-router-dom) for clean clean URLs (/projects).
- [x] Verify build and routing locally.
- [x] Upgrade Contact Form (Web3Forms).
- [x] Implement Skeleton Loaders.
- [x] Update Typography (Outfit font).
- [x] Create DEPLOY.md guide.
- [ ] Guide user on Coolify setup and DNS.
