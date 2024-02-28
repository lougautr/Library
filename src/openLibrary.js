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


export const getWikipediaInfo = async (title) => {
  try {
    // Construisez l'URL de l'API MediaWiki pour récupérer les informations de Wikipedia
    const apiUrl = `/api/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${encodeURIComponent(title)}&explaintext=true`;

    // Utilisez fetch pour récupérer les informations de Wikipedia depuis le proxy
    const response = await fetch(apiUrl);

    // Si la réponse n'est pas réussie (statut différent de 200), lancez une erreur
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des informations Wikipedia. Statut: ${response.status}`);
    }

    // Récupérez les données JSON de la réponse
    const data = await response.json();

    // Obtenez le premier objet de la propriété "pages"
    const pageId = Object.keys(data.query.pages)[0];
    const pageInfo = data.query.pages[pageId];

    // Vérifiez si un extrait est disponible
    if (pageInfo.extract) {
      return {
        extract: pageInfo.extract,
      };
    } else {
      throw new Error('Aucun extrait trouvé dans la réponse de Wikipedia');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations Wikipedia', error);
    throw error;
  }
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