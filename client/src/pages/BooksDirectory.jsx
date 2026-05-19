import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const BooksDirectory = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

  const categories = [
    { name: 'All', icon: '📚' },
    { name: 'Academic', icon: '🎓' },
    { name: 'Mythological', icon: '🏺' },
    { name: 'Motivational', icon: '✨' },
    { name: 'Biographies', icon: '✍️' },
    { name: 'Fiction', icon: '🦄' },
    { name: 'Art & Design', icon: '🎨' },
  ];

  const types = [
    { name: 'Books', icon: '📖' },
    { name: 'Magazine', icon: '📰' },
    { name: 'Journals', icon: '📓' },
    { name: 'Articles', icon: '📄' },
    { name: 'News Paper', icon: '🗞️' },
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar 
          customSearch={
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--background-color)', padding: '10px 16px', borderRadius: 'var(--radius-full)', width: '300px' }}>
              <span style={{ marginRight: '8px', color: 'var(--text-secondary)' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search books..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.875rem' }}
              />
            </div>
          }
        />

        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Books Category Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Books Category</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setSelectedCategory('All')}>View All</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
              {categories.slice(1).map((cat) => (
                <div 
                  key={cat.name} 
                  onClick={() => setSelectedCategory(cat.name)}
                  className="card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    padding: '20px', 
                    cursor: 'pointer',
                    border: selectedCategory === cat.name ? '2px solid #374151' : '1px solid var(--border-color)',
                    backgroundColor: selectedCategory === cat.name ? '#F3F4F6' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Books Type Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Books Type</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View All</span>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
              {types.map((t) => (
                <div 
                  key={t.name}
                  onClick={() => setSelectedType(t.name)}
                  className="card"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 24px', 
                    cursor: 'pointer',
                    border: selectedType === t.name ? '2px solid #374151' : '1px solid var(--border-color)',
                    backgroundColor: selectedType === t.name ? '#F3F4F6' : 'white',
                    borderRadius: 'var(--radius-md)',
                    minWidth: '150px'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{t.icon}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Catalog Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`} ({filteredBooks.length})
              </h2>
            </div>

            <div className="books-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
              {filteredBooks.map(book => (
                <Link to={`/books/${book._id}`} key={book._id} className="book-card card" style={{ padding: '12px' }}>
                  <img 
                    src={book.coverImage ? book.coverImage : 'https://via.placeholder.com/150x225?text=No+Cover'} 
                    alt={book.title} 
                    className="book-cover"
                    style={{ height: '220px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}
                  />
                  <h3 className="book-title" style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '4px' }}>{book.title}</h3>
                  <p className="book-author" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{book.author}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>${book.price}</span>
                    <span className={`badge ${book.status === 'Available' ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '0.7rem' }}>
                      {book.status}
                    </span>
                  </div>
                </Link>
              ))}
              {filteredBooks.length === 0 && (
                <div style={{ gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  No books found matching this filter.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BooksDirectory;
