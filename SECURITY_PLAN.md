# Security Implementation Plan for /cv-mn

## 1. Authentication Strategy: Supabase Auth (Magic Link)
Instead of building a custom IP/OTP system, we will leverage your existing Supabase integration. This is more secure and reliable.

- **Magic Link (Email OTP)**: You will enter your email (`phamngocanh7679@gmail.com`). Supabase sends a secure link/code to your inbox. You click it to log in.
- **Access Control**: We will configure the app to strictly allow **only** your specific email address to access the Admin Dashboard. Any other email trying to log in will be denied access to the data.

## 2. Frontend Security (The "Lock")
- **Protected Route Component**: Create a wrapper that checks if a user is logged in.
  - If NOT logged in: Show a simple Login Screen (Email input).
  - If logged in: Show the `CVManager` component.
- **Session Management**: Supabase handles sessions. If you access from a new IP/Device (fresh browser session), it will require you to log in again via email. This matches your "request code if new IP/context" requirement.

## 3. Backend Security (Row Level Security - RLS)
Hiding the UI isn't enough; we must protect the database.
- **Enable RLS on `cv_entries` table**:
  - **SELECT (Read)**: Allow `public` (everyone) to read entries where `is_default = true` (or all, depending on need).
  - **INSERT/UPDATE/DELETE**: Allow **only authenticated users** with the specific admin email (or User ID) to modify data.
- This ensures that even if someone finds the API keys, they cannot tamper with your CVs without being logged in as you.

## 4. Brute Force Protection (CrowdSec / Rate Limiting)
- **Supabase**: Has built-in rate limiting for Auth endpoints to prevent spamming email requests.
- **CrowdSec**: This operates at the server level (Nginx/Traefik). Since this is a client-side app, we cannot "ban IPs" directly in React code effectively. However, by using Supabase Auth, we rely on their enterprise-grade security to handle brute force attempts on the login.

## Implementation Steps
1.  **Create Login Component**: A simple UI to request the Magic Link.
2.  **Create Auth Context/Hook**: To manage and provide the user session state globally.
3.  **Protect the Route**: Wrap `/cv-mn` with an Auth Guard.
4.  **Database Policies**: (I will provide the SQL) to secure the data.

**Do you approve this plan?**
1.  Yes, proceed with Supabase Auth (Magic Link).
2.  I want to use a hardcoded password instead (Less secure, simpler).
3.  I specifically want custom IP-based blocking logic (Not recommended, complex to maintain).
