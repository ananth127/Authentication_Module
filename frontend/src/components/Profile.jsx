import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.data.success) setUser(response.data.user);
    } catch (err) {
      setError('Failed to fetch profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0].toUpperCase())
      .join('')
      .substring(0, 2);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading)
    return (
      <div className="profile-container">
        <div className="bubbles">{[...Array(10)].map((_, i) => <span key={i} className="bubble"></span>)}</div>
        <div className="profile-card fade-in">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="profile-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="error">{error}</div>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="bubbles">{[...Array(10)].map((_, i) => <span key={i} className="bubble"></span>)}</div>

      <div className="profile-card fade-in">
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        <div className="avatar">{getInitials(user?.name)}</div>
        <h2 className="user-name">{user?.name}</h2>
        <p className="user-email">{user?.email}</p>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Full Name</div>
            <div className="info-value">{user?.name}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Email Address</div>
            <div className="info-value">{user?.email}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Member Since</div>
            <div className="info-value">{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Account Status</div>
            <div className="info-value">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
