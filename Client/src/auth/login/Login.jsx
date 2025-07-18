import "./login.css";
import "../../app.css";
import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");

        // Delay redirect slightly so toast is visible
        setTimeout(() => {
          window.location.href = "/Landing";
        }, 1500);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Please try again, an error occurred!");
    }
  };

  return (
    <>
      <Navbar />
      <section className="wrapper">
        <div className="auth-container">
          <div className="form-section d-flex flex-column justify-content-center align-items-center bg-white">
            <form className="w-75" onSubmit={handleSubmit}>
              <h2 className="mb-4 text-center fw-bold">Login</h2>

              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>

          <div className="left-section">
            <h1>Welcome to Formon</h1>
            <p>New User?</p>
            <a href="/signup" className="btn btn-light" style={{ color: "#4d8cff" }}>
              Register
            </a>
          </div>
        </div>
      </section>

      <div className="footer">
        <p>&copy; Copyright 2025 - Formon - All rights reserved</p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Login;
