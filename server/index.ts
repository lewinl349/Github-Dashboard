import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, calculateAvgLang, parseUserData, calculateTotalContributions } from './jsonhelper';
import { getRawUser, getRawAllRepos } from './githubhelper';
import type { Repo, User } from './types';

// IMPORTANT NOTE: run ../start in the URL to load data from github
// FIXME: languages aren't showing for some repositories
// TODO: Research other interesting summaries or statss

// =================================
// Setup
dotenv.config({ path: 'server/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;

// Allow react to get access to the port
app.use(cors());

// Variables and default values
// Repo data
var langs: Map<string, number> = new Map(); // Return certain stats from a repository
var repos: Repo[] = [];

// User Object
var user: User = null;

// =================================
// Return a list of repositories
async function generateReposList(): Promise<Repo[]> {
  const response = await getRawAllRepos();
  const data = JSON.stringify(response);
  return parseAllRepos(data, user);
}

app.get('/repos/all', async (req, res) => {
  try {
    res.json(repos);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
});

// =================================
// Return a Map object of each languages and their bytes
async function findCommonLanguages(): Promise<Map<string, number>> {
  return await calculateAvgLang(user.name, repos);
}

app.get('/repos/langs', async (req, res) => {
  try {
    const obj = Object.fromEntries(langs);
    res.json(obj);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
});

// =================================
// Github User Information
async function parseUserInfo(): Promise<void> {
  const response = await getRawUser();
  const data = JSON.stringify(response);
  user = await parseUserData(data);
}

app.get('/user/data', async (req, res) => {
  res.json(user);
})

// =================================
var ready: boolean = false;

async function initData(): Promise<boolean> {
  try {
    await parseUserInfo();
    repos = await generateReposList();
    langs = await findCommonLanguages();
    await calculateTotalContributions(user, repos);
    user.num_of_repos = repos.length;
    
    return true;
  } catch {
    return false;
  }
}

// Initialize all data when the app starts
app.get('/start', async (req, res) => {
  ready = await initData();
  res.json(ready); 
})

app.listen(port, async () => {
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:3000/`);
})