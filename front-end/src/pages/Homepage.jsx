import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const navigate = useNavigate();
  const [projectcount, setProjectcount] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/homepage")
      .then((result) => {
        if (result.data.projects.length > 0) {
          setProjectcount(result.data.projects);
        } else {
          setProjectcount([]);
        }
      })
      .catch((err) => {
        console.log("error of homepage", err);
      });
  });

  const handleaddprogram = () => {
    navigate("/add");
  };

  const handleCardclick = (_id) => {
    navigate(`/view/${_id}`);
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex  container-sm  my-5  flex-wrap"
        style={{ backgroundColor: "#7F7F98" }}
      >
        {projectcount.length > 0 ? (
          projectcount.map((Project) => (
            <div
              key={Project._id}
              className="mx-4 p-4  mx-4 my-4 "
              style={{ backgroundColor: "#3B3B54" }}
              onClick={() => handleCardclick(Project._id)}
            >
              <h1>{Project.title}</h1>
              <h4>pending task</h4>
              {Project.todos
                // .filter((todos) => todos.status === true)
                .map((todos) => (
                  <div key={todos._id} className="input-group mb-3">
                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0 bg-transparent"
                        type="checkbox"
                        value=""
                      />
                    </div>
                    <p className="mx-3">{todos.description}</p>
                  </div>
                ))}
              <h4>Completed task</h4>
              {Project.todos
                // .filter((todo)=> todo.status === false)
                .map((todo) => {
                  <div key={todo._id} className="input-group mb-3">
                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        value=""
                      />
                    </div>
                    <p className="mx-3">{todo.description}</p>
                  </div>;
                })}
            </div>
          ))
        ) : (
          <>
            <div className="mx-4 p-4 bg-info mx-4 my-4">
              <h1>NO ToDolist</h1>
            </div>
          </>
        )}
        <button
          className="btn btn-btn-info mx-auto my-auto p-auto"
          onClick={handleaddprogram}
        >
          <img
            src="/images/Add.png"
            className="rounded-circle"
            alt="add-todo-list"
          />
        </button>
      </div>
      <Footer />
    </>
  );
}
