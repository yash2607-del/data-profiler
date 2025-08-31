import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connection = () => {
  const [connections, setConnections] = useState([]);
  const [sfObjects, setSfObjects] = useState([]);
  const [loadingObjects, setLoadingObjects] = useState(false);
  const location = useLocation();

  // Check URL params for Salesforce OAuth token
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sfToken = query.get("sf_token"); // optional if backend sends
    if (sfToken) {
      localStorage.setItem("sf_access_token", sfToken);
      toast.success("Salesforce connected!");
    }

    // Load existing connections (dummy or fetch from backend)
    setConnections([
      { id: 1, sourceName: "MySQL DB", targetName: "Data Warehouse", createdOn: "2025-07-15" },
      { id: 2, sourceName: "Salesforce", targetName: "Analytics DB", createdOn: "2025-07-18" },
    ]);
  }, [location]);

const connectSalesforce = () => {
  const token = localStorage.getItem('token'); // your app JWT
  window.location.href = `https://data-profiler-8vwf.onrender.com/api/salesforce/connect?auth=${token}`;
};




  // Fetch Salesforce objects after connection
  const fetchSfObjects = async () => {
    const sfToken = localStorage.getItem("sf_access_token");
    if (!sfToken) {
      toast.error("Salesforce not connected");
      return;
    }

    setLoadingObjects(true);
    try {
      const res = await fetch(`https://data-profiler-8vwf.onrender.com/api/salesforce/objects`, {
        headers: { Authorization: `Bearer ${sfToken}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setSfObjects(data);
      toast.success("Fetched Salesforce objects!");
    } catch (err) {
      toast.error(`Failed to fetch Salesforce objects: ${err.message}`);
    } finally {
      setLoadingObjects(false);
    }
  };

  const deleteConnection = (id) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
    toast.success("Connection deleted");
  };

  return (
    <div className="container mt-5">
      <h2>Connections</h2>
      <div className="mb-3">
        <Link to="/add-connection" className="btn btn-primary me-2">Add Connection</Link>
        <button className="btn btn-success me-2" onClick={connectSalesforce}>Connect Salesforce</button>
        <button className="btn btn-secondary" onClick={fetchSfObjects}>View Salesforce Objects</button>
      </div>

      {loadingObjects && <p>Loading Salesforce objects...</p>}
      {sfObjects.length > 0 && (
        <div className="mb-3">
          <h4>Salesforce Objects</h4>
          <ul>
            {sfObjects.map((obj) => (
              <li key={obj.name}>{obj.label} ({obj.name})</li>
            ))}
          </ul>
        </div>
      )}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>S.No</th>
            <th>Source</th>
            <th>Target</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No connections found</td></tr>
          ) : connections.map((conn, i) => (
            <tr key={conn.id}>
              <td>{i + 1}</td>
              <td>{conn.sourceName}</td>
              <td>{conn.targetName}</td>
              <td>{conn.createdOn}</td>
              <td>
                <Link to={`/edit-connection/${conn.id}`} className="btn btn-sm btn-info me-1">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteConnection(conn.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Connection;
