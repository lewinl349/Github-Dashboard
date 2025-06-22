export interface Repo {
    name: string,
    desc: string,
    owner: string,
    link: string,
    langs: Record<string, number>;
}

export interface User {
    name: string,
    nickname: string,
    pfp: string,
    num_of_repos: number,
    num_of_comm: number,
    num_of_pull: number,
    num_of_issue: number,
    num_of_stars: number
}