// Admin.jsx
import { useState, useEffect } from "react";
import "../styles/admin.css";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import Users from "./sections/Users";
import Posts from "./sections/Posts";
import Tasks from "./sections/Tasks"; // Add this import
import Stats from "./sections/Status";
import Settings from "./sections/Settings";
import UserDetail from "./sections/UserDetail";
import PostDetail from "./sections/PostDetail";
import TaskDetail from "./sections/TaskDetail"; // Add this import

function Admin() {
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("adminActiveSection");
    return savedSection || "stats";
  });
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // Add this state

  useEffect(() => {
    localStorage.setItem("adminActiveSection", activeSection);
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <Users 
            setActiveSection={setActiveSection}
            setSelectedUser={setSelectedUser}
          />
        );
      case "posts":
        return (
          <Posts 
            setActiveSection={setActiveSection}
            setSelectedPost={setSelectedPost}
          />
        );
      case "tasks": // Add this case
        return (
          <Tasks 
            setActiveSection={setActiveSection}
            setSelectedTask={setSelectedTask}
          />
        );
      case "stats":
        return <Stats />;
      case "settings":
        return <Settings />;
      case "detail":
        return (
          <UserDetail 
            user={selectedUser}
            setActiveSection={setActiveSection}
          />
        );
      case "postDetail":
        return (
          <PostDetail 
            post={selectedPost}
            setActiveSection={setActiveSection}
          />
        );
      case "taskDetail": // Add this case
        return (
          <TaskDetail 
            task={selectedTask}
            setActiveSection={setActiveSection}
          />
        );
      default:
        return <Stats />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="admin-main">
        <TopBar />
        <div className="section-container">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default Admin;