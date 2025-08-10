function ConnectToSalesforce() {
  const handleConnect = () => {
    fetch("https://data-profiler-8vwf.onrender.com/api/auth/email-to-session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "user@example.com" }),
    }).then(() => {
      window.location.href = "https://data-profiler-8vwf.onrender.com/api/salesforce/connect";
    });
  };

  return <button onClick={handleConnect}>Connect to Salesforce</button>;
}

export default ConnectToSalesforce;