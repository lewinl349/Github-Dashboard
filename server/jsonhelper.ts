import { requestRawUser, requestRawRepos, requestRawIssues } from './githubHelper';
import type { Repo, User, RepoItems } from './types';

// Parse basic information for the user
export async function parseUserData(): Promise<User> {
    const data = await requestRawUser();
    const contr = data.contributionsCollection;
    var user_obj = {name: data.login, nickname: data.name, pfp: data.avatarUrl, 
        num_of_repos: 0, num_of_comm: 0, num_of_issue: 0, 
        num_of_pull: 0, num_of_stars: 0 };

    user_obj.num_of_comm = contr.totalCommitContributions;
    user_obj.num_of_pull = contr.totalPullRequestContributions;
    user_obj.num_of_issue = contr.totalIssueContributions;

    return user_obj;
}

// Turn github's repo response into a list of repo objects
// That the user is editing in
export async function parseAllRepos(user_obj: User): Promise<Repo[]> {
    var repos = [];
    const data = await requestRawRepos();
    const entries = data.nodes;

    user_obj.num_of_repos = data.totalCount;

    for (let i = 0; i < entries.length; i++) {
        var newRepo: Repo = { 
                            name: entries[i].name, 
                            desc: entries[i].description, 
                            owner: entries[i].owner.login, 
                            link: entries[i].url,
                            langs: {}};

        // Get langs of each repo
        for (var lang of entries[i].languages.edges) {
            newRepo.langs[lang.node.name] = lang.size;
        }

        // Add to database
        repos.push(newRepo);

        user_obj.num_of_stars += entries[i].stargazerCount;                
    }
    return repos;
}    

// Get the languages used in repos OWNED by the user
export async function calculateAvgLang(user: string, repos: Repo[]): Promise<Record<string, number>> {
    const langs: Record<string, number> = {};

    for (var repo of repos) {
        for (var [key, value] of Object.entries(repo.langs)) {
            if (repo.owner == user) {
                if (Object.hasOwn(langs, key)) {
                    langs[key] += value;
                }
                else {
                    langs[key] = value;
                }
            }
        }

    };

    return langs;
}

// Get all issues and pull requests from a repository
export async function parseIssues(owner: string, name: string): Promise<RepoItems> {
    const data = await requestRawIssues(owner, name);
    const issueData = data.issues.nodes;
    const PRData = data.pullRequests.nodes;
    var items = { issues: [], PRs: [] };

    for (var issue of issueData) {
        var item = {
            number: issue.number,
            title: issue.title,
            created: issue.createdAt,
            url: issue.url,
            author: issue.author.login
        }

        items.issues.push(item);
    }

    for (var PR of PRData) {
        var item = {
            number: PR.number,
            title: PR.title,
            created: PR.createdAt,
            url: PR.url,
            author: PR.author.login
        }

        items.PRs.push(item);
    }

    return items;
}