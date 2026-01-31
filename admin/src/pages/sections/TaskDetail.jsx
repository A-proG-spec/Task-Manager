// TaskDetail.jsx
function TaskDetail({ task, setActiveSection }) {
  if (!task) {
    return (
      <section className="admin-section active">
        <div className="admin-card detail-view">
          <button
            className="btn-back"
            onClick={() => setActiveSection("tasks")}
          >
            ← Back to Tasks
          </button>
          <div className="error">No task data available</div>
        </div>
      </section>
    );
  }

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
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now && task.status !== "completed";
  };

  return (
    <section className="admin-section active">
      <div className="admin-card detail-view">
        <button
          className="btn-back"
          onClick={() => setActiveSection("tasks")}
        >
          ← Back to Tasks
        </button>

        <h2 className="detail-title">Task Details</h2>

        <div className="task-detail-header">
          <div className="task-title-main">
            <h3>{task.title}</h3>
            <div className="task-meta-badges">
              <span 
                className="status-badge"
                style={{ 
                  backgroundColor: getStatusColor(task.status) + '20',
                  color: getStatusColor(task.status),
                  border: `1px solid ${getStatusColor(task.status)}`
                }}
              >
                <i className="fa-solid fa-circle"></i> {task.status.toUpperCase()}
              </span>
              <span 
                className="priority-badge"
                style={{ 
                  backgroundColor: getPriorityColor(task.priority) + '20',
                  color: getPriorityColor(task.priority),
                  border: `1px solid ${getPriorityColor(task.priority)}`
                }}
              >
                <i className="fa-solid fa-flag"></i> {task.priority.toUpperCase()}
              </span>
              {isOverdue() && (
                <span className="overdue-badge">
                  <i className="fa-solid fa-exclamation-triangle"></i> OVERDUE
                </span>
              )}
            </div>
          </div>
          
          <div className="task-date-info">
            <p>
              <strong>Created:</strong> {formatDate(task.createdAt)}
            </p>
            <p>
              <strong>Last Updated:</strong> {formatDate(task.updatedAt)}
            </p>
          </div>
        </div>

        <div className="task-content-section">
          <h4>Description:</h4>
          <div className="content-box">
            {task.description || "No description provided"}
          </div>
        </div>

        <div className="task-info-grid">
          <div className="info-card">
            <h4>Due Date</h4>
            <div className="info-value">
              <i className="fa-solid fa-calendar"></i>
              <span>{formatDate(task.dueDate)}</span>
            </div>
            {isOverdue() && (
              <p className="warning-text">
                <i className="fa-solid fa-exclamation-triangle"></i> This task is overdue
              </p>
            )}
          </div>

          <div className="info-card">
            <h4>Assigned To</h4>
            <div className="info-value">
              <i className="fa-solid fa-user"></i>
              <span>{task.user?.name || "Unknown User"}</span>
            </div>
            <p className="user-email">{task.user?.email || ""}</p>
          </div>

          <div className="info-card">
            <h4>Task Status</h4>
            <div className="status-display">
              <div 
                className="status-dot"
                style={{ backgroundColor: getStatusColor(task.status) }}
              ></div>
              <span>{task.status}</span>
            </div>
            <p>Last updated: {formatDate(task.updatedAt)}</p>
          </div>

          <div className="info-card">
            <h4>Priority Level</h4>
            <div className="priority-display">
              <div 
                className="priority-dot"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              ></div>
              <span>{task.priority}</span>
            </div>
            <p>{task.priority === "high" ? "High priority task" : 
                task.priority === "medium" ? "Medium priority" : "Low priority"}</p>
          </div>
        </div>

        <div className="task-actions">
          <button 
            className="btn-edit"
            onClick={() => alert("Edit functionality coming soon!")}
          >
            <i className="fa-solid fa-edit"></i> Edit Task
          </button>
          <button 
            className="btn-complete"
            onClick={() => alert("Mark as complete functionality coming soon!")}
            disabled={task.status === "completed"}
          >
            <i className="fa-solid fa-check"></i> Mark Complete
          </button>
        </div>
      </div>
    </section>
  );
}

export default TaskDetail;