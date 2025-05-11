import './repos.css'
import './app.css';
import Sidebar from './components/Sidebar.jsx';
import { useEffect, useState } from 'react';

// ================= Layout =================

export default function Repos() {
  const [repos, setRepos] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/repos/all')
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch((err) => console.error('Failed to fetch repos:', err));
    }, []);

  return (
    <div className="main">
      <Sidebar />
      <div id="content">
        <div><h1>Your Repositories</h1></div>
        <div className="repos">
          <ul>
            {repos.map((repo) => (
              <li key={repo}>{repo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}