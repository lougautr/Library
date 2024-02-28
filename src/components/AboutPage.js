import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import { searchBooks, getRecentChanges } from "../openLibrary";
import { Link } from "react-router-dom";

const AboutPage = () => {
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
    <div className="page">
        <h1>About</h1>

        <h2>Informations</h2>
        <p>Website that allows you to search for books and obtain some information about them.</p>

        <h2>Website authors</h2>
        <ul className="website-authors">
            <li>Antonin Montagne</li>
            <li>Lou-Anne Gautherie</li>
        </ul>

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
    </div>
  );
};

export default AboutPage;
