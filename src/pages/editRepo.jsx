import 'react-calendar/dist/Calendar.css';
import '../app.css';
import { useParams } from "react-router-dom";
import { CgTrash, CgArrowsExpandRight, CgLink } from 'react-icons/cg';
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

function Checklist({ name, data, isTODO, hasEditing, openDialog }) {
  // Keep track of which entry had their delete button clicked
  const [deleteID, setDeleteID] = useState(-1);

  function handleDeleteButton(id) {
    setDeleteID(id);
    document.getElementById('delete_modal').showModal();
  }

  function confirmDelete() {
    var itemIndex = data.map(entry => entry.id).indexOf(deleteID);

    console.log(data[itemIndex]);

    data.splice(itemIndex, 1);
    setDeleteID(-1);
  }

  return (
    <IconContext.Provider value={{ className: "h-5 w-5" }}>
      <DeleteItemModal id={deleteID} deleteFunc={confirmDelete} />
      <ul className="list bg-base-100 rounded-box w-[25vw]">
        <li className="flex justify-between align-center">
          <div className="text-lg opacity-60 tracking-wide">
            {name}
          </div>
          {hasEditing && (
            <button onClick={() => openDialog("", "", new Date())} className="btn btn-sm btn-outline btn-primary">
              + New
            </button>)
          }
        </li>
        {data instanceof Array && data.length > 0 ? data.map((item) => (
          <li key={item.id + item.order} className="list-row hover:bg-base-300 group">
            {isTODO ? (
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>) :
              (<div></div>)
            }
            <div>
              <div>{item.desc}</div>
              {isTODO && (
                <div className="flex justify-between">
                  <div className="text-xs uppercase font-semibold opacity-60">{"Due: " + item.due_date.split('T')[0]}</div>
                  <div className="badge badge-outline badge-primary badge-xs">{item.label}</div>
                </div>
              )
              }
            </div>
            {hasEditing ? (
              <button className="btn btn-square bg-red-700 hidden group-hover:inline-flex" disabled={item.id == -1} onClick={() => handleDeleteButton(item.id)}>
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

  const queryClient = useQueryClient();

  const [desc, setDesc] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(new Date());

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

  const TODOReq = useMutation({
    mutationFn: (data) => {
      return axios.post('http://localhost:3000/db/TODO/new', data)
    },
    onSuccess: () => {
      document.getElementById('TODO_modal').close();
      queryClient.invalidateQueries({ queryKey: ['getTODO', `${ownerName}${repoName}`] });
    }
  })

  function handleSaveTODO() {
    const newEntry = {
      id: -1, name: repoName, owner: ownerName, desc: desc, due_date: date.toJSON(),
      label: label, order: repoData.length > 0 ? (repoData[0].order + 1) : 0
    }
    TODOReq.mutate(newEntry);
    // Optimistic update
    repoData.push(newEntry);
    repoData.sort((a, b) => b.order - a.order);
  }

  function handleEditTODO() {
    
  }

  if (isPending) return (<span className="loading loading-spinner text-primary"></span>)

  if (error) return 'An error has occurred: ' + error.message

  repoData.sort((a, b) => b.order - a.order);

  return (
    <div className="max-w-6xl bg-base-100 m-5 p-5 border border-gray-400">
      <dialog id="TODO_modal" className="modal">
        <div className="modal-box bg-base-200 border-base-300 rounded-box border w-auto">
          <h3 className="font-bold text-lg">Edit TODO Entry</h3>

          <fieldset className="fieldset bg-base-200 w-xs p-4">
            <label className="label"> Description </label>
            <input type="desc" className="input" placeholder="Your task here!" value={desc} onChange={onDescChange} />

            <label className="label"> Label </label>
            <input type="label" className="input" placeholder="What Category?" value={label} onChange={onLabelChange} />

            <label className="label"> Due Date </label>
            <div className="text-black">
              <Calendar onChange={onDateChange} value={date} />
            </div>

            <button className="btn btn-outline btn-primary mt-4"
              onClick={() => handleSaveTODO()}>{TODOReq.isPending ? ("Saving...") : ("Save")}</button>
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
          <Checklist name="To-Do" isTODO={true} hasEditing={true} data={repoData} openDialog={openTODODialog} />
          {/* <div className="divider lg:divider-horizontal"></div>
          <Checklist name="Notes" isTODO={false} hasEditing={true} data={repoData} /> */}
          <div className="divider lg:divider-horizontal"></div>
          <Checklist name="Open Issues/PR" isTODO={false} hasEditing={false} data={repoData} />
        </div>)
      }
    </div>
  )
}