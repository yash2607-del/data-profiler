import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Features from "../../components/features/Features";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // No token, maybe redirect to login or show guest message
          setEmail("Guest");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        setEmail("Guest");
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <SideBar />
        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f0f2f5",
            overflowY: "auto",
          }}
        >
          <Features welcomeMessage={`Welcome ${email || "User"}`} />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
