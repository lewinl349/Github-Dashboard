import '../app.css';
import { useParams } from "react-router-dom";
import { CgTrash, CgArrowsExpandRight, CgLink } from 'react-icons/cg';
import { Outlet, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { customUseQuery } from '../hooks/queryHelper.jsx';

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
              <div className="text-xs uppercase font-semibold opacity-60">{item.due_date || "Item " + item.order}</div>
              <div></div>
            </div>
            {hasEditing ? (
              <button className="btn btn-square bg-red-700 hidden group-hover:inline-flex">
                <CgTrash />
              </button>) :
              (<button className="btn btn-square bg-primary hidden group-hover:inline-flex">
                <CgLink />
              </button>)
            }
          </li>
        )) : (<li className="list-row hover:bg-base-300 group">No Items...</li>)}
      </ul>
    </IconContext.Provider>
  )
}

export function TODOWindow() {
  let { owner: ownerName, name: repoName } = useParams();
  const { isPending, error, data: repoData } = customUseQuery(`${ownerName}${repoName}`, `/db/TODO/${ownerName}/${repoName}`, "getTODO");

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="max-w-6xl bg-base-100 m-5 p-5 border border-gray-400">
      <form className="grid gap-5">
        <h3 className="font-bold text-lg">Summary</h3>
        <Link to={`/repos`} className="btn btn-outline btn-primary col-start-7">
          Back
        </Link>
        <Outlet />
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
  )
}