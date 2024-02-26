import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResultPage from './components/SearchResultPage';
import AdvancedSearchPage from './components/AdvancedSearchPage';
import BookDetailPage from './components/BookDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/advanced-search" element={<AdvancedSearchPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
