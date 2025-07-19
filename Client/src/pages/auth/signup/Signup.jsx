import "./signup.css";
import Navbar from "../../../components/Navbar/Navbar";
import React, { useState } from "react";
import { ToastContainer,toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
console.log(data);
      if (res.ok) {
        toast.success("Registration successful. Please log in.");
       setTimeout(() => {
         window.location.href = "/login";
       }, 1500);
      } else {
        toast.error(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="wrapper">
        <div className="auth-container">
          <div className="left-section">
            <h1>Welcome to Formon</h1>
            <p>Already have an account?</p>
            <a href="/login" className="btn btn-light" style={{ color: "navy" }}>
              Login
            </a>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center bg-white w-50 h-100">
            <form className="w-75" onSubmit={handleSubmit}>
              <h2 className="mb-4 text-center fw-bold">Sign Up</h2>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email Address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label>Confirm Password</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingJobTitle"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select user type:
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="steward">Steward</option>
                </select>
                <label>User Type</label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="footer">
        <p> &copy; Copyright 2025 - Formon - All rights reserved </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Signup;
