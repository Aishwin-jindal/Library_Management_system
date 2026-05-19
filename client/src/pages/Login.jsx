import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('/api/auth/google', {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      alert('Google login failed');
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-left">
        <h1>Welcome to our Library</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#FCD34D' }}>★★★★★</div>
          <p style={{ fontSize: '0.875rem' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#9CA3AF' }}></div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.875rem', color: 'white', margin: 0 }}>Helena Brauer</p>
              <p style={{ fontSize: '0.75rem', margin: 0 }}>Reader ID #12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <span style={{ fontSize: '1.5rem' }}>📖</span>
            <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--text-primary)' }}>Book Library</span>
          </div>

          <h2 className="auth-title">Sign In</h2>
          <p className="auth-subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="design@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: 'var(--background-color)' }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="•••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: 'var(--background-color)' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--text-secondary)' }}>Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-full)' }}>
              Log in
            </button>
          </form>

          <div className="auth-divider">OR</div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
