import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddUser = () => {
  const [user, setUser] = useState({
    Workspace_name: "",
    user_name: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
     await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, user);
      toast.success("Workspace added successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/workspace");
      }, 1500); // Delay to show toast before redirecting
    } catch (error) {
      console.log(error);
      toast.error("Failed to add workspace", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="addUser">
      <Link to="/workspace" className="btn btn-secondary" type="button">
        Back
      </Link>

      <h3>Add new workspace</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="Workspace_name">Workspace Name:</label>
          <input
            type="text"
            id="Workspace_name"
            name="Workspace_name"
            value={user.Workspace_name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter workspace name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="user_name">Your Name:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={user.user_name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddUser;
