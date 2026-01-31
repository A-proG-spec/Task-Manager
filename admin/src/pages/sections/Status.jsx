import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/statistics");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError(err.response?.data?.message || "Failed to load statistics");

        // Fallback mock data for development
        const mockStats = {
          totalUser: 1247,
          totalTasks: 5588,
          completedTask: 5432,
          uncompletedTask: 156,
          completedtaskPercent: 97,
          uncompletedTaskPercent: 3,
        };
        setStats(mockStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading statistics...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div className="no-data">No statistics available</div>;

  return (
    <section className="admin-section active">
      <h1 className="page-title center">System Insights</h1>

      <div className="stats-overview">
        {/* Total Users Card */}
        <div className="stat-card">
          <i className="fa-solid fa-users-viewfinder main-stat-icon"></i>
          <div className="stat-info">
            <h3>{stats.totalUser?.toLocaleString() || 0}</h3>
            <p>Total Registered Users</p>
            <small className="stat-trend">
              <i className="fa-solid fa-arrow-up"></i> +24 this month
            </small>
          </div>
        </div>

        {/* Tasks Completed with Progress Circle */}
        <div className="stat-card">
          <div className="progress-container">
            <svg className="stat-circle" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                strokeDasharray={`${stats.completedtaskPercent || 0}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="percentage">{stats.completedtaskPercent || 0}%</div>
          </div>
          <div className="stat-info">
            <h3>{stats.completedTask?.toLocaleString() || 0}</h3>
            <p>Tasks Completed</p>
            <small>
              {stats.completedTask || 0} of {stats.totalTasks || 0} total
            </small>
          </div>
        </div>

        {/* Pending Actions with Progress Circle */}
        <div className="stat-card">
          <div className="progress-container">
            <svg className="stat-circle" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                stroke="#ff9966"
                strokeDasharray={`${stats.uncompletedTaskPercent || 0}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="percentage" style={{ color: "#ff9966" }}>
              {stats.uncompletedTaskPercent || 0}%
            </div>
          </div>
          <div className="stat-info">
            <h3>{stats.uncompletedTask?.toLocaleString() || 0}</h3>
            <p>Pending Actions</p>
            <small>Requires attention</small>
          </div>
        </div>

        {/* Total Tasks Card */}
        <div className="stat-card">
          <i className="fa-solid fa-list-check main-stat-icon"></i>
          <div className="stat-info">
            <h3>{stats.totalTasks?.toLocaleString() || 0}</h3>
            <p>Total Tasks</p>
            <small className="stat-breakdown">
              {stats.completedTask || 0} done • {stats.uncompletedTask || 0}{" "}
              pending
            </small>
          </div>
        </div>

        {/* Efficiency Score Card */}
        <div className="stat-card">
          <div className="progress-container">
            <svg className="stat-circle" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                stroke="#00ffcc"
                strokeDasharray={`${stats.completedtaskPercent || 0}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="percentage" style={{ color: "#00ffcc" }}>
              {stats.completedtaskPercent || 0}%
            </div>
          </div>
          <div className="stat-info">
            <h3 style={{ fontSize: "1.8rem" }}>Efficiency</h3>
            <p>System Performance</p>
            <small>Completion rate</small>
          </div>
        </div>

        {/* User Activity Card */}
        <div className="stat-card">
          <i className="fa-solid fa-chart-line main-stat-icon"></i>
          <div className="stat-info">
            <h3>{Math.round(stats.completedtaskPercent / 10) || 12}</h3>
            <p>Activity Score</p>
            <small className="stat-trend positive">
              <i className="fa-solid fa-arrow-up"></i> +8% from last month
            </small>
          </div>
        </div>
      </div>

      {/* Additional Stats Summary */}
      <div className="stats-summary">
        <div className="summary-card">
          <h4>Task Completion Rate</h4>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.completedtaskPercent || 0}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>Completed: {stats.completedtaskPercent || 0}%</span>
            <span>Pending: {stats.uncompletedTaskPercent || 0}%</span>
          </div>
        </div>

        <div className="summary-card">
          <h4>System Health</h4>
          <div className="health-indicator">
            <div
              className={`health-dot ${stats.completedtaskPercent > 90 ? "excellent" : stats.completedtaskPercent > 70 ? "good" : "warning"}`}
            ></div>
            <span>
              {stats.completedtaskPercent > 90
                ? "Excellent"
                : stats.completedtaskPercent > 70
                  ? "Good"
                  : "Needs Attention"}
            </span>
          </div>
          <p className="health-message">
            {stats.completedtaskPercent > 90
              ? "All systems operating optimally"
              : stats.completedtaskPercent > 70
                ? "System performance is satisfactory"
                : "Review pending tasks for improvement"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
