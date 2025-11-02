import React from 'react';
import { IoAdd, IoCheckmark } from 'react-icons/io5'; // Ikon baru

// Menerima prop 'readingList' untuk mengecek duplikat
const DataTable = ({ books, loading, error, onBookClick, onAddToList, readingList }) => {

  if (loading) {
    // Spinner 'imut' baru
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div className="no-results-message">No books found. Try another search.</div>;
  }

  return (
    <div className="results-grid">
      {books.map(book => {
        // Cek apakah buku sudah ada di list
        const isAdded = readingList.some(item => item.key === book.key);
        
        return (
          <div key={book.key} className="book-card">
            <img
              src={book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` : 'https://via.placeholder.com/240x320.png?text=No+Cover'}
              alt={`Cover ${book.title}`}
              className="book-card-cover"
              onClick={() => onBookClick(book.key)}
            />
            <div className="book-card-info">
              <h3 title={book.title}>{book.title}</h3>
              <p>By: {book.author}</p>
              <p>Year: {book.year || 'N/A'}</p>
              <div className="book-card-actions">
                <button 
                  className="action-button"
                  onClick={() => onAddToList(book)}
                  disabled={isAdded} // Nonaktifkan tombol jika sudah ditambah
                >
                  {isAdded ? (
                    <>
                      <IoCheckmark /> Added
                    </>
                  ) : (
                    <>
                      <IoAdd /> Add to List
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataTable;