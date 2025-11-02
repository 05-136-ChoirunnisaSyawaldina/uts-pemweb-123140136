import React from 'react';

// Ini adalah komponen 'DataTable' Anda, dirender sebagai Grid
const DataTable = ({ books, loading, error, onBookClick, onAddToList }) => {

  // 1. Loading State
  if (loading) {
    return <div className="loading-message">Memuat buku... 📚</div>;
  }

  // 2. Error Handling
  if (error) {
    return <div className="error-message">Terjadi Kesalahan: {error}</div>;
  }

  // 3. No Results
  if (books.length === 0) {
    return <div className="no-results-message">Tidak ada buku yang ditemukan. Coba kata kunci lain.</div>;
  }

  // 4. Tampilkan Grid (Data Dinamis)
  return (
    <div className="results-grid">
      {books.map(book => (
        <div key={book.key} className="book-card">
          <img
            src={book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` : 'https://via.placeholder.com/240x320.png?text=No+Cover'}
            alt={`Cover ${book.title}`} // Accessibility
            className="book-card-cover"
            onClick={() => onBookClick(book.key)}
          />
          <div className="book-card-info">
            {/* "Kolom" data */}
            <h3 title={book.title}>{book.title}</h3>
            <p>Penulis: {book.author}</p>
            <p>Tahun: {book.year || 'N/A'}</p>
            <div className="book-card-actions">
              {/* Event Handling */}
              <button onClick={() => onAddToList(book)}>
                + Tambah ke Reading List
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataTable;