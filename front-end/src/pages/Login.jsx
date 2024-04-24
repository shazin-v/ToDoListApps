import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!(email || password)) {
      alert("Please provide either email or password.");
      return;
    }

    await axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        console.log("result of login", result);
        if (result.data.message === "Login Successfull") {
          alert(result.data.message);
          navigate("/homepage");
        } else if (result.data.message === "Password didn't match") {
          alert(result.data.message);
          navigate("/login");
        } else if (result.data.message === "User not registered") {
          alert(result.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div>
          <form className="mt-5">
            <h1>Login</h1>
            <div className="mb-5">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary "
              onClick={handlesubmit}
            >
              Submit
            </button>
            <div className="mt-5">
              <p>
                Dont have an account? <NavLink to="/signup"> SignUp</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
