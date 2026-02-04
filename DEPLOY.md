# Deployment Guide: Coolify

This guide details how to deploy the **Info Vibe Web** portfolio to a Coolify instance using Docker and Nginx.

## Prerequisites
- A **Coolify** instance installed and running.
- Access to the **GitHub repository** containing this project.
- A purchased **Domain Name** (optional but recommended).

## Repository Setup
Ensure your repository contains the following critical files (already prepared):
- `Dockerfile`: Multi-stage build (Node.js build -> Nginx serve).
- `nginx.conf`: Custom Nginx configuration for SPA routing (redirects 404s to `index.html`).
- `vite.config.ts`: Configured for correct build output.

## Deployment Steps

1.  **Push Changes to GitHub**
    Ensure all latest changes are committed and pushed:
    ```bash
    git add .
    git commit -m "chore: ready for deployment"
    git push origin main
    ```

2.  **Create Resource in Coolify**
    *   Log in to your Coolify Dashboard.
    *   Click **+ Add Resource**.
    *   Select **Application**.
    *   Choose **Public Repository** (or **Private Repository** if you've connected your GitHub account).
    *   Select the repository: `anro/info-vibe-web` (or your specific repo URL).
    *   Branch: `main`.

3.  **Configuration**
    *   **Build Pack**: Select **Dockerfile**.
    *   **Docker Compose Location**: Leave as default (`Dockerfile`).
    *   **Port**: `80` (This matches `EXPOSE 80` in our Dockerfile).

4.  **Environment Variables (Supabase)**
    *   Go to the **Environment Variables** tab in Coolify.
    *   Add the following keys (Check `.env.example` for reference):
        *   `VITE_SUPABASE_URL`: `https://bcqupnyajqztolktrbjj.supabase.co`
        *   `VITE_SUPABASE_ANON_KEY`: `sb_publishable_7v-YTSx-_E4NUx2k4tWHWQ_3Z5WaHLS`
    *   **Important**: In Coolify, make sure to check the box **"Build Variable"** (or similar) for these variables so they are available during the `npm run build` process inside Docker.

5.  **Domain & DNS Configuration**
    *   In the **Domains** section of your Coolify resource configuration:
        *   Enter your domain (e.g., `https://your-portfolio.com`).
    *   **DNS Settings (at your Registrar/Cloudflare):**
        *   Create an `A` record.
        *   **Name**: `@` (root) or `www`.
        *   **Value**: `<Your Coolify Server IP Address>`.
        *   *Note: If using Cloudflare, you can enable the proxy (orange cloud) for SSL, but Coolify also handles SSL automatically via Let's Encrypt if you point the DNS correctly.*

6.  **Deploy**
    *   Click the **Deploy** button in Coolify.
    *   **Monitor Logs**: Watch the build logs. It will:
        1.  Clone the repo.
        2.  Run `npm install`.
        3.  Run `npm run build`.
        4.  Build the Nginx image with the artifacts.
        5.  Start the container.

## Verification
After deployment shows "Healthy":
1.  Visit your domain (e.g., `https://your-portfolio.com`).
2.  **Check Routing**: Click on "Projects" or "About". Refresh the page. It should stay on that page (not 404).
3.  **Check API**: Ensure the Contact Form works (it uses Web3Forms, so no backend required).

## Troubleshooting
- **404 on Refresh**: Check if `nginx.conf` is correctly copied in the `Dockerfile` and contains the `try_files $uri $uri/ /index.html;` directive.
- **Build Failures**: Check the "Build Logs" in Coolify for TypeScript or ESLint errors.
