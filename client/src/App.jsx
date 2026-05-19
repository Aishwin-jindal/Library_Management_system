import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BooksDirectory from './pages/BooksDirectory'
import BookDetails from './pages/BookDetails'
import UserManagement from './pages/UserManagement'
import Reports from './pages/Reports'

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<BooksDirectory />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  )
}

export default App
