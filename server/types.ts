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

export interface TODOEntry {
    id: number,
    desc: string,
    due_date: string,
    label: string,
    order: number,
    repo_name: string,
    repo_owner: string
}

export interface NoteEntry {
    id: number,
    desc: string,
    order: number,
    repo_name: string,
    repo_owner: string
}