// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdvancedSearchPage from './components/AdvancedSearchPage';
import BookDetailPage from './components/BookDetailPage';
import AboutPage from './components/AboutPage';
import NotFound from './components/NotFound';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<AdvancedSearchPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
