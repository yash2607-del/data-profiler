import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const users = {
    Workspace_name: "",
    user_name: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
      toast.success("User updated successfully!", { position: "top-right" });
      navigate("/workspace");
    } catch (error) {
      console.log(error);
      toast.error("Update failed", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/workspace" type="button" className="btn btn-secondary">
        Back
      </Link>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="user_name">Name:</label>
          <input
            type="text"
            id="user_name"
            value={user.user_name}
            onChange={inputHandler}
            name="user_name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="Workspace_name">Workspace:</label>
          <input
            type="text"
            id="Workspace_name"
            value={user.Workspace_name}
            onChange={inputHandler}
            name="Workspace_name"
            autoComplete="off"
            placeholder="Enter your workspace"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
