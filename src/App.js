// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResultPage from './components/SearchResultPage';
import AdvancedSearchPage from './components/AdvancedSearchPage';
import BookDetailPage from './components/BookDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul class="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/advanced-search">Advanced Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
