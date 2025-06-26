import '../app.css';
import Sidebar from '../components/Sidebar.jsx';
import githubLogo from '../assets/github-mark-white.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IconContext } from "react-icons";
import { CgArrowsExpandRight, CgLink } from 'react-icons/cg';

// ================= Components ================
function RepoTable({ openDialog }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['reposList'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/repos/all',
      )
      return await response.json()
    },
  })

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

  if (error) return 'An error has occurred: ' + error.message

  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <table className="table border-base-content/5 bg-base-100 ">
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
          {data.map((repo) => (
            <tr key={repo.owner.concat(repo.name)} className="hover:bg-base-300 border border-gray-400 border-collapse">
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
              <th>
                <button value={repo.name} onClick={openDialog} className="btn btn-outline btn-primary btn-xs mx-1">
                  <CgArrowsExpandRight />
                </button>
                <a href={repo.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-outline btn-primary btn-xs mx-1">
                    <CgLink />
                  </button>
                </a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </IconContext.Provider>
  )
}

function TODOWindow({ repoName }) {
  return (
    <dialog id="edit-repo-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Summary</h3>
        <p className="py-1">{repoName}</p>
        <div className="flex md:flex-col">

        </div>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

// ================= Layout =================

export default function Repos() {
  const [repo, setRepo] = useState("sss");

  function openDialog(e) {
    document.getElementById('edit-repo-modal').showModal();
    setRepo(e.target.value);
  }

  return (
    <div className="flex">
      <Sidebar />
      <TODOWindow repoName={repo} />
      <div className="flex flex-col mx-10">
        <div className="text-3xl font-bold my-5">Your Repositories</div>
        <div className="overflow-x-auto">
          <RepoTable openDialog={openDialog} />
        </div>
      </div>
    </div>
  );
}