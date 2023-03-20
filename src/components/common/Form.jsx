import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../assets/Server";
function InputBox(props) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addTodoToDatabase(inputText);
    inputText.length>0 && props.setAlert("new");
    props.removeAlertBox();
    setInputText("");
  };
  function addTodoToDatabase(todo) {
    let data = JSON.stringify({
      title: todo,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/api/v1/tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {console.log(response.data.data.msg)})
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <>
      {props.alert == "new" &&
        props.displayAlertBox("bg-blue-700 text-white", "New task added :)")}
      <div className="bg-gray-100 p-4 rounded-lg my-6 max-w-xl mx-5 sm:mx-auto drop-shadow-md">
        <h1 className="text-xl sm:text-2xl my-2 font-bold">Add Todo</h1>

        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-wrap gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter some text"
            className="border w-fit border-gray-300 rounded px-4 py-2 mr-2 flex-1"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default InputBox;
