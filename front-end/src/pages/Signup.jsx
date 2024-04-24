import { useState } from "react";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.message === "signup succesfully") {
        alert("sign up succesfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div>
          <form className="mt-5" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary m-5">
              Sign Up
            </button>
            <div className="mt-5">
              <p>
                Already have an account ? <NavLink to="/login"> Login</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
