import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { parseAllRepos } from './jsonhelper.js';
import { getRawAllRepos } from './githubhelper.js';

dotenv.config({ path: 'server/secrets/keys.env' });

const app = express();
const port: number = parseInt(process.env.PORT) || 3000;
const user: string = "lewinl349"; // Temporary hardcode

// Allow react to get access to the port
app.use(cors());

async function GenerateReposList() {
    const response = await getRawAllRepos(); 
    const data = JSON.stringify(response);
    return parseAllRepos(data, user);
}

// Get list of repositories
app.get('/getRepos', async (req, res) => {
  try {
    var repos = await GenerateReposList();
    res.json(repos);

  } catch (error) {
    console.error(error);
    res.status(500)
    res.send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Sucessfully listening on port ${port}. Open http://localhost:3000/`);
})