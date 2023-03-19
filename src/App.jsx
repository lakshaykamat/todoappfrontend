import Navbar from "./components/common/Navbar";
import PromptBox from "./components/common/Form";
import TodoContainer from "./components/common/TodoContainer";
import TaskItem from "./components/common/TaskItem";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AlertBox from "./components/common/AlertBox";
function App() {
  const [alert, setAlert] = useState("");
  const displayAlertBox = (color, message) => {
    return (
      <AlertBox color={color} message={message}/>
    );
  };
  const [editId,setEditId] = useState('')
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <PromptBox setAlert={setAlert} alert={alert} displayAlertBox={displayAlertBox}/>
                <TodoContainer setEditId={setEditId} setAlert={setAlert} alert={alert} displayAlertBox={displayAlertBox}/>
              </>
            }
          />
          <Route
            exact
            path="/edit"
            element={
              <>
                <Navbar />
                <TaskItem editId={editId}/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
