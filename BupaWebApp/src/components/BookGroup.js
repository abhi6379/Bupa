import React from 'react';

const BookGroup = ({ title, books }) => {
  return (
    <div className="book-box">
      <h2 className="box-title">{title}</h2>
      <ul className="book-list">
        {books.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookGroup;