import type { GitHubUser, GitHubRepo } from '../types';

export const mockUser: GitHubUser = {
    login: "phamngocan2412",
    name: "An Pham",
    bio: "Software Engineer | Golang | Flutter | React",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4", // Placeholder or use a real one if known
    html_url: "https://github.com/phamngocan2412",
    location: "Vietnam",
    blog: "",
    public_repos: 20,
    followers: 10,
    following: 5
};

export const mockRepos: GitHubRepo[] = [
    {
        id: 1,
        name: "info-vibe-profile",
        description: "Personal portfolio website built with React, TypeScript and Tailwind CSS.",
        html_url: "https://github.com/phamngocan2412/info-vibe-profile",
        language: "TypeScript",
        stargazers_count: 5,
        forks_count: 1
    },
    {
        id: 2,
        name: "info-vibe-profile-be",
        description: "Backend service for portfolio using Golang and Gin.",
        html_url: "https://github.com/phamngocan2412/info-vibe-profile-be",
        language: "Go",
        stargazers_count: 3,
        forks_count: 0
    },
    {
        id: 3,
        name: "camera-v1",
        description: "Flutter application for camera management.",
        html_url: "https://github.com/phamngocan2412/camera-v1",
        language: "Dart",
        stargazers_count: 2,
        forks_count: 0
    },
    {
        id: 4,
        name: "weather-api",
        description: "Simple Weather API using Node.js.",
        html_url: "https://github.com/phamngocan2412/weather-api",
        language: "JavaScript",
        stargazers_count: 1,
        forks_count: 0
    },
    {
        id: 5,
        name: "flutter-ui-kit",
        description: "Collection of reusable Flutter UI components.",
        html_url: "https://github.com/phamngocan2412/flutter-ui-kit",
        language: "Dart",
        stargazers_count: 4,
        forks_count: 2
    }
];
