// PostDetail.jsx
function PostDetail({ post, setActiveSection }) {
  if (!post) {
    return (
      <section className="admin-section active">
        <div className="admin-card detail-view">
          <button
            className="btn-back"
            onClick={() => setActiveSection("posts")}
          >
            ← Back to Posts
          </button>
          <div className="error">No post data available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section active">
      <div className="admin-card detail-view">
        <button className="btn-back" onClick={() => setActiveSection("posts")}>
          ← Back to Posts
        </button>

        <h2 className="detail-title">Post Details</h2>

        <div className="post-detail-header">
          <div className="post-author-info">
            <div className="avatar-small">
              <i className="fa-solid fa-user-circle"></i>
            </div>
            <div>
              <h3>{post.author?.name || "Unknown Author"}</h3>
              <p className="post-meta">
                <i className="fa-solid fa-calendar"></i>{" "}
                {new Date(post.createdAt).toLocaleDateString()} at{" "}
                {new Date(post.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="post-content-full">
          <h4>Content:</h4>
          <div className="content-box">
            {post.content || "No content available"}
          </div>
        </div>

        <div className="post-stats">
          <div className="stat-item">
            <i className="fa-solid fa-heart"></i>
            <span>{post.likes?.length || 0} Likes</span>
          </div>
          <div className="stat-item">
            <i className="fa-solid fa-comment"></i>
            <span>{post.comments?.length || 0} Comments</span>
          </div>
          <div className="stat-item">
            <i className="fa-solid fa-eye"></i>
            <span>{post.views || 0} Views</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetail;
