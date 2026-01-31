// UserDetail.jsx
function UserDetail({ user, setActiveSection }) {
  if (!user) {
    return (
      <section className="admin-section active">
        <div className="admin-card detail-view">
          <button
            className="btn-back"
            onClick={() => setActiveSection("users")}
          >
            ← Back to Users
          </button>
          <div className="error">No user data available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section active">
      <div className="admin-card detail-view">
        <button
          className="btn-back"
          onClick={() => setActiveSection("users")}
        >
          ← Back to Users
        </button>

        <h2 className="detail-title">User Profile: {user.name || "Unnamed User"}</h2>

        <div className="profile-grid">
          <div className="detail-item">
            <strong>Username:</strong> 
            <span>{user.name || "Not set"}</span>
          </div>
          
          <div className="detail-item">
            <strong>Status:</strong> 
            <span>{user.isActive ? "Active" : "Inactive"}</span>
          </div>
          
          <div className="detail-item">
            <strong>Role:</strong> 
            <span>{user.role || 'user'}</span>
          </div>
          
          <div className="detail-item">
            <strong>Email:</strong> 
            <span>{user.email}</span>
          </div>
          
          <div className="detail-item">
            <strong>Joined:</strong> 
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          
          {user._id && (
            <div className="detail-item">
              <strong>User ID:</strong> 
              <span className="user-id">{user._id}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserDetail;