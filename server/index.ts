import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, parseRepoInfo, calculateAvgLang } from './jsonhelper';
import { getRawUser, getRawAllRepos, getRawRepoData, getRawRepoLangs } from './githubhelper';

// =================================
// Setup
dotenv.config({ path: 'server/secrets/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;

// Allow react to get access to the port
app.use(cors());

// =================================
// Return a list of repositories
var repos = [];

async function generateReposList() {
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
// Return certain stats from a repository
var langs = new Map();

// Return a Map object of each languages and their bytes
async function findCommonLanguages() {
  const repos = await generateReposList();
  return await calculateAvgLang(repos);
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
var user: string = "Github User";

async function parseUserInfo() {
  const userData = await getRawUser();
  user = userData.login;
}

app.get('/user/name', async (req, res) => {
  res.json(user);
})

// =================================
var ready: boolean = false;

async function initData() {
  try {
    await parseUserInfo();
    langs = await findCommonLanguages();
    repos = await generateReposList();
    
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