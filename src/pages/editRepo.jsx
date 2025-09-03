import 'react-calendar/dist/Calendar.css';
import '../app.css';
import { useParams } from "react-router-dom";
import { CgTrash, CgPen, CgLink } from 'react-icons/cg';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import { IconContext } from "react-icons";
import { customUseQuery } from '../hooks/queryHelper.jsx';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Calendar from 'react-calendar';

function DeleteItemModal({ id, deleteFunc }) {
  const deleteReq = useMutation({
    mutationFn: (data) => {
      return axios.post(`http://localhost:3000/db/TODO/delete/${id}`, data)
    },
    onSuccess: () => {
      document.getElementById('delete_modal').close();
      deleteFunc();
    }
  })

  function handleDelete() {
    deleteReq.mutate({});
  }

  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box bg-base-200 border-base-300 rounded-box border">
        <h3 className="font-bold text-lg">Are you sure?</h3>

        <div className="flex w-full justify-between my-4">
          <button className="btn btn-outline btn-primary"
            onClick={() => document.getElementById('delete_modal').close()}>Cancel</button>

          <button className="btn btn-outline btn-warning"
            onClick={() => handleDelete()}>Delete</button>
        </div>

        {deleteReq.isError ? (<div>Error deleting!</div>) : (<div></div>)}
      </div>
    </dialog>
  )
}

function Checklist({ name, data, isTODO, hasEditing, openDialog, setIsEditing, setCurrID }) {
  // Keep track of which entry had their delete button clicked
  const [deleteID, setDeleteID] = useState(-1);
  const [checkboxDelay, setCheckboxDelay] = useState(false);

  function handleDeleteButton(id) {
    setDeleteID(id);
    document.getElementById('delete_modal').showModal();
  }

  function confirmDelete() {
    var itemIndex = data.map(entry => entry.id).indexOf(deleteID);

    data.splice(itemIndex, 1);
    setDeleteID(-1);
  }

  function handleEditing(isEditing, desc, label, dueDate, id) {
    setIsEditing(isEditing);
    setCurrID(id);

    openDialog(desc, label, dueDate);
  }

  const completeReq = useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/db/TODO/complete', data)
    },
    onSuccess: () => {
      setCheckboxDelay(false);
      return
    }
  })

  function handleComplete(e) {
    setCheckboxDelay(true);
    completeReq.mutate({ id: e.target.value, complete: e.target.checked ? 1 : 0 });
  }

  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <DeleteItemModal id={deleteID} deleteFunc={confirmDelete} />
      <ul className="list bg-base-100 rounded-box min-w-md w-[35vw]">
        <li className="flex justify-between align-center">
          <div className="text-lg opacity-60 tracking-wide">
            {name}
          </div>
          {hasEditing && (
            <button onClick={() => handleEditing(false, "", "", new Date(), -1)} className="btn btn-sm btn-outline btn-primary">
              + New
            </button>)
          }
        </li>
        {data instanceof Array && data.length > 0 ? data.map((item) => (
          <li key={item.order || item.number} className="list-row hover:bg-base-300 group">
            {isTODO ? (
              <label>
                <input type="checkbox" className="checkbox checkbox-primary disabled:opacity-100 disabled:cursor-wait" disabled={checkboxDelay} defaultChecked={item.completed == 1} value={item.id} onChange={handleComplete} />
              </label>) :
              (<div></div>)
            }
            <div>
              {isTODO ? (
                <div>
                  <div>{item.desc}</div>
                  <div className="flex justify-between">
                    <div className="text-xs uppercase font-semibold opacity-60">{"Due: " + item.due_date.split('T')[0]}</div>
                    <div className="badge badge-outline badge-primary badge-xs">{item.label}</div>
                  </div>
                </div>

              ) : (<div>
                {`Issue ${item.number}: ${item.title}`}
                <div className="text-xs uppercase font-semibold opacity-60">{"Created at: " + item.created.split('T')[0]}</div>
              </div>)
              }
            </div>
            {hasEditing ? (
              <div>
                <button className="btn btn-square bg-primary hidden group-hover:inline-flex mr-4" disabled={item.id == -1} onClick={() => handleEditing(true, item.desc, item.label, new Date(item.due_date), item.id)}>
                  <CgPen />
                </button>
                <button className="btn btn-square bg-red-700 hidden group-hover:inline-flex" disabled={item.id == -1} onClick={() => handleDeleteButton(item.id)}>
                  <CgTrash />
                </button>
              </div>) :
              (<a href={item.url} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-square bg-primary hidden group-hover:inline-flex">
                  <CgLink />
                </button>
              </a>)
            }
          </li>
        )) : (<li className="list-row hover:bg-base-300 group">No Items...</li>)}
      </ul>
    </IconContext.Provider>
  )
}

