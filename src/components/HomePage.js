import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import { searchBooks } from "../openLibrary";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <div>
      <h1>Home Page</h1>
      <SearchComponent onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>} {/* Affiche le message de chargement lorsque loading est true */}

      <ul>
        {searchResults && searchResults.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
