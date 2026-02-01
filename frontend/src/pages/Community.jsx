// src/pages/Community.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postsAPI, communityAPI } from "../services/api";
import Header from "../components/Header";
import "../styles/global.css";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      const [postsRes, performersRes, rankRes] = await Promise.all([
        postsAPI.getPosts(),
        //communityAPI.getTopPerformers(),
        //communityAPI.getUserRank(),
      ]);

      setPosts(postsRes.data);
      //setTopPerformers(performersRes.data);
      //setUserRank(rankRes.data);
    } catch (err) {
      setError("Failed to load community data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading community...</p>
      </div>
    );
  }

  // Create the additional action button for the header
  const newPostButton = (
    <Link to="/create-post" className="nav-link">
      + NEW POST
    </Link>
  );

  return (
    <>
      <Header additionalAction={newPostButton} />

      <div className="page-wrapper">
        <div className="main-shell">
          <div className="shell-title-area">
            <h2>
              <strong>Olympus Community</strong>
            </h2>
            <hr className="shell-hr" />
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Desktop Layout - Side by side */}
          <div className="desktop-layout grid-layout" style={{ gridTemplateColumns: "1fr 300px" }}>
            {/* Posts Column (left on desktop, top on mobile) */}
            <main className="sub-panel middle-panel mobile-order-1">
              <div className="panel-header">
                <h3 className="panel-title">Recent Updates</h3>
                <button className="btn-refresh" onClick={loadData}>
                  ↻ Refresh
                </button>
              </div>

              {posts.length === 0 ? (
                <div className="no-posts">
                  <p>
                    No posts yet.{" "}
                    <Link to="/create-post">Be the first to post!</Link>
                  </p>
                </div>
              ) : (
                <div className="scrollable-posts">
                  {posts.map((post) => (
                    <div key={post._id} className="task-row">
                      <div className="task-details">
                        <h5>{post.title || "Community Update"}</h5>
                        <p>
                          Posted by{" "}
                          <strong>{post.author?.name || "Anonymous"}</strong> •{" "}
                          {new Date(post.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p
                          style={{
                            marginTop: "5px",
                            opacity: "0.8",
                            fontSize: "0.9rem",
                          }}
                        >
                          {post.content}
                        </p>
                        <div className="post-stats">
                          <span className="post-stat">
                            <i className="fas fa-thumbs-up"></i>{" "}
                            {post.likes || 0}
                          </span>
                          <span className="post-stat">
                            <i className="fas fa-comment"></i>{" "}
                            {post.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            {/* Sidebar Column (right on desktop, bottom on mobile) */}
            <aside className="side-wrapper mobile-order-2">
              <div className="sub-panel">
                <h4 style={{ marginBottom: "15px" }}>Top Performers</h4>
                {topPerformers.length === 0 ? (
                  <p>No performance data yet</p>
                ) : (
                  topPerformers.map((performer, index) => (
                    <div
                      key={performer._id}
                      className="item"
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                        paddingBottom: "8px",
                      }}
                    >
                      <span>
                        <strong>{index + 1}.</strong> {performer.name}
                      </span>
                      <span className="tag">{performer.points || 0} pts</span>
                    </div>
                  ))
                )}
              </div>

              <div
                className="sub-panel"
                style={{ background: "rgba(0, 0, 0, 0.8)", color: "white" }}
              >
                <h4>Your Rank</h4>
                {userRank ? (
                  <div className="item">
                    <span style={{ color: "white" }}>
                      #{userRank.rank} Worldwide
                    </span>
                    <span className="tag" style={{ color: "#fff" }}>
                      {userRank.points || 0} pts
                    </span>
                  </div>
                ) : (
                  <p>No rank data available</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;