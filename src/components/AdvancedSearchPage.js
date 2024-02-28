import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";
import { searchBooks, advancedSearchBooks } from "../openLibrary";

const AdvancedSearchPage = () => {
  const [query, setQuery] = useState("");
  const [advancedSearchResults, setAdvancedSearchResults] = useState([]);
  const [basicSearchResults, setBasicSearchResults] = useState([]);
  const [advancedSearchloading, setAdvancedSearchLoading] = useState(false);
  const [basicSearchloading, setBasicSearchLoading] = useState(false);

  const handleAdvancedSearch = async () => {
    setAdvancedSearchLoading(true);
    try {
      const params = {
        q: query,
      };

      const data = await advancedSearchBooks(params);
      setAdvancedSearchResults(data.docs || []);
    } catch (error) {
      console.error("Error during advanced search", error);
    } finally {
      setAdvancedSearchLoading(false);
    }
  };

  const handleBasicSearch = async (basicQuery) => {
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

  return (
    <div className="page">
      <h1>Advanced Search Page</h1>

      <div>
        <h2>Advanced search for some books</h2>
        <SearchComponent onSearch={handleAdvancedSearch} />
        {advancedSearchloading && <p>Loading...</p>}

        <ul>
          {advancedSearchResults.map((book) => (
            <li key={book.key}>
              <Link to={`/book/${book.key.split("/works/")[1]}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Basic search for some books</h2>
        <SearchComponent onSearch={handleBasicSearch} />
        {basicSearchloading && <p>Loading...</p>}

        <ul>
          {basicSearchResults.map((book) => (
            <li key={book.key}>
              <Link to={`/book/${book.key.split("/works/")[1]}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
