import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const { data } = await axios.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
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

          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join the library system today.</p>

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label className="input-label">Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Helena Brauer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ backgroundColor: 'var(--background-color)' }}
              />
            </div>
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
            <div className="input-group">
              <label className="input-label">Profile Picture (Optional)</label>
              <input
                type="file"
                className="input-field"
                onChange={(e) => setProfilePic(e.target.files[0])}
                accept="image/*"
                style={{ backgroundColor: 'var(--background-color)' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 'var(--radius-full)' }}>
              Sign Up
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
