import './app.css';
import Sidebar from './components/Sidebar.jsx';

// ================= Layout =================

export default function Repos({repos}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
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