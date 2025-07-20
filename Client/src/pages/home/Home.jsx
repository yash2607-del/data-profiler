import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Features from "../../components/features/Features";

const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (token) {
    
      setUserName("Jane Doe");
    }
  }, []);

  return (
    <div className="app-layout" style={{ display: "flex" }}>
     
      <main style={{ flexGrow: 1, padding: "20px" }}>
        
        <Features welcomeMessage={`Hello, ${userName || "User"}! Explore your workspace`} />
      
      </main>
    </div>
  );
};

export default Home;
