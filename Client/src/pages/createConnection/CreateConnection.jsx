import React, { useState } from "react";
import { FaPlug, FaFont, FaCloud, FaUser, FaLock, FaLink } from "react-icons/fa";

const CreateConnection = () => {
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("Production");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
setCallbackUrl("https://data-profiler-8vwf.onrender.com/api/salesforce/callback")

  const [authUrl, setAuthUrl] = useState(null); // Store Salesforce auth URL

  const handleValidate = async () => {
    if (!clientId || !clientSecret || !callbackUrl || source !== "salesforce") {
      alert("Please fill all Salesforce fields correctly.");
      return;
    }

    try {
      const res = await fetch("https://data-profiler-8vwf.onrender.com/api/salesforce/auth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          clientSecret,
          callbackUrl,
          environment,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.authUrl) {
        setAuthUrl(data.authUrl); // Save the auth URL instead of redirecting
      } else {
        alert("Failed to initiate Salesforce auth.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Salesforce auth error.");
    }
  };

  const handleSalesforceConnect = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
      }}
    >
      <div
        style={{
          width: "800px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#4d8cff",
            color: "#fff",
            padding: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaPlug /> Create Connection
        </div>

        {/* Form */}
        <div style={{ padding: "20px" }}>
          {/* Source */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaPlug />
            </div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={styles.input}
            >
              <option value="">Source</option>
              <option value="salesforce">Salesforce</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Name */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaFont />
            </div>
            <input
              type="text"
              placeholder="Enter Connection Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Environment */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaCloud />
            </div>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              style={styles.input}
            >
              <option value="Production">
                Production (https://login.salesforce.com)
              </option>
              <option value="Sandbox">
                Sandbox (https://test.salesforce.com)
              </option>
            </select>
          </div>

          {/* Client ID */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaUser />
            </div>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter Client ID"
              style={styles.input}
            />
          </div>

          {/* Client Secret */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaLock />
            </div>
            <input
              type="text"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="Enter Client Secret"
              style={styles.input}
            />
          </div>

          {/* Callback URL */}
          <div style={styles.inputGroup}>
            <div style={styles.iconBox}>
              <FaLink />
            </div>
            <input
              type="text"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              placeholder="Callback URL"
              style={styles.input}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: authUrl ? "space-between" : "flex-end",
            padding: "15px 20px",
            borderTop: "1px solid #ccc",
          }}
        >
          <button
            style={{
              backgroundColor: "#d9534f",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              marginRight: authUrl ? "0" : "10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => alert("Cancelled")}
          >
            Cancel
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            {authUrl && (
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleSalesforceConnect}
              >
                Connect to Salesforce
              </button>
            )}

            <button
              style={{
                backgroundColor: "#4d8cff",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleValidate}
            >
              Validate & Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  iconBox: {
    backgroundColor: "#f0f0f0",
    padding: "8px",
    minWidth: "40px",
    textAlign: "center",
    color: "#555",
    borderRight: "1px solid #ccc",
  },
  input: {
    border: "none",
    outline: "none",
    flex: 1,
    padding: "8px",
    fontSize: "14px",
  },
};

export default CreateConnection;
