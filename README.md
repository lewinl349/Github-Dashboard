# Companion Dashboard for Github

## Description

An unofficial webapp for Github with an AI assistant, dashboard summary, and localized notes/TODO lists for each repository.

## Features 
- **Visualizations**: Languages used, profile stats, etc... + Summary of upcoming tasks
- **TODO Tracker**: For each repository + Issues/PR overview
- **AI Assistant**: Give feedback/comments on code (WIP)

## Technology
- React Router + Vite + Express
- TailwindCSS (Plugin: DaisyUI)
- SQLite3
- GraphQL
- Gemini + Github API
- (Languages: Javascript, Typescript)
- (Packages: See package.json)

## Prereq
- Node.js
- npm
- Ports 3000 and 5173

## Instructions
> [!IMPORTANT]
> If you want to also display private repos, you need a Github API token with Read-only access to: Content, Issues, Pull Requests.

1. Clone repo `git clone https://github.com/lewinl349/Github-Dashboard.git`
2. Install required packages `npm install`
3. In the folder `server`, create a `keys.env` file. The file should have
  ```
  GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"
  GEMINI_TOKEN = "YOUR_GEMINI_TOKEN_HERE" <--- Optional
  ```
4. Run React app  `npm run start`
5. Open http://localhost:5173/
