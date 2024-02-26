import React, { useState } from "react";
import { searchBooks } from "../openLibrary";

const GlobalSearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const data = await searchBooks(query);
      onSearchResults(data.docs);
    } catch (error) {
      // Gérer les erreurs
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GlobalSearchBar;
