import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        setBook(data);
        
        // Fetch all books to slice related books of the same category
        const { data: allBooks } = await axios.get('/api/books');
        const related = allBooks.filter(b => b._id !== id && b.category === data.category);
        setRelatedBooks(related);
      } catch (error) {
        console.error('Error fetching book', error);
      }
    };
    fetchBook();
  }, [id, navigate]);

  if (!book) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div>
            <Link to="/books" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.875rem', fontWeight: '500' }}>
              &larr; Back to Books
            </Link>
            
            <div className="card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '48px', alignItems: 'flex-start', padding: '32px' }}>
              <img 
                src={book.coverImage ? book.coverImage : 'https://via.placeholder.com/300x450?text=No+Cover'} 
                alt={book.title}
                style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: '1.3', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {book.title}
                  </h1>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    By: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{book.author}</span> | Published: 2019
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FCD34D' }}>
                  <span>★★★★★</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>${book.price}</span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>${(book.price * 1.45).toFixed(2)}</span>
                </div>

                <div>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '12px 32px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: '600' }}
                    disabled={book.status !== 'Available'}
                  >
                    {book.status === 'Available' ? 'Read This Book' : 'Currently Issued'}
                  </button>
                </div>

                {/* Tab buttons */}
                <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-color)', marginTop: '16px' }}>
                  <button 
                    onClick={() => setActiveTab('summary')}
                    style={{ 
                      paddingBottom: '12px', 
                      background: 'none', 
                      border: 'none', 
                      borderBottom: activeTab === 'summary' ? '2px solid #374151' : '2px solid transparent',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: activeTab === 'summary' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Book Summary
                  </button>
                  <button 
                    onClick={() => setActiveTab('author')}
                    style={{ 
                      paddingBottom: '12px', 
                      background: 'none', 
                      border: 'none', 
                      borderBottom: activeTab === 'author' ? '2px solid #374151' : '2px solid transparent',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: activeTab === 'author' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    About the Author
                  </button>
                </div>

                {/* Tab Content */}
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  {activeTab === 'summary' ? (
                    <p>{book.summary || 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}</p>
                  ) : (
                    <p>{book.author} is a renowned writer in the {book.category} genre, celebrated for creating captivating and widely read literature.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Books Section */}
          {relatedBooks.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Related Books</h2>
                <Link to="/books" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>View All</Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                {relatedBooks.slice(0, 5).map(b => (
                  <Link to={`/books/${b._id}`} key={b._id} className="book-card card" style={{ padding: '12px' }}>
                    <img 
                      src={b.coverImage ? b.coverImage : 'https://via.placeholder.com/150x225?text=No+Cover'} 
                      alt={b.title} 
                      className="book-cover"
                      style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '10px' }}
                    />
                    <h3 className="book-title" style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '2px' }}>{b.title}</h3>
                    <p className="book-author" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{b.author}</p>
                    <p className="book-price" style={{ fontSize: '0.875rem', fontWeight: '700', marginTop: '6px' }}>${b.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default BookDetails;
