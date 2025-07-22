import "./login.css";
import Navbar from "../../../components/Navbar/Navbar";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
      const data = await res.json();
     if (res.ok) {
  localStorage.setItem("token", data.token);
  toast.success("Login successful!");
  setTimeout(() => {
    window.location.href = "/dashboard";
  }, 1500);
} else {
  toast.error(data.error || "Login failed");
} 
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
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
