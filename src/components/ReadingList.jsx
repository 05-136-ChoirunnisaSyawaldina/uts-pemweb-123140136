// src/components/ReadingList.jsx
import React from 'react';

function ReadingList({ list, onRemove }) {
  return (
    <div className="reading-list-container">
      <h2>Reading List Anda ({list.length})</h2>
      {list.length === 0 ? (
        <p className="info-message">Belum ada buku di daftar baca Anda.</p>
      ) : (
        <ul>
          {list.map(book => (
            <li key={book.key}>
              {book.title} <button onClick={() => onRemove(book.key)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReadingList;