import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  const [todoItems, setTodoItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState(null);

  const [filterText, setFilterText] = useState('');

  const [isAdding, setIsAdding] = useState(false);

  const filteredToDoItems = todoItems.filter((item) => {
    // Adjust the filtering logic based on your data structure
    return item.name.toLowerCase().includes(filterText.toLowerCase());
  });

  useEffect(() => {
    populateToDoItems();
  }, []);

  function setNewItem() {
    setIsAdding(true);
  }

  function canelNewItem() {
    setIsAdding(false);
  }

  async function addNewItem() {
    const newtoDoItem = {
      name: name,
      description: description,
      status: status,
      dueDate: dueDate,
    };

    const response = await fetch('https://localhost:7038/api/ToDo/AddToDoItem', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newtoDoItem),
    })
    
    if (response.ok) {
      const newID = await response.json();
      newtoDoItem.id = newID;
    } else {
      alert('response not OK');
    }

    const newTodoItems = [...todoItems];
    newTodoItems.push(newtoDoItem);

    setTodoItems(newTodoItems);

    setName("");
    setDescription("");
    setStatus("");
    setDueDate("");
    setIsAdding(false);

  }

  const filterSearchTodoItems = (filterText) => {
    setFilterText(filterText);
  }


  const handleToDoItemUpdate = async (id, name, description, status, dueDate) => {

    let itemsIndex = -1;
    const newTodoItems = todoItems.map((item, index) => {
      if (item.id === id) {
          itemsIndex = index;
          item.name = name;
          item.description = description;
          item.status = status;
          item.dueDate = dueDate;
          return item;
      } else {
        return item;
      }
    });

    // Async call to update the Update via API
      await fetch('https://localhost:7038/api/ToDo/UpdateToDoItem', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTodoItems[itemsIndex]),
      });

    setTodoItems(newTodoItems);

  };

  const handleToDoItemDelete = async (id) => {
    // Create a new array without the item at the specified index
    const newTodoItems = todoItems.filter((item) => item.id !== id);

    const data = {
      id: id
    };

    await fetch('https://localhost:7038/api/ToDo/DeleteToDoItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: id
    })
    .then(response => {
      // Handle response
    })
    .catch(error => {
      // Handle error
      alert(error);
    });

    setTodoItems(newTodoItems);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-10 col-sm-9 col-9 col-sm-9 order-lg-1 order-md-1">
            <h1 className="float-start">Vardan's To-Do List</h1>
          </div>

          <div className="col-lg-3 col-md-12 col-lg-2 col-sm-12 order-3 order-md-3 order-sm-3 order-xs-3 mt-2">
            <div className="input-group">
              <input
                className="form-control border-end-0 border float-end"
                placeholder="search"
                type="text"
                id="example-search-input"
                onChange={(e) => filterSearchTodoItems(e.target.value)}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border-start-0 border ms-n3"
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-3 col-xs-3 order-2 order-lg-3 order-md-2 order-sm-2 order-md-2 order-xs-2 mt-2">
            <button
              className="btn btn-secondary float-end w-100"
              defaultValue="Add New"
              onClick={setNewItem}
            >
              Add New
            </button>
          </div>
        </div>

        <hr></hr>

        <div
          id="AddToDoItem"
          className={"row addToDoItemDiv" + (isAdding ? "" : " d-none")}
        >
          <div className="row">
            <h3 className="mb-2 mt-2">Add New To-Do Item</h3>
          </div>
          <div className="row mt-2 mb-2">
            <label
              className="control-label col-lg-3 col-md-12 col-form-label"
              htmlFor="ServiceCheckName"
            >
              Item Name:
            </label>
            <div className="col-lg-4 col-md-12 requiredField">
              <input
                className="form-control col-lg-4 col-md-12"
                type="text"
                id="newToDoItemName"
                name="newToDoItemName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-2 mb-2">
            <label className="control-label col-lg-3 col-md-12 col-form-label">
              Item Description:
            </label>
            <div className="col-lg-9 col-md-12 requiredField">
              <textarea
                className="form-control col-lg-9 col-md-12"
                id="newToDoItemDescription"
                name="newToDoItemDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="row mt-2 mb-2">
            <label className="control-label col-lg-3 col-md-12 col-form-label">
              Item Status:
            </label>
            <div className="col-lg-4 col-md-12">
              <select
                className="form-select"
                id="newToDoItemStatus"
                name="newToDoItemStatus"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option defaultValue="Pending">Pending</option>
                <option defaultValue="Completed">Completed</option>
                <option defaultValue="PastDue">PastDue</option>
              </select>
            </div>
          </div>

          <div className="row mt-2 mb-2">
            <label className="control-label col-lg-3 col-md-12 col-form-label">
              Item Due Date:
            </label>
            <div className="col-lg-4 col-md-12">
              <input
                className="form-control col-lg-4 col-md-12"
                type="date"
                id="newToDoItemDueDate"
                name="newToDoItemDueDate"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-2 mt-2">
            <div className="col-lg-3 d-none d-lg-block">&nbsp;</div>
            <div className="col-lg-3 d-none d-lg-block">&nbsp;</div>
            <div className="col-lg-3 col-md-12">
              <button
                className="btn btn-secondary w-100 mb-1"
                type="button"
                onClick={addNewItem}
              >
                Add
              </button>
            </div>
            <div className="col-lg-3 col-md-12">
              <button
                className="btn btn-secondary w-100 mb-1"
                type="button"
                onClick={canelNewItem}
              >
                Cancel
              </button>
            </div>
          </div>

        </div>

        <hr />

        {filteredToDoItems != null && filteredToDoItems.length > 0
          ? filteredToDoItems.map((item) => (
              <ToDoItem
                key={item.id}
                todoItem={item}
                onUpdate={handleToDoItemUpdate}
                onDelete={handleToDoItemDelete}
              ></ToDoItem>
            ))
          : (<h3 className="text-center">No Items Present</h3>)}

          {console.log("todoItems")}
          {console.log(todoItems)}
          {console.log("filteredToDoItems")}
          {console.log(filteredToDoItems)}

      </div>
    </>
  );

  // http://localhost:7004/api/GetToDoItems - Local Azure Function 
  // https://localhost:7038/api/ToDo/GetToDoItems - Local Web API 
  async function populateToDoItems() {
    const response = await fetch("https://localhost:7038/api/ToDo/GetToDoItems", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTodoItems(data);
    }
  }
  
}

export default ToDoList;
