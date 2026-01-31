// Users.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Users({ setActiveSection, setSelectedUser }) { // Add setSelectedUser prop
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    // Set the selected user and navigate to detail
    setSelectedUser(user);
    setActiveSection("detail");
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      await axiosInstance.delete(`/admin/users/${userToDelete._id}`);
      // Remove user from local state
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      
      // Show success message
      alert(`User ${userToDelete.name || userToDelete.email} deleted successfully`);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete user");
    } finally {
      setShowConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <section className="admin-section active">
        <div className="admin-card">
          <h1 className="page-title">User Control</h1>
          <div className="admin-table-container">
            {users.length === 0 ? (
              <div className="no-users">No users found</div>
            ) : (
              <div className="admin-table-mock">
                {users.map((user) => (
                  <div className="table-row" key={user._id}>
                    <div className="user-meta">
                      <i className="fa-solid fa-user"></i>
                      <div className="user-info">
                        <span className="user-name">{user.name || "No Name"}</span>
                        <span className="user-email">{user.email}</span>
                        <span className="user-role">Role: {user.role || 'user'}</span>
                      </div>
                    </div>

                    <div className="action-btns">
                      <button
                        className="btn-view"
                        onClick={() => handleView(user)}
                        title="View user details"
                      >
                        <i className="fa-solid fa-eye"></i> VIEW
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() => handleDeleteClick(user)}
                        title="Delete user"
                        disabled={user.role === 'admin'}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirm && userToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete user: 
              <strong> {userToDelete.name || userToDelete.email}</strong>?
            </p>
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;