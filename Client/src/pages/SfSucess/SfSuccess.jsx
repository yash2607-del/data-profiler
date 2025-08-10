import { useEffect, useState } from "react";

export default function SfSuccess() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://data-profiler-8vwf.onrender.com/api/salesforce/objects/leads", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setLeads(data.records || []))
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to fetch leads.");
      });
  }, []);

  return (
    <div>
      <h2>Salesforce Leads</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {leads.map(lead => (
          <li key={lead.Id}>
            {lead.FirstName} {lead.LastName} - {lead.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}
