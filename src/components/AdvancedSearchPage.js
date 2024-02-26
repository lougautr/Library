// AdvancedSearchPage.js
import React, { useState } from "react";
import { advancedSearchBooks } from "../openLibrary";

const AdvancedSearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results || []);
    setLoading(false);
  };

  const handleAdvancedSearch = async () => {
    setLoading(true);
    try {
      // Utilisez les paramètres de recherche avancée en fonction de votre interface utilisateur
      const params = {
        q: query,
        // Ajoutez d'autres paramètres en fonction de vos besoins
      };

      const data = await advancedSearchBooks(params);
      handleSearchResults(data.docs);
    } catch (error) {
      // Gérer les erreurs
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Advanced Search Page</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleAdvancedSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {searchResults &&
          searchResults.map((book) => (
            <li key={book.key}>{book.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default AdvancedSearchPage;
