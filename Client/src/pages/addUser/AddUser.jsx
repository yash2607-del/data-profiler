import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    Workspace_name: "",
    user_name: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/user", user);
      toast.success("Workspace added successfully!", {
        position: "top-right",
      });
      navigate("/workspace");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add workspace", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="addUser">
      <Link to="/workspace" type="button" className="btn btn-secondary">
        Back
      </Link>

      <h3>Add New Workspace</h3>
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
    </div>
  );
};

export default AddUser;
