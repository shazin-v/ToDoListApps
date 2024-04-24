import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Edit() {
  const { _id } = useParams();
  const [createdate, setCreatedate] = useState();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/view/${_id}`);
      const projectData = response.data.project;
      setCreatedate(projectData.createdDate);
      setTitle(projectData.title);
      setTodos(projectData.todos);
    };
    fetchData();
  }, [_id]);

  const addTitle = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/addTitle/${_id}`,
        {
          title: title,
        }
      );
      console.log("response", response);
      alert("Project title succesfully updated");
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/addTodo/${_id}`, {
        description: newTodo,
        status: false,
        updatedDate: new Date().toISOString(),
      });
      console.log("response", response);
      const newTodoData = response.data;
      setTodos([...todos, newTodoData]);
      setNewTodo("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    console.log("isChecked", isChecked);
    setIsChecked(!isChecked);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const deleteTodo = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteTodo/${_id}`
      );
      console.log("response", response);
      alert("ToDo list deleted Succesfully");
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="mx-4 p-4  mx-5 my-4"
        style={{ backgroundColor: "#7F7F98" }}
      >
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the project title"
          />
          <button
            onClick={() => addTitle(_id)}
            className="btn btn-success mx-2"
          >
            Save
          </button>
          <h6 className="flex-grow-1 text-center">
            Created at
            {new Date(createdate).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            })}
          </h6>
        </div>
        <h4 className="my-3">New Todo tasks</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control-lg"
            value={newTodo}
            aria-describedby="emailHelp"
            placeholder="Enter the to-do list"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-btn-primary"
            onClick={addTodo}
          >
            <img
              className="float-end"
              src="/images/Add.png"
              alt=""
              style={{ height: "50px", width: "50px" }}
            />
          </button>
        </div>
        <h2>Pending Task</h2>
        {todos.map((todo) => (
          <div key={todo._id} className="input-group mb-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <input
                type="text"
                value={todo.description}
                className="form-control-sm mt-0 mx-1 border-0"
                placeholder="New todo description"
                onChange={(e) => setTodos(e.target.value)}
              />
              <button
                type="submit"
                onClick={() => deleteTodo(todo._id)}
                className="btn btn-btn-primary"
              >
                <img
                  className="float-end"
                  src="/images/delete.svg"
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                />
              </button>
            </div>
          </div>
        ))}
        <h2>Completed Task</h2>
        <button onClick={handleBack} className="btn btn-success">
          Back
        </button>
      </div>
      <Footer />
    </>
  );
}
