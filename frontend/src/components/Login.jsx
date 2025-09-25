import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css'; // We'll add CSS animations here

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) setSuccessMessage(location.state.message);
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await authAPI.login(formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated bubbles */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>

      <div className="login-card">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="footer">
          Don't have an account?{' '}
          <Link to="/register" className="link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
