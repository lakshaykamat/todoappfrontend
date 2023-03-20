import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../assets/Server";

function TaskItem(props) {
  const loadingScreen = (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
  const errorHTML = (<div className="max-w-2xl mx-auto my-6 bg-gray-100 p-4 rounded-lg">
  <img
    className="mx-auto"
    src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif"
    alt=""
  />
  <h1 className=" text-center text-xl font-bold">
    Error 404 Task not found
  </h1>
  <button className=" block mt-6 text-center mx-auto bg-slate-500 py-3 text-md px-14 font-bold text-white rounded cursor-pointer hover:bg-slate-800">
    {" "}
    <Link to="/">Home</Link>
  </button>
</div>)
  //get details to edit
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/tasks/${props.editId}`,
    headers: {},
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      settaskDetails(response.data.theTask);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    makeRequest();
  }, []);

  const [taskDetails, settaskDetails] = useState({
    _id: "",
    title: "",
    isCompleted: "",
    timestap: "",
    __v: 0,
  });
  const [message, setMess] = useState({
    success: "",
    failed: "",
  });
  const handleChange = (e) => {
    const {name,value,type,checked} = e.target
    settaskDetails((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  function editTodo(e) {
    console.log(taskDetails)
    e.preventDefault();
    let data = JSON.stringify({
      title: taskDetails.title,
      isCompleted:taskDetails.isCompleted
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/v1/tasks/${taskDetails._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setMess(() =>{return { success: "Edit Successful",failed:null}});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      {!props.editId ? 
        errorHTML
      : (
        <>
          {taskDetails == undefined ? (
            loadingScreen
          ) : (
            <>
              <div className="bg-gray-100 p-4 rounded-lg max-w-2xl mx-5 drop-shadow-lg sm:mx-auto my-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Edit Details</h2>
                </div>
                <form>
                  <div className="flex items-center mb-4">
                    <label className="w-32 font-medium">Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={taskDetails != undefined && taskDetails.title}
                      onChange={handleChange}
                      placeholder="Enter a title"
                      className="border border-gray-300 rounded px-4 py-2 mr-2 flex-1"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-32 font-medium">Completed:</label>
                    <input
                      name="isCompleted"
                      type="checkbox"
                      checked={taskDetails.isCompleted}
                      onChange={handleChange}
                      className="mr-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 font-medium">Date:</span>
                    <span>
                      {taskDetails != undefined &&
                        new Date(taskDetails.timestap).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-evenly items-center gap-3">
                    <button
                      onClick={editTodo}
                      className="bg-slate-500 py-3 text-md px-14 font-bold text-white rounded mt-6 cursor-pointer hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <Link to="/">
                      <button className="bg-slate-500 py-3 text-md px-14 font-bold text-white rounded mt-6 cursor-pointer hover:bg-slate-800">
                        Back
                      </button>
                    </Link>
                  </div>
                  <div className={`${message.success.length && "bg-green-200 py-2 px-6 font-bold m-3"}`}>
                    {message.success || message.failed}
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default TaskItem;