export function TODOWindow() {
  let { owner: ownerName, name: repoName } = useParams();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ['getTODO', `${ownerName}${repoName}`] });
  const { isPending, error, data: repoData } = customUseQuery(`${ownerName}${repoName}`, `/db/TODO/${ownerName}/${repoName}`, "getTODO");
  const { isPending: issuesPending, error: issuesError, data: issuesData } = customUseQuery(`${ownerName}${repoName}`, `/api/issues/${ownerName}/${repoName}`, "getIssues", 120000)

  /**
   * State variables for adding TODO entries
   */

  const [desc, setDesc] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(new Date());

  // For editing
  const [currID, setCurrID] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  function onDescChange(nextValue) {
    setDesc(nextValue.target.value);
  }

  function onLabelChange(nextValue) {
    setLabel(nextValue.target.value);
  }

  function onDateChange(nextValue) {
    setDate(nextValue);
  }

  function openTODODialog(nextDesc, nextLabel, nextDate) {
    setDesc(nextDesc);
    setLabel(nextLabel);
    setDate(nextDate);

    document.getElementById('TODO_modal').showModal();
  }

  function handleTODO() {
    if (isEditing) {
      editTODO(currID);
    } else {
      addTODO();
    }
  }

  /**
   * Create new TODO Entry
   */

  const TODOReq = useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/db/TODO/new', data)
    },
    onSuccess: () => {
      document.getElementById('TODO_modal').close();
      queryClient.invalidateQueries({ queryKey: ['getTODO', `${ownerName}${repoName}`] });
    }
  })

  function addTODO() {
    const newEntry = {
      id: -1, name: repoName, owner: ownerName, desc: desc, due_date: date.toJSON(),
      label: label, order: repoData.length > 0 ? (repoData[0].order + 1) : 0
    }
    TODOReq.mutate(newEntry);
    // Optimistic update
    repoData.push(newEntry);
    repoData.sort((a, b) => b.order - a.order);
  }

  /**
   * Edit a TODO Entry
   */
  const editTODOReq = useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/db/TODO/edit', data)
    },
    onSuccess: () => {
      document.getElementById('TODO_modal').close();
      queryClient.invalidateQueries({ queryKey: ['getTODO', `${ownerName}${repoName}`] });
    }
  })

  function editTODO(id) {
    const entry = { id: id, desc: desc, due_date: date.toJSON(), label: label };

    editTODOReq.mutate(entry);

    // TODO: Add optimistic update
  }

  if (isPending || issuesPending) return (<span className="loading loading-spinner text-primary"></span>);

  if (error || issuesError) return 'An error has occurred: ' + error.message;

  repoData.sort((a, b) => b.order - a.order);

  return (
    <div className="max-w-5xl w-full bg-base-100 m-5 p-5 border border-gray-400">
      <dialog id="TODO_modal" className="modal">
        <div className="modal-box bg-base-200 border-base-300 rounded-box border w-auto">
          <h3 className="font-bold text-lg">{isEditing ? "Edit TODO Entry" : "Adding new TODO"}</h3>

          <fieldset className="fieldset bg-base-200 w-xs p-4">
            <label className="label"> Description </label>
            <input type="desc" className="input" placeholder="Your task here!" value={desc} onChange={onDescChange} />

            <label className="label"> Label </label>
            <input type="label" className="input" placeholder="What Category?" maxLength="10" value={label} onChange={onLabelChange} />

            <label className="label"> Due Date </label>
            <div className="text-black">
              <Calendar onChange={onDateChange} value={date} />
            </div>

            <button className="btn btn-outline btn-primary mt-4"
              onClick={() => handleTODO()}>
              {TODOReq.isPending ? ("Saving...") : ("Save")}</button>
            {TODOReq.isError ? (
              <p className="text-red">Request failed... Try again.</p>
            ) : (<div></div>)}

          </fieldset>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost btn-primary absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>



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
          <Checklist name="To-Do" isTODO={true} setCurrID={setCurrID} setIsEditing={setIsEditing} hasEditing={true} data={repoData} openDialog={openTODODialog} />
          {/* <div className="divider lg:divider-horizontal"></div>
          <Checklist name="Notes" isTODO={false} setCurrID={setCurrID} setIsEditing={setIsEditing} hasEditing={true} data={repoData} /> */}
          <div className="divider lg:divider-horizontal"></div>
          <Checklist name="Open Issues/PR" isTODO={false} hasEditing={false} data={issuesData.issues.concat(issuesData.PRs)} />
        </div>)
      }
    </div>
  )
}