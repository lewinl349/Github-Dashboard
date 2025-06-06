import { getRawRepoLangs } from './githubhelper';

// Turn github's repo response into a list of repos by user
export function parseAllRepos(input: string, user: string): string[] {
    var repos = [];
    const data = JSON.parse(input);
    
    for (let i = 0; i < data.length; i++) {
        if (data[i].owner.login == user) {
            repos.push(data[i].name);
        }
    }

    return repos;
}

export function parseRepoInfo(input: string) {
    return;
}

export async function calculateAvgLang(user: string, repos: string[]) {
    const langs = new Map();
    
    for (var repo of repos) {
        const json = await getRawRepoLangs(user, repo);
        
        for (var [key, value] of Object.entries(json)) {
            if (langs.has(key)) {
                langs.set(key, langs.get(key) + value);
            }
            else {
                langs.set(key, value);
            }   
        }
    };

    return langs;
}