import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Trash2, Search, UserMinus } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customSearch = (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--background-color)', padding: '10px 16px', borderRadius: 'var(--radius-full)', width: '300px' }}>
      <Search size={18} color="var(--text-secondary)" style={{ marginRight: '8px' }} />
      <input 
        type="text" 
        placeholder="Search user by name or email" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.875rem' }} 
      />
    </div>
  );

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar customSearch={customSearch} />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>User Management</h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manage library user accounts and permissions.</p>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading users...</div>
          ) : error ? (
            <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--danger-color)' }}>{error}</div>
          ) : (
            <div className="card" style={{ padding: '24px' }}>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <img 
                            src={user.profilePic ? (user.profilePic.startsWith('http') ? user.profilePic : user.profilePic) : 'https://via.placeholder.com/32'}
                            alt={user.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#e2e8f0' }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/32'; }}
                          />
                        </td>
                        <td style={{ fontWeight: '600' }}>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="btn btn-outline" 
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            style={{ 
                              padding: '6px 12px', 
                              borderColor: 'var(--danger-color)', 
                              color: 'var(--danger-color)', 
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.75rem'
                            }}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
                          No users found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
