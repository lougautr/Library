import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetails, getAuthorDetails, getWikipediaInfo } from "../openLibrary";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});
  const [wikipediaInfo, setWikipediaInfo] = useState({});
  const [error, setError] = useState(null);

  const cleanHTMLTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const details = await getBookDetails(id);

        if (!details.title) {
          setError("Book not found. Please enter a valid ID.");
          return;
        }

        setBookDetails(details);

        if (details.authors && details.authors.length > 0) {
          const authorUrl = `${details.authors[0].author.key}`;
          const authorInfo = await getAuthorDetails(authorUrl);
          setAuthorDetails(authorInfo);
        }

        const wikipediaInfo = await getWikipediaInfo(details.title);
        setWikipediaInfo(wikipediaInfo);
      } catch (error) {
        setError("Error fetching book details. Please try again later.");
        console.error("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) {
    return (
      <div className="page">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Book Details</h1>

      {bookDetails.covers && (
        <img src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`} alt="Book Cover" />
      )}
      <h2>{bookDetails.title}</h2>

      {authorDetails.name && (
        <p>Author: {authorDetails.name}</p>
      )}
      {bookDetails.first_publish_date && (
        <p>First Publish Date: {bookDetails.first_publish_date}</p>
      )}
      {bookDetails.subject_places && bookDetails.subject_places.length > 0 && (
        <p>Subject Places: {bookDetails.subject_places.join(", ")}</p>
      )}
      {bookDetails.subject_people && bookDetails.subject_people.length > 0 && (
        <p>Subject People: {bookDetails.subject_people.join(", ")}</p>
      )}

      {wikipediaInfo.extract && (
        <div>
          <h3>Wikipedia Extract</h3>
          <p>
            <strong>Wikipedia Intro:</strong>{" "}
            {cleanHTMLTags(wikipediaInfo.extract)}
          </p>
          <p>
            <strong>Wikipedia Link:</strong>{" "}
            <a href={wikipediaInfo.wikipediaLink} target="_blank" rel="noopener noreferrer">
              {wikipediaInfo.wikipediaLink}
            </a>
          </p>
          {wikipediaInfo.wikipediaCover && (
            <img src={wikipediaInfo.wikipediaCover} alt="Wikipedia Cover" />
          )}
        </div>
      )}

      {bookDetails.links && bookDetails.links.length > 0 && (
        <div>
          <h3>Additional Links</h3>
          <ul>
            {bookDetails.links.map(link => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
