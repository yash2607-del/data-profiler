import React, { useState, useEffect } from "react";
import { ChevronFirst, Home, Settings, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./sideBar.css";

const navItems = [
  { id: 1, label: "Home", icon: <Home size={18} />, path: "/" },
  { id: 2, label: "Dashboard", icon: <User size={18} />, path: "/dashboard" },
  { id: 3, label: "Connections", icon: <User size={18} />, path: "/connection" },
  { id: 4, label: "Data Pipeline", icon: <User size={18} />, path: "/data-pipeline" },
  { id: 5, label: "Summary", icon: <User size={18} />, path: "/summary" },
  { id: 6, label: "Settings", icon: <Settings size={18} />, path: "/settings" },
];

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = navItems.find((item) => item.path === location.pathname)?.id || 1;

  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const isLoggedIn = Boolean(user.name && user.name !== "Guest");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser({ name: "Guest", email: "", avatar: "" });
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email } = response.data;
         setUser({ name, email, avatar: "/default-avatar.png" });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setUser({ name: "Guest", email: "", avatar: "" });
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-top">
          <button
            className="sidebar-toggle"
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronFirst
              size={20}
              style={{
                transform: collapsed ? "rotate(180deg)" : "none",
                transition: "0.3s",
              }}
            />
          </button>
        </div>

        <ul className="sidebar-content">
          {navItems.map(({ id, label, icon, path }) => (
            <li
              key={id}
              className={`sidebar-item ${activeId === id ? "active" : ""}`}
              title={collapsed ? label : undefined}
            >
              <Link to={path} className="sidebar-link">
                <span className="sidebar-icon">{icon}</span>
                {!collapsed && <span className="sidebar-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-profile">
          {!isLoggedIn ? (
            <div
              className="sidebar-item profile-icon"
              title={collapsed ? "Login" : undefined}
            >
              <User size={18} />
              {!collapsed && <span className="sidebar-label">Login</span>}
            </div>
          ) : (
            <div className="sidebar-item profile-details">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="sidebar-avatar"
              />
              {!collapsed && <span className="sidebar-label">{user.name}</span>}
            </div>
          )}
        </div>

        {isLoggedIn && !collapsed && (
          <button
            className="sidebar-logout-btn sidebar-item"
            onClick={handleLogout}
            title="Logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              background: "none",
              color: "#c00",
              cursor: "pointer",
              padding: "10px 20px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        )}

        {!collapsed && <div className="sidebar-footer">© 2025 Your Company</div>}
      </nav>
    </aside>
  );
}

export default SideBar;
