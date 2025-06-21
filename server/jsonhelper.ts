import { getRawRepoLangs, getRawContributors } from './githubhelper';
import type { Repo, User } from './types';

// Turn github's repo response into a list of repo objects
// That the user is editing in
export function parseAllRepos(input: string, user_obj: User): Repo[] {
    var repos = [];
    const data = JSON.parse(input);

    for (let i = 0; i < data.length; i++) {
        repos.push({ name: data[i].name, 
                     desc: data[i].description, 
                     owner: data[i].owner.login, 
                     link: data[i].html_url,
                     langs: []});

        user_obj.num_of_stars += data[i].stargazers_count;
                     
    }
    return repos;
}

// Get the languages used in repos OWNED by the user
export async function calculateAvgLang(user: string, repos: Repo[]): Promise<Map<string, number>> {
    const langs = new Map();

    for (var repo of repos) {
        const json = await getRawRepoLangs(repo.owner, repo.name);

        for (var [key, value] of Object.entries(json)) {
            repo.langs.push(key);

            if (repo.owner == user) {
                if (langs.has(key)) {
                    langs.set(key, langs.get(key) + value);
                }
                else {
                    langs.set(key, value);
                }
            }
        }

    };

    return langs;
}

// Parse basic information for the user
export async function parseUserData(input: string): Promise<User> {
    const data = JSON.parse(input);

    return {name: data.login, pfp: data.avatar_url, num_of_repos: 0, num_of_contr: 0, num_of_stars: 0 }
}

// Get total commits from each repo
export async function calculateTotalContributions(user_obj: User, repos: Repo[]): Promise<void> {
    for (var repo of repos) {
        const data = await getRawContributors(repo.owner, repo.name);
        for (var item of data) {
            if (item.login == user_obj.name) {
                user_obj.num_of_contr += item.contributions;
            }
        }
    }
}