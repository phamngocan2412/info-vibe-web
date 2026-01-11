export interface GitHubUser {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    html_url: string;
    location: string | null;
    blog: string | null;
    public_repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
}
