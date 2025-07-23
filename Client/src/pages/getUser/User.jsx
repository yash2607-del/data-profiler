  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link, useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import "./user.css";

  const User = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
          setUsers(response.data);
        } catch (error) {
          console.log("Error while fetching data", error);
        }
      };
      fetchData();
    }, []);

    const deleteUser = async (userId) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/user/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success("Workspace deleted successfully!", {
          position: "top-center",
        });
      } catch (error) {
        console.log("Error while deleting user", error);
        toast.error("Failed to delete workspace", {
          position: "top-center",
        });
      }
    };

    return (
     
      <div className="userTable">
         <h1> LIST OF WORKSPACES</h1>
        <Link to="/add" className="btn btn-primary" type="button">
          Add workspace <i className="fa-solid fa-user-plus"></i>
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Workspace Name</th>
              <th>Created By</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.Workspace_name}</td>
                <td>{user.user_name}</td>
                <td>{user.created_on}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-info"
                    type="button"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger"
                    type="button"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  };

  export default User;
