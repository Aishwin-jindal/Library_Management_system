import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    }

    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('/api/books');
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
    fetchBooks();
  }, [navigate]);

  // Mock record data matching the table in the screenshot
  const records = [
    { id: '32132', name: 'Grayson Prince', userId: '#R-12332', title: 'Grass-Munk-Puppy', author: 'Bella Rancy', duration: '2 Month', status: 'Subscribed', fee: '250' },
    { id: '32133', name: 'Jada White', userId: '#R-12333', title: 'History Of Kittens', author: 'Marlon James', duration: '1 Month', status: 'Unsubscribed', fee: '100' },
    { id: '32134', name: 'Sammie', userId: '#R-12334', title: 'The Void', author: 'Alka Rose', duration: '2 Month', status: 'Subscribed', fee: '300' },
    { id: '32135', name: 'Aron Schiner', userId: '#R-12335', title: 'Journey to the star', author: 'Clyde Steward', duration: '4 Month', status: 'Subscribed', fee: '250' },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Welcome Banner & Stats Chart Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }}>
            <div className="welcome-banner" style={{ display: 'flex', position: 'relative', overflow: 'hidden', minHeight: '200px', backgroundColor: '#374151', borderRadius: 'var(--radius-lg)', color: 'white', padding: '32px' }}>
              <div style={{ flex: 1, zIndex: 2 }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '8px' }}>
                  {userInfo ? `Welcome Back ${userInfo.name}!` : 'Welcome Back Reader!'}
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '24px', maxWidth: '300px' }}>
                  Lorem ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <button className="btn" style={{ backgroundColor: 'white', color: 'black', borderRadius: 'var(--radius-sm)', padding: '8px 16px', fontSize: '0.75rem', fontWeight: '600' }}>
                  ADD NEW BOOK +
                </button>
              </div>
              <div style={{ position: 'absolute', right: '20px', bottom: '10px', opacity: 0.85, zIndex: 1 }}>
                <span style={{ fontSize: '100px' }}>📚</span>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Visit & Read</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>• Stat • Book</span>
              </div>
              {/* Mock Line Chart */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '12px', height: '100px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                {[30, 45, 35, 60, 40, 70, 55].map((val, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '100%', height: `${val}px`, backgroundColor: '#374151', borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Book List Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Book List</h2>
              <Link to="/books" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>View All</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {books.slice(0, 6).map(book => (
                <Link to={`/books/${book._id}`} key={book._id} className="book-card card" style={{ padding: '12px', minHeight: '260px' }}>
                  <img 
                    src={book.coverImage ? book.coverImage : 'https://via.placeholder.com/150x225?text=No+Cover'} 
                    alt={book.title} 
                    className="book-cover"
                    style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '10px' }}
                  />
                  <h3 className="book-title" style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '2px' }}>{book.title}</h3>
                  <p className="book-author" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{book.author}</p>
                  <p className="book-price" style={{ fontSize: '0.875rem', fontWeight: '700', marginTop: '6px' }}>${book.price}</p>
                </Link>
              ))}
              {books.length === 0 && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>No books available yet.</p>}
            </div>
          </div>

          {/* Record Table Section */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Record</h2>
              <div style={{ display: 'flex', gap: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', padding: '2px' }}>
                <button className="btn" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: '#374151', color: 'white' }}>Digital</button>
                <button className="btn" style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'transparent', color: 'var(--text-secondary)' }}>In Person</button>
              </div>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: '500' }}>{r.id}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                            👤
                          </div>
                          <span style={{ fontWeight: '600' }}>{r.name}</span>
                        </div>
                      </td>
                      <td>{r.userId}</td>
                      <td>{r.title}</td>
                      <td>{r.author}</td>
                      <td>{r.duration}</td>
                      <td>
                        <span className={`badge ${r.status === 'Subscribed' ? 'badge-success' : 'badge-neutral'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600' }}>{r.fee ? `$${r.fee}` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
