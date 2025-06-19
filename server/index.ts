import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, parseRepoInfo, calculateAvgLang } from './jsonhelper';
import { getRawUser, getRawAllRepos, getRawRepoData, getRawRepoLangs } from './githubhelper';

// IMPORTANT NOTE: run ../start in the URL to load data from github

// =================================
// Setup
dotenv.config({ path: 'server/secrets/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;

// Allow react to get access to the port
app.use(cors());

var user: string = "Github User";
var langs = new Map(); // Return certain stats from a repository

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
// Return a Map object of each languages and their bytes
async function findCommonLanguages() {
  return await calculateAvgLang(user, repos);
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
var profilepic: string = "https://avatars.githubusercontent.com/u/121594011?v=4";
var numOfRepos: number = 0;

async function parseUserInfo() {
  const userData = await getRawUser();
  user = userData.login;
  profilepic = userData.avatar_url;
}

app.get('/user/data', async (req, res) => {
  var data = new Map();

  data.set("user", user);
  data.set("pfp", profilepic);
  data.set("nofrepo", numOfRepos);

  res.json(Object.fromEntries(data));
})

// =================================
var ready: boolean = false;

async function initData() {
  try {
    await parseUserInfo();
    repos = await generateReposList();
    langs = await findCommonLanguages();
    numOfRepos = repos.length;
    
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