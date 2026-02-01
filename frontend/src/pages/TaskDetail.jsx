// src/pages/TaskDetail.jsx (updated to include Header)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tasksAPI } from "../services/api";
import Header from "../components/Header";
import "../styles/global.css";

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadTask();
  }, [id, user]);

  const loadTask = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTask(id);
      setTask(response.data);
    } catch (err) {
      setError("Failed to load task details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>{error}</h3>
        <button onClick={() => navigate("/dashboard")} className="btn-secondary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="error-container">
        <h3>Task not found</h3>
        <button onClick={() => navigate("/dashboard")} className="btn-secondary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header with hamburger menu enabled */}
      <Header />

      <div className="page-wrapper">
        <div className="main-shell">
          <div className="task-detail-view">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-status-row">
                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
                <span className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="task-section">
              <h4>Description</h4>
              <div className="task-description">
                {task.description || "No description provided."}
              </div>
            </div>

            <div className="task-info-grid">
              <div className="info-item">
                <h5>Status</h5>
                <p>{task.status}</p>
              </div>
              <div className="info-item">
                <h5>Priority</h5>
                <p>{task.priority}</p>
              </div>
              <div className="info-item">
                <h5>Due Date</h5>
                <p>{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <h5>Created</h5>
                <p>{new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: "30px" }}>
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-secondary"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate(`/edit-task/${task._id}`)}
                className="btn-primary"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;