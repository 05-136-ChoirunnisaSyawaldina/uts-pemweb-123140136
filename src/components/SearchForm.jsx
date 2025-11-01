// src/components/SearchForm.jsx
import React from 'react';

function SearchForm({ onSearch }) {
  return (
    <div className="search-form-container">
      <h2>Cari Buku</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSearch("dummy query", "title"); }}>
        <input type="text" placeholder="Judul atau Penulis" required />
        <select>
          <option value="title">Judul</option>
          <option value="author">Penulis</option>
        </select>
        <button type="submit">Cari</button>
      </form>
    </div>
  );
}

export default SearchForm;