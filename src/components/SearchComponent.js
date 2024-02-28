import React, { useState } from "react";

const SearchComponent = ({ onSearch, onQueryChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      onSearch(query);
    } catch (error) {
      console.error("Error during search", error);
    }
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onQueryChange(newQuery);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
