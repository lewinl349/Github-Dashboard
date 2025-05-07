import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config({ path: 'server/secrets/keys.env' });

const octokit = new Octokit({
  auth: process.env.TOKEN
});

// Export github raw output to get all repos
export async function getRawAllRepos() {
  const response = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return response.data;
}
