export interface Repo {
    name: string,
    desc: string,
    owner: string,
    link: string,
    langs: string[];
}

export interface User {
    name: string,
    pfp: string,
    num_of_repos: number,
    num_of_contr: number,
    num_of_stars: number
}