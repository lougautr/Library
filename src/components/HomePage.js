import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import { searchBooks, getRecentChanges } from "../openLibrary";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [basicQuery, setBasicQuery] = useState("");
  const [basicSearchResults, setBasicSearchResults] = useState([]);
  const [basicSearchLoading, setBasicSearchLoading] = useState(false);
  const [recentChanges, setRecentChanges] = useState([]);

  const handleBasicSearch = async () => {
    setBasicSearchLoading(true);
    try {
      const data = await searchBooks(basicQuery);
      setBasicSearchResults(data.docs || []);
    } catch (error) {
      console.error("Error during basic search", error);
    } finally {
      setBasicSearchLoading(false);
    }
  };

  const handleBasicQueryChange = (newQuery) => {
    setBasicQuery(newQuery);
  };

  const fetchRecentChanges = async () => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const recentChangesData = await getRecentChanges(year, month);
      setRecentChanges(recentChangesData || []);
    } catch (error) {
      console.error("Error retrieving recent changes", error);
    }
  };

  useEffect(() => {
    fetchRecentChanges();
  }, []);

  return (
    <div className="page">
      <h1>Home Page</h1>

      <h2>Search for some books</h2>
      <SearchComponent onSearch={handleBasicSearch} onQueryChange={handleBasicQueryChange} />
      {basicSearchLoading && <p>Loading...</p>}

      <ul className="results">
        {basicSearchResults.map((book) => (
          <li key={book.key}>
            <Link to={`/book/${book.key.split("/works/")[1]}`}>{book.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Recent changes (this month)</h2>
      {recentChanges.length > 0 ? (
        <ul className="recent-changes">
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
