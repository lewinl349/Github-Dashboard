import '../app.css';
import githubLogo from '../assets/github-mark-white.svg';
import { customUseQuery } from '../hooks/queryHelper.jsx';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import { IconContext } from "react-icons";
import { CgArrowsExpandRight, CgLink } from 'react-icons/cg';


// ================= Components ================
function RepoTable() {
  const { isPending, error, data: repoData } = customUseQuery("N/A", "/api/repos", "reposList");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>);
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <table className="table border-base-content/5 bg-base-100 mb-10">
        {/* head */}
        <thead>
          <tr className="border-gray-400 border-collapse">
            <th className="w-1/32">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="w-1/8">Name</th>
            <th className="w-1/3">Description</th>
            <th className="w-1/10">Languages Used</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {repoData instanceof Array ? repoData.map((repo) => (
            <tr key={repo.owner + "/" + repo.name} className="hover:bg-base-300 border border-gray-400 border-collapse">
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={githubLogo}
                        alt="Custom repo icon" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{repo.name}</div>
                    <div className="text-sm opacity-50">{repo.owner}</div>
                  </div>
                </div>
              </td>
              <td>
                {repo.desc || "No description provided."}
              </td>
              <td>{Object.keys(repo.langs).join(", ") || "Not Documented"}</td>
              <td>
                <Link to={`/repos/edit/${repo.owner}/r/${repo.name}`}>
                  <button className="btn btn-outline btn-primary btn-xs mx-1">
                    <CgArrowsExpandRight />
                  </button>
                </Link>
                <a href={repo.link} target="_blank" rel="noopener noreferrer">
                  <button title="Open Github Page" className="btn btn-outline btn-primary btn-xs mx-1">
                    <CgLink />
                  </button>
                </a>
              </td>
            </tr>
          )) : (<div>repoData</div>)}
        </tbody>
      </table>
      <Outlet />
    </IconContext.Provider>
  )
}

// ================= Layout =================
export default function Repos() {
  return (
    <div className="flex flex-col mx-10">
      <div className="text-3xl font-bold my-5">Your Repositories</div>
      <div className="overflow-x-auto">
        <RepoTable />
      </div>
    </div>
  );
}