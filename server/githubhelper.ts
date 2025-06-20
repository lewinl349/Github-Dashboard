import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config({ path: 'server/secrets/keys.env' });

const octokit = new Octokit({
  auth: process.env.TOKEN
});

// Request to get all repos from an user.
export async function getRawAllRepos() {
  const response = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return response.data;
}

// Request all languages used in a repo
export async function getRawRepoLangs(user: string, repo: string) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/languages', {
    owner: user,
    repo: repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return response.data;
}

export async function getRawUser() {
  const response = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return response.data;
}