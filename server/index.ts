import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { router as db } from './routes/db';
import { parseAllRepos, calculateAvgLang, parseUserData, parseIssues } from './jsonHelper';
import { getToken as getGithubToken } from './githubHelper';
import { getToken as getAIToken } from './geminiHelper';
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

// States
var ready: boolean = false;

// =================================
// API
app.get('/api/repos', async (req, res) => {
  try {
    res.json(repos);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Failed to fetch repos');
  }
});

app.get('/api/repos/languages', async (req, res) => {
  try {
    res.json(langs);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Failed to fetch repository languages');
  }
});

app.get('/api/user', async (req, res) => {
  try {
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Failed to fetch user data');
  }
})

app.get('/api/issues/:owner/:name', async (req, res) => {
  try {
    const data = req.params;

    const issues = await parseIssues(data.owner, data.name);
  
    res.json(issues)

  } catch (error) {
    console.error(error);
    res.status(500);
    res.send('Failed to fetch user data');
  }
})

// =================================
// DB

app.use('/db', db);

// =================================
// Options/Token Check
app.get('/token/github', async (req, res) => {
  try {
    if (process.env.GITHUB_TOKEN) {
      const valid = await getGithubToken();
      res.json(valid);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
})

app.get('/token/ai', async (req, res) => {
  try {
    if (process.env.GEMINI_TOKEN) {
      const valid = await getAIToken();
      res.json(valid);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
})

// =================================
// Initialize
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

// Initialize data when user logins
app.post('/api/authenticate/user', async (req, res) => {
  try {
    console.log("Reading data...");

    ready = await initData();

    res.json(ready);
  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Failed to fetch user data');
  }

})

app.listen(port, async () => {
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:${port}/`);
})