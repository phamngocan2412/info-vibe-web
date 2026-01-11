/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                light: {
                    bg: '#ffffff',      // Pure White background (Minimalist)
                    card: '#ffffff',    // Card: White
                    border: '#e2e8f0',  // Border: Slate-200 (Clean separation)
                    text: '#0f172a',    // Text: Slate-900 (High contrast)
                    muted: '#64748b'    // Muted: Slate-500
                },
                dark: {
                    bg: '#0a0a0a',      // Primary background: Deep Black
                    card: '#171717',    // Card background: Lighter Black
                    border: '#262626',  // Border: Dark Gray
                    text: '#ededed',    // Main text: Off White
                    muted: '#a3a3a3'    // Muted text: Neutral Gray
                },
                primary: '#3b82f6', // Blue-500
                secondary: '#10b981', // Emerald-500
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob 7s infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
