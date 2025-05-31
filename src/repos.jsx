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
    <div className="flex">
      <Sidebar />
      <div className="flex-col">
        <div><h1>Your Repositories</h1></div>
        <div className="list-row">
          <ul>
            {repos.map((repo) => (
              <li className="bg-base-100 rounded-box w-[50vw] h-[10vh] m-5 p-5" key={repo}>{repo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}