import React, { useState, useEffect } from "react";
import { FaPlug, FaFont, FaCloud, FaUser, FaLock, FaLink } from "react-icons/fa";

const CreateConnection = () => {
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("Production");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");

  useEffect(() => {
    setCallbackUrl("https://data-profiler-8vwf.onrender.com/api/salesforce/callback");
  }, []);

  const handleValidate = () => {
    if (!clientId || !clientSecret || !callbackUrl || source !== "salesforce") {
      alert("Please fill all Salesforce fields correctly.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in first.");
      return;
    }
    window.location.href = `https://data-profiler-8vwf.onrender.com/api/salesforce/connect?state=${encodeURIComponent(token)}`;
  };

  return (
    <div className="container mt-5">
      <h2>Create Salesforce Connection</h2>
      <div className="form-group">
        <label>Source</label>
        <select className="form-control" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select Source</option>
          <option value="salesforce">Salesforce</option>
        </select>
      </div>
      <div className="form-group">
        <label>Connection Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Environment</label>
        <select className="form-control" value={environment} onChange={(e) => setEnvironment(e.target.value)}>
          <option value="Production">Production</option>
          <option value="Sandbox">Sandbox</option>
        </select>
      </div>
      <div className="form-group">
        <label>Client ID</label>
        <input type="text" className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Client Secret</label>
        <input type="text" className="form-control" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Callback URL</label>
        <input type="text" className="form-control" value={callbackUrl} onChange={(e) => setCallbackUrl(e.target.value)} />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleValidate}>Validate & Connect</button>
    </div>
  );
};

export default CreateConnection;
