import '../app.css';
import Sidebar from '../components/sidebar.jsx';
import githubLogo from '../assets/github-mark-white.svg';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { CgArrowsExpandRight, CgLink, CgTrash } from 'react-icons/cg';

// ================= Components ================
function RepoTable({ openDialog }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['reposList'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/api/repos',
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
                <button onClick={() => openDialog(repo.name)} className="btn btn-outline btn-primary btn-xs mx-1">
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
        {data.map((item) => (
          <li className="list-row hover:bg-base-300 group">
            {hasCheckbox ? (
              <label>
                <input type="checkbox" className="checkbox" />
              </label>) :
              (<div></div>)
            }

            <label>
              <input type="checkbox" className="checkbox" />
            </label>
            <div>
              <div>{item}</div>
              <div className="text-xs uppercase font-semibold opacity-60">Due in 1 week</div>
            </div>
            {hasEditing ? (
              <button className="btn btn-square bg-red-700 hidden group-hover:inline-flex">
                <CgTrash />
              </button>) :
              (<div></div>)
            }

          </li>
        ))}
      </ul>
    </IconContext.Provider>
  )
}

function TODOWindow({ repoName }) {
  return (
    <dialog id="edit-repo-modal" className="modal">
      <div className="modal-box max-w-6xl max-h-[85vh]">
        <h3 className="font-bold text-lg">Summary</h3>
        <p className="pt-1 pb-4">{repoName}</p>
        <div className="flex flex-col lg:flex-row w-full justify-center">
          <Checklist name="To-Do" data={["Item #1", "Item #2", "Item #3", "Item #4", "Item #5", "Item #6", "Item #7", "Item #8"]} />
          <div className="divider lg:divider-horizontal"></div>
          <List name="Notes" data={["Item #1", "Item #2", "Item #3", "Item #4", "Item #5aaaaaaaaaaaaaaaaaaaaaaaaaa",
            "So this is a really cool repository but it is missing a few features... Here are 3 of them"
          ]} />
          <div className="divider lg:divider-horizontal"></div>
          <List name="Open Issues/PR" data={["Issue #14: Fix this bug", "Issue #17: This button is laggy", "PR: Someone requests to merge with the main branch!"]} />
        </div>
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

  function openDialog(name) {
    setRepo(name);
    document.getElementById('edit-repo-modal').showModal();
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