// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';
import Header from '../components/Header';
import '../styles/global.css';
import "../styles/create.css"

const CreatePost = () => {
  const [formData, setFormData] = useState({
    content: '',
    title: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.content.trim()) {
      setError('Post content is required');
      return;
    }

    setIsLoading(true);
    try {
      await postsAPI.createPost(formData);
      navigate('/community');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Header showMobileMenu={true} />

      <div className="page-wrapper">
        <div className="auth-shell">
          <div className="shell-title-area">
            <h2>Create Community Post</h2>
            <hr className="shell-hr" />
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Title (Optional)</label>
              <input
                type="text"
                name="title"
                placeholder="Add a title..."
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Content *</label>
              <textarea
                name="content"
                placeholder="Share your thoughts with the community..."
                rows="6"
                value={formData.content}
                onChange={handleChange}
                className="task-textarea"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Posting...' : 'Share Post'}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/community')}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;