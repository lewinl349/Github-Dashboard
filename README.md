# Companion Dashboard for Github

## Description

(Currently WIP)
An unofficial webapp for Github with an AI assistant, dashboard summary, and localized notes/TODO lists for each repository.

## Technology
- React Router + Vite + Express
- TailwindCSS (Plugin: DaisyUI)
- SQLite3
- GraphQL
- (Packages: ChartJS, Octokit, Dotenv, React Query + Axios, React Icons, React Calendar)
- (Languages: Javascript, Typescript)

## Features 
- Visualizations of languages used and other profile stats
- Summary of upcoming tasks
- For each repo: TODO list, notes, custom icon
- AI Assistant to help with commits

## Instructions
> [!IMPORTANT]
> If you want to also display private repos, you need a Github API token with Read-only access to: Content, Issues, Pull Requests.

1. Clone repo `git clone https://github.com/lewinl349/Github-Dashboard.git`
2. install required packages `npm install`
3. In the folder `server`, create a `keys.env` file. The file should have
  ```
  TOKEN = "YOUR_GITHUB_TOKEN_HERE"
  ```
4. Run React app  `npm run start`