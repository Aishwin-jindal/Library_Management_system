import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Users, Book, PieChart, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'User Management', path: '/users', icon: <Users size={18} /> },
    { name: 'Book Management', path: '/books', icon: <Book size={18} /> },
    { name: 'Reports', path: '/reports', icon: <PieChart size={18} /> },
  ];

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', marginBottom: '40px', color: 'var(--text-primary)' }}>
        <BookOpen size={24} />
        <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>Book Library</span>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px', flex: 1 }}>
        {navItems.map((item) => {
          const isActive = item.path !== '#' && (path === item.path || (item.path !== '/' && path.startsWith(item.path)));
          return (
            <Link 
              key={item.name}
              to={item.path} 
              className="btn" 
              style={{ 
                justifyContent: 'flex-start', 
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: isActive ? 'var(--background-color)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '0 16px', marginTop: 'auto', marginBottom: '24px' }}>
        <Link 
          to="/settings" 
          className="btn" 
          style={{ 
            justifyContent: 'flex-start', 
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: path === '/settings' ? 'var(--background-color)' : 'transparent',
            color: path === '/settings' ? 'var(--text-primary)' : 'var(--text-secondary)',
            width: '100%',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem'
          }}
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
