import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos, calculateAvgLang, parseUserData } from './jsonhelper';
import type { Repo, User } from './types';

// IMPORTANT NOTE: run ../start in the URL to load data from github
// TODO: Filter data for the past 30 days of contribution activity!
// TODO: Research other interesting summaries or statss
// TODO: Paginate requests for repo

// =================================
// Setup
dotenv.config({ path: 'server/keys.env' });

const app = express();
app.use(express.json());
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
app.get('/api/repos', async (req, res) => {
  try {
    res.json(repos);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
});

// =================================
app.get('/api/repos/languages', async (req, res) => {
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
app.get('/api/user', async (req, res) => {
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
    console.log("Gathering data...");
    user = await parseUserData();
    repos = await parseAllRepos(user);
    langs = await calculateAvgLang(user.name, repos);
    
    return true;
  } catch {
    return false;
  }
}

// Initialize data when user logins
app.post('/api/authenticate/user', async (req, res) => {
  console.log("Reading data...");
  const body = req.body;
  if (!ready) {
    ready = await initData();
  }
  else if (body.method == 'User' && body.username != user.name) {
    ready = await initData();
  }
  res.json(ready); 
})

app.listen(port, async () => {
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:${port}/`);
})