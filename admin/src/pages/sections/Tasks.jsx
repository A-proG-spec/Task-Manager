// Tasks.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Tasks({ setActiveSection, setSelectedTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, in-progress, completed

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = "/admin/tasks";
      if (filter !== "all") {
        url += `?status=${filter}`;
      }
      
      const res = await axiosInstance.get(url);
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setActiveSection("taskDetail");
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    
    try {
      await axiosInstance.delete(`/admin/tasks/${taskToDelete._id}`);
      setTasks(tasks.filter((t) => t._id !== taskToDelete._id));
      alert("Task deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete task");
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ff4444";
      case "medium": return "#ff9966";
      case "low": return "#4CAF50";
      default: return "#888";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "#4CAF50";
      case "in-progress": return "#2196F3";
      case "pending": return "#ff9966";
      default: return "#888";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <section className="admin-section active">
        <div className="admin-card">
          <h1 className="page-title">Task Management</h1>
          
          <div className="admin-header-actions">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Tasks
              </button>
              <button 
                className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
                onClick={() => setFilter("in-progress")}
              >
                In Progress
              </button>
              <button 
                className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            
            <button 
              className="btn-refresh"
              onClick={fetchTasks}
              title="Refresh tasks"
            >
              <i className="fa-solid fa-rotate-right"></i> Refresh
            </button>
          </div>

          <div className="admin-table-container">
            {tasks.length === 0 ? (
              <div className="no-tasks">No tasks found</div>
            ) : (
              <div className="admin-table-mock">
                {tasks.map((task) => (
                  <div className="table-row" key={task._id}>
                    <div className="task-meta">
                      <i className="fa-solid fa-tasks"></i>
                      <div className="task-info">
                        <span className="task-title">{task.title}</span>
                        <div className="task-details">
                          <span 
                            className="task-status"
                            style={{ color: getStatusColor(task.status) }}
                          >
                            <i className="fa-solid fa-circle"></i> {task.status}
                          </span>
                          <span 
                            className="task-priority"
                            style={{ color: getPriorityColor(task.priority) }}
                          >
                            <i className="fa-solid fa-flag"></i> {task.priority}
                          </span>
                          <span className="task-due">
                            <i className="fa-solid fa-calendar"></i> Due: {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="action-btns">
                      <button
                        className="btn-view"
                        onClick={() => handleView(task)}
                        title="View task details"
                      >
                        <i className="fa-solid fa-eye"></i> VIEW
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() => handleDeleteClick(task)}
                        title="Delete task"
                      >
                        <i className="fa-solid fa-trash"></i> REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && taskToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete this task?
            </p>
            <div className="task-preview-modal">
              <strong>Task:</strong> {taskToDelete.title}
              <br />
              <strong>Status:</strong> {taskToDelete.status}
              <br />
              <strong>Priority:</strong> {taskToDelete.priority}
            </div>
            <p className="warning-text">This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={handleDeleteConfirm}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tasks;