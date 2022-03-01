import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, steItems] = useState([]);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);

  // addbutton function

  const addItem = () => {
    if (!inputData) {
      alert("add somthing");
    } else if (inputData && !toggleSubmit) {
      steItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, data: inputData };
          }
          return elem;
        })
      );
      settoggleSubmit(true);
      setInputData("");
      setisEditItem(null);
    } else {
      const id = new Date().getTime().toString();
      const newEntry = { id: id, data: inputData };
      steItems([...items, newEntry]);
      setInputData("");
    }
  };

  // delete btn function
  const DeleteItem = (index) => {
    const updatedItem = items.filter((elem) => {
      return index !== elem.id;
    });
    steItems(updatedItem);
  };

  // Edite btn function
  const EditItem = (id) => {
    let newEditeItems = items.find((elem) => {
      return id === elem.id;
    });
    settoggleSubmit(false);
    setInputData(newEditeItems.data);
    setisEditItem(id);
  };

  const date = new Date().toLocaleDateString();

  return (
    <>
      <div className="App">
        <div className="App-header">
          <h1> TODO-APP</h1>
          <p>{date} </p>
          <div className="wrapper">
            <div className="input-wrapper">
              <input
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                type="text"
                autoComplete="false"
                placeholder="add Todo"
              />
              <button>
                {toggleSubmit ? (
                  <i className="fa-solid fa-2x fa-circle-plus"  onClick={addItem} ></i> ) : (
                  <i className="fa-solid fa-2x fa-pen-to-square"  onClick={addItem} ></i>
                )}
              </button>
            </div>
          </div>

          {items.map((elem) => {
            return (
              <div className="item-list" key={elem.id}>
                <span> {elem.data} </span>
                <button className="edit" onClick={() => EditItem(elem.id)}>
                  {" "}
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="Delete" onClick={() => DeleteItem(elem.id)}>
                  {" "}
                  <i className="fa-solid fa-trash-can"></i>{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
