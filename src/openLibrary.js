// src/openLibrary.js
const OPEN_LIBRARY_API_BASE = "https://openlibrary.org/search.json";
const RECENT_CHANGES_API_BASE = "http://openlibrary.org/recentchanges";

export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${OPEN_LIBRARY_API_BASE}?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Open Library API", error);
    throw error;
  }
};

// openLibrary.js
export const getBookDetails = async (identifier) => {
  try {
    const response = await fetch(`https://openlibrary.org/works/${identifier}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details from Open Library API", error);
    throw error;
  }
};


// openLibrary.js
export const getWikipediaInfo = async (title) => {
  const apiUrl = `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(title)}&exintro=true&callback=?`;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = apiUrl;
    script.async = true;

    // Function to be called when JSONP request is successful
    window.jsonpCallback = (data) => {
      delete window.jsonpCallback;
      document.body.removeChild(script);
      resolve(data);
    };

    // Function to be called on error
    script.onerror = (error) => {
      delete window.jsonpCallback;
      document.body.removeChild(script);
      reject(error);
    };

    document.body.appendChild(script);
  });
};


export const advancedSearchBooks = async (params) => {
  try {
    // Convertit les paramètres en une chaîne de requête pour l'URL
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await fetch(`${OPEN_LIBRARY_API_BASE}?${queryString}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Open Library API", error);
    throw error;
  }
};

export const getRecentChanges = async (year, month) => {
  try {
    const response = await fetch(`${RECENT_CHANGES_API_BASE}/${year}/${month}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent changes from Open Library API", error);
    throw error;
  }
};

export const getAuthorDetails = async (authorKey) => {
  try {
    const response = await fetch(`https://openlibrary.org${authorKey}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching author details", error);
    throw error;
  }
};