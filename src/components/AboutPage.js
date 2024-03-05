import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import { searchBooks } from "../openLibrary";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [basicQuery, setBasicQuery] = useState("");
  const [basicSearchResults, setBasicSearchResults] = useState([]);
  const [basicSearchLoading, setBasicSearchLoading] = useState(false);

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

        <h2>Plus d'informations</h2>
        <a href="https://youtu.be/dQw4w9WgXcQ?si=vUswz7MWPo1wrr-B">Cliquez ici pour découvrir le code promo de la boutique de snacks du BDE SUPINFO CAEN</a>

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
    </div>
  );
};

export default AboutPage;
