import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";
import { searchBooks, advancedSearchBooks } from "../openLibrary";

const AdvancedSearchPage = () => {
  const [advancedQuery, setAdvancedQuery] = useState("");
  const [advancedSearchResults, setAdvancedSearchResults] = useState([]);
  const [basicQuery, setBasicQuery] = useState("");
  const [basicSearchResults, setBasicSearchResults] = useState([]);
  const [advancedSearchloading, setAdvancedSearchLoading] = useState(false);
  const [basicSearchLoading, setBasicSearchLoading] = useState(false);

  const handleAdvancedSearch = async () => {
    setAdvancedSearchLoading(true);
    try {
      const params = {
        title: advancedQuery,
        author: "",
        date: "",
        tags: "",
      };
  
      const data = await advancedSearchBooks(params);
      setAdvancedSearchResults(data.docs || []);
    } catch (error) {
      console.error("Error during advanced search", error);
    } finally {
      setAdvancedSearchLoading(false);
    }
  };

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

  const handleAdvancedQueryChange = (newQuery) => {
    setAdvancedQuery(newQuery);
  };

  const handleBasicQueryChange = (newQuery) => {
    setBasicQuery(newQuery);
  };

  return (
    <div className="page">
      <h1>Advanced Search Page</h1>

      <div>
        <h2>Advanced search for some books</h2>
        <SearchComponent onSearch={handleAdvancedSearch} onQueryChange={handleAdvancedQueryChange} />
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
        <SearchComponent onSearch={handleBasicSearch} onQueryChange={handleBasicQueryChange} />
        {basicSearchLoading && <p>Loading...</p>}

        <ul className="results">
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
