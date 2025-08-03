import '../app.css';
import Sidebar from '../components/sidebar.jsx';
import githubLogo from '../assets/github-mark-white.svg';
import { customUseQuery } from '../hooks/queryHelper.jsx';
import { useState } from 'react';
import { IconContext } from "react-icons";
import { CgArrowsExpandRight, CgLink, CgTrash } from 'react-icons/cg';

// ================= Components ================
function RepoTable({ openDialog }) {
  const { isPending, error, data: repoData } = customUseQuery("N/A", "/api/repos", "reposList");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>);
  if (error) return 'An error has occurred: ' + error.message;

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
                <button title="Expand TODO Window" onClick={() => openDialog(repo.name, repo.owner)} className="btn btn-outline btn-primary btn-xs mx-1">
                  <CgArrowsExpandRight />
                </button>
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
    </IconContext.Provider>
  )
}

function Checklist({ name, data, hasCheckbox, hasEditing }) {
  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <ul className="list bg-base-100 rounded-box w-[25vw]">
        <li className="flex justify-between align-center">
          <div className="text-lg opacity-60 tracking-wide">
            {name}
          </div>
          {hasEditing ? (
            <button className="btn btn-sm btn-ghost">
              + New
            </button>) :
            (<div></div>)
          }
        </li>
        {data instanceof Array && data.length > 0 ? data.map((item) => (
          <li key={item.id} className="list-row hover:bg-base-300 group">
            {hasCheckbox ? (
              <label>
                <input type="checkbox" className="checkbox" />
              </label>) :
              (<div></div>)
            }
            <div>
              <div>{item.desc}</div>
              <div className="text-xs uppercase font-semibold opacity-60">Due in 1 week</div>
            </div>
            {hasEditing ? (
              <button className="btn btn-square bg-red-700 hidden group-hover:inline-flex">
                <CgTrash />
              </button>) :
              (<div></div>)
            }
          </li>
        )) : (<li className="list-row hover:bg-base-300 group">No Items...</li>)}
      </ul>
    </IconContext.Provider>
  )
}

function TODOWindow({ repoName, ownerName }) {
  const { isPending, error, data: repoData } = customUseQuery(`${ownerName}${repoName}`, `/db/TODO/${ownerName}/${repoName}`, "getTODO");

  return (
    <dialog id="edit-repo-modal" className="modal">
      <div className="modal-box max-w-6xl max-h-[85vh]">
        <form method="dialog" className="grid gap-5">
          <h3 className="font-bold text-lg">Summary</h3>
          <button className="btn btn-soft col-start-6">Cancel</button>
          <button className="btn btn-soft btn-primary col-start-7">Save</button>
        </form>
        <p className="pt-1 pb-1 font-bold">{repoName}</p>
        <p className="pt-1 pb-4">{ownerName}</p>
        {isPending || error ? (<div>An error has occurred</div>) :
          (<div className="flex flex-col lg:flex-row w-full justify-center">
            <Checklist name="To-Do" hasCheckbox={true} hasEditing={true} data={repoData} />
            <div className="divider lg:divider-horizontal"></div>
            <Checklist name="Notes" hasCheckbox={false} hasEditing={true} data={repoData} />
            <div className="divider lg:divider-horizontal"></div>
            <Checklist name="Open Issues/PR" hasCheckbox={false} hasEditing={false} data={repoData} />
          </div>)
        }
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

// ================= Layout =================
export default function Repos() {
  const [repo, setRepo] = useState("");
  const [owner, setOwner] = useState("");

  function openDialog(name, owner) {
    setRepo(name);
    setOwner(owner);
    document.getElementById('edit-repo-modal').showModal();
  }

  return (
    <div className="flex">
      <Sidebar />
      <TODOWindow repoName={repo} ownerName={owner} />
      <div className="flex flex-col mx-10">
        <div className="text-3xl font-bold my-5">Your Repositories</div>
        <div className="overflow-x-auto">
          <RepoTable openDialog={openDialog} />
        </div>
      </div>
    </div>
  );
}