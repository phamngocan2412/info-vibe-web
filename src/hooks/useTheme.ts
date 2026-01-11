import { useState, useLayoutEffect, useEffect } from 'react';

// Helper function to get initial theme - runs synchronously
function getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'dark'; // Default to dark for SSR
    
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }
    
    // Fallback to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
    const [mounted, setMounted] = useState(false);

    // Mark as mounted after first render
    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync theme to DOM and localStorage synchronously after render
    useLayoutEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme, mounted };
}
