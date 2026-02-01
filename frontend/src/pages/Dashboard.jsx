import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tasksAPI } from "../services/api";
import Header from "../components/Header";
import "../styles/global.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskReport, setTaskReport] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksRes, reportRes, upcomingRes] = await Promise.all([
        tasksAPI.getTasks(),
        tasksAPI.getTaskReport(),
        tasksAPI.getUpcomingTasks(),
      ]);

      setTasks(tasksRes.data);
      setTaskReport(reportRes.data);
      setUpcomingTasks(upcomingRes.data);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAction = async (action, taskId) => {
    try {
      switch (action) {
        case "delete":
          await tasksAPI.deleteTask(taskId);
          break;
        case "complete":
          await tasksAPI.updateTask(taskId, { status: "completed" });
          break;
        default:
          break;
      }
      loadData(); // Refresh data
    } catch (err) {
      setError("Action failed");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Create the additional action button for the header
  const newTaskButton = (
    <Link to="/create-task" className="btn-new-task">
      + NEW TASK
    </Link>
  );

  return (
    <>
      <Header showMobileMenu={true} additionalAction={newTaskButton} />

      <div className="page-wrapper">
        <div className="main-shell">
          <div className="shell-title-area">
            <h2>
              <strong>User Dashboard</strong>
            </h2>
            <hr className="shell-hr" />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="grid-layout">
            <aside className="side-wrapper">
              <div className="sub-panel profile-box">
                <div className="avatar">{user?.name?.charAt(0) || "U"}</div>
                <h3>{user?.name || "User"}</h3>
                <p className="muted">{user?.email || ""}</p>
                <p className="role-badge">{user?.role}</p>
              </div>

              <div className="sub-panel report-box">
                <h4>Task Report</h4>
                {taskReport ? (
                  <>
                    <div className="chart-container">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle"
                          strokeDasharray={`${taskReport.completedPercent}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="21" className="percentage">
                          {taskReport.completedPercent}%
                        </text>
                      </svg>
                    </div>

                    <div className="report-details">
                      <p>Total: {taskReport.total}</p>
                      <p>Completed: {taskReport.completed}</p>
                      <p>Uncompleted: {taskReport.uncompleted}</p>
                    </div>
                  </>
                ) : (
                  <p>No report data available</p>
                )}
              </div>
            </aside>

            <main className="sub-panel middle-panel">
              <div className="panel-header">
                <h3 className="panel-title">Active Tasks</h3>
                <button className="btn-refresh" onClick={loadData}>
                  ↻ Refresh
                </button>
              </div>

              {tasks.length === 0 ? (
                <div className="no-tasks">
                  <p>
                    No tasks found.{" "}
                    <Link to="/create-task">Create your first task!</Link>
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="task-row">
                    <div className="task-details">
                      <h5>{task.title}</h5>
                      <p>{task.description}</p>
                      <div className="task-meta">
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
                    <div className="task-btns">
                      <button onClick={() => navigate(`/tasks/${task._id}`)}>
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit-task/${task._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="del"
                        onClick={() => handleTaskAction("delete", task._id)}
                      >
                        Delete
                      </button>
                      {task.status !== "completed" && (
                        <button
                          className="done"
                          onClick={() => handleTaskAction("complete", task._id)}
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </main>

            <aside className="side-wrapper">
              <div className="sub-panel deadline-box">
                <h4>Next 3 Days</h4>
                {upcomingTasks.threeDaysLater?.length > 0 ? (
                  upcomingTasks.threeDaysLater.map((task) => (
                    <div key={task._id} className="item">
                      {task.title}
                      <span className="tag urgent">24h</span>
                    </div>
                  ))
                ) : (
                  <p className="no-upcoming">No urgent tasks</p>
                )}
              </div>

              <div className="sub-panel deadline-box">
                <h4>This Week</h4>
                {upcomingTasks.weekLater?.length > 0 ? (
                  upcomingTasks.weekLater.map((task) => (
                    <div key={task._id} className="item">
                      {task.title}
                      <span className="tag">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="no-upcoming">No tasks this week</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;