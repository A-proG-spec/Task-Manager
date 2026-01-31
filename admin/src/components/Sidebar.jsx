// Sidebar.jsx
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-top">
        <div className="logo-sidebar">OLYMPUS</div>
      </div>

      <nav className="sidebar-nav">
        <a
          className={`side-link ${activeSection === "users" ? "active" : ""}`}
          onClick={() => setActiveSection("users")}
        >
          <i className="fa-solid fa-user-group"></i>
        </a>

        <a
          className={`side-link ${activeSection === "posts" ? "active" : ""}`}
          onClick={() => setActiveSection("posts")}
        >
          <i className="fa-solid fa-paste"></i>
        </a>

        <a
          className={`side-link ${activeSection === "tasks" ? "active" : ""}`} // Add this
          onClick={() => setActiveSection("tasks")}
        >
          <i className="fa-solid fa-tasks"></i>
        </a>

        <a
          className={`side-link ${activeSection === "stats" ? "active" : ""}`}
          onClick={() => setActiveSection("stats")}
        >
          <i className="fa-solid fa-chart-line"></i>
        </a>

        <a
          className={`side-link ${activeSection === "settings" ? "active" : ""}`}
          onClick={() => setActiveSection("settings")}
        >
          <i className="fa-solid fa-gear"></i>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a
          className="side-link logout"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;