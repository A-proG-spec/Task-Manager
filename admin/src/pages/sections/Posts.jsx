import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Posts({ setActiveSection, setSelectedPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/admin/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (post) => {
    setSelectedPost(post);
    setActiveSection("postDetail");
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      // Add confirmations and error handling
      await axiosInstance.delete(`/admin/posts/${postToDelete._id}`);
      
      // Update local state
      setPosts(posts.filter((p) => p._id !== postToDelete._id));
      
      // Show success message
      alert("Post deleted successfully");
      
    } catch (err) {
      console.error("Delete failed:", err);
      
      // Check specific error types
      if (err.response?.status === 401) {
        alert("Your session has expired. Please login again.");
      } else if (err.response?.status === 403) {
        alert("You don't have permission to delete this post.");
      } else if (err.response?.status === 404) {
        alert("Post not found or already deleted.");
      } else {
        alert(err.response?.data?.message || "Failed to delete post");
      }
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <section className="admin-section active">
        <div className="admin-card">
          <h1 className="page-title">Post Management</h1>
          <div className="admin-table-container">
            {posts.length === 0 ? (
              <div className="no-posts">No posts found</div>
            ) : (
              <div className="admin-table-mock">
                {posts.map((post) => (
                  <div className="table-row" key={post._id}>
                    <div className="user-meta">
                      <i className="fa-solid fa-paste"></i>
                      <div className="post-info">
                        <span className="post-preview">
                          {post.content ? (
                            post.content.length > 50 
                              ? `${post.content.slice(0, 50)}...` 
                              : post.content
                          ) : "No content"}
                        </span>
                        <div className="post-meta">
                          <small className="post-author">
                            <i className="fa-solid fa-user"></i> {post.author?.name || "Unknown"}
                          </small>
                          <small className="post-date">
                            <i className="fa-solid fa-calendar"></i>{" "}
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown"}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="action-btns">
                      <button
                        className="btn-view"
                        onClick={() => handleView(post)}
                        title="View post details"
                      >
                        <i className="fa-solid fa-eye"></i> VIEW
                      </button>

                      <button
                        className="btn-remove"
                        onClick={() => handleDeleteClick(post)}
                        title="Delete post"
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
      {showDeleteModal && postToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete this post?
            </p>
            <div className="post-preview-modal">
              <strong>Preview:</strong>
              <p>{postToDelete.content?.slice(0, 100) || "No content"}...</p>
              {postToDelete.author && (
                <small>By: {postToDelete.author.name}</small>
              )}
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
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;