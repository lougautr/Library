// src/components/BookDetailPage.js
import React, { useEffect, useState } from "react";
import { getBookDetails, getWikipediaInfo } from "../openLibrary";

const BookDetailPage = ({ match }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [wikipediaInfo, setWikipediaInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const bookId = match.params.id;
      try {
        // Obtient les détails du livre depuis Open Library
        const details = await getBookDetails(bookId);
        setBookDetails(details);

        // Obtient les informations de Wikipedia basées sur le titre du livre
        const wikipediaInfo = await getWikipediaInfo(details.title);
        setWikipediaInfo(wikipediaInfo);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    fetchData();
  }, [match.params.id]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <p>{wikipediaInfo?.description}</p>
      {/* Ajoute le reste des informations du livre ici */}
    </div>
  );
};

export default BookDetailPage;
