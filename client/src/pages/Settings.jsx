import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { User, Shield, Check } from 'lucide-react';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  
  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      const parsed = JSON.parse(user);
      setUserInfo(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');
    
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(
        '/api/users/profile',
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const updatedUser = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
      setProfileSuccess('Profile updated successfully!');
      
      // Reload navbar
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        '/api/users/profile',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPasswordSuccess('Password changed successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Settings</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manage your personal details and security configuration.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Profile Panel */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <User size={20} color="var(--text-primary)" />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Profile Details</h2>
              </div>

              {profileSuccess && <div style={{ color: 'green', fontSize: '0.875rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={16} />{profileSuccess}</div>}
              {profileError && <div style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginBottom: '16px' }}>{profileError}</div>}

              {userInfo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                  <img 
                    src={userInfo.profilePic || 'https://via.placeholder.com/64'} 
                    alt="Avatar" 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e2e8f0' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: '700', margin: 0 }}>{userInfo.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{userInfo.email}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ backgroundColor: 'var(--background-color)' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    style={{ backgroundColor: 'var(--background-color)' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', alignSelf: 'flex-start', borderRadius: 'var(--radius-full)' }}>
                  Save Profile
                </button>
              </form>
            </div>

            {/* Password Panel */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Shield size={20} color="var(--text-primary)" />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Change Password</h2>
              </div>

              {passwordSuccess && <div style={{ color: 'green', fontSize: '0.875rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={16} />{passwordSuccess}</div>}
              {passwordError && <div style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginBottom: '16px' }}>{passwordError}</div>}

              <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">New Password</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••••••••"
                    style={{ backgroundColor: 'var(--background-color)' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="••••••••••••••"
                    style={{ backgroundColor: 'var(--background-color)' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', alignSelf: 'flex-start', borderRadius: 'var(--radius-full)' }}>
                  Update Password
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
