import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NotFound from './components/NotFound';
import './App.css';

const HomePage = lazy(() => import('./components/HomePage'));
const AdvancedSearchPage = lazy(() => import('./components/AdvancedSearchPage'));
const BookDetailPage = lazy(() => import('./components/BookDetailPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));

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

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<AdvancedSearchPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/book/*" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
