import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Features from "../../components/features/Features";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser({ name: "Guest", email: "" });
          return;
        }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


        const { name, email } = response.data;
        setUser({ name, email });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
          window.location.href = "/login";
        } else {
          setUser({ name: "Guest", email: "" });
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <SideBar />
        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f0f2f5",
            overflowY: "auto",
          }}
        >
          <Features welcomeMessage={`Welcome, ${user.name || "User"}`} />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
