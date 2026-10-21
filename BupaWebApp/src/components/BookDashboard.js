import React, { useState } from 'react';
import apiService from '../services/apiService';
import BookGroup from './BookGroup';

const BookDashboard = () => {
  const [data, setData] = useState(null);
  const [showHardcoverOnly, setShowHardcoverOnly] = useState(false);

  const fetchData = async () => {
    try {
      debugger;
      const result = await apiService.get('/api/v1/bookowners');
      setData(result);
      setShowHardcoverOnly(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processBooks = (owners, isAdult) => {
    if (!owners) return [];
    
    const targetOwners = owners.filter(owner => isAdult ? owner.age >= 18 : owner.age < 18);
    
    let books = [];
    targetOwners.forEach(owner => {
      owner.books.forEach(book => {
        if (!showHardcoverOnly || book.type === 'Hardcover') {
          books.push(book.name);
        }
      });
    });

    return [...new Set(books)].sort((a, b) => a.localeCompare(b));
  };

  const adultBooks = processBooks(data, true);
  const childBooks = processBooks(data, false);

  const adultTitle = showHardcoverOnly ? "Hardcover Books owned by Adults" : "Books owned by Adults";
  const childTitle = showHardcoverOnly ? "Hardcover Books owned by Children" : "Books owned by Children";

  return (
    <div className="app-container">
      <header className="header">
        <h1>Owners and Books</h1>
      </header>

      {data && (
        <div className="content-area">
          <div className="book-columns">
            <BookGroup title={adultTitle} books={adultBooks} />
            <BookGroup title={childTitle} books={childBooks} />
          </div>
        </div>
      )}

      <div className="controls">
        <button className="link-btn" onClick={() => { if(data) setShowHardcoverOnly(true) }}>
          Hardcover only
        </button>
        <button className="primary-btn" onClick={fetchData}>
          Get Books
        </button>
      </div>
    </div>
  );
};

export default BookDashboard;