import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config({ path: 'server/keys.env' });

const octokit = new Octokit({
  auth: process.env.TOKEN
});

export async function requestRawUser(): Promise<any> {
  const response = await octokit.graphql(
    `
    query {
      viewer {
        avatarUrl
        login
        name
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
        }
      }
    }
    `
  );

  return response.viewer;
}

export async function requestRawRepos(): Promise<any> {
  const response = await octokit.graphql(
    `
    query {
      viewer {
        repositories(first: 100, orderBy: {direction: DESC, field: UPDATED_AT}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            owner {
              login
            }
            languages(first: 5, orderBy: {direction: DESC, field: SIZE}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    `
  );

  return response.viewer.repositories;
}

// DEVELOPMENT USE

async function checkRateLimit(): Promise<void> {
  console.log(await octokit.graphql(
    `
    query {
      viewer {
        login
      }
      rateLimit {
        limit
        remaining
        used
        resetAt
      }
    }
    `
  ))
}

// checkRateLimit();