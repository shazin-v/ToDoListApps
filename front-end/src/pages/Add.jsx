import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [projectTitle, setProjectTitle] = useState("");
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    if (!(projectTitle || task)) {
      alert("please provide either title or to do list");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/add", {
        projectTitle,
        todos: [
          {
            description: task,
          },
        ],
      });
      console.log("result", response.data);
      alert("succesfully created");
      navigate("/homepage");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="mx-4 p-4  mx-5 my-4"
        style={{ backgroundColor: "#7F7F98" }}
      >
        <form onSubmit={handleForm}>
          <div className="d-flex align-items-center">
            <input
              type="text"
              value={projectTitle}
              className="form-control-lg my-2"
              placeholder="Project Title"
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control-lg"
              placeholder="Enter the to do list"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button className="btn btn-success my-3">Save</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
