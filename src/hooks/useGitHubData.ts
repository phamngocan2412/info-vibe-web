import { useState, useEffect } from 'react';
import type { GitHubUser, GitHubRepo } from '../types';
import { mockUser, mockRepos } from '../data/mock';

const GITHUB_USERNAME = 'phamngocan2412';

export function useGitHubData() {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const CACHE_KEY = 'github_data_cache_v2'; // Versioned to invalidate old bad cache
            const CACHE_DURATION = 3600000; // 1 hour

            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                try {
                    const { user, repos, timestamp } = JSON.parse(cached);
                    // Validate cache content isn't empty/broken
                    if (Date.now() - timestamp < CACHE_DURATION && user && Array.isArray(repos) && repos.length > 0) {
                        setUser(user);
                        setRepos(repos);
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.error("Cache parse error", e);
                    localStorage.removeItem(CACHE_KEY);
                }
            }

            try {
                setLoading(true);
                // Fetch User
                const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (!userRes.ok) throw new Error(`Failed to fetch user: ${userRes.status}`);
                const userData = await userRes.json();
                setUser(userData);

                // Fetch Repos
                const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`);
                if (!reposRes.ok) throw new Error(`Failed to fetch repos: ${reposRes.status}`);
                const reposData = await reposRes.json();
                setRepos(reposData);

                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    user: userData,
                    repos: reposData,
                    timestamp: Date.now()
                }));

            } catch (err: unknown) {
                console.warn("GitHub API failed, using mock data:", err);
                // Fallback to mock data
                setUser(mockUser);
                setRepos(mockRepos);
                if (err instanceof Error) {
                    setError(err.message + " (Using off-line data)");
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, repos, loading, error };
}
