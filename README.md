# Companion Dashboard for Github

## Description

(Currently WIP)
An unofficial webapp for Github with an AI assistant, dashboard summary, and localized notes/TODO lists for each repository.

## Technologies
- ElectronJS
- React Router + Vite
- TailwindCSS (Plugin: DaisyUI)
- Express
- GraphQL
- Docker  
- (Packages: ChartJS, Octokit, Dotenv, React Query, React Icons)

## Features 
- Visualizations of languages used and other profile stats
- Summary of upcoming tasks
- For each repo: TODO list, notes, custom icon
- AI Assistant to help with commits

## Instructions
> [!IMPORTANT]
> You need to input a Github API token with private repository read permissions.

1. Clone repo and install required packages `npm install`
2. In the folder `server`, create a `keys.env` file. The file should have
  ```
  TOKEN = "YOUR_GITHUB_TOKEN_HERE"
  ```
4. Run the server `npm run server`
5. Run the electron/react app `npm run start`