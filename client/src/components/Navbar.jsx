import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Link2, ChevronDown, LogOut } from 'lucide-react';

const Navbar = ({ customSearch }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <header className="topbar" style={{ borderBottom: 'none', padding: '24px 32px' }}>
      <div className="search-bar" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {customSearch ? (
          customSearch
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--background-color)', padding: '10px 16px', borderRadius: 'var(--radius-full)', width: '300px' }}>
            <Search size={18} color="var(--text-secondary)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search your book" 
              style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.875rem' }} 
            />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link2 size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <Bell size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        
        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <img 
              src={userInfo?.profilePic?.startsWith('http') ? userInfo.profilePic : userInfo?.profilePic} 
              alt="Profile" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e2e8f0' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/36'; }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{userInfo?.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {userInfo?.role ? userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1) : 'User'}
              </span>
            </div>
            <ChevronDown size={16} color="var(--text-secondary)" />
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', marginLeft: '8px' }}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/login" className="btn btn-outline" style={{ padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.875rem' }}>Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.875rem' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
