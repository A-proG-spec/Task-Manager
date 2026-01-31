import { useEffect, useState } from "react";

function TopBar() {
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo) {
      setAdminInfo({
        name: userInfo.name || userInfo.username || "Administrator",
        email: userInfo.email || "admin@olympus.com",
        role: userInfo.role === "admin" ? "Root Administrator" : "Administrator"
      });
    } else {
      // Fallback if no user info found
      setAdminInfo({
        name: "Administrator",
        email: "admin@olympus.com",
        role: "Root Administrator"
      });
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <header className="top-bar">
        <div className="admin-profile">
          <div className="small-avatar"></div>
          <div className="admin-info">
            <span className="admin-role">Loading...</span>
            <span className="admin-name">@loading</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="top-bar">
      <div className="admin-profile">
        <div className="small-avatar">
          <i className="fa-solid fa-user-shield"></i>
        </div>
        <div className="admin-info">
          <span className="admin-role">{adminInfo.role}</span>
          <span className="admin-name">{adminInfo.name}</span>
          <span className="admin-email">{adminInfo.email}</span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;