# CONTINUITY.md

## Ledger Snapshot
Goal: Deploy info-vibe-web to Coolify with a custom domain.
Now: Completed all UI/UX upgrades and Technical optimizations (SEO, PWA). Ready for final deployment.
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
- **Technical**:
    - **SEO**: Added Open Graph and Twitter Card meta tags for professional social sharing.
    - **PWA**: Configured as a Progressive Web App (installable) with `vite-plugin-pwa`.
    - **CV Manager**: Implemented a "Semi-CMS" for managing CVs via a hidden admin route (`/admin/cv-manager`).
    - **Supabase**: Integrated Supabase Client (`src/lib/supabase.ts`) and configured Dockerfile to handle build-time environment variables safely.
    - **Dynamic Database**: Upgraded CV Manager to use Supabase Database (`cv_entries` table) instead of local config, enabling real-time updates without redeployment.

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
- [x] Implement SEO & Open Graph tags.
- [x] Configure PWA (Installable App).
- [x] Implement Hidden CV Manager System.
- [x] Setup Supabase Client & Fix Docker Build Args.
- [x] Implement Real CV Upload with Supabase Storage.
- [x] Upgrade to Dynamic Database (Real-time CV updates).
- [x] Create SUPABASE_SETUP.md with SQL scripts.
- [ ] Guide user on Coolify setup and DNS.
