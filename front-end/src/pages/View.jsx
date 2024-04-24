import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [projectData, setProjectdata] = useState([]);
  const [newDate, setnewDate] = useState();

  const handleeditprogram = (_id) => {
    navigate(`/edit/${_id}`);
  };

  const handledeleteprogram = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteProject/${_id}`
      );
      console.log("response", response);
      alert("project deleted");
      navigate("/homepage");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/view/${_id}`);
        console.log("response", response);
        setProjectdata(response.data.project);

        // Find the latest updatedDate among all todos
        let latestUpdatedDate = null;
        response.data.todos.forEach((todo) => {
          if (
            todo.updatedDate &&
            (!latestUpdatedDate ||
              new Date(todo.updatedDate) > latestUpdatedDate)
          ) {
            latestUpdatedDate = new Date(todo.updatedDate);
          }
        });
        // Set the latest updatedDate to state
        setnewDate(latestUpdatedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <>
      <Navbar />
      <div className="mx-4 p-4  mx-4 my-4" style={{backgroundColor:"#7F7F98"}}>
        {Object.keys(projectData).length > 0 ? (
          <div key={projectData._id}>
            <h6 className="d-flex float-end">
              Created at{" "}
              {new Date(projectData.createdDate).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })}
            </h6>
            <h1 className="d-flex">{projectData.title}</h1>
            {projectData.todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <h6 className="d-flex float-end">
                  {/* Updated at {todo.updatedDate} */}
                  updated at
                  {new Date(todo.updatedDate).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </h6>
              </div>
            ))}
            <h4>Pending tasks</h4>
            {projectData.todos.map((todos) => (
              <div key={todos._id} className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                  />
                <p className="mx-3">{todos.description}</p>

                </div>
              </div>
              
            ))}
            <h4>Completed tasks</h4>
            {projectData.todos.map((todos) => (
              <div key={todos._id} className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                  />
                <p className="mx-3 text-center mx-1 border-0">{todos.description}</p>

                </div>
              </div>
            ))}
            <button
              className="btn btn-success m-2"
              onClick={() => handleeditprogram(projectData._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => handledeleteprogram(_id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Footer />
    </>
  );
}
