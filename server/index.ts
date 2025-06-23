import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, calculateAvgLang, parseUserData } from './jsonhelper';
import type { Repo, User } from './types';

// IMPORTANT NOTE: run ../start in the URL to load data from github
// TODO: Filter data for the past 30 days of contribution activity!
// TODO: Research other interesting summaries or statss
// FIXME: Languages graph
// TODO: Paginate requests for repo

// =================================
// Setup
dotenv.config({ path: 'server/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;

// Allow react to get access to the port
app.use(cors());

// Variables and default values
// Repo data
var langs: Record<string, number> = {};
var repos: Repo[] = [];

// User Object
var user: User = null;

// =================================
// Return a list of repositories
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
app.get('/repos/langs', async (req, res) => {
  try {
    res.json(langs);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
});

// =================================
// Github User Information
app.get('/user/data', async (req, res) => {
  try {
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
})

// =================================
var ready: boolean = false;

async function initData(): Promise<boolean> {
  try {
    user = await parseUserData();
    repos = await parseAllRepos(user);
    langs = await calculateAvgLang(user.name, repos);
    
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