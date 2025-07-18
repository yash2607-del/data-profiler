import React from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const User = () => {
  const [User, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUser(response.data);
      } catch (error) {
        console.log("error while fetching the data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add workspace <i className="fa-solid fa-user-plus"></i>
      </Link>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col"> S.No</th>
            <th scope="col">Workspace Name</th>
            <th scope="col">Created By</th>
            <th scope="col">Created On</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {User.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.Workspace_name}</td>
                <td>{user.user_name}</td>
                <td>{user.created_on}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + user._id}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                  </Link>

                  <button
                    onClick={() => deleteUser(user._id)}
                    type="button"
                    class="btn btn-danger"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
