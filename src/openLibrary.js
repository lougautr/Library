// src/openLibrary.js
const OPEN_LIBRARY_API_BASE = "https://openlibrary.org/search.json";

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

export const getBookDetails = async (identifier) => {
  try {
    const response = await fetch(`${OPEN_LIBRARY_API_BASE}works/${identifier}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details from Open Library API", error);
    throw error;
  }
};

export const getWikipediaInfo = async (title) => {
  try {
    // Utilise l'API Wikipedia appropriée (par exemple, Wikipedia en français ici)
    const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=true`);
    const data = await response.json();
    
    // Parse les données pour extraire la description
    const pageId = Object.keys(data.query.pages)[0];
    const description = data.query.pages[pageId].extract;

    return { description };
  } catch (error) {
    console.error("Error fetching Wikipedia information", error);
    throw error;
  }
};

export const advancedSearchBooks = async (params) => {
    try {
      // Convertit les paramètres en une chaîne de requête pour l'URL
      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
  
      const response = await fetch(`${OPEN_LIBRARY_API_BASE}search.json?${queryString}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from Open Library API", error);
      throw error;
    }
  };