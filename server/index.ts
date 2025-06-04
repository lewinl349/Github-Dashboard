import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, parseRepoInfo, calculateAvgLang } from './jsonhelper';
import { getUser, getRawAllRepos, getRawRepoData, getRawRepoLangs } from './githubhelper';

// =================================
// Setup
dotenv.config({ path: 'server/secrets/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;
const user: string = process.env.USER;

// Allow react to get access to the port
app.use(cors());
var langs = new Map();
var repos = [];

// =================================
// Return a list of repositories
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
async function generateRepoinfo(repo: string) {
  const response = await getRawRepoData(repo);
  const data = JSON.stringify(response);
  return [];
}

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

// Temp
app.get('/user/name', async (req, res) => {
  res.send(user);
})

// =================================
var ready: boolean = false;

async function initData() {
  try {
    langs = await findCommonLanguages();
  repos = await generateReposList();
  return true;
  } catch {
    return false;
  }
  
}

app.get('/ready', async (req, res) => {
  res.send(ready);
})

app.listen(port, async () => {
  ready = await initData();
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:3000/`);
})