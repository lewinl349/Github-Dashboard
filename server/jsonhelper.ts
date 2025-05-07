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