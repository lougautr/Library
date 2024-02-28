import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import { searchBooks, getRecentChanges } from "../openLibrary";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [recentChanges, setRecentChanges] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results || []);
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchBooks(query);
      handleSearchResults(data.docs);
    } catch (error) {
      // Gérer les erreurs
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentChanges = async () => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const recentChangesData = await getRecentChanges(year, month);
      setRecentChanges(recentChangesData || []);
    } catch (error) {
      // Gérer les erreurs
    }
  };

  useEffect(() => {
    fetchRecentChanges();
  }, []); // Appeler la fonction une fois après le rendu initial

  return (
    <div class="home-page">
      <h1>Home Page</h1>

      <h2>Search for some books</h2>
      <SearchComponent onSearch={handleSearch} />
      {loading && <p>Loading...</p>}

      <ul>
        {searchResults && searchResults.map((book) => (
          <li key={book.key}>
            <Link to={`/book/${book.key.split("/works/")[1]}`}>{book.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Recent changes (this month)</h2>
      {recentChanges.length > 0 ? (
        <ul class="recent-changes">
          {recentChanges && recentChanges.map((change) => (
            // Vérifier si change.comment n'est pas vide
            change.comment && <li key={change.timestamp}>{change.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No recent changes this month.</p>
      )}
    </div>
  );
};

export default HomePage;
