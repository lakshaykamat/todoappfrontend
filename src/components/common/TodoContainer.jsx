import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../assets/Server";
import componets from './common'

function TodoContainer(props) {


  const [todos, setTodos] = useState(null);
  const handleRemoveTodo = (id) => {
    deleteTaskFromDataBase(id);
    props.setAlert("del");
    setTimeout(() => {
      props.setAlert("");
    }, 4000);
  };

  //Rendering all stored task in db
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/v1/tasks`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todos]);

  function deleteTaskFromDataBase(id) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/v1/tasks/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  function setComplete(id, isCompleted) {
    let data = JSON.stringify({
      isCompleted: !isCompleted,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/v1/tasks/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        !isCompleted && props.setAlert("completed");
        setTimeout(() => {
          props.setAlert("");
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      {props.alert == "completed" && props.displayAlertBox("text-white bg-green-500", `Completed :)`)}
      {props.alert == "del" && props.displayAlertBox("text-white bg-red-500", `Deleted :|`)}
       {/* If todos is null [means we are fetching from database] show a loading screen */}
       {/*One we are fetched from database and todos item length is 0 [means there are not tasks left] show */}
      {todos == null ? (
        componets.loadingSpinner
      ) : todos.length == 0 ? (
        <>
          <div className="bg-gray-100 p-4 rounded-lg my-6 max-w-xl mx-5 sm:mx-auto">
            <img
              className="mx-auto"
              src="https://media.tenor.com/5aE5T7edBz4AAAAM/the-simpsons-homer-simpson.gif"
              alt=""
            />
          </div>
        </>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg my-6 mx-5 max-w-xl sm:mx-auto drop-shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-medium">Todo List</h2>
          </div>

          <ul>
            {todos.map((item, index) => {
              return (
                <li
                  id={item._id}
                  key={index}
                  className={`flex items-center justify-between ${
                    item.isCompleted ? "bg-slate-400" : "bg-slate-300"
                  } px-3 border-gray-300 rounded py-2 mb-3`}
                >
                  <div className="flex items-center gap-3">
                    {item.isCompleted ? (
                      <BsCheckCircleFill
                        className="w-6 h-6 cursor-pointer text-green-700"
                        onClick={() => {
                          setComplete(item._id, item.isCompleted);
                        }}
                      />
                    ) : (
                      <BsCheckCircle
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          setComplete(item._id, item.isCompleted);
                        }}
                      />
                    )}
                    <span
                      className={`text-xl ${
                        item.isCompleted && "line-through text-slate-500"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {!item.isCompleted && (
                      <Link to="/edit">
                        <BiEditAlt
                          title="Edit Task"
                          onClick={() => props.setEditId(item._id)}
                          className="w-6 h-6 cursor-pointer hover:text-blue-700"
                        />
                      </Link>
                    )}
                    <AiFillDelete
                      title="Delete Task"
                      onClick={() => handleRemoveTodo(item._id)}
                      className="w-6 h-6 cursor-pointer hover:text-red-700"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default TodoContainer;
