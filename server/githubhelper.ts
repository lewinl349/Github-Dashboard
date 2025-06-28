import { Octokit } from "octokit";
import dotenv from "dotenv";

var octokit: Octokit = null;

/**
 * Instantiate octokit object with token
 */
export async function getToken(): Promise<boolean>{
  dotenv.config({ path: 'server/keys.env' });

  octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  try {
    await octokit.rest.users.getAuthenticated();
    return true;
  } catch (e: any) {
    return false;
  }
}

/**
 * Query the required user information
 * 
 * @returns Promise - object of user info
 * @example 
 * output.avatarUrl
 * output.name
 */
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

/**
 * Query the required repository information for each repository the user
 * contributes in.
 * 
 * @returns Promise - array of objects containing each repository
 * @example 
 * output.nodes[i].owner.login
 * output.totalCount
 */
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

// getToken();
// checkRateLimit();