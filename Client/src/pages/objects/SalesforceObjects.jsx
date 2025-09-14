import { useEffect, useState } from "react";

function SalesforceObjects() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      const token = localStorage.getItem("jwt"); // or however you store it
      const res = await fetch("https://data-profiler-8vwf.onrender.com/api/salesforce/objects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setObjects(data.objects || []);
    };
    fetchObjects();
  }, []);

  return (
    <div>
      <h2>Salesforce Objects</h2>
      <ul>
        {objects.map((obj) => (
          <li key={obj.name}>
            <strong>{obj.label}</strong> ({obj.name}) {obj.custom && "🌟 Custom"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesforceObjects;
