// BookDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetails, getAuthorDetails, getWikipediaInfo } from "../openLibrary";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [wikipediaInfo, setWikipediaInfo] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const details = await getBookDetails(id);
        setBookDetails(details);
        
        const wikipediaInfo = await getWikipediaInfo(details.title);
        setWikipediaInfo(wikipediaInfo);


        if (details.authors && details.authors.length > 0) {          
          const authorUrl = `${details.authors[0].author.key}`;
          const authorInfo = await getAuthorDetails(authorUrl);
          setAuthorDetails(authorInfo);
        }

      } catch (error) {
        // Handle errors
        console.error("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      <h1>Book Details</h1>
      <img src={`https://covers.openlibrary.org/b/id/${bookDetails.covers?.[0] ?? "default"}-L.jpg`} alt="Book Cover" />
      <h2>{bookDetails.title}</h2>
      <p>Author: {authorDetails.name}</p>
      <p>First Publish Date: {bookDetails.first_publish_date}</p>
      <p>Subject Places: {bookDetails.subject_places?.join(", ")}</p>
      <p>Subject People: {bookDetails.subject_people?.join(", ")}</p>
      {/* Add more details as needed */}


      {wikipediaInfo.description && (
        <div>
          <h3>Wikipedia Description</h3>
          <p>{wikipediaInfo.description}</p>
          {/* Add more Wikipedia-related information as needed */}
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
