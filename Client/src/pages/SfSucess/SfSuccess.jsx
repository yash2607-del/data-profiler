import React from "react";
import { useNavigate } from "react-router-dom";

export default function SFSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Salesforce Connected Successfully!</h2>
      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/connections")}
      >
        Go to Connections
      </button>
    </div>
  );
}
