import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./connection.css"; // optional custom styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connection = () => {
  const [connections, setConnections] = useState([
    {
      id: 1,
      sourceName: "MySQL DB",
      targetName: "Data Warehouse",
      createdOn: "2025-07-15",
    },
    {
      id: 2,
      sourceName: "API Endpoint",
      targetName: "Analytics DB",
      createdOn: "2025-07-18",
    },
  ]);

  const deleteConnection = (id) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== id));
    toast.success("Connection deleted", { position: "top-center" });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Connections</h2>
        <Link to="/add-connection" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i> Add Connection
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Source Connection Name</th>
              <th>Target</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {connections.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No connections found.
                </td>
              </tr>
            ) : (
              connections.map((conn, index) => (
                <tr key={conn.id}>
                  <td>{index + 1}</td>
                  <td>{conn.sourceName}</td>
                  <td>{conn.targetName}</td>
                  <td>{conn.createdOn}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/edit-connection/${conn.id}`}
                        className="btn btn-sm btn-info"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteConnection(conn.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Connection;
