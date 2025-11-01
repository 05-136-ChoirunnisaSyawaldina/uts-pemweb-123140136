// src/components/ReadingList.jsx
import React from 'react';

// (Kriteria: React - Functional components, Props passing)
function ReadingList({ list, onRemove }) {
  return (
    <div className="reading-list-container">
      <h2>Reading List Anda ({list.length})</h2>
      {list.length === 0 ? (
        <p className="info-message">Belum ada buku di daftar baca Anda. Tambahkan dari hasil pencarian!</p>
      ) : (
        <div className="reading-list-items-wrapper"> {/* Untuk scroll horizontal jika terlalu banyak */}
          <ul>
            {/* (Kriteria: Modern JS - Array Methods: map) */}
            {list.map(book => (
              <li key={book.key} className="reading-list-item">
                <span className="book-title">{book.title}</span>
                <span className="book-author"> ({book.author})</span>
                {/* (Kriteria: React - Event handling) */}
                <button 
                  onClick={() => onRemove(book.key)} 
                  className="remove-button"
                  title="Hapus dari daftar"
                >
                  &times; {/* Simbol 'x' untuk hapus */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReadingList;