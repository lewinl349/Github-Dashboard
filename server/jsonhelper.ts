import { getRawRepoLangs } from './githubhelper';

export interface Repo {
    name: string,
    desc: string,
    owner: string,
    link: string,
    langs: string[];
}

// Turn github's repo response into a list of repo objects
// That the user is editing in
export function parseAllRepos(input: string): Repo[] {
    var repos = [];
    const data = JSON.parse(input);

    for (let i = 0; i < data.length; i++) {
        repos.push({ name: data[i].name, 
                     desc: data[i].description, 
                     owner: data[i].owner.login, 
                     link: data[i].html_url,
                     langs: []});
                     
    }

    return repos;
}

// Get the languages used in repos OWNED by the user
export async function calculateAvgLang(user: string, repos: Repo[]) {
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