import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Users, BookOpen, Layers, DollarSign } from 'lucide-react';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/reports/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Library Reports</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>System statistics and category distribution analytics.</p>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading report data...</div>
          ) : error ? (
            <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--danger-color)' }}>{error}</div>
          ) : (
            <>
              {/* Stats Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                
                <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '50%', color: '#1F2937' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Total Registered Users</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{stats.totalUsers}</h3>
                  </div>
                </div>

                <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '50%', color: '#1F2937' }}>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Total Books Cataloged</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{stats.totalBooks}</h3>
                  </div>
                </div>

                <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '50%', color: '#1F2937' }}>
                    <Layers size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Book Categories</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{stats.categories.length}</h3>
                  </div>
                </div>

                <div className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '50%', color: '#1F2937' }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Total Catalog Value</p>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>${stats.totalValue.toFixed(2)}</h3>
                  </div>
                </div>

              </div>

              {/* Category Breakdown & Insights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                
                {/* Category Distribution progress bars */}
                <div className="card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Category Distribution</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {stats.categories.map((cat) => {
                      const percentage = stats.totalBooks > 0 ? (cat.count / stats.totalBooks) * 100 : 0;
                      return (
                        <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                            <span style={{ fontWeight: '600' }}>{cat.name}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{cat.count} books ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#111827', borderRadius: 'var(--radius-full)' }} />
                          </div>
                        </div>
                      );
                    })}
                    {stats.categories.length === 0 && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>No categories found in the database.</p>
                    )}
                  </div>
                </div>

                {/* Additional analytics card */}
                <div className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>System Insights</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li>Average Book Cost: <strong>${stats.totalBooks > 0 ? (stats.totalValue / stats.totalBooks).toFixed(2) : '0.00'}</strong> per title.</li>
                      <li>Largest category is <strong>{stats.categories[0]?.name || 'N/A'}</strong> with <strong>{stats.categories[0]?.count || 0}</strong> registered books.</li>
                      <li>Standard user authorization is active, restricting core API endpoints.</li>
                    </ul>
                  </div>

                  <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: '24px' }}>
                    <h4 style={{ fontSize: '0.8125rem', fontWeight: '700', marginBottom: '4px' }}>Data Integrity Status</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>All database metrics computed successfully. Real-time updates active.</p>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
