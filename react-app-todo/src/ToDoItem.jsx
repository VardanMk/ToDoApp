import { useState } from "react";

function ToDoItem({todoItem, onUpdate, onDelete}) {

  const [id, setId] = useState(todoItem.id);
  const [name, setName] = useState(todoItem.name);
  const [description, setDescription] = useState(todoItem.description);
  const [status, setStatus] = useState(todoItem.status);
  const [dueDate, setDueDate] = useState(new Date(todoItem.dueDate).toISOString().slice(0, 10));

  const [isUpdating, setIsUpdating] = useState(false);


  function updateToDoItem(id) {
    onUpdate(id, name, description, status, dueDate);
    setIsUpdating(false);
  }

  const deleteToDoItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(id);
    }
  }

  function setEditable() {
    setIsUpdating(true);
  }

  function cancelEditable() {
    setIsUpdating(false);
  }

  return (
    <>
      <div key={todoItem.id} className="row">
        <div className="col-lg-6 col-md-12 mb-lg-1 mb-2">
          <input id="ToDoItemName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" disabled={!isUpdating ? "disabled" : ""} />
          <textarea className="form-control col-lg-9 col-md-12 mt-2 mb-lg-3 mb-0"  id="ServiceCheckDescription" 
                            name="ServiceCheckDescription" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!isUpdating ? "disabled" : ""} ></textarea>
        </div>
        <div className="col-lg-2 col-md-6 mb-2">
          <input type="text" className={"form-control" + (isUpdating ? ' d-none' : '')} id="ToDoItemStatus" value={status}  disabled={!isUpdating ? "disabled" : ""} />
          <select
                className={"form-select" + (isUpdating ? '' : ' d-none')}
                id="status"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="Pending" >Pending</option>
                <option value="Completed" >Completed</option>
                <option value="PastDue" >PastDue</option>
              </select>
        </div>
        <div className="col-lg-2 col-md-6 float-end mb-2">
          <input type="date" className="form-control" id="ToDoItemDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} disabled={!isUpdating ? "disabled" : ""} />
        </div>
        <div className="col-lg-2 col-md-12 mb-2">
          <div className={"btn-group w-100" + (isUpdating ? ' d-none' : '')}>
            <button className="btn btn-secondary w-100 mb-1" type="button" onClick={setEditable}>Edit</button>
            <button className="btn btn-danger w-100 mb-1" type="button" onClick={() => deleteToDoItem(id)}>Delete</button>
          </div>
          <div className={"btn-group w-100" + (isUpdating ? '' : ' d-none')}>
            <button className="btn btn-outline-secondary w-100 mb-1" type="button" onClick={() => updateToDoItem(id)}>Update</button>
            <button className="btn btn-outline-secondary w-100 mb-1" type="button" onClick={cancelEditable}>Cancel</button>
          </div>
        </div>
      </div>


      <hr className="m-0 mb-3" />

    </>
  );
}

export default ToDoItem;
