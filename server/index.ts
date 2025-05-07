import { Octokit } from "octokit";
import express from "express";
import dotenv from "dotenv";
import { get_all_repos } from './jsonhelper.js';

dotenv.config({ path: 'server/secrets/keys.env' });

const app = express();
const port = process.env.PORT || 3000;
const user = "lewinl349"; // Temporary hardcode

// Authenticate github
const octokit = new Octokit({ 
  auth: process.env.TOKEN
});

// Get list of repositories
app.get('/', async (req, res) => {
  try {
    const response = await octokit.request('GET /user/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const data = JSON.stringify(response.data);
    var repos = get_all_repos(data, user);
    res.send(repos);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Error status 500');
  }
});


app.listen(port, () => {
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:3000/`);
})