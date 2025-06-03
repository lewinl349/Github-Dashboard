import './app.css';
import Sidebar from './components/Sidebar.jsx';
import githubLogo from './assets/github-mark-white.svg';

// ================= Layout =================

export default function Repos({ repos }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <div className="text-3xl font-bold my-3">Your Repositories</div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Languages Used</th>
                <th></th>
              </tr>
            </thead>
            {repos.map((repo) => (
              <tbody>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={githubLogo}
                            alt="Picture failed to load" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{repo}</div>
                        <div className="text-sm opacity-50">Github User</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Temp repo description ========================== A really cool repo!
                  </td>
                  <td>Python, Javascript</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">Edit</button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}